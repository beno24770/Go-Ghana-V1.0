/**
 * Adepa Knowledge Base - Sample Knowledge Files
 * 
 * This directory contains unstructured knowledge about Ghana
 * organized by category.
 */

# Knowledge Base Structure

```
knowledge_base/
├── culture/          # Cultural norms, etiquette, traditions
├── history/          # Historical events, figures, landmarks
├── tips/             # Travel tips, local advice
└── food/             # Food culture, dishes, dining etiquette
```

Each `.md` file should have YAML frontmatter with:
- `id`: Unique identifier
- `title`: Display title
- `category`: Category name
- `tags`: Array of searchable tags
- `region`: (Optional) Related region
- `last_updated`: Date in YYYY-MM-DD format
