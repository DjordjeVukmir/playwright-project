const { test } = require('./pageFixtures');
const testData = require('../fixtures/testData.json');
const { allure } = require('allure-playwright');
const { wrapWithStepScreenshots } = require('./screenshotHelper');


test.afterEach(async ({ page }, testInfo) => {
    const screenshot = await page.screenshot({ path: `./allure-results/${testInfo.title}.png`, type: 'png' });
    testInfo.attach(`${testInfo.title} - screenshot`, {
        contentType: 'image/png',
        body: screenshot,
    });
});


test('Verify that User is on the correct page.', async ({ mainPage, page }) => {
    const wrappedMainPage = wrapWithStepScreenshots(page, mainPage);
    await wrappedMainPage.verifyCorrectPage();
});


test('Verify that Dark Mode is enabled.', async ({ mainPage, page }) => {
    const wrappedMainPage = wrapWithStepScreenshots(page, mainPage);
    await wrappedMainPage.verifyDarkMode();
});


test('Verify that User can search for a flight.', async ({ mainPage, page }) => {
    const wrappedMainPage = wrapWithStepScreenshots(page, mainPage);

    await wrappedMainPage.addFlight(testData);
    await wrappedMainPage.areLocationsDisplayedOnTheIntermediatePage(testData);
    await wrappedMainPage.areIntermediatePageFieldsPresent();
    await wrappedMainPage.selectDate(testData);
    await wrappedMainPage.setPassengerNumber();
    await wrappedMainPage.closePassengerMenu();
    await wrappedMainPage.areTicketPageFieldsPresent();

    console.log('Tickets are available');
});
