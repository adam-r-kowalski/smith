/**
 * @typedef { 'start'
 *          | 'symbol'
 *          | 'int'
 *          | 'float'
 *          | 'operator'
 *          | 'delimiter'
 *          } State
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
  flushBuffer(state, buffer, tokens);
  return tokens;
}

/**
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
 * @param {string} char
 * @param {string} buffer
 * @param {Tokens} tokens
 * @return {[State, string]} The new state and updated buffer.
 * @throws {Error} If an unexpected character is encountered.
 */
function handleStart(char, buffer, tokens) {
  if (/\d/.test(char)) return ["int", buffer + char];
  if (/[a-zA-Z_]/.test(char)) return ["symbol", buffer + char];
  if (/[+\-*\/]/.test(char)) {
    tokens.push({ operator: char });
    return ["start", buffer];
  }
  if (/[\[\]\(\)\{\},]/.test(char)) {
    tokens.push({ delimiter: char });
    return ["start", buffer];
  }
  if (/\s/.test(char)) return ["start", buffer]; // Ignore whitespace
  throw new Error(`Unexpected character: ${char}`);
}

/**
 * @param {string} char
 * @param {string} buffer
 * @param {Tokens} tokens
 * @return {[State, string]} The new state and updated buffer.
 */
function handleInt(char, buffer, tokens) {
  if (/\d/.test(char)) return ["int", buffer + char];
  if (char === ".") return ["float", buffer + char];
  flushBuffer("int", buffer, tokens);
  return handleStart(char, "", tokens);
}

/**
 * @param {string} char
 * @param {string} buffer
 * @param {Tokens} tokens
 * @return {[State, string]} The new state and updated buffer.
 */
function handleFloat(char, buffer, tokens) {
  if (/\d/.test(char)) return ["float", buffer + char];
  flushBuffer("float", buffer, tokens);
  return handleStart(char, "", tokens);
}

/**
 * @param {string} char
 * @param {string} buffer
 * @param {Tokens} tokens
 * @return {[State, string]} The new state and updated buffer.
 */
function handleSymbol(char, buffer, tokens) {
  if (/[\w]/.test(char)) return ["symbol", buffer + char];
  flushBuffer("symbol", buffer, tokens);
  return handleStart(char, "", tokens);
}

/**
 * @param {State} state
 * @param {string} buffer
 * @param {Tokens} tokens
 */
function flushBuffer(state, buffer, tokens) {
  if (!buffer) return;
  if (state === "int") tokens.push({ int: buffer });
  else if (state === "float") tokens.push({ float: buffer });
  else if (state === "symbol") tokens.push({ symbol: buffer });
}

/**
 * Formats tokens for display.
 * @param {Tokens} tokens
 * @return {string}
 */
function formatTokens(tokens) {
  if (tokens.length === 0) return "[]";
  if (tokens.length === 1) return `[ ${JSON.stringify(tokens[0])} ]`;
  const mapped = tokens.map((t) => "  " + JSON.stringify(t)).join(",\n");
  return "[\n" + mapped + "\n]";
}

/**
 * @param {TemplateStringsArray} strings
 * @param {...any} values
 * @returns {string}
 */
function html(strings, ...values) {
  return String.raw({ raw: strings }, ...values);
}

/**
 * @param {Tokens} actual
 * @param {Tokens} expected
 * @return {string}
 */
function compareTokens(actual, expected) {
  return JSON.stringify(actual) === JSON.stringify(expected)
    ? "match"
    : "mismatch";
}

/**
 * Generates an HTML table row for a unit test.
 * @param {UnitTest} unitTest
 * @return {string}
 */
function viewUnitTest(unitTest) {
  const tokens = tokenize(unitTest.code);
  return html`
    <tr class="${compareTokens(tokens, unitTest.expected)}">
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
