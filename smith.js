/**
 * @typedef { { symbol: string }
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
  if (/^\d/.test(code)) {
    if (code.includes(".")) {
      return [{ float: code }];
    }
    return [{ int: code }];
  }
  return [{ symbol: code }];
}

const parser = new DOMParser();

/**
 * @param {TemplateStringsArray} strings
 * @param {...any} values
 * @returns {Element}
 */
function html(strings, ...values) {
  const rawHTML = strings.reduce((result, str, i) => {
    const value =
      i < values.length
        ? String(values[i])
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;")
        : "";
    return result + str + value;
  }, "");
  const doc = parser.parseFromString(rawHTML, "text/html");
  const element = doc.body.firstChild;
  if (!(element instanceof Element)) throw new Error("Failed to parse HTML");
  return element;
}

/**
 * @param {UnitTest[]} unit_tests
 * @return {Element}
 */
function toElement(unit_tests) {
  const ul = document.createElement("ul");
  ul.classList.add("unit-tests");
  for (const unit_test of unit_tests) {
    const li = html`
      <li class="unit-test">
        <strong>Code</strong>
        <strong>Actual</strong>
        <strong>Expected</strong>
        <div contenteditable class="code"></div>
        <pre class="actual"></pre>
        <pre class="expected"></div>
      </li>
    `;
    const codeEl = li.querySelector(".code");
    const expectedEl = li.querySelector(".expected");
    if (!codeEl || !expectedEl) throw new Error("Missing required elements");
    codeEl.textContent = unit_test.code;
    expectedEl.textContent = JSON.stringify(unit_test.expected, null, 2);
    ul.appendChild(li);
  }
  return ul;
}

/**
 * @param {Element} code
 */
function runTests(code) {
  const tokens = tokenize(code.innerHTML);
  const actual = code.parentElement?.querySelector(".actual");
  if (!actual) {
    console.error("No .actual found as sibling of .code");
    return;
  }
  actual.textContent = JSON.stringify(tokens, null, 2);
  const expected = code.parentElement?.querySelector(".expected");
  if (!expected) {
    console.error("No .expected found as sibling of .code");
    return;
  }
  if (actual.textContent === expected.textContent) {
    for (const el of [actual, expected]) {
      el.classList.add("passing");
      el.classList.remove("failing");
    }
  } else {
    for (const el of [actual, expected]) {
      el.classList.add("failing");
      el.classList.remove("passing");
    }
  }
}

function runAllTests() {
  document.querySelectorAll(".code").forEach((code) => {
    runTests(code);
    code.addEventListener("input", () => runTests(code));
  });
}

document.body.appendChild(
  toElement([
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
  ]),
);

runAllTests();
