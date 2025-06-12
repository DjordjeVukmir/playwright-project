const { test } = require('./pageFixtures');
const testData = require('../fixtures/testData.json');
const { allure } = require('allure-playwright');

test.afterEach(async ({ page }, testInfo) => {
    const screenshot = await page.screenshot({ path: `./allure-results/${testInfo.title}.png`, type: 'png' });
    testInfo.attach(`${testInfo.title} - screenshot`, {
        contentType: 'image/png',
        body: screenshot,
    });
});

test('Verify that User is on the correct page.', async ({ mainPage }) => {
    await mainPage.verifyCorrectPage();

});

test('Verify that Dark Mode is enabled.', async ({ mainPage, page }, testInfo) => {
    await mainPage.verifyDarkMode();


});
test('Verify that User can search for a flight.', async ({ mainPage }) => {
    await mainPage.addFlight(testData);
    await mainPage.areLocationsDisplayedOnTheIntermediatePage(testData);
    await mainPage.areIntermediatePageFieldsPresent();
    await mainPage.selectDate(testData);
    await mainPage.setPassengerNumber();
    await mainPage.closePassengerMenu();
    await mainPage.areTicketPageFieldsPresent();

    console.log('Tickets are available');
});
