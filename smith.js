/**
 * @typedef {{ row: number, col: number }} Pos
 * @typedef {{ kind: "invalid", value: string, pos: Pos }} InvalidToken
 * @typedef {{ kind: "symbol", value: string, pos: Pos }} SymbolToken
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
 * @param {Cursor} cursor
 * @return {[Token, Cursor]}
 */
function nextToken(cursor) {
  const c = cursor.code[0];
  switch (true) {
    case c >= "a" && c <= "z":
      return tokenizeSymbol(cursor);
    default:
      return tokenizeInvalid(cursor);
  }
}

/**
 * @param {Cursor} cursor
 * @return {[Token, Cursor]}
 */
function tokenizeSymbol(cursor) {
  /** @type Token */
  const token = {
    kind: "symbol",
    value: cursor.code,
    pos: cursor.pos,
  };
  return [token, advanceCursor(cursor, cursor.code.length)];
}

/**
 * @param {Cursor} cursor
 * @return {[Token, Cursor]}
 */
function tokenizeInvalid(cursor) {
  /** @type Token */
  const token = {
    kind: "invalid",
    value: cursor.code,
    pos: cursor.pos,
  };
  return [token, advanceCursor(cursor, 1)];
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

console.log(tokenize("foo"));
