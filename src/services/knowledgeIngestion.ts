/**
 * Adepa Knowledge Base - Data Ingestion Pipeline
 * 
 * This script processes structured and unstructured data sources
 * and prepares them for embedding generation and vector storage.
 */

import * as fs from 'fs';
import * as path from 'path';

// ============================================
// TYPES
// ============================================

export interface KnowledgeChunk {
    id: string;
    type: 'accommodation' | 'restaurant' | 'culture' | 'history' | 'tip' | 'festival';
    title: string;
    content: string; // The text to be embedded
    metadata: {
        tags: string[];
        region?: string;
        budget_tier?: string;
        [key: string]: any;
    };
}

export interface MarkdownDocument {
    frontmatter: Record<string, any>;
    content: string;
}

// ============================================
// STRUCTURED DATA PROCESSORS
// ============================================

/**
 * Convert Accommodation object to embedding text
 */
export function accommodationToEmbeddingText(acc: any): string {
    const parts = [
        `${acc.name} is a ${acc.tier} ${acc.type} in ${acc.neighborhood || acc.city}, ${acc.region}.`,
        acc.description,
        `Price range: ${acc.pricePerNight.min}-${acc.pricePerNight.max} GHS per night.`,
        `Amenities: ${acc.amenities.join(', ')}.`,
        acc.highlights?.length > 0 ? `Highlights: ${acc.highlights.join(', ')}.` : '',
    ];

    return parts.filter(Boolean).join(' ');
}

/**
 * Convert Restaurant object to embedding text
 */
export function restaurantToEmbeddingText(rest: any): string {
    const parts = [
        `${rest.name} is a ${rest.priceRange} restaurant in ${rest.neighborhood || rest.city}, ${rest.region}.`,
        rest.description,
        `Cuisine: ${rest.cuisine.join(', ')}.`,
        `Average cost: ${rest.avgCostPerPerson} GHS per person.`,
        rest.highlights?.length > 0 ? `Known for: ${rest.highlights.join(', ')}.` : '',
    ];

    return parts.filter(Boolean).join(' ');
}

/**
 * Convert Festival object to embedding text
 */
export function festivalToEmbeddingText(fest: any): string {
    const parts = [
        `${fest.name} is a festival in ${fest.location}, ${fest.region}.`,
        fest.description,
        `Travel styles: ${fest.travelStyle.join(', ')}.`,
    ];

    return parts.filter(Boolean).join(' ');
}

/**
 * Process structured data from TypeScript files
 */
export function processStructuredData(
    dataArray: any[],
    type: 'accommodation' | 'restaurant' | 'festival',
    converter: (item: any) => string
): KnowledgeChunk[] {
    return dataArray.map((item, index) => {
        const embeddingText = converter(item);

        return {
            id: item.id || `${type}_${index}`,
            type,
            title: item.name,
            content: embeddingText,
            metadata: {
                tags: extractTags(item, type),
                region: item.region,
                budget_tier: item.tier || item.priceRange,
                ...extractAdditionalMetadata(item, type),
            },
        };
    });
}

/**
 * Extract tags from structured data
 */
function extractTags(item: any, type: string): string[] {
    const tags: string[] = [type];

    if (item.amenities) tags.push(...item.amenities.slice(0, 5));
    if (item.cuisine) tags.push(...item.cuisine);
    if (item.travelStyle) tags.push(...item.travelStyle);
    if (item.tier) tags.push(item.tier);
    if (item.type) tags.push(item.type);

    return [...new Set(tags)]; // Remove duplicates
}

/**
 * Extract additional metadata
 */
function extractAdditionalMetadata(item: any, type: string): Record<string, any> {
    const meta: Record<string, any> = {};

    if (type === 'accommodation') {
        meta.price_avg = item.pricePerNight?.average;
        meta.rating = item.rating?.overall;
    } else if (type === 'restaurant') {
        meta.price_avg = item.avgCostPerPerson;
        meta.rating = item.rating;
    }

    return meta;
}

// ============================================
// UNSTRUCTURED DATA PROCESSORS (Markdown)
// ============================================

/**
 * Parse Markdown file with YAML frontmatter
 */
export function parseMarkdownWithFrontmatter(filePath: string): MarkdownDocument {
    const content = fs.readFileSync(filePath, 'utf-8');

    // Check if file starts with frontmatter
    if (!content.startsWith('---')) {
        return {
            frontmatter: {},
            content: content,
        };
    }

    // Extract frontmatter
    const parts = content.split('---');
    if (parts.length < 3) {
        return {
            frontmatter: {},
            content: content,
        };
    }

    const frontmatterText = parts[1];
    const bodyContent = parts.slice(2).join('---').trim();

    // Parse YAML frontmatter (simple key-value parser)
    const frontmatter = parseSimpleYAML(frontmatterText);

    return {
        frontmatter,
        content: bodyContent,
    };
}

/**
 * Simple YAML parser for frontmatter
 */
function parseSimpleYAML(yaml: string): Record<string, any> {
    const result: Record<string, any> = {};
    const lines = yaml.split('\n');

    for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith('#')) continue;

        const colonIndex = trimmed.indexOf(':');
        if (colonIndex === -1) continue;

        const key = trimmed.substring(0, colonIndex).trim();
        let value: any = trimmed.substring(colonIndex + 1).trim();

        // Remove quotes
        if ((value.startsWith('"') && value.endsWith('"')) ||
            (value.startsWith("'") && value.endsWith("'"))) {
            value = value.slice(1, -1);
        }

        // Parse arrays
        if (value.startsWith('[') && value.endsWith(']')) {
            value = value.slice(1, -1).split(',').map(v => v.trim().replace(/['"]/g, ''));
        }

        result[key] = value;
    }

    return result;
}

/**
 * Chunk long markdown content by headers
 */
export function chunkMarkdownByHeaders(content: string, maxChunkSize: number = 1000): string[] {
    const chunks: string[] = [];
    const lines = content.split('\n');

    let currentChunk: string[] = [];
    let currentSize = 0;

    for (const line of lines) {
        const isHeader = line.startsWith('#');

        // If we hit a header and current chunk is large enough, save it
        if (isHeader && currentSize > maxChunkSize / 2) {
            if (currentChunk.length > 0) {
                chunks.push(currentChunk.join('\n'));
                currentChunk = [];
                currentSize = 0;
            }
        }

        currentChunk.push(line);
        currentSize += line.length;

        // If chunk is too large, split it
        if (currentSize > maxChunkSize) {
            chunks.push(currentChunk.join('\n'));
            currentChunk = [];
            currentSize = 0;
        }
    }

    // Add remaining chunk
    if (currentChunk.length > 0) {
        chunks.push(currentChunk.join('\n'));
    }

    return chunks;
}

/**
 * Process a single markdown file into knowledge chunks
 */
export function processMarkdownFile(filePath: string): KnowledgeChunk[] {
    const doc = parseMarkdownWithFrontmatter(filePath);
    const chunks = chunkMarkdownByHeaders(doc.content);

    return chunks.map((chunk, index) => ({
        id: doc.frontmatter.id ? `${doc.frontmatter.id}_${index}` : `md_${path.basename(filePath, '.md')}_${index}`,
        type: (doc.frontmatter.category?.toLowerCase() || 'culture') as any,
        title: doc.frontmatter.title || path.basename(filePath, '.md'),
        content: chunk,
        metadata: {
            tags: Array.isArray(doc.frontmatter.tags) ? doc.frontmatter.tags : [],
            region: doc.frontmatter.region,
            ...doc.frontmatter,
        },
    }));
}

/**
 * Process all markdown files in a directory
 */
export function processMarkdownDirectory(dirPath: string): KnowledgeChunk[] {
    const allChunks: KnowledgeChunk[] = [];

    if (!fs.existsSync(dirPath)) {
        console.warn(`Directory not found: ${dirPath}`);
        return allChunks;
    }

    const files = fs.readdirSync(dirPath);

    for (const file of files) {
        if (file.endsWith('.md')) {
            const filePath = path.join(dirPath, file);
            const chunks = processMarkdownFile(filePath);
            allChunks.push(...chunks);
        }
    }

    return allChunks;
}

// ============================================
// EXPORT UTILITIES
// ============================================

/**
 * Export chunks to JSON file
 */
export function exportChunksToJSON(chunks: KnowledgeChunk[], outputPath: string): void {
    const json = JSON.stringify(chunks, null, 2);
    fs.writeFileSync(outputPath, json, 'utf-8');
    console.log(`✅ Exported ${chunks.length} chunks to ${outputPath}`);
}

/**
 * Main ingestion function
 */
export async function ingestAllData(config: {
    structuredDataPath: string;
    knowledgeBasePath: string;
    outputPath: string;
}): Promise<KnowledgeChunk[]> {
    const allChunks: KnowledgeChunk[] = [];

    console.log('🚀 Starting data ingestion...');

    // Process markdown knowledge base
    if (fs.existsSync(config.knowledgeBasePath)) {
        console.log('📚 Processing knowledge base markdown files...');
        const mdChunks = processMarkdownDirectory(config.knowledgeBasePath);
        allChunks.push(...mdChunks);
        console.log(`✅ Processed ${mdChunks.length} markdown chunks`);
    }

    // Export all chunks
    exportChunksToJSON(allChunks, config.outputPath);

    console.log(`✅ Total chunks: ${allChunks.length}`);
    return allChunks;
}
