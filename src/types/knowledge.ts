export type DocumentType = 'page' | 'tour' | 'guide' | 'faq' | 'blog';

export interface KnowledgeDocument {
    id: string;
    content: string;
    metadata: {
        title: string;
        url?: string;
        type: DocumentType;
        tags?: string[];
        dateIndexed: number;
    };
    embedding?: number[]; // For future real vector support
}

export interface SearchResult extends KnowledgeDocument {
    score: number; // Similarity score (0-1)
}

export interface VectorStore {
    add(doc: KnowledgeDocument): Promise<void>;
    addBatch(docs: KnowledgeDocument[]): Promise<void>;
    search(query: string, limit?: number): Promise<SearchResult[]>;
}

export interface IngestionService {
    ingestFromUrl(url: string): Promise<KnowledgeDocument>;
    ingestFromSitemap(sitemapUrl: string): Promise<KnowledgeDocument[]>;
}
