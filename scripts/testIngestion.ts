/**
 * Test script for the Knowledge Ingestion Pipeline
 * 
 * Run with: npx tsx scripts/testIngestion.ts
 */

import * as path from 'path';
import {
    processStructuredData,
    accommodationToEmbeddingText,
    restaurantToEmbeddingText,
    festivalToEmbeddingText,
    processMarkdownDirectory,
    exportChunksToJSON,
    type KnowledgeChunk,
} from '../src/services/knowledgeIngestion';

// Import existing data
import { ACCOMMODATIONS } from '../src/data/accommodationData';
import { RESTAURANTS } from '../src/data/restaurantData';
import { GHANA_FESTIVALS } from '../src/data/festivalsData';

async function main() {
    console.log('🚀 Testing Knowledge Ingestion Pipeline\n');

    const allChunks: KnowledgeChunk[] = [];

    // ============================================
    // 1. Process Structured Data
    // ============================================

    console.log('📊 Processing structured data...');

    // Process accommodations
    const accommodationChunks = processStructuredData(
        ACCOMMODATIONS.slice(0, 10), // Test with first 10
        'accommodation',
        accommodationToEmbeddingText
    );
    console.log(`✅ Processed ${accommodationChunks.length} accommodation chunks`);
    allChunks.push(...accommodationChunks);

    // Process restaurants
    const restaurantChunks = processStructuredData(
        RESTAURANTS,
        'restaurant',
        restaurantToEmbeddingText
    );
    console.log(`✅ Processed ${restaurantChunks.length} restaurant chunks`);
    allChunks.push(...restaurantChunks);

    // Process festivals
    const festivalChunks = processStructuredData(
        GHANA_FESTIVALS.slice(0, 20), // Test with first 20
        'festival',
        festivalToEmbeddingText
    );
    console.log(`✅ Processed ${festivalChunks.length} festival chunks`);
    allChunks.push(...festivalChunks);

    // ============================================
    // 2. Process Unstructured Data (Markdown)
    // ============================================

    console.log('\n📚 Processing knowledge base markdown files...');

    const knowledgeBasePath = path.join(__dirname, '..', 'knowledge_base');

    // Process each category
    const categories = ['culture', 'history', 'tips', 'food'];

    for (const category of categories) {
        const categoryPath = path.join(knowledgeBasePath, category);
        const mdChunks = processMarkdownDirectory(categoryPath);

        if (mdChunks.length > 0) {
            console.log(`✅ Processed ${mdChunks.length} chunks from ${category}/`);
            allChunks.push(...mdChunks);
        }
    }

    // ============================================
    // 3. Export Results
    // ============================================

    console.log('\n💾 Exporting results...');

    const outputPath = path.join(__dirname, '..', 'knowledge_chunks.json');
    exportChunksToJSON(allChunks, outputPath);

    // ============================================
    // 4. Display Sample Chunks
    // ============================================

    console.log('\n📋 Sample Chunks:\n');

    // Show one of each type
    const types = ['accommodation', 'restaurant', 'festival', 'culture', 'history', 'tip'];

    for (const type of types) {
        const sample = allChunks.find(chunk => chunk.type === type);
        if (sample) {
            console.log(`\n--- ${type.toUpperCase()} ---`);
            console.log(`ID: ${sample.id}`);
            console.log(`Title: ${sample.title}`);
            console.log(`Content Preview: ${sample.content.substring(0, 150)}...`);
            console.log(`Tags: ${sample.metadata.tags.join(', ')}`);
            console.log(`Region: ${sample.metadata.region || 'N/A'}`);
        }
    }

    console.log('\n✅ Ingestion test complete!');
    console.log(`\n📊 Summary:`);
    console.log(`   Total chunks: ${allChunks.length}`);
    console.log(`   Accommodations: ${allChunks.filter(c => c.type === 'accommodation').length}`);
    console.log(`   Restaurants: ${allChunks.filter(c => c.type === 'restaurant').length}`);
    console.log(`   Festivals: ${allChunks.filter(c => c.type === 'festival').length}`);
    console.log(`   Culture: ${allChunks.filter(c => c.type === 'culture').length}`);
    console.log(`   History: ${allChunks.filter(c => c.type === 'history').length}`);
    console.log(`   Tips: ${allChunks.filter(c => c.type === 'tip').length}`);
}

main().catch(console.error);
