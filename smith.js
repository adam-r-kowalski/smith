/**
 * @typedef {'start' | 'symbol' | 'int' | 'float' | 'operator' | 'delimiter'} State
 * @typedef { { symbol: string }
 *          | { operator: string }
 *          | { int: string }
 *          | { float: string }
 *          | { delimiter: string }
 *          } Token
 * @typedef {Token[]} Tokens
 * @typedef {{code: string, expected: Tokens}} UnitTest
 */

/**
 * Main tokenize function that processes the input string.
 * @param {string} code
 * @return {Tokens}
 * @throws {Error} If an unexpected character is encountered.
 */
function tokenize(code) {
  /** @type {Tokens} */
  const tokens = [];
  /** @type {State} */
  let state = "start";
  let buffer = "";

  for (const char of code) {
    const [newState, newBuffer] = handleState(state, char, buffer, tokens);
    state = newState;
    buffer = newBuffer;
  }

  // Flush any remaining buffer
  flushBuffer(state, buffer, tokens);

  return tokens;
}

/**
 * Handles the current state and transitions based on the input character.
 * @param {State} state
 * @param {string} char
 * @param {string} buffer
 * @param {Tokens} tokens
 * @return {[State, string]} The new state and updated buffer.
 * @throws {Error} If the state is invalid or unhandled.
 */
function handleState(state, char, buffer, tokens) {
  switch (state) {
    case "start":
      return handleStart(char, buffer, tokens);
    case "int":
      return handleInt(char, buffer, tokens);
    case "float":
      return handleFloat(char, buffer, tokens);
    case "symbol":
      return handleSymbol(char, buffer, tokens);
    default:
      throw new Error(`Unhandled state: ${state}`);
  }
}

/**
 * Handles the `start` state.
 * @param {string} char
 * @param {string} buffer
 * @param {Tokens} tokens
 * @return {[State, string]} The new state and updated buffer.
 * @throws {Error} If an unexpected character is encountered.
 */
function handleStart(char, buffer, tokens) {
  if (/\d/.test(char)) {
    return ["int", buffer + char];
  } else if (/[a-zA-Z_]/.test(char)) {
    return ["symbol", buffer + char];
  } else if (/[+\-*\/]/.test(char)) {
    tokens.push({ operator: char });
    return ["start", buffer];
  } else if (/[\[\]\(\)\{\},]/.test(char)) {
    tokens.push({ delimiter: char });
    return ["start", buffer];
  } else if (/\s/.test(char)) {
    return ["start", buffer]; // Ignore whitespace
  } else {
    throw new Error(`Unexpected character: ${char}`);
  }
}

/**
 * Handles the `int` state.
 * @param {string} char
 * @param {string} buffer
 * @param {Tokens} tokens
 * @return {[State, string]} The new state and updated buffer.
 */
function handleInt(char, buffer, tokens) {
  if (/\d/.test(char)) {
    return ["int", buffer + char];
  } else if (char === ".") {
    return ["float", buffer + char];
  } else {
    flushBuffer("int", buffer, tokens);
    return handleStart(char, "", tokens);
  }
}

/**
 * Handles the `float` state.
 * @param {string} char
 * @param {string} buffer
 * @param {Tokens} tokens
 * @return {[State, string]} The new state and updated buffer.
 */
function handleFloat(char, buffer, tokens) {
  if (/\d/.test(char)) {
    return ["float", buffer + char];
  } else {
    flushBuffer("float", buffer, tokens);
    return handleStart(char, "", tokens);
  }
}

/**
 * Handles the `symbol` state.
 * @param {string} char
 * @param {string} buffer
 * @param {Tokens} tokens
 * @return {[State, string]} The new state and updated buffer.
 */
function handleSymbol(char, buffer, tokens) {
  if (/[\w]/.test(char)) {
    return ["symbol", buffer + char];
  } else {
    flushBuffer("symbol", buffer, tokens);
    return handleStart(char, "", tokens);
  }
}

/**
 * Flushes the buffer and adds a token to the token list.
 * @param {State} state
 * @param {string} buffer
 * @param {Tokens} tokens
 */
function flushBuffer(state, buffer, tokens) {
  if (buffer) {
    if (state === "int") tokens.push({ int: buffer });
    else if (state === "float") tokens.push({ float: buffer });
    else if (state === "symbol") tokens.push({ symbol: buffer });
  }
}

/**
 * Formats tokens for display.
 * @param {Tokens} tokens
 * @return {string}
 */
function formatTokens(tokens) {
  if (tokens.length === 0) return "[]";
  if (tokens.length === 1) return `[ ${JSON.stringify(tokens[0])} ]`;
  return (
    "[\n" + tokens.map((t) => "  " + JSON.stringify(t)).join(",\n") + "\n]"
  );
}

/**
 * Compares actual and expected tokens for equality.
 * @param {Tokens} actual
 * @param {Tokens} expected
 * @return {boolean}
 */
function compareTokens(actual, expected) {
  return (
    actual.length === expected.length &&
    actual.every(
      (token, index) =>
        JSON.stringify(token) === JSON.stringify(expected[index]),
    )
  );
}

/**
 * Generates an HTML table row for a unit test.
 * @param {UnitTest} unitTest
 * @return {string}
 */
function viewUnitTest(unitTest) {
  const tokens = tokenize(unitTest.code);
  const matches = compareTokens(tokens, unitTest.expected);
  return `
    <tr class="${matches ? "match" : "mismatch"}">
      <td><pre>${unitTest.code}</pre></td>
      <td><pre>${formatTokens(tokens)}</pre></td>
      <td><pre>${formatTokens(unitTest.expected)}</pre></td>
    </tr>
  `;
}

/**
 * Renders all unit tests into an HTML table.
 * @param {UnitTest[]} unitTests
 * @return {string}
 */
function viewUnitTests(unitTests) {
  return `
    <table>
      <thead>
        <tr>
          <th>Code</th>
          <th>Tokens</th>
          <th>Expected</th>
        </tr>
      </thead>
      <tbody>
        ${unitTests.map(viewUnitTest).join("\n")}
      </tbody>
    </table>
  `;
}

// Unit tests
const unitTests = [
  { code: "", expected: [] },
  { code: "foo", expected: [{ symbol: "foo" }] },
  { code: "42", expected: [{ int: "42" }] },
  { code: "3.14", expected: [{ float: "3.14" }] },
  {
    code: "f(x, y, z)",
    expected: [
      { symbol: "f" },
      { delimiter: "(" },
      { symbol: "x" },
      { delimiter: "," },
      { symbol: "y" },
      { delimiter: "," },
      { symbol: "z" },
      { delimiter: ")" },
    ],
  },
];

// Render the tests
document.body.innerHTML = viewUnitTests(unitTests);
