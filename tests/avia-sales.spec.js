import { test, expect } from '@playwright/test';
import testData from '../fixtures/testData.json';
import * as aviaFunctions from '../helper-functions/aviaFunctions';

test.beforeEach(async ({ page }) => {
    await page.goto('https://www.aviasales.com/');
    await page.locator('[data-test-id="switch"]').click();
});


test('Verify that User is on the correct page.', async ({ page }) => {
    await expect(page.url()).toContain('https://www.aviasales.com/');
    await expect(page).toHaveTitle('Cheap Flights, Airline Tickets & Airfares - Find Deals on Flights at Aviasales.com');
});

test('Verify that Dark Mode is enabled.', async ({ page }) => {
    await expect(page.locator('html')).toHaveClass(/--night/);
});


test('Verify that User can search for a flight.', async ({ page }) => {
    await aviaFunctions.addFlight(testData, page);
    await page.waitForTimeout(2000)

    //Verify that From/To locations are displayed on the intermediate page
    await aviaFunctions.areLocationsDisplayedOnTheIntermediatePage(testData, page);
    //Verify that pre-ticket fields are present
    await aviaFunctions.areIntermediatePageFieldsPresent(page);
    await aviaFunctions.selectDate(testData, page);
    await aviaFunctions.setPassengerNumber(page);

    //close the passenger menu
    await page.locator('[data-test-id="passengers-field"]').click();
    //verify that ticket page fields are present
    await page.waitForTimeout(2000)
    await aviaFunctions.areTicketPageFieldsPresent(page);
    //await page.pause()
    console.log('Tickets are available');

});


