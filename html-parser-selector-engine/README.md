# HTML Parser & CSS Selector Engine

A C#/.NET project that downloads HTML, tokenizes it, builds an in-memory element tree and searches that tree using parsed CSS-style selectors.

## Key Features

- Fetch HTML content over HTTP
- Tokenize markup and text content
- Build a hierarchical HTML element tree
- Represent elements, attributes and parent/child relationships
- Parse CSS-style selectors
- Traverse the tree and return matching elements
- Handle regular and void HTML tags using JSON tag definitions

## Tech Stack

- C# / .NET
- HttpClient
- Regular expressions
- LINQ
- Tree data structures
- JSON-based HTML tag metadata

## Core Components

- `HtmlElement` — represents nodes and builds/traverses the element tree
- `Selector` — parses selector expressions into searchable criteria
- `HtmlHelper` — shared HTML metadata and helper logic
- `Arttibute` — attribute representation used during parsing
- `HtmlTags.json` / `HtmlVoidTags.json` — tag definitions

## Processing Flow

```text
HTTP page
   ↓
HTML text
   ↓
Tokenization
   ↓
HtmlElement tree
   ↓
Selector parsing
   ↓
Tree search
   ↓
Matching elements
```

## What This Project Demonstrates

The project emphasizes algorithmic problem solving rather than framework plumbing: parsing semi-structured text, modelling a tree, recursively traversing nodes, translating selector syntax into data structures and matching those structures against HTML elements.
