/**
 * @file Conao3Javascript grammar for tree-sitter
 * @author Naoya Yamashita <conao3@gmail.com>
 * @license Apache-2.0
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

module.exports = grammar({
  name: "conao3_javascript",

  rules: {
    // TODO: add the actual grammar rules
    source_file: $ => "hello"
  }
});
