/**
 * @typedef { { symbol: string }
 *          | { operator: string }
 *          | { int: string }
 *          | { float: string }
 *          } Token
 * @typedef {Token[]} Tokens
 * @typedef {{code: string, expected: Tokens}} UnitTest
 */

/**
 * @param {string} code
 * @return {Tokens}
 */
function tokenize(code) {
  if (code.length === 0) return [];
  const parts = code.split(/\s+/);
  return parts.map((part) => {
    if (/^\d/.test(part)) {
      return part.includes(".") ? { float: part } : { int: part };
    }
    return /^[+\-*\/]$/.test(part) ? { operator: part } : { symbol: part };
  });
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
 * @param {Tokens} tokens
 * @return {string}
 */
function formatTokens(tokens) {
  switch (tokens.length) {
    case 0:
      return "[]";
    case 1:
      return `[ ${JSON.stringify(tokens[0])} ]`;
    default:
      return (
        "[\n" + tokens.map((t) => "  " + JSON.stringify(t)).join(",\n") + "\n]"
      );
  }
}

/**
 * @param {Tokens} actual
 * @param {Tokens} expected
 * @returns {boolean}
 */
function compareTokens(actual, expected) {
  if (actual.length !== expected.length) return false;
  return actual.every((token, index) => 
    JSON.stringify(token) === JSON.stringify(expected[index])
  );
}

/**
 * @param {UnitTest} unitTest
 * @return {string}
 */
function viewUnitTest(unitTest) {
  const tokens = tokenize(unitTest.code);
  const matches = compareTokens(tokens, unitTest.expected);
  return html`
    <tr class="${matches ? 'match' : 'mismatch'}">
      <td><pre><code>${unitTest.code}</code></pre></td>
      <td><pre><code>${formatTokens(tokens)}</code></pre></td>
      <td><pre><code>${formatTokens(unitTest.expected)}</code></pre></td>
    </tr>
  `;
}

/**
 * @param {UnitTest[]} unitTests
 * @return {string}
 */
function viewUnitTests(unitTests) {
  return html`
    <table>
      <tr>
        <th>Code</th>
        <th>Tokens</th>
        <th>Expected</th>
      </tr>
      ${unitTests.map(viewUnitTest).join("")}
    </table>
  `;
}

/** @type {UnitTest[]} */
const unitTests = [
  {
    code: "",
    expected: [],
  },
  {
    code: "foo",
    expected: [{ symbol: "foo" }],
  },
  {
    code: "foo_bar",
    expected: [{ symbol: "foo_bar" }],
  },
  {
    code: "42",
    expected: [{ int: "42" }],
  },
  {
    code: "3.14",
    expected: [{ float: "3.14" }],
  },
  {
    code: "x + y",
    expected: [{ symbol: "x" }, { operator: "+" }, { symbol: "y" }],
  },
];

const parser = new DOMParser();
const view = viewUnitTests(unitTests);
const parsed = parser.parseFromString(view, "text/html");
const child = parsed.body.firstChild;
if (child) {
  document.body.appendChild(child);
}
