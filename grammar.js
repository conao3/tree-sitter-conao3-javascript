/**
 * @file Conao3Javascript grammar for tree-sitter
 * @author Naoya Yamashita <conao3@gmail.com>
 * @license Apache-2.0
 */

function sep1(rule, separator) {
  return seq(rule, repeat(seq(separator, rule)));
}

function sep(rule, separator) {
  return optional(sep1(rule, separator));
}

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

module.exports = grammar({
  name: "conao3_javascript",

  extras: $ => [
    /\s/,
    $.comment,
  ],

  precedences: $ => [
    [
      'member',
      'new',
      'call',
      'unary',
      'binary',
      'primary',
    ],
    [
      'statement',
      'return',
      'expression',
      'declaration',
    ]
  ],

  rules: {
    source_file: $ => repeat($.statement),

    comment: $ => choice(
      token(seq('//', /.*/)),
      token(seq('/*', /[^*]*\*+([^/*][^*]*\*+)*/, '/')),
    ),

    identifier: $ => /[a-zA-Z_]\w*/,
    block: $ => seq('{', repeat($.statement), '}'),

    statement: $ => prec.right(seq(
      choice(
        $.expression_statement,
        $.variable_declaration_statement,
        $.function_declaration_statement,
        $.class_declaration_statement,
        $.if_statement,
        $.for_statement,
        $.while_statement,
        $.return_statement,
        $.break_statement,
        $.continue_statement,
      ),
      optional(';'),
    )),

    expression_statement: $ => $._expression_end,

    _expression_end: $ => prec.right($.expression),

    variable_declaration_statement: $ => prec.right(seq(
      choice('var', 'let', 'const'), $.identifier, '=', $.expression,
    )),

    function_declaration_statement: $ => prec.right(seq(
      'function', $.identifier, '(', sep($.identifier, ','), ')', $.block,
    )),

    class_declaration_statement: $ => prec.right(seq(
      'class', $.identifier, $.block,
    )),

    if_statement: $ => seq(
      'if', '(', $.expression, ')', $.block,
      optional(seq('else', $.block)),
    ),

    for_statement: $ => seq(
      'for', '(', $.expression, ';', $.expression, ';', $.expression, ')', $.block,
    ),

    while_statement: $ => seq(
      'while', '(', $.expression, ')', $.block,
    ),

    return_statement: $ => prec.right(seq(
      'return',
      optional($.expression),
    )),

    break_statement: $ => 'break',
    continue_statement: $ => 'continue',

    expression: $ => choice(
      $._literal,
      $.identifier,
      $.binary_expression,
      $.unary_expression,
      $.call_expression,
      $.member_expression,
      $.index_expression,
      $.parenthesized_expression,
    ),

    binary_expression: $ => prec.left(seq(
      field('left', $.expression),
      field('operator', choice('+', '-', '*', '/', '%', '==', '!=', '===', '!==', '>', '>=', '<', '<=', '&&', '||')),
      field('right', $.expression),
    )),

    unary_expression: $ => prec.right(seq(
      field('operator', choice('!', '-', '+')),
      field('argument', $.expression),
    )),

    call_expression: $ => prec.left(seq(
      field('callee', $.expression),
      '(',
      field('arguments', sep($.expression, ',')),
      ')',
    )),

    member_expression: $ => prec.left(seq(
      field('object', $.expression),
      '.',
      field('property', $.identifier),
    )),

    index_expression: $ => prec.left(seq(
      field('object', $.expression),
      '[',
      field('index', $.expression),
      ']',
    )),

    parenthesized_expression: $ => seq(
      '(',
      $.expression,
      ')',
    ),

    _literal: $ => choice(
      $.number,
      $.string,
      $.boolean,
      $.null,
    ),

    number: $ => {
      const decimal = /[+-]?\d+(\.\d+)?([eE][+-]?\d+)?/
      const hex = /[+-]?0[xX][0-9a-fA-F]+/
      const octal = /[+-]?0[oO][0-7]+/
      const binary = /[+-]?0[bB][01]+/
      return token(choice(decimal, hex, octal, binary))
    },
    string: $ => /"[^"]*"/,
    boolean: $ => choice('true', 'false'),
    null: $ => 'null',
  }
});
