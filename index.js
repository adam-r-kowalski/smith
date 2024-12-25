/**
 * @typedef {"(" | ")" | ","} Delimiter
 * @typedef {number} Row
 * @typedef {number} Col
 * @typedef {[Row, Col]} Pos
 * @typedef {[Pos, Pos]} Span
 * @typedef {{ kind: "invalid", value: string, span: Span }} InvalidToken
 * @typedef {{ kind: "symbol", value: string, span: Span }} SymbolToken
 * @typedef {{ kind: "delimiter", value: Delimiter, span: Span }} DelimiterToken
 * @typedef {InvalidToken | SymbolToken | DelimiterToken} Token
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
  return c == "(" || c == ",";
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
 * @param {UnitTest} unitTest
 * @return {string}
 */
function viewUnitTest(unitTest) {
  return html`
    <li>
      <pre>
        <code>
          ${unitTest.code}
        </code>
      </pre>
    </li>
  `;
}

/**
 * @param {UnitTests} unitTests
 * @return {string}
 */
function viewUnitTests(unitTests) {
  return html`
    <ul>
      ${unitTests.map(viewUnitTest)}
    </ul>
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

/** @type {UnitTest} */
const function_call_test = {
  name: "function call",
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
};

runUnitTests([function_call_test]);
