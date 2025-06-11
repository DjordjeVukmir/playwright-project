import { test, expect } from '@playwright/test';
import { MainPage } from '../Pages/MainPage';
import testData from '../fixtures/testData.json';

test.beforeEach(async ({ page }) => {
    const mainPage = new MainPage(page);
    await mainPage.goto();
});

test('Verify that User is on the correct page.', async ({ page }) => {
    const mainPage = new MainPage(page);
    await mainPage.verifyCorrectPage();
});

test('Verify that Dark Mode is enabled.', async ({ page }) => {
    const mainPage = new MainPage(page);
    await mainPage.verifyDarkMode();
});

test('Verify that User can search for a flight.', async ({ page }) => {
    const mainPage = new MainPage(page);
    await mainPage.addFlight(testData);
    await page.waitForTimeout(2000);

    await mainPage.areLocationsDisplayedOnTheIntermediatePage(testData);
    await mainPage.areIntermediatePageFieldsPresent();
    await mainPage.selectDate(testData);
    await mainPage.setPassengerNumber();
    await mainPage.closePassengerMenu();


    await page.waitForTimeout(2000);
    await mainPage.areTicketPageFieldsPresent();

    console.log('Tickets are available');
});