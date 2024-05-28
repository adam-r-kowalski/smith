/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

module.exports = grammar({
  name: "smith",

  rules: {
    source_file: ($) => repeat($.expression),

    expression: ($) =>
      choice($.integer, $.float, $.string, $.boolean, $.character),

    integer: () => /\d+/,

    float: () => /\d+\.\d+/,

    string: () => /"[^"]*"/,

    boolean: () => choice("true", "false"),

    character: () => /'[^']'/,
  },
});
