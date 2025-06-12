// Import the base Playwright test functions and the MainPage class
const base = require('@playwright/test');
const { MainPage } = require('../Pages/MainPage');

/* 
Extend the base test fixture to add a custom fixture called 'mainPage'.
This fixture initializes a new MainPage instance for each test, navigates to the main page URL,
and then provides the 'mainPage' object to the test function.
 
Why this is necessary:
- It ensures that every test starts with a fresh, properly initialized page object,
  promoting test isolation and reducing boilerplate code in each test.
- By handling navigation inside the fixture, it centralizes setup logic,
  making tests cleaner, easier to read, and less error-prone.
- Using Playwright’s fixture extension mechanism allows seamless integration
  and automatic management of test resources (like browser pages).

Why not use a 'before' hook instead?
- 'before' hooks run before tests but do not provide a way to inject objects (like MainPage instances) directly into test arguments.
- Fixtures allow passing initialized objects as test parameters, enabling type safety and better code organization.
- Fixtures can be composed, reused, and extended easily across different tests or projects.
- Using fixtures aligns with Playwright's design philosophy for scalable and maintainable test suites,
  whereas 'before' hooks are more limited and can lead to repetitive or less flexible code.
  */
exports.test = base.test.extend({
  mainPage: async ({ page }, use) => {
    const mainPage = new MainPage(page);
    await mainPage.goto();
    await use(mainPage);
  },
});

// Re-export Playwright's expect function for assertions in tests
exports.expect = base.expect;
