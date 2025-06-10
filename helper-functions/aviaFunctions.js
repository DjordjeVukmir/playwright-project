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