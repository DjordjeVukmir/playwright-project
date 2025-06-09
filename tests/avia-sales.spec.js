import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('https://www.aviasales.com/');
    await page.locator('[data-test-id="switch"]').click();
});

let testData = {
    year: "2025",
    month: "08",
    day: "30",
    from: 'New York',
    to: 'Berlin',
    airport: 'John F. Kennedy International AirportJFK'
}


test('Verify that User is on the correct page.', async ({ page }) => {
    await expect(page.url()).toContain('https://www.aviasales.com/');
    await expect(page).toHaveTitle('Cheap Flights, Airline Tickets & Airfares - Find Deals on Flights at Aviasales.com');
});

test('Verify that Dark Mode is enabled.', async ({ page }) => {
    await expect(page.locator('html')).toHaveClass(/--night/);
});


/*test('Verify that User can search for a flight.', async ({ page }) => {
    await addFlight(testData, page);
    await page.waitForTimeout(2000)

    //Verify that From/To locations are displayed on the intermediate page
    await areLocationsDisplayedOnTheIntermediatePage(testData, page);
    //Verify that pre-ticket fields are present
    await areIntermediatePageFieldsPresent(page);
    await selectDate(testData, page);
    await setPassengerNumber(page);

    //close the passenger menu
    await page.locator('[data-test-id="passengers-field"]').click();
    //verify that ticket page fields are present
    await page.waitForTimeout(2000)
    await areTicketPageFieldsPresent(page);
    //await page.pause()
    console.log('Tickets are available');

});
*/


//Functions
async function areLocationsDisplayedOnTheIntermediatePage(testData, page) {
    await expect(page.getByRole('complementary').getByRole('navigation').locator('div').filter({ hasText: `${testData.from} - ${testData.to}` }).isVisible()).toBeTruthy()

}
async function areIntermediatePageFieldsPresent(page) {
    await expect(page.locator('[data-test-id="title"]').isVisible()).toBeTruthy();
    await expect(page.locator('#plugin_cheapest_tickets_block').isVisible()).toBeTruthy();
    await expect(page.locator('#plugin_direct_flights_block').isVisible()).toBeTruthy();

}
async function areTicketPageFieldsPresent(page) {
    await expect(page.locator('[data-test-id="show-all-tickets-button"]').isVisible()).toBeTruthy();
    await expect(page.locator('[data-test-id="show-all-tickets-button"]')).toBeVisible();
}
async function selectDate(testData, page) {
    await page.click('[data-test-id="start-date-value"]');
    while (true) {
        const selectedValue = await page.locator('[data-test-id="select-month"]').nth(1).inputValue();
        if (selectedValue === `${testData.year}-${testData.month}`) {
            await page.click(`[data-test-id="date-${testData.day}.${testData.month}.${testData.year}"]`);
            break;
        }
        await page.locator('[data-test-id="tooltip-wrapper"] [data-test-id="button"]').click();
    }
}

async function setPassengerNumber(page) {
    await page.click('[data-test-id="calendar-action-button"]');
    await page.locator('[data-test-id="passengers-field"]').click();
    const passengers = await page.locator('[data-test-id="number-of-adults"] [data-test-id="passenger-number"]').textContent();
    const passengersCount = parseInt(passengers);
    //console.log(passengersCount);
    if (passengersCount < 2) {
        await page.click('[data-test-id="increase-button"]');
    } else if (passengersCount > 2) {
        await page.click('[data-test-id="decrease-button"]');
    }
}

async function addFlight(testData, page) {
    await page.fill('#avia_form_origin-input', testData.from);
    await page.getByText(`${testData.airport}`).click();
    await page.fill('#avia_form_destination-input', testData.to);

}