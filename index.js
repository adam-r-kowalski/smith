/**
 * @typedef {"(" | ")" | "[" | "]" | ","} Delimiter
 * @typedef {number} Row
 * @typedef {number} Col
 * @typedef {[Row, Col]} Pos
 * @typedef {[Pos, Pos]} Span
 * @typedef {{ kind: "invalid", value: string, span: Span }} InvalidToken
 * @typedef {{ kind: "symbol", value: string, span: Span }} SymbolToken
 * @typedef {{ kind: "int", value: string, span: Span }} IntToken
 * @typedef {{ kind: "delimiter", value: Delimiter, span: Span }} DelimiterToken
 * @typedef {InvalidToken | SymbolToken | IntToken | DelimiterToken} Token
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
    if (cursor.code.length === 0) break;
    const [token, nextCursor] = nextToken(cursor);
    cursor = nextCursor;
    tokens.push(token);
  }
  return tokens;
}

/**
 * @param {string} c
 * @return bool
 */
function isAlphabetic(c) {
  return c >= "a" && c <= "z";
}

/**
 * @param {string} c
 * @return bool
 */
function isDelimiter(c) {
  return c == "(" || c == ")" || c == "[" || c == "]" || c == ",";
}

/**
 * @param {string} c
 * @return bool
 */
function isInt(c) {
  return c >= "0" && c <= "9";
}

/**
 * @param {Cursor} cursor
 * @return {[Token, Cursor]}
 */
function nextToken(cursor) {
  const c = cursor.code[0];
  switch (true) {
    case isAlphabetic(c):
      return tokenizeSymbol(cursor);
    case isDelimiter(c):
      return tokenizeDelimiter(c, cursor);
    case isInt(c):
      return tokenizeInt(cursor);
    default:
      return tokenizeInvalid(cursor);
  }
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
 * @param {Cursor} cursor
 * @return {[Token, Cursor]}
 */
function tokenizeSymbol(cursor) {
  const [value, span, nextCursor] = takeWhile(cursor, isAlphabetic);
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
 * @return {[Token, Cursor]}
 */
function tokenizeInt(cursor) {
  const [value, span, nextCursor] = takeWhile(cursor, isInt);
  /** @type Token */
  const token = { kind: "int", value, span };
  return [token, nextCursor];
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
 * @param {number} index
 * @param {Token} actual
 * @param {Token} expected
 * @return {string}
 */
function viewToken(index, actual, expected) {
  if (eql(actual, expected)) {
    return html`
      <tr>
        <td>${index}</td>
        <td>${actual.kind}</td>
        <td>${actual.value}</td>
        <td>${actual.span[0]}</td>
        <td>${actual.span[1]}</td>
      </li>
    `;
  } else {
    const f = "failing-section";
    const kind_class = eql(actual.kind, expected.kind) ? "" : f;
    const value_class = eql(actual.value, expected.value) ? "" : f;
    const span_0_class = eql(actual.span[0], expected.span[0]) ? "" : f;
    const span_1_class = eql(actual.span[1], expected.span[1]) ? "" : f;
    return html`
      <tr>
        <td>${index}</td>
        <td>${actual.kind}</td>
        <td>${actual.value}</td>
        <td>${actual.span[0]}</td>
        <td>${actual.span[1]}</td>
      </tr>
      <tr>
        <td>${index}</td>
        <td class="${kind_class}">${expected.kind}</td>
        <td class="${value_class}">${expected.value}</td>
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
  const passing = JSON.stringify(actual) === JSON.stringify(unitTest.expected);
  const className = passing ? "passing-test" : "failing-test";
  return html`
    <li class="test-case ${className}">
      <h2>${unitTest.name}</h2>
      <pre><code>${unitTest.code}</code></pre>
      <table class="tokens">
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

runUnitTests([
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
    name: "array",
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
]);