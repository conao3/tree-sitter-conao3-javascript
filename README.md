# tree-sitter-conao3-javascript

A [tree-sitter](https://tree-sitter.github.io/tree-sitter/) grammar for JavaScript.

## Overview

This package provides a tree-sitter parser for JavaScript, enabling fast and accurate syntax highlighting, code folding, and structural analysis for editors and tools that support tree-sitter.

## Features

- Parses JavaScript source code into a concrete syntax tree
- Supports common JavaScript constructs including:
  - Variable declarations (`var`, `let`, `const`)
  - Function and class declarations
  - Control flow statements (`if`, `for`, `while`, `return`, `break`, `continue`)
  - Expressions (binary, unary, call, member access, indexing)
  - Literals (numbers, strings, booleans, null)
  - Comments (single-line and multi-line)

## Installation

### Node.js

```bash
npm install tree-sitter-conao3-javascript
```

### Rust

Add to your `Cargo.toml`:

```toml
[dependencies]
tree-sitter-conao3-javascript = "1.0.0"
```

## Usage

### Node.js

```javascript
const Parser = require('tree-sitter');
const JavaScript = require('tree-sitter-conao3-javascript');

const parser = new Parser();
parser.setLanguage(JavaScript);

const sourceCode = 'const x = 42;';
const tree = parser.parse(sourceCode);

console.log(tree.rootNode.toString());
```

### Rust

```rust
use tree_sitter::Parser;

fn main() {
    let mut parser = Parser::new();
    parser
        .set_language(&tree_sitter_conao3_javascript::LANGUAGE.into())
        .expect("Error loading JavaScript grammar");

    let source_code = "const x = 42;";
    let tree = parser.parse(source_code, None).unwrap();

    println!("{}", tree.root_node().to_sexp());
}
```

## Development

### Prerequisites

- Node.js (v14 or later)
- tree-sitter CLI

### Building

```bash
npm install
npx tree-sitter generate
```

### Testing

```bash
npx tree-sitter test
```

## License

Apache-2.0

## Author

Naoya Yamashita (conao3@gmail.com)
