/**
 * @typedef {{ row: number, col: number }} Pos
 * @typedef {{ begin: Pos, end: Pos }} Span
 * @typedef {{ kind: "invalid", value: string, span: Span }} InvalidToken
 * @typedef {{ kind: "symbol", value: string, span: Span }} SymbolToken
 * @typedef {InvalidToken | SymbolToken} Token
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
  let cursor = { code, pos: { row: 0, col: 0 } };
  while (cursor.code.length > 0) {
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
 * @param {Cursor} cursor
 * @return {[Token, Cursor]}
 */
function nextToken(cursor) {
  const c = cursor.code[0];
  switch (true) {
    case isAlphabetic(c):
      return tokenizeSymbol(cursor);
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
  var i = 1;
  const code = cursor.code;
  while (code.length > i && predicate(code[i])) {
    i += 1;
  }
  const nextCursor = advanceCursor(cursor, i);
  const end = nextCursor.pos;
  /** @type Span */
  const span = { begin, end };
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
 * @param {Cursor} cursor
 * @return {[Token, Cursor]}
 */
function tokenizeInvalid(cursor) {
  const begin = cursor.pos;
  const nextCursor = advanceCursor(cursor, 1);
  const end = nextCursor.pos;
  const span = { begin, end };
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
    pos: {
      row: cursor.pos.row,
      col: cursor.pos.col + byCols,
    },
  };
}

console.log(tokenize("foo(x, y, z)"));
