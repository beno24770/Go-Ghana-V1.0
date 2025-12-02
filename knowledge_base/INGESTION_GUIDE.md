# Adepa Knowledge Base - Ingestion Pipeline

## Overview

The ingestion pipeline processes both structured (TypeScript) and unstructured (Markdown) data into knowledge chunks ready for embedding and vector storage.

## Quick Start

### 1. Add Knowledge Files

Create markdown files in `knowledge_base/` with YAML frontmatter:

```markdown
---
id: unique_id
title: "Display Title"
category: "Culture"
tags: ["tag1", "tag2"]
region: "Greater Accra"
last_updated: "2024-11-30"
---

# Your Content Here

Write your knowledge content in markdown...
```

### 2. Run Ingestion

```bash
# Test the pipeline
npm run test:ingestion

# Or use tsx directly
npx tsx scripts/testIngestion.ts
```

### 3. Output

The script generates `knowledge_chunks.json` with all processed chunks.

## Directory Structure

```
knowledge_base/
├── culture/          # Cultural norms, etiquette
├── history/          # Historical events, figures
├── tips/             # Travel tips, local advice
└── food/             # Food culture, dining
```

## Sample Knowledge Files

We've created 4 sample files to get you started:

1. **`culture/eating_etiquette.md`** - How to eat fufu properly
2. **`history/golden_stool.md`** - The sacred Ashanti symbol
3. **`tips/trotro_survival.md`** - Navigating local transport
4. **`food/waakye_culture.md`** - Ghana's beloved breakfast

## Chunk Format

Each chunk has:

```typescript
{
  id: string;              // Unique identifier
  type: string;            // accommodation, restaurant, culture, etc.
  title: string;           // Display title
  content: string;         // Text for embedding
  metadata: {
    tags: string[];        // Searchable tags
    region?: string;       // Geographic filter
    budget_tier?: string;  // Price filter
    // ... additional metadata
  }
}
```

## Next Steps

1. **Add More Content**: Create 50+ knowledge files covering Ghana's top topics
2. **Generate Embeddings**: Use Gemini or OpenAI API to create vectors
3. **Upload to Vector DB**: Store in Pinecone/Weaviate/Supabase
4. **Implement Search**: Query the vector DB from your chatbot

## PowerShell Note

If you encounter execution policy errors on Windows, run:

```powershell
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
```

Or use Git Bash / WSL instead.
