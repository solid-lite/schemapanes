# schemapanes

Schema.org panes for SolidOS.

**[Live Examples](https://solid-lite.github.io/schemapanes/examples/)**

## What is this?

schemapanes brings schema.org vocabulary support to SolidOS. Render schema.org JSON-LD with beautiful, purpose-built panes.

## Quick Start

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Event",
  "name": "Solid World",
  "startDate": "2025-02-06T16:00:00Z",
  "location": "Online"
}
</script>
<script src="https://cdn.jsdelivr.net/npm/solidos-lite/solidos-lite.js"></script>
<script src="https://cdn.jsdelivr.net/npm/schemapanes/dist/schemapanes.js"></script>
```

## Supported Types

| Type | Description |
|------|-------------|
| `schema:Person` | People profiles |
| `schema:Event` | Events, meetups, conferences |
| `schema:Article` | Blog posts, news articles |
| `schema:Organization` | Companies, groups |
| `schema:Product` | Products with reviews |
| `schema:Recipe` | Cooking recipes |
| `schema:Place` | Locations, venues |

## Why Schema.org?

- **Billions of pages** already use schema.org
- **JSON-LD** is the preferred format
- **Web developers** already know it
- **Search engines** understand it
- Now **SolidOS** can render it beautifully

## Examples

All examples use JSON-LD (schema.org's native format):

- [Person](https://solid-lite.github.io/schemapanes/examples/person.html)
- [Event](https://solid-lite.github.io/schemapanes/examples/event.html)
- [Article](https://solid-lite.github.io/schemapanes/examples/article.html)
- [Organization](https://solid-lite.github.io/schemapanes/examples/organization.html)
- [Recipe](https://solid-lite.github.io/schemapanes/examples/recipe.html)

## License

AGPL-3.0
