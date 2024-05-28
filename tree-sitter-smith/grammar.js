/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

function commaSep(rule) {
  return optional(seq(rule, repeat(seq(",", rule))));
}

module.exports = grammar({
  name: "smith",

  rules: {
    source_file: ($) => repeat($.expression),

    expression: ($) =>
      choice(
        $.integer,
        $.float,
        $.string,
        $.boolean,
        $.character,
        $.identifier,
        $.block,
        $.function_definition,
      ),

    integer: () => /\d+/,

    float: () => /\d+\.\d+/,

    string: () => /"[^"]*"/,

    boolean: () => choice("true", "false"),

    character: () => /'[^']'/,

    identifier: () => /[a-zA-Z_][a-zA-Z0-9_]*/,

    parameter: ($) => seq($.identifier, ":", $.identifier),

    parameter_list: ($) => seq("(", optional(commaSep($.parameter)), ")"),

    block: ($) => seq("{", repeat($.expression), "}"),

    function_definition: ($) =>
      seq("fn", $.identifier, $.parameter_list, "->", $.identifier, $.block),
  },
});
