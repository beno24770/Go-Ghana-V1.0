import type { KnowledgeDocument, SearchResult, VectorStore } from '../types/knowledge';

/**
 * A simple in-memory vector store simulation.
 * In a real app, this would connect to Pinecone, Weaviate, or use a local library like TensorFlow.js
 */
class LocalVectorStore implements VectorStore {
    private documents: KnowledgeDocument[] = [];

    async add(doc: KnowledgeDocument): Promise<void> {
        this.documents.push(doc);
    }

    async addBatch(docs: KnowledgeDocument[]): Promise<void> {
        this.documents.push(...docs);
    }

    async search(query: string, limit: number = 3): Promise<SearchResult[]> {
        const normalizedQuery = query.toLowerCase();
        const terms = normalizedQuery.split(' ').filter(t => t.length > 3);

        const results = this.documents.map(doc => {
            let score = 0;
            const contentLower = doc.content.toLowerCase();
            const titleLower = doc.metadata.title.toLowerCase();

            // Simple keyword scoring
            if (contentLower.includes(normalizedQuery)) score += 0.5;
            if (titleLower.includes(normalizedQuery)) score += 0.3;

            terms.forEach(term => {
                if (contentLower.includes(term)) score += 0.1;
                if (titleLower.includes(term)) score += 0.2;
                if (doc.metadata.tags?.some(tag => tag.toLowerCase().includes(term))) score += 0.2;
            });

            return { ...doc, score };
        });

        return results
            .filter(r => r.score > 0.1)
            .sort((a, b) => b.score - a.score)
            .slice(0, limit);
    }
}

export class KnowledgeService {
    private store: VectorStore;

    constructor(store?: VectorStore) {
        this.store = store || new LocalVectorStore();
    }

    async addDocument(doc: KnowledgeDocument): Promise<void> {
        await this.store.add(doc);
    }

    async search(query: string): Promise<SearchResult[]> {
        return this.store.search(query);
    }

    // Mock ingestion for now
    async ingestMockData(): Promise<void> {
        const mockDocs: KnowledgeDocument[] = [
            {
                id: 'kakum-1',
                content: "Kakum National Park is famous for its canopy walkway, which is 30 meters above the ground. It is located in the Central Region, about 30km north of Cape Coast. It's a home to forest elephants, bongo antelopes, and Diana monkeys.",
                metadata: {
                    title: "Kakum National Park Guide",
                    type: "guide",
                    url: "https://letvisitghanatours.com/guides/kakum",
                    tags: ["nature", "adventure", "central region"],
                    dateIndexed: Date.now()
                }
            },
            {
                id: 'mole-1',
                content: "Mole National Park is Ghana's largest wildlife refuge. Located in the Savannah Region, it's the best place to see elephants in the wild. The best time to visit is during the dry season (December to April) when animals gather at waterholes.",
                metadata: {
                    title: "Mole National Park Safari",
                    type: "tour",
                    url: "https://letvisitghanatours.com/tours/mole-safari",
                    tags: ["safari", "wildlife", "northern ghana"],
                    dateIndexed: Date.now()
                }
            },
            {
                id: 'visa-1',
                content: "Most visitors to Ghana need a visa. You can apply online or at your nearest Ghanaian embassy. A yellow fever vaccination certificate is required for entry. The standard tourist visa is valid for 3 months.",
                metadata: {
                    title: "Ghana Visa & Entry Requirements",
                    type: "faq",
                    url: "https://letvisitghanatours.com/faq/visa",
                    tags: ["visa", "travel tips", "legal"],
                    dateIndexed: Date.now()
                }
            }
        ];

        await this.store.addBatch(mockDocs);
    }
}

export const knowledgeService = new KnowledgeService();
