// page-objects/MainPage.js
import { expect } from '@playwright/test';
import test from 'node:test';

export class MainPage {
  constructor(page) {
    this.page = page;
    this.switchThemeToggle = page.locator('[data-test-id="switch"]');
    this.originInput = page.locator('#avia_form_origin-input');
    this.destinationInput = page.locator('#avia_form_destination-input');
    this.passengerField = page.locator('[data-test-id="passengers-field"]');
    this.calendarActionButton = page.locator('[data-test-id="calendar-action-button"]');
    this.startDateValue = page.locator('[data-test-id="start-date-value"]');
    this.selectMonth = page.locator('[data-test-id="select-month"]');
    this.nextMonthButton = page.locator('[data-test-id="tooltip-wrapper"] [data-test-id="button"]');
    this.showAllTicketsButton = page.locator('[data-test-id="show-all-tickets-button"]');
    this.pageTitle = page.locator('[data-test-id="title"]');
    this.cheapestBlock = page.locator('#plugin_cheapest_tickets_block');
    this.directFlightsBlock = page.locator('#plugin_direct_flights_block');
    this.adultsCount = page.locator('[data-test-id="number-of-adults"] [data-test-id="passenger-number"]');
    this.increaseBtnAdults = page.locator('[data-test-id="number-of-adults"] [data-test-id="increase-button"]');
    this.decreaseBtnAdults = page.locator('[data-test-id="number-of-adults"] [data-test-id="decrease-button"]');
    this.errorText = page.getByText('Failed to load tickets');
  }

  async goto() {
    await this.page.goto('https://www.aviasales.com/');
    await this.switchThemeToggle.click();
  }

  async verifyCorrectPage() {
    await expect(this.page.url()).toContain('https://www.aviasales.com/');
    await expect(this.page).toHaveTitle('Cheap Flights, Airline Tickets & Airfares - Find Deals on Flights at Aviasales.com');
  }

  async verifyDarkMode() {
    await expect(this.page.locator('html')).toHaveClass(/--night/);
  }

  async addFlight(testData) {
    await this.originInput.fill(testData.from);
    await this.page.getByText(`${testData.airport}`).click();
    await this.destinationInput.fill(testData.to);
  }

  async areLocationsDisplayedOnTheIntermediatePage(testData) {
    await expect(
      this.page.getByRole('complementary')
        .getByRole('navigation')
        .getByText(`${testData.from} – ${testData.to}`, { exact: true })
    ).toBeVisible();
  }

  async areIntermediatePageFieldsPresent() {
    await expect(this.pageTitle).toBeVisible();
    await expect(this.cheapestBlock).toBeVisible();
    await expect(this.directFlightsBlock).toBeVisible();
  }

  async selectDate(testData) {
    await this.startDateValue.click();
    while (true) {
      const selectedValue = await this.selectMonth.nth(1).inputValue();
      if (selectedValue === `${testData.year}-${testData.month}`) {
        await this.page.click(`[data-test-id="date-${testData.day}.${testData.month}.${testData.year}"]`);
        break;
      }
      await this.nextMonthButton.click();
    }
  }

  async setPassengerNumber() {
    await this.calendarActionButton.click();
    await this.passengerField.click();
    const passengers = await this.adultsCount.textContent();
    const count = parseInt(passengers);
    if (count < 2) {
      await this.increaseBtnAdults.click();
    } else if (count > 2) {
      await this.decreaseBtnAdults.click();
    }
  }

  async closePassengerMenu() {
    await this.passengerField.click();
  }

  async areTicketPageFieldsPresent() {
    await expect(this.showAllTicketsButton).toBeVisible();
  }
}