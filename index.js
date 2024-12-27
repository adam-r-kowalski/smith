/**
 * @typedef {number} Row
 * @typedef {number} Col
 * @typedef {[Row, Col]} Pos
 * @typedef {[Pos, Pos]} Span
 * @typedef {{ kind: "invalid", value: string, span: Span }} InvalidToken
 * @typedef {{ kind: "symbol", value: string, span: Span }} SymbolToken
 * @typedef {{ kind: "int", value: string, span: Span }} IntToken
 * @typedef {{ kind: "float", value: string, span: Span }} FloatToken
 * @typedef {"(" | ")" | "[" | "]" | "," | ":"} Delimiter
 * @typedef {{ kind: "delimiter", value: Delimiter, span: Span }} DelimiterToken
 * @typedef {"+" | "-" | "*" | "/" | "=" | "."} Operator
 * @typedef {{ kind: "operator", value: Operator, span: Span }} OperatorToken
 * @typedef {"space"} Indent
 * @typedef {{ kind: "indent", value: Indent, count: number, span: Span }} IndentToken
 * @typedef {
     InvalidToken
   | SymbolToken
   | IntToken
   | FloatToken
   | DelimiterToken
   | OperatorToken
   | IndentToken
 * } Token
 * @typedef {Token[]} Tokens
 * @typedef {{ code: string, pos: Pos }} Cursor
 */

/**
 * @param {string} code
 * @return {Tokens}
 */
function tokenize(code) {
  /** @type {Tokens} */
  let tokens = [];
  /** @type {Cursor} */
  let cursor = { code, pos: [0, 0] };
  while (true) {
    cursor = trimCursor(cursor);
    const [token, nextCursor] = nextToken(cursor);
    if (!token) break;
    cursor = nextCursor;
    tokens.push(token);
  }
  return tokens;
}

/**
 * @param {string} c
 * @return bool
 */
function isSymbolHead(c) {
  return (c >= "a" && c <= "z") || (c >= "A" && c <= "Z") || c === "_";
}

/**
 * @param {string} c
 * @return bool
 */
function isDelimiter(c) {
  return (
    c === "(" || c === ")" || c === "[" || c === "]" || c === "," || c === ":"
  );
}

/**
 * @param {string} c
 * @return bool
 */
function isOperator(c) {
  return (
    c === "+" || c === "-" || c === "*" || c === "/" || c === "=" || c === "."
  );
}

/**
 * @param {string} c
 * @return bool
 */
function isNumeric(c) {
  return c >= "0" && c <= "9";
}

/**
 * @param {string} c
 * @return bool
 */
function isSymbolTail(c) {
  return isSymbolHead(c) || isNumeric(c);
}

/**
 * @param {Cursor} cursor
 * @return {[Token | null, Cursor]}
 */
function nextToken(cursor) {
  if (cursor.code.length === 0) return [null, cursor];
  const c = cursor.code[0];
  if (isSymbolHead(c)) return tokenizeSymbol(cursor);
  if (isNumeric(c) || c == ".") return tokenizeNumber(cursor);
  if (isDelimiter(c)) return tokenizeDelimiter(c, cursor);
  if (isOperator(c)) return tokenizeOperator(c, cursor);
  if (c === "\n") return tokenizeNewline(cursor);
  return tokenizeInvalid(cursor);
}

/**
 * @param {Cursor} cursor
 * @param {(c: string) => boolean} predicate
 * @return {[string, Span, Cursor]}
 */
function takeWhile(cursor, predicate) {
  const begin = cursor.pos;
  let i = 0;
  const code = cursor.code;
  while (code.length > i && predicate(code[i])) {
    i += 1;
  }
  const nextCursor = advanceCursor(cursor, i);
  const end = nextCursor.pos;
  /** @type Span */
  const span = [begin, end];
  return [code.slice(0, i), span, nextCursor];
}

/**
 * @template State
 * @param {Cursor} cursor
 * @param {State} state
 * @param {(c: string, state: State) => [boolean, state]} predicate
 * @return {[string, Span, Cursor, State]}
 */
function takeWhileStatefull(cursor, state, predicate) {
  const begin = cursor.pos;
  let i = 0;
  const code = cursor.code;
  while (code.length > i) {
    const [passed, nextState] = predicate(code[i], state);
    if (!passed) break;
    state = nextState;
    i += 1;
  }
  const nextCursor = advanceCursor(cursor, i);
  const end = nextCursor.pos;
  /** @type Span */
  const span = [begin, end];
  return [code.slice(0, i), span, nextCursor, state];
}

/**
 * @param {Cursor} cursor
 * @return {[Token, Cursor]}
 */
function tokenizeSymbol(cursor) {
  const [value, span, nextCursor] = takeWhile(cursor, isSymbolTail);
  /** @type Token */
  const token = { kind: "symbol", value, span };
  return [token, nextCursor];
}

/**
 * @param {Delimiter} value
 * @param {Cursor} cursor
 * @return {[Token, Cursor]}
 */
function tokenizeDelimiter(value, cursor) {
  const begin = cursor.pos;
  const nextCursor = advanceCursor(cursor, 1);
  const end = nextCursor.pos;
  /** @type Span */
  const span = [begin, end];
  /** @type Token */
  const token = { kind: "delimiter", value, span };
  return [token, nextCursor];
}

/**
 * @param {Operator} value
 * @param {Cursor} cursor
 * @return {[Token, Cursor]}
 */
function tokenizeOperator(value, cursor) {
  const begin = cursor.pos;
  const nextCursor = advanceCursor(cursor, 1);
  const end = nextCursor.pos;
  /** @type Span */
  const span = [begin, end];
  /** @type Token */
  const token = { kind: "operator", value, span };
  return [token, nextCursor];
}

/**
 * @param {Cursor} cursor
 * @return {[Token, Cursor]}
 */
function tokenizeInvalid(cursor) {
  const begin = cursor.pos;
  const nextCursor = advanceCursor(cursor, 1);
  const end = nextCursor.pos;
  /** @type Span */
  const span = [begin, end];
  /** @type Token */
  const token = { kind: "invalid", value: cursor.code[0], span };
  return [token, nextCursor];
}

/**
 * @param {Cursor} cursor
 * @return {string}
 */
function peek(cursor) {
  if (cursor.code.length === 0) return "";
  return cursor.code[0];
}

/**
 * @param {Cursor} cursor
 * @return {[Token, Cursor]}
 */
function tokenizeNumber(cursor) {
  /** @type (c: string, seen: boolean) => [boolean, boolean] */
  const p = (c, seen) => {
    if (c === ".") return [!seen, true];
    return [isNumeric(c), seen];
  };
  const [value, span, nextCursor, seen] = takeWhileStatefull(cursor, false, p);
  if (seen) {
    if (value.length === 1) {
      return [{ kind: "operator", value: ".", span }, nextCursor];
    }
    if (value[value.length - 1] === "." && isSymbolHead(peek(nextCursor))) {
      const nextValue = value.slice(0, value.length - 1);
      const begin = cursor.pos;
      const nextCursor2 = advanceCursor(cursor, nextValue.length);
      const end = nextCursor2.pos;
      return [
        { kind: "int", value: nextValue, span: [begin, end] },
        nextCursor2,
      ];
    }
    return [{ kind: "float", value, span }, nextCursor];
  }
  return [{ kind: "int", value, span }, nextCursor];
}

/**
 * @param {Cursor} cursor
 * @return {[Token, Cursor]}
 */
function tokenizeNewline(cursor) {
  const [newlines, _2, cursor2] = takeWhile(cursor, (c) => c === "\n");
  cursor2.pos = [cursor.pos[0] + newlines.length, 0];
  const [spaces, span, cursor3] = takeWhile(cursor2, (c) => c === " ");
  /** @type Token */
  const token = { kind: "indent", value: "space", count: spaces.length, span };
  return [token, cursor3];
}

/**
 * @param {Cursor} cursor
 * @param {number} byCols
 * @return {Cursor}
 */
function advanceCursor(cursor, byCols) {
  return {
    code: cursor.code.slice(byCols),
    pos: [cursor.pos[0], cursor.pos[1] + byCols],
  };
}

/**
 * @param {Cursor} cursor
 * @return {Cursor}
 */
function trimCursor(cursor) {
  const [_1, _2, nextCursor] = takeWhile(cursor, (c) => c === " ");
  return nextCursor;
}

/**
 * @typedef {{name: string, code: string, expected: Tokens}} UnitTest
 * @typedef {UnitTest[]} UnitTests
 **/

const parser = new DOMParser();

/**
 * @param {TemplateStringsArray} raw
 * @param {any} substitutions
 * @return string
 */
function html(raw, ...substitutions) {
  return String.raw({ raw }, ...substitutions);
}

/**
 * @param {any} lhs
 * @param {any} rhs
 * @return {boolean}
 */
function eql(lhs, rhs) {
  return JSON.stringify(lhs) === JSON.stringify(rhs);
}

/**
 * @param {Token} token
 * @return {string}
 */
function viewTokenValue(token) {
  if (token.kind !== "indent") return token.value;
  return `${token.count} ${token.value}${token.count > 1 ? "s" : ""}`;
}

/**
 * @param {number} index
 * @param {Token} actual
 * @param {Token | undefined} expected
 * @return {string}
 */
function viewToken(index, actual, expected) {
  if (eql(actual, expected)) {
    return html`
      <tr>
        <td>${index}</td>
        <td>${actual.kind}</td>
        <td>${viewTokenValue(actual)}</td>
        <td>${actual.span[0]}</td>
        <td>${actual.span[1]}</td>
      </li>
    `;
  } else {
    const f = "failing-section";
    if (!expected) {
      return html`
        <tr class="${f}">
          <td>${index}</td>
          <td>${actual.kind}</td>
          <td>${viewTokenValue(actual)}</td>
          <td>${actual.span[0]}</td>
          <td>${actual.span[1]}</td>
        </li>
      `;
    }
    const kind_class = eql(actual.kind, expected.kind) ? "" : f;
    const value_class = eql(actual.value, expected.value) ? "" : f;
    const span_0_class = eql(actual.span[0], expected.span[0]) ? "" : f;
    const span_1_class = eql(actual.span[1], expected.span[1]) ? "" : f;
    return html`
      <tr>
        <td>${index}</td>
        <td>${actual.kind}</td>
        <td>${viewTokenValue(actual)}</td>
        <td>${actual.span[0]}</td>
        <td>${actual.span[1]}</td>
      </tr>
      <tr>
        <td>${index}</td>
        <td class="${kind_class}">${expected.kind}</td>
        <td class="${value_class}">${viewTokenValue(expected)}</td>
        <td class="${span_0_class}">${expected.span[0]}</td>
        <td class="${span_1_class}">${expected.span[1]}</td>
      </tr>
    `;
  }
}

/**
 * @param {UnitTest} unitTest
 * @return {string}
 */
function viewUnitTest(unitTest) {
  const actual = tokenize(unitTest.code);
  const passing = eql(actual, unitTest.expected);
  const className = passing ? "passing-test" : "failing-test";
  return html`
    <li class="test-case ${className}">
      <h2>${unitTest.name}</h2>
      <pre><code>${unitTest.code}</code></pre>
      <section class="tokens">
        <table>
          <tr>
            <th>Index</th>
            <th>Kind</th>
            <th>Value</th>
            <th>Begin</th>
            <th>End</th>
          </tr>
          ${actual
            .map((actualToken, i) =>
              viewToken(i, actualToken, unitTest.expected[i]),
            )
            .join("")}
        </table>
      </section>
    </li>
  `;
}

/**
 * @param {UnitTests} unitTests
 * @return {string}
 */
function viewUnitTests(unitTests) {
  return html`
    <main>
      <h1>Tokenizer unit tests</h1>
      <ul class="test-cases">
        ${unitTests.map(viewUnitTest).join("")}
      </ul>
    </main>
  `;
}

/**
 * @param {UnitTests} unitTests
 */
function runUnitTests(unitTests) {
  document.body.innerHTML = viewUnitTests(unitTests);
}

/**
 * @param {string} value
 * @param {Pos} begin
 * @param {Pos} end
 * @return {SymbolToken}
 */
function symbol(value, begin, end) {
  return { kind: "symbol", value, span: [begin, end] };
}

/**
 * @param {Delimiter} value
 * @param {Pos} begin
 * @param {Pos} end
 * @return {DelimiterToken}
 */
function delimiter(value, begin, end) {
  return { kind: "delimiter", value, span: [begin, end] };
}

/**
 * @param {string} value
 * @param {Pos} begin
 * @param {Pos} end
 * @return {IntToken}
 */
function int(value, begin, end) {
  return { kind: "int", value, span: [begin, end] };
}

/**
 * @param {string} value
 * @param {Pos} begin
 * @param {Pos} end
 * @return {FloatToken}
 */
function float(value, begin, end) {
  return { kind: "float", value, span: [begin, end] };
}

/**
 * @param {Operator} value
 * @param {Pos} begin
 * @param {Pos} end
 * @return {OperatorToken}
 */
function operator(value, begin, end) {
  return { kind: "operator", value, span: [begin, end] };
}

/**
 * @param {Indent} value
 * @param {number} count
 * @param {Pos} begin
 * @param {Pos} end
 * @return {IndentToken}
 */
function indent(value, count, begin, end) {
  return { kind: "indent", value, count, span: [begin, end] };
}

runUnitTests([
  {
    name: "Variable definition",
    code: "x = 42",
    expected: [
      symbol("x", [0, 0], [0, 1]),
      operator("=", [0, 2], [0, 3]),
      int("42", [0, 4], [0, 6]),
    ],
  },
  {
    name: "Variable definition with explicit type",
    code: "x: i32 = 42",
    expected: [
      symbol("x", [0, 0], [0, 1]),
      delimiter(":", [0, 1], [0, 2]),
      symbol("i32", [0, 3], [0, 6]),
      operator("=", [0, 7], [0, 8]),
      int("42", [0, 9], [0, 11]),
    ],
  },
  {
    name: "Function call",
    code: "foo(x, y, z)",
    expected: [
      symbol("foo", [0, 0], [0, 3]),
      delimiter("(", [0, 3], [0, 4]),
      symbol("x", [0, 4], [0, 5]),
      delimiter(",", [0, 5], [0, 6]),
      symbol("y", [0, 7], [0, 8]),
      delimiter(",", [0, 8], [0, 9]),
      symbol("z", [0, 10], [0, 11]),
      delimiter(")", [0, 11], [0, 12]),
    ],
  },
  {
    name: "Function definition",
    code: "double(x: i32): i32 = x * 2",
    expected: [
      symbol("double", [0, 0], [0, 6]),
      delimiter("(", [0, 6], [0, 7]),
      symbol("x", [0, 7], [0, 8]),
      delimiter(":", [0, 8], [0, 9]),
      symbol("i32", [0, 10], [0, 13]),
      delimiter(")", [0, 13], [0, 14]),
      delimiter(":", [0, 14], [0, 15]),
      symbol("i32", [0, 16], [0, 19]),
      operator("=", [0, 20], [0, 21]),
      symbol("x", [0, 22], [0, 23]),
      operator("*", [0, 24], [0, 25]),
      int("2", [0, 26], [0, 27]),
    ],
  },
  {
    name: "Multi line function definition",
    code: `
sum_of_squares(x: i32, y: i32): i32 =
  x2 = x * x
  y2 = y * y
  x2 + y2
    `.trim(),
    expected: [
      symbol("sum_of_squares", [0, 0], [0, 14]),
      delimiter("(", [0, 14], [0, 15]),
      symbol("x", [0, 15], [0, 16]),
      delimiter(":", [0, 16], [0, 17]),
      symbol("i32", [0, 18], [0, 21]),
      delimiter(",", [0, 21], [0, 22]),
      symbol("y", [0, 23], [0, 24]),
      delimiter(":", [0, 24], [0, 25]),
      symbol("i32", [0, 26], [0, 29]),
      delimiter(")", [0, 29], [0, 30]),
      delimiter(":", [0, 30], [0, 31]),
      symbol("i32", [0, 32], [0, 35]),
      operator("=", [0, 36], [0, 37]),
      indent("space", 2, [1, 0], [1, 2]),
      symbol("x2", [1, 2], [1, 4]),
      operator("=", [1, 5], [1, 6]),
      symbol("x", [1, 7], [1, 8]),
      operator("*", [1, 9], [1, 10]),
      symbol("x", [1, 11], [1, 12]),
      indent("space", 2, [2, 0], [2, 2]),
      symbol("y2", [2, 2], [2, 4]),
      operator("=", [2, 5], [2, 6]),
      symbol("y", [2, 7], [2, 8]),
      operator("*", [2, 9], [2, 10]),
      symbol("y", [2, 11], [2, 12]),
      indent("space", 2, [3, 0], [3, 2]),
      symbol("x2", [3, 2], [3, 4]),
      operator("+", [3, 5], [3, 6]),
      symbol("y2", [3, 7], [3, 9]),
    ],
  },
  {
    name: "Array",
    code: "[1, 2, 3]",
    expected: [
      delimiter("[", [0, 0], [0, 1]),
      int("1", [0, 1], [0, 2]),
      delimiter(",", [0, 2], [0, 3]),
      int("2", [0, 4], [0, 5]),
      delimiter(",", [0, 5], [0, 6]),
      int("3", [0, 7], [0, 8]),
      delimiter("]", [0, 8], [0, 9]),
    ],
  },
  {
    name: "Multi line array",
    code: `
[
  1,
  2,
  3
]
    `.trim(),
    expected: [
      delimiter("[", [0, 0], [0, 1]),
      indent("space", 2, [1, 0], [1, 2]),
      int("1", [1, 2], [1, 3]),
      delimiter(",", [1, 3], [1, 4]),
      indent("space", 2, [2, 0], [2, 2]),
      int("2", [2, 2], [2, 3]),
      delimiter(",", [2, 3], [2, 4]),
      indent("space", 2, [3, 0], [3, 2]),
      int("3", [3, 2], [3, 3]),
      indent("space", 0, [4, 0], [4, 0]),
      delimiter("]", [4, 0], [4, 1]),
    ],
  },
  {
    name: "Valid symbols",
    code: `
snake_case
camelCase
PascalCase
_leading_underscore
trailing_underscore_
trailing_numbers123
`.trim(),
    expected: [
      symbol("snake_case", [0, 0], [0, 10]),
      indent("space", 0, [1, 0], [1, 0]),
      symbol("camelCase", [1, 0], [1, 9]),
      indent("space", 0, [2, 0], [2, 0]),
      symbol("PascalCase", [2, 0], [2, 10]),
      indent("space", 0, [3, 0], [3, 0]),
      symbol("_leading_underscore", [3, 0], [3, 19]),
      indent("space", 0, [4, 0], [4, 0]),
      symbol("trailing_underscore_", [4, 0], [4, 20]),
      indent("space", 0, [5, 0], [5, 0]),
      symbol("trailing_numbers123", [5, 0], [5, 19]),
    ],
  },
  {
    name: "Valid numbers",
    code: "42 3.14 0.25 .24 0",
    expected: [
      int("42", [0, 0], [0, 2]),
      float("3.14", [0, 3], [0, 7]),
      float("0.25", [0, 8], [0, 12]),
      float(".24", [0, 13], [0, 16]),
      int("0", [0, 17], [0, 18]),
    ],
  },
  {
    name: "Valid operators",
    code: "+ - * / = .".trim(),
    expected: [
      operator("+", [0, 0], [0, 1]),
      operator("-", [0, 2], [0, 3]),
      operator("*", [0, 4], [0, 5]),
      operator("/", [0, 6], [0, 7]),
      operator("=", [0, 8], [0, 9]),
      operator(".", [0, 10], [0, 11]),
    ],
  },
  {
    name: "Float uniform function call syntax",
    code: "3.14.min(5.38)".trim(),
    expected: [
      float("3.14", [0, 0], [0, 4]),
      operator(".", [0, 4], [0, 5]),
      symbol("min", [0, 5], [0, 8]),
      delimiter("(", [0, 8], [0, 9]),
      float("5.38", [0, 9], [0, 13]),
      delimiter(")", [0, 13], [0, 14]),
    ],
  },
  {
    name: "Int uniform function call syntax",
    code: "3.max(10)".trim(),
    expected: [
      int("3", [0, 0], [0, 1]),
      operator(".", [0, 1], [0, 2]),
      symbol("max", [0, 2], [0, 5]),
      delimiter("(", [0, 5], [0, 6]),
      int("10", [0, 6], [0, 8]),
      delimiter(")", [0, 8], [0, 9]),
    ],
  },
]);
