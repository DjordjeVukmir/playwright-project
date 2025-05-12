import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('https://www.aviasales.com/');
    await page.locator('[data-test-id="switch"]').click();
});


let year = "2025";
let month = "08";
let day = "30";
let from = 'New York';
let to = 'Berlin';
let airport = 'John F. Kennedy International AirportJFK'


test('Verify that User is on the correct page.', async ({ page }) => {
    await expect(page.url()).toContain('https://www.aviasales.com/');
    await expect(page).toHaveTitle('Cheap Flights, Airline Tickets & Airfares - Find Deals on Flights at Aviasales.com');
});

test('Verify that Dark Mode is enabled.', async ({ page }) => {
    await expect(page.locator('html')).toHaveClass(/--night/);
});


test('Verify that User can search for a flight.', async ({ page }) => {
    await addFlight(from, to, airport, page);
    await page.waitForTimeout(2000)

    //Verify that From/To locations are displayed on the intermediate page
    await areLocationsDisplayedOnTheIntermediatePage(from, to, page);
    //Verify that pre-ticket fields are present
    await areIntermediatePageFieldsPresent(page);
    await selectDate(year, month, day, page);
    await setPassengerNumber(page);

    //close the passenger menu
    await page.locator('[data-test-id="passengers-field"]').click();
    //verify that ticket page fields are present
    await areTicketPageFieldsPresent(page);
    //await page.pause()
    console.log('Tickets are available');

});


//Functions
async function areLocationsDisplayedOnTheIntermediatePage(from, to, page) {
    await expect(page.getByRole('complementary').getByRole('navigation').locator('div').filter({ hasText: `${from} - ${to}` }).isVisible()).toBeTruthy()

}
async function areIntermediatePageFieldsPresent(page) {
    await expect(page.locator('[data-test-id="title"]').isVisible()).toBeTruthy();
    await expect(page.locator('#plugin_cheapest_tickets_block').isVisible()).toBeTruthy();
    await expect(page.locator('#plugin_direct_flights_block').isVisible()).toBeTruthy();

}
async function areTicketPageFieldsPresent(page) {
    await expect(page.locator('[data-test-id="show-all-tickets-button"]').isVisible()).toBeTruthy();
    await expect(page.getByRole('button', { name: 'Select' }).isVisible()).toBeTruthy();

}
async function selectDate(year, month, day, page) {
    await page.click('[data-test-id="start-date-value"]');
    while (true) {
        const selectedValue = await page.locator('[data-test-id="select-month"]').nth(1).inputValue();
        if (selectedValue === `${year}-${month}`) {
            await page.click(`[data-test-id="date-${day}.${month}.${year}"]`);
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

async function addFlight(from, to, airport, page) {
    await page.fill('#avia_form_origin-input', from);
    await page.getByText(`${airport}`).click();
    await page.fill('#avia_form_destination-input', to);

}