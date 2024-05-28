#include "tree_sitter/parser.h"

#if defined(__GNUC__) || defined(__clang__)
#pragma GCC diagnostic ignored "-Wmissing-field-initializers"
#endif

#define LANGUAGE_VERSION 14
#define STATE_COUNT 29
#define LARGE_STATE_COUNT 6
#define SYMBOL_COUNT 25
#define ALIAS_COUNT 0
#define TOKEN_COUNT 16
#define EXTERNAL_TOKEN_COUNT 0
#define FIELD_COUNT 0
#define MAX_ALIAS_SEQUENCE_LENGTH 6
#define PRODUCTION_ID_COUNT 1

enum ts_symbol_identifiers {
  sym_integer = 1,
  sym_float = 2,
  sym_string = 3,
  anon_sym_true = 4,
  anon_sym_false = 5,
  sym_character = 6,
  sym_identifier = 7,
  anon_sym_COLON = 8,
  anon_sym_LPAREN = 9,
  anon_sym_COMMA = 10,
  anon_sym_RPAREN = 11,
  anon_sym_LBRACE = 12,
  anon_sym_RBRACE = 13,
  anon_sym_fn = 14,
  anon_sym_DASH_GT = 15,
  sym_source_file = 16,
  sym_expression = 17,
  sym_boolean = 18,
  sym_parameter = 19,
  sym_parameter_list = 20,
  sym_block = 21,
  sym_function_definition = 22,
  aux_sym_source_file_repeat1 = 23,
  aux_sym_parameter_list_repeat1 = 24,
};

static const char * const ts_symbol_names[] = {
  [ts_builtin_sym_end] = "end",
  [sym_integer] = "integer",
  [sym_float] = "float",
  [sym_string] = "string",
  [anon_sym_true] = "true",
  [anon_sym_false] = "false",
  [sym_character] = "character",
  [sym_identifier] = "identifier",
  [anon_sym_COLON] = ":",
  [anon_sym_LPAREN] = "(",
  [anon_sym_COMMA] = ",",
  [anon_sym_RPAREN] = ")",
  [anon_sym_LBRACE] = "{",
  [anon_sym_RBRACE] = "}",
  [anon_sym_fn] = "fn",
  [anon_sym_DASH_GT] = "->",
  [sym_source_file] = "source_file",
  [sym_expression] = "expression",
  [sym_boolean] = "boolean",
  [sym_parameter] = "parameter",
  [sym_parameter_list] = "parameter_list",
  [sym_block] = "block",
  [sym_function_definition] = "function_definition",
  [aux_sym_source_file_repeat1] = "source_file_repeat1",
  [aux_sym_parameter_list_repeat1] = "parameter_list_repeat1",
};

static const TSSymbol ts_symbol_map[] = {
  [ts_builtin_sym_end] = ts_builtin_sym_end,
  [sym_integer] = sym_integer,
  [sym_float] = sym_float,
  [sym_string] = sym_string,
  [anon_sym_true] = anon_sym_true,
  [anon_sym_false] = anon_sym_false,
  [sym_character] = sym_character,
  [sym_identifier] = sym_identifier,
  [anon_sym_COLON] = anon_sym_COLON,
  [anon_sym_LPAREN] = anon_sym_LPAREN,
  [anon_sym_COMMA] = anon_sym_COMMA,
  [anon_sym_RPAREN] = anon_sym_RPAREN,
  [anon_sym_LBRACE] = anon_sym_LBRACE,
  [anon_sym_RBRACE] = anon_sym_RBRACE,
  [anon_sym_fn] = anon_sym_fn,
  [anon_sym_DASH_GT] = anon_sym_DASH_GT,
  [sym_source_file] = sym_source_file,
  [sym_expression] = sym_expression,
  [sym_boolean] = sym_boolean,
  [sym_parameter] = sym_parameter,
  [sym_parameter_list] = sym_parameter_list,
  [sym_block] = sym_block,
  [sym_function_definition] = sym_function_definition,
  [aux_sym_source_file_repeat1] = aux_sym_source_file_repeat1,
  [aux_sym_parameter_list_repeat1] = aux_sym_parameter_list_repeat1,
};

static const TSSymbolMetadata ts_symbol_metadata[] = {
  [ts_builtin_sym_end] = {
    .visible = false,
    .named = true,
  },
  [sym_integer] = {
    .visible = true,
    .named = true,
  },
  [sym_float] = {
    .visible = true,
    .named = true,
  },
  [sym_string] = {
    .visible = true,
    .named = true,
  },
  [anon_sym_true] = {
    .visible = true,
    .named = false,
  },
  [anon_sym_false] = {
    .visible = true,
    .named = false,
  },
  [sym_character] = {
    .visible = true,
    .named = true,
  },
  [sym_identifier] = {
    .visible = true,
    .named = true,
  },
  [anon_sym_COLON] = {
    .visible = true,
    .named = false,
  },
  [anon_sym_LPAREN] = {
    .visible = true,
    .named = false,
  },
  [anon_sym_COMMA] = {
    .visible = true,
    .named = false,
  },
  [anon_sym_RPAREN] = {
    .visible = true,
    .named = false,
  },
  [anon_sym_LBRACE] = {
    .visible = true,
    .named = false,
  },
  [anon_sym_RBRACE] = {
    .visible = true,
    .named = false,
  },
  [anon_sym_fn] = {
    .visible = true,
    .named = false,
  },
  [anon_sym_DASH_GT] = {
    .visible = true,
    .named = false,
  },
  [sym_source_file] = {
    .visible = true,
    .named = true,
  },
  [sym_expression] = {
    .visible = true,
    .named = true,
  },
  [sym_boolean] = {
    .visible = true,
    .named = true,
  },
  [sym_parameter] = {
    .visible = true,
    .named = true,
  },
  [sym_parameter_list] = {
    .visible = true,
    .named = true,
  },
  [sym_block] = {
    .visible = true,
    .named = true,
  },
  [sym_function_definition] = {
    .visible = true,
    .named = true,
  },
  [aux_sym_source_file_repeat1] = {
    .visible = false,
    .named = false,
  },
  [aux_sym_parameter_list_repeat1] = {
    .visible = false,
    .named = false,
  },
};

static const TSSymbol ts_alias_sequences[PRODUCTION_ID_COUNT][MAX_ALIAS_SEQUENCE_LENGTH] = {
  [0] = {0},
};

static const uint16_t ts_non_terminal_alias_map[] = {
  0,
};

static const TSStateId ts_primary_state_ids[STATE_COUNT] = {
  [0] = 0,
  [1] = 1,
  [2] = 2,
  [3] = 3,
  [4] = 4,
  [5] = 5,
  [6] = 6,
  [7] = 7,
  [8] = 8,
  [9] = 9,
  [10] = 10,
  [11] = 11,
  [12] = 12,
  [13] = 13,
  [14] = 14,
  [15] = 15,
  [16] = 16,
  [17] = 17,
  [18] = 18,
  [19] = 19,
  [20] = 20,
  [21] = 21,
  [22] = 22,
  [23] = 23,
  [24] = 24,
  [25] = 25,
  [26] = 26,
  [27] = 27,
  [28] = 28,
};

static bool ts_lex(TSLexer *lexer, TSStateId state) {
  START_LEXER();
  eof = lexer->eof(lexer);
  switch (state) {
    case 0:
      if (eof) ADVANCE(7);
      ADVANCE_MAP(
        '"', 1,
        '\'', 6,
        '(', 23,
        ')', 25,
        ',', 24,
        '-', 4,
        ':', 22,
        'f', 14,
        't', 18,
        '{', 26,
        '}', 27,
      );
      if (('\t' <= lookahead && lookahead <= '\r') ||
          lookahead == ' ') SKIP(0);
      if (('0' <= lookahead && lookahead <= '9')) ADVANCE(8);
      if (('A' <= lookahead && lookahead <= 'Z') ||
          lookahead == '_' ||
          ('a' <= lookahead && lookahead <= 'z')) ADVANCE(21);
      END_STATE();
    case 1:
      if (lookahead == '"') ADVANCE(10);
      if (lookahead != 0) ADVANCE(1);
      END_STATE();
    case 2:
      if (lookahead == '\'') ADVANCE(13);
      END_STATE();
    case 3:
      if (lookahead == ')') ADVANCE(25);
      if (('\t' <= lookahead && lookahead <= '\r') ||
          lookahead == ' ') SKIP(3);
      if (('A' <= lookahead && lookahead <= 'Z') ||
          lookahead == '_' ||
          ('a' <= lookahead && lookahead <= 'z')) ADVANCE(21);
      END_STATE();
    case 4:
      if (lookahead == '>') ADVANCE(29);
      END_STATE();
    case 5:
      if (('0' <= lookahead && lookahead <= '9')) ADVANCE(9);
      END_STATE();
    case 6:
      if (lookahead != 0 &&
          lookahead != '\'') ADVANCE(2);
      END_STATE();
    case 7:
      ACCEPT_TOKEN(ts_builtin_sym_end);
      END_STATE();
    case 8:
      ACCEPT_TOKEN(sym_integer);
      if (lookahead == '.') ADVANCE(5);
      if (('0' <= lookahead && lookahead <= '9')) ADVANCE(8);
      END_STATE();
    case 9:
      ACCEPT_TOKEN(sym_float);
      if (('0' <= lookahead && lookahead <= '9')) ADVANCE(9);
      END_STATE();
    case 10:
      ACCEPT_TOKEN(sym_string);
      END_STATE();
    case 11:
      ACCEPT_TOKEN(anon_sym_true);
      if (('0' <= lookahead && lookahead <= '9') ||
          ('A' <= lookahead && lookahead <= 'Z') ||
          lookahead == '_' ||
          ('a' <= lookahead && lookahead <= 'z')) ADVANCE(21);
      END_STATE();
    case 12:
      ACCEPT_TOKEN(anon_sym_false);
      if (('0' <= lookahead && lookahead <= '9') ||
          ('A' <= lookahead && lookahead <= 'Z') ||
          lookahead == '_' ||
          ('a' <= lookahead && lookahead <= 'z')) ADVANCE(21);
      END_STATE();
    case 13:
      ACCEPT_TOKEN(sym_character);
      END_STATE();
    case 14:
      ACCEPT_TOKEN(sym_identifier);
      if (lookahead == 'a') ADVANCE(17);
      if (lookahead == 'n') ADVANCE(28);
      if (('0' <= lookahead && lookahead <= '9') ||
          ('A' <= lookahead && lookahead <= 'Z') ||
          lookahead == '_' ||
          ('b' <= lookahead && lookahead <= 'z')) ADVANCE(21);
      END_STATE();
    case 15:
      ACCEPT_TOKEN(sym_identifier);
      if (lookahead == 'e') ADVANCE(11);
      if (('0' <= lookahead && lookahead <= '9') ||
          ('A' <= lookahead && lookahead <= 'Z') ||
          lookahead == '_' ||
          ('a' <= lookahead && lookahead <= 'z')) ADVANCE(21);
      END_STATE();
    case 16:
      ACCEPT_TOKEN(sym_identifier);
      if (lookahead == 'e') ADVANCE(12);
      if (('0' <= lookahead && lookahead <= '9') ||
          ('A' <= lookahead && lookahead <= 'Z') ||
          lookahead == '_' ||
          ('a' <= lookahead && lookahead <= 'z')) ADVANCE(21);
      END_STATE();
    case 17:
      ACCEPT_TOKEN(sym_identifier);
      if (lookahead == 'l') ADVANCE(19);
      if (('0' <= lookahead && lookahead <= '9') ||
          ('A' <= lookahead && lookahead <= 'Z') ||
          lookahead == '_' ||
          ('a' <= lookahead && lookahead <= 'z')) ADVANCE(21);
      END_STATE();
    case 18:
      ACCEPT_TOKEN(sym_identifier);
      if (lookahead == 'r') ADVANCE(20);
      if (('0' <= lookahead && lookahead <= '9') ||
          ('A' <= lookahead && lookahead <= 'Z') ||
          lookahead == '_' ||
          ('a' <= lookahead && lookahead <= 'z')) ADVANCE(21);
      END_STATE();
    case 19:
      ACCEPT_TOKEN(sym_identifier);
      if (lookahead == 's') ADVANCE(16);
      if (('0' <= lookahead && lookahead <= '9') ||
          ('A' <= lookahead && lookahead <= 'Z') ||
          lookahead == '_' ||
          ('a' <= lookahead && lookahead <= 'z')) ADVANCE(21);
      END_STATE();
    case 20:
      ACCEPT_TOKEN(sym_identifier);
      if (lookahead == 'u') ADVANCE(15);
      if (('0' <= lookahead && lookahead <= '9') ||
          ('A' <= lookahead && lookahead <= 'Z') ||
          lookahead == '_' ||
          ('a' <= lookahead && lookahead <= 'z')) ADVANCE(21);
      END_STATE();
    case 21:
      ACCEPT_TOKEN(sym_identifier);
      if (('0' <= lookahead && lookahead <= '9') ||
          ('A' <= lookahead && lookahead <= 'Z') ||
          lookahead == '_' ||
          ('a' <= lookahead && lookahead <= 'z')) ADVANCE(21);
      END_STATE();
    case 22:
      ACCEPT_TOKEN(anon_sym_COLON);
      END_STATE();
    case 23:
      ACCEPT_TOKEN(anon_sym_LPAREN);
      END_STATE();
    case 24:
      ACCEPT_TOKEN(anon_sym_COMMA);
      END_STATE();
    case 25:
      ACCEPT_TOKEN(anon_sym_RPAREN);
      END_STATE();
    case 26:
      ACCEPT_TOKEN(anon_sym_LBRACE);
      END_STATE();
    case 27:
      ACCEPT_TOKEN(anon_sym_RBRACE);
      END_STATE();
    case 28:
      ACCEPT_TOKEN(anon_sym_fn);
      if (('0' <= lookahead && lookahead <= '9') ||
          ('A' <= lookahead && lookahead <= 'Z') ||
          lookahead == '_' ||
          ('a' <= lookahead && lookahead <= 'z')) ADVANCE(21);
      END_STATE();
    case 29:
      ACCEPT_TOKEN(anon_sym_DASH_GT);
      END_STATE();
    default:
      return false;
  }
}

static const TSLexMode ts_lex_modes[STATE_COUNT] = {
  [0] = {.lex_state = 0},
  [1] = {.lex_state = 0},
  [2] = {.lex_state = 0},
  [3] = {.lex_state = 0},
  [4] = {.lex_state = 0},
  [5] = {.lex_state = 0},
  [6] = {.lex_state = 0},
  [7] = {.lex_state = 0},
  [8] = {.lex_state = 0},
  [9] = {.lex_state = 0},
  [10] = {.lex_state = 0},
  [11] = {.lex_state = 0},
  [12] = {.lex_state = 3},
  [13] = {.lex_state = 0},
  [14] = {.lex_state = 0},
  [15] = {.lex_state = 0},
  [16] = {.lex_state = 0},
  [17] = {.lex_state = 0},
  [18] = {.lex_state = 0},
  [19] = {.lex_state = 3},
  [20] = {.lex_state = 0},
  [21] = {.lex_state = 0},
  [22] = {.lex_state = 3},
  [23] = {.lex_state = 3},
  [24] = {.lex_state = 3},
  [25] = {.lex_state = 0},
  [26] = {.lex_state = 0},
  [27] = {.lex_state = 0},
  [28] = {.lex_state = 0},
};

static const uint16_t ts_parse_table[LARGE_STATE_COUNT][SYMBOL_COUNT] = {
  [0] = {
    [ts_builtin_sym_end] = ACTIONS(1),
    [sym_integer] = ACTIONS(1),
    [sym_float] = ACTIONS(1),
    [sym_string] = ACTIONS(1),
    [anon_sym_true] = ACTIONS(1),
    [anon_sym_false] = ACTIONS(1),
    [sym_character] = ACTIONS(1),
    [sym_identifier] = ACTIONS(1),
    [anon_sym_COLON] = ACTIONS(1),
    [anon_sym_LPAREN] = ACTIONS(1),
    [anon_sym_COMMA] = ACTIONS(1),
    [anon_sym_RPAREN] = ACTIONS(1),
    [anon_sym_LBRACE] = ACTIONS(1),
    [anon_sym_RBRACE] = ACTIONS(1),
    [anon_sym_fn] = ACTIONS(1),
    [anon_sym_DASH_GT] = ACTIONS(1),
  },
  [1] = {
    [sym_source_file] = STATE(28),
    [sym_expression] = STATE(4),
    [sym_boolean] = STATE(6),
    [sym_block] = STATE(6),
    [sym_function_definition] = STATE(6),
    [aux_sym_source_file_repeat1] = STATE(4),
    [ts_builtin_sym_end] = ACTIONS(3),
    [sym_integer] = ACTIONS(5),
    [sym_float] = ACTIONS(7),
    [sym_string] = ACTIONS(7),
    [anon_sym_true] = ACTIONS(9),
    [anon_sym_false] = ACTIONS(9),
    [sym_character] = ACTIONS(7),
    [sym_identifier] = ACTIONS(5),
    [anon_sym_LBRACE] = ACTIONS(11),
    [anon_sym_fn] = ACTIONS(13),
  },
  [2] = {
    [sym_expression] = STATE(2),
    [sym_boolean] = STATE(6),
    [sym_block] = STATE(6),
    [sym_function_definition] = STATE(6),
    [aux_sym_source_file_repeat1] = STATE(2),
    [ts_builtin_sym_end] = ACTIONS(15),
    [sym_integer] = ACTIONS(17),
    [sym_float] = ACTIONS(20),
    [sym_string] = ACTIONS(20),
    [anon_sym_true] = ACTIONS(23),
    [anon_sym_false] = ACTIONS(23),
    [sym_character] = ACTIONS(20),
    [sym_identifier] = ACTIONS(17),
    [anon_sym_LBRACE] = ACTIONS(26),
    [anon_sym_RBRACE] = ACTIONS(15),
    [anon_sym_fn] = ACTIONS(29),
  },
  [3] = {
    [sym_expression] = STATE(5),
    [sym_boolean] = STATE(6),
    [sym_block] = STATE(6),
    [sym_function_definition] = STATE(6),
    [aux_sym_source_file_repeat1] = STATE(5),
    [sym_integer] = ACTIONS(5),
    [sym_float] = ACTIONS(7),
    [sym_string] = ACTIONS(7),
    [anon_sym_true] = ACTIONS(9),
    [anon_sym_false] = ACTIONS(9),
    [sym_character] = ACTIONS(7),
    [sym_identifier] = ACTIONS(5),
    [anon_sym_LBRACE] = ACTIONS(11),
    [anon_sym_RBRACE] = ACTIONS(32),
    [anon_sym_fn] = ACTIONS(13),
  },
  [4] = {
    [sym_expression] = STATE(2),
    [sym_boolean] = STATE(6),
    [sym_block] = STATE(6),
    [sym_function_definition] = STATE(6),
    [aux_sym_source_file_repeat1] = STATE(2),
    [ts_builtin_sym_end] = ACTIONS(34),
    [sym_integer] = ACTIONS(5),
    [sym_float] = ACTIONS(7),
    [sym_string] = ACTIONS(7),
    [anon_sym_true] = ACTIONS(9),
    [anon_sym_false] = ACTIONS(9),
    [sym_character] = ACTIONS(7),
    [sym_identifier] = ACTIONS(5),
    [anon_sym_LBRACE] = ACTIONS(11),
    [anon_sym_fn] = ACTIONS(13),
  },
  [5] = {
    [sym_expression] = STATE(2),
    [sym_boolean] = STATE(6),
    [sym_block] = STATE(6),
    [sym_function_definition] = STATE(6),
    [aux_sym_source_file_repeat1] = STATE(2),
    [sym_integer] = ACTIONS(5),
    [sym_float] = ACTIONS(7),
    [sym_string] = ACTIONS(7),
    [anon_sym_true] = ACTIONS(9),
    [anon_sym_false] = ACTIONS(9),
    [sym_character] = ACTIONS(7),
    [sym_identifier] = ACTIONS(5),
    [anon_sym_LBRACE] = ACTIONS(11),
    [anon_sym_RBRACE] = ACTIONS(36),
    [anon_sym_fn] = ACTIONS(13),
  },
};

static const uint16_t ts_small_parse_table[] = {
  [0] = 2,
    ACTIONS(40), 5,
      sym_integer,
      anon_sym_true,
      anon_sym_false,
      sym_identifier,
      anon_sym_fn,
    ACTIONS(38), 6,
      ts_builtin_sym_end,
      sym_float,
      sym_string,
      sym_character,
      anon_sym_LBRACE,
      anon_sym_RBRACE,
  [16] = 2,
    ACTIONS(44), 5,
      sym_integer,
      anon_sym_true,
      anon_sym_false,
      sym_identifier,
      anon_sym_fn,
    ACTIONS(42), 6,
      ts_builtin_sym_end,
      sym_float,
      sym_string,
      sym_character,
      anon_sym_LBRACE,
      anon_sym_RBRACE,
  [32] = 2,
    ACTIONS(48), 5,
      sym_integer,
      anon_sym_true,
      anon_sym_false,
      sym_identifier,
      anon_sym_fn,
    ACTIONS(46), 6,
      ts_builtin_sym_end,
      sym_float,
      sym_string,
      sym_character,
      anon_sym_LBRACE,
      anon_sym_RBRACE,
  [48] = 2,
    ACTIONS(52), 5,
      sym_integer,
      anon_sym_true,
      anon_sym_false,
      sym_identifier,
      anon_sym_fn,
    ACTIONS(50), 6,
      ts_builtin_sym_end,
      sym_float,
      sym_string,
      sym_character,
      anon_sym_LBRACE,
      anon_sym_RBRACE,
  [64] = 2,
    ACTIONS(56), 5,
      sym_integer,
      anon_sym_true,
      anon_sym_false,
      sym_identifier,
      anon_sym_fn,
    ACTIONS(54), 6,
      ts_builtin_sym_end,
      sym_float,
      sym_string,
      sym_character,
      anon_sym_LBRACE,
      anon_sym_RBRACE,
  [80] = 3,
    ACTIONS(58), 1,
      anon_sym_COMMA,
    ACTIONS(61), 1,
      anon_sym_RPAREN,
    STATE(11), 1,
      aux_sym_parameter_list_repeat1,
  [90] = 3,
    ACTIONS(63), 1,
      sym_identifier,
    ACTIONS(65), 1,
      anon_sym_RPAREN,
    STATE(13), 1,
      sym_parameter,
  [100] = 3,
    ACTIONS(67), 1,
      anon_sym_COMMA,
    ACTIONS(69), 1,
      anon_sym_RPAREN,
    STATE(14), 1,
      aux_sym_parameter_list_repeat1,
  [110] = 3,
    ACTIONS(67), 1,
      anon_sym_COMMA,
    ACTIONS(71), 1,
      anon_sym_RPAREN,
    STATE(11), 1,
      aux_sym_parameter_list_repeat1,
  [120] = 2,
    ACTIONS(11), 1,
      anon_sym_LBRACE,
    STATE(8), 1,
      sym_block,
  [127] = 2,
    ACTIONS(73), 1,
      anon_sym_LPAREN,
    STATE(20), 1,
      sym_parameter_list,
  [134] = 1,
    ACTIONS(61), 2,
      anon_sym_COMMA,
      anon_sym_RPAREN,
  [139] = 1,
    ACTIONS(75), 2,
      anon_sym_COMMA,
      anon_sym_RPAREN,
  [144] = 2,
    ACTIONS(63), 1,
      sym_identifier,
    STATE(17), 1,
      sym_parameter,
  [151] = 1,
    ACTIONS(77), 1,
      anon_sym_DASH_GT,
  [155] = 1,
    ACTIONS(79), 1,
      anon_sym_DASH_GT,
  [159] = 1,
    ACTIONS(81), 1,
      sym_identifier,
  [163] = 1,
    ACTIONS(83), 1,
      sym_identifier,
  [167] = 1,
    ACTIONS(85), 1,
      sym_identifier,
  [171] = 1,
    ACTIONS(87), 1,
      anon_sym_DASH_GT,
  [175] = 1,
    ACTIONS(89), 1,
      anon_sym_DASH_GT,
  [179] = 1,
    ACTIONS(91), 1,
      anon_sym_COLON,
  [183] = 1,
    ACTIONS(93), 1,
      ts_builtin_sym_end,
};

static const uint32_t ts_small_parse_table_map[] = {
  [SMALL_STATE(6)] = 0,
  [SMALL_STATE(7)] = 16,
  [SMALL_STATE(8)] = 32,
  [SMALL_STATE(9)] = 48,
  [SMALL_STATE(10)] = 64,
  [SMALL_STATE(11)] = 80,
  [SMALL_STATE(12)] = 90,
  [SMALL_STATE(13)] = 100,
  [SMALL_STATE(14)] = 110,
  [SMALL_STATE(15)] = 120,
  [SMALL_STATE(16)] = 127,
  [SMALL_STATE(17)] = 134,
  [SMALL_STATE(18)] = 139,
  [SMALL_STATE(19)] = 144,
  [SMALL_STATE(20)] = 151,
  [SMALL_STATE(21)] = 155,
  [SMALL_STATE(22)] = 159,
  [SMALL_STATE(23)] = 163,
  [SMALL_STATE(24)] = 167,
  [SMALL_STATE(25)] = 171,
  [SMALL_STATE(26)] = 175,
  [SMALL_STATE(27)] = 179,
  [SMALL_STATE(28)] = 183,
};

static const TSParseActionEntry ts_parse_actions[] = {
  [0] = {.entry = {.count = 0, .reusable = false}},
  [1] = {.entry = {.count = 1, .reusable = false}}, RECOVER(),
  [3] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_source_file, 0, 0, 0),
  [5] = {.entry = {.count = 1, .reusable = false}}, SHIFT(6),
  [7] = {.entry = {.count = 1, .reusable = true}}, SHIFT(6),
  [9] = {.entry = {.count = 1, .reusable = false}}, SHIFT(7),
  [11] = {.entry = {.count = 1, .reusable = true}}, SHIFT(3),
  [13] = {.entry = {.count = 1, .reusable = false}}, SHIFT(24),
  [15] = {.entry = {.count = 1, .reusable = true}}, REDUCE(aux_sym_source_file_repeat1, 2, 0, 0),
  [17] = {.entry = {.count = 2, .reusable = false}}, REDUCE(aux_sym_source_file_repeat1, 2, 0, 0), SHIFT_REPEAT(6),
  [20] = {.entry = {.count = 2, .reusable = true}}, REDUCE(aux_sym_source_file_repeat1, 2, 0, 0), SHIFT_REPEAT(6),
  [23] = {.entry = {.count = 2, .reusable = false}}, REDUCE(aux_sym_source_file_repeat1, 2, 0, 0), SHIFT_REPEAT(7),
  [26] = {.entry = {.count = 2, .reusable = true}}, REDUCE(aux_sym_source_file_repeat1, 2, 0, 0), SHIFT_REPEAT(3),
  [29] = {.entry = {.count = 2, .reusable = false}}, REDUCE(aux_sym_source_file_repeat1, 2, 0, 0), SHIFT_REPEAT(24),
  [32] = {.entry = {.count = 1, .reusable = true}}, SHIFT(9),
  [34] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_source_file, 1, 0, 0),
  [36] = {.entry = {.count = 1, .reusable = true}}, SHIFT(10),
  [38] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_expression, 1, 0, 0),
  [40] = {.entry = {.count = 1, .reusable = false}}, REDUCE(sym_expression, 1, 0, 0),
  [42] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_boolean, 1, 0, 0),
  [44] = {.entry = {.count = 1, .reusable = false}}, REDUCE(sym_boolean, 1, 0, 0),
  [46] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_function_definition, 6, 0, 0),
  [48] = {.entry = {.count = 1, .reusable = false}}, REDUCE(sym_function_definition, 6, 0, 0),
  [50] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_block, 2, 0, 0),
  [52] = {.entry = {.count = 1, .reusable = false}}, REDUCE(sym_block, 2, 0, 0),
  [54] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_block, 3, 0, 0),
  [56] = {.entry = {.count = 1, .reusable = false}}, REDUCE(sym_block, 3, 0, 0),
  [58] = {.entry = {.count = 2, .reusable = true}}, REDUCE(aux_sym_parameter_list_repeat1, 2, 0, 0), SHIFT_REPEAT(19),
  [61] = {.entry = {.count = 1, .reusable = true}}, REDUCE(aux_sym_parameter_list_repeat1, 2, 0, 0),
  [63] = {.entry = {.count = 1, .reusable = true}}, SHIFT(27),
  [65] = {.entry = {.count = 1, .reusable = true}}, SHIFT(25),
  [67] = {.entry = {.count = 1, .reusable = true}}, SHIFT(19),
  [69] = {.entry = {.count = 1, .reusable = true}}, SHIFT(21),
  [71] = {.entry = {.count = 1, .reusable = true}}, SHIFT(26),
  [73] = {.entry = {.count = 1, .reusable = true}}, SHIFT(12),
  [75] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_parameter, 3, 0, 0),
  [77] = {.entry = {.count = 1, .reusable = true}}, SHIFT(23),
  [79] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_parameter_list, 3, 0, 0),
  [81] = {.entry = {.count = 1, .reusable = true}}, SHIFT(18),
  [83] = {.entry = {.count = 1, .reusable = true}}, SHIFT(15),
  [85] = {.entry = {.count = 1, .reusable = true}}, SHIFT(16),
  [87] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_parameter_list, 2, 0, 0),
  [89] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_parameter_list, 4, 0, 0),
  [91] = {.entry = {.count = 1, .reusable = true}}, SHIFT(22),
  [93] = {.entry = {.count = 1, .reusable = true}},  ACCEPT_INPUT(),
};

#ifdef __cplusplus
extern "C" {
#endif
#ifdef TREE_SITTER_HIDE_SYMBOLS
#define TS_PUBLIC
#elif defined(_WIN32)
#define TS_PUBLIC __declspec(dllexport)
#else
#define TS_PUBLIC __attribute__((visibility("default")))
#endif

TS_PUBLIC const TSLanguage *tree_sitter_smith(void) {
  static const TSLanguage language = {
    .version = LANGUAGE_VERSION,
    .symbol_count = SYMBOL_COUNT,
    .alias_count = ALIAS_COUNT,
    .token_count = TOKEN_COUNT,
    .external_token_count = EXTERNAL_TOKEN_COUNT,
    .state_count = STATE_COUNT,
    .large_state_count = LARGE_STATE_COUNT,
    .production_id_count = PRODUCTION_ID_COUNT,
    .field_count = FIELD_COUNT,
    .max_alias_sequence_length = MAX_ALIAS_SEQUENCE_LENGTH,
    .parse_table = &ts_parse_table[0][0],
    .small_parse_table = ts_small_parse_table,
    .small_parse_table_map = ts_small_parse_table_map,
    .parse_actions = ts_parse_actions,
    .symbol_names = ts_symbol_names,
    .symbol_metadata = ts_symbol_metadata,
    .public_symbol_map = ts_symbol_map,
    .alias_map = ts_non_terminal_alias_map,
    .alias_sequences = &ts_alias_sequences[0][0],
    .lex_modes = ts_lex_modes,
    .lex_fn = ts_lex,
    .primary_state_ids = ts_primary_state_ids,
  };
  return &language;
}
#ifdef __cplusplus
}
#endif
