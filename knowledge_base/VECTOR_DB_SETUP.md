# Vector Database Setup Guide

## Recommended: Supabase with pgvector

### Why Supabase?
- ✅ **Free tier**: 500MB database, 2GB bandwidth
- ✅ **PostgreSQL-based**: Familiar, reliable, SQL queries
- ✅ **Built-in auth**: Can integrate with existing user system
- ✅ **Easy setup**: No complex configuration
- ✅ **pgvector extension**: Native vector similarity search

---

## Setup Steps

### 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign up / Log in
3. Click "New Project"
4. Name: `adepa-knowledge-base`
5. Database Password: (save this securely)
6. Region: Choose closest to your users
7. Click "Create new project"

### 2. Enable pgvector Extension

In Supabase SQL Editor, run:

```sql
-- Enable pgvector extension
CREATE EXTENSION IF NOT EXISTS vector;
```

### 3. Create Knowledge Table

```sql
-- Create table for knowledge chunks
CREATE TABLE knowledge_chunks (
  id TEXT PRIMARY KEY,
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  embedding vector(768), -- Gemini embedding dimension
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for vector similarity search
CREATE INDEX ON knowledge_chunks 
USING ivfflat (embedding vector_cosine_ops)
WITH (lists = 100);

-- Create index for metadata filtering
CREATE INDEX idx_metadata ON knowledge_chunks USING GIN (metadata);

-- Create index for type filtering
CREATE INDEX idx_type ON knowledge_chunks (type);
```

### 4. Get API Credentials

1. Go to Project Settings → API
2. Copy:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon/public key**: For client-side queries
   - **service_role key**: For server-side operations (keep secret!)

### 5. Add to .env.local

```bash
# Supabase
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# Gemini API (for embeddings)
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

---

## Embedding Generation Script

Create `scripts/generateEmbeddings.ts`:

```typescript
import { createClient } from '@supabase/supabase-js';
import { GoogleGenerativeAI } from '@google/generative-ai';
import * as fs from 'fs';

// Initialize clients
const supabase = createClient(
  process.env.VITE_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const genAI = new GoogleGenerativeAI(process.env.VITE_GEMINI_API_KEY!);

async function generateEmbedding(text: string): Promise<number[]> {
  const model = genAI.getGenerativeModel({ model: 'embedding-001' });
  const result = await model.embedContent(text);
  return result.embedding.values;
}

async function uploadChunks() {
  // Read processed chunks
  const chunks = JSON.parse(
    fs.readFileSync('knowledge_chunks.json', 'utf-8')
  );

  console.log(`Processing ${chunks.length} chunks...`);

  for (const chunk of chunks) {
    // Generate embedding
    const embedding = await generateEmbedding(chunk.content);

    // Upload to Supabase
    const { error } = await supabase
      .from('knowledge_chunks')
      .upsert({
        id: chunk.id,
        type: chunk.type,
        title: chunk.title,
        content: chunk.content,
        embedding,
        metadata: chunk.metadata,
      });

    if (error) {
      console.error(`Error uploading ${chunk.id}:`, error);
    } else {
      console.log(`✅ Uploaded: ${chunk.id}`);
    }

    // Rate limiting (Gemini free tier)
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  console.log('✅ All chunks uploaded!');
}

uploadChunks().catch(console.error);
```

---

## Semantic Search Function

Create `src/services/knowledgeSearch.ts`:

```typescript
import { createClient } from '@supabase/supabase-js';
import { GoogleGenerativeAI } from '@google/generative-ai';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export async function searchKnowledge(
  query: string,
  options: {
    limit?: number;
    type?: string;
    region?: string;
  } = {}
) {
  // 1. Generate embedding for query
  const model = genAI.getGenerativeModel({ model: 'embedding-001' });
  const result = await model.embedContent(query);
  const queryEmbedding = result.embedding.values;

  // 2. Build query with filters
  let supabaseQuery = supabase.rpc('match_knowledge', {
    query_embedding: queryEmbedding,
    match_threshold: 0.7,
    match_count: options.limit || 5,
  });

  if (options.type) {
    supabaseQuery = supabaseQuery.eq('type', options.type);
  }

  if (options.region) {
    supabaseQuery = supabaseQuery.contains('metadata', { region: options.region });
  }

  // 3. Execute search
  const { data, error } = await supabaseQuery;

  if (error) {
    console.error('Search error:', error);
    return [];
  }

  return data;
}
```

### Create RPC Function in Supabase

In SQL Editor:

```sql
CREATE OR REPLACE FUNCTION match_knowledge(
  query_embedding vector(768),
  match_threshold float,
  match_count int
)
RETURNS TABLE (
  id text,
  type text,
  title text,
  content text,
  metadata jsonb,
  similarity float
)
LANGUAGE sql STABLE
AS $$
  SELECT
    id,
    type,
    title,
    content,
    metadata,
    1 - (embedding <=> query_embedding) AS similarity
  FROM knowledge_chunks
  WHERE 1 - (embedding <=> query_embedding) > match_threshold
  ORDER BY embedding <=> query_embedding
  LIMIT match_count;
$$;
```

---

## Integration with Adepa Chatbot

Update `src/services/chatService.ts`:

```typescript
import { searchKnowledge } from './knowledgeSearch';

export async function getAdepaResponse(userMessage: string) {
  // 1. Search knowledge base
  const relevantChunks = await searchKnowledge(userMessage, {
    limit: 3,
  });

  // 2. Build context from chunks
  const context = relevantChunks
    .map(chunk => `${chunk.title}:\n${chunk.content}`)
    .join('\n\n---\n\n');

  // 3. Create enhanced prompt
  const prompt = `You are Adepa, an expert on Ghana. Use the following knowledge to answer the user's question:

${context}

User Question: ${userMessage}

Answer naturally and conversationally, citing specific details from the knowledge above.`;

  // 4. Send to Gemini
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
  const result = await model.generateContent(prompt);
  
  return result.response.text();
}
```

---

## Testing

```typescript
// Test search
const results = await searchKnowledge("How do I eat fufu?");
console.log(results);

// Expected: Returns chunks about eating etiquette, fufu culture
```

---

## Cost Estimation

**Supabase Free Tier:**
- 500MB database (enough for ~50,000 chunks)
- 2GB bandwidth/month
- Unlimited API requests

**Gemini API:**
- Embedding: Free for first 1,500 requests/day
- Generation: Free for first 60 requests/minute

**Total Cost for MVP: $0/month** 🎉

---

## Next Steps

1. [ ] Create Supabase project
2. [ ] Run SQL setup scripts
3. [ ] Generate embeddings for existing chunks
4. [ ] Test semantic search
5. [ ] Integrate with chatbot
6. [ ] Monitor usage and performance
