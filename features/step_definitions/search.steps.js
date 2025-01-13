const puppeteer = require("puppeteer");
const chai = require("chai");
const expect = chai.expect;
const { Given, When, Then, Before, After } = require("cucumber");
const { putText, getText, clickElement } = require("../../lib/commands.js");

Before(async function () {
  const browser = await puppeteer.launch({ headless: false, slowMo: 200 });
  const page = await browser.newPage();
  this.browser = browser;
  this.page = page;
});

After(async function () {
  if (this.browser) {
    await this.browser.close();
  }
});
// Сценарий первого теста:
Given("users is on {string} page", async function (string) {
  return await this.page.goto(string);
});

When("The first user chooses the day", async function () {
  return await clickElement(this.page, "a:nth-child(5)");
});
When("The first user chooses time and cinema hall", async function () {
  return await clickElement(
    this.page,
    ".movie-seances__time[href='#'][data-seance-id='223']"
  );
});
When("The first user chooses a seat 6 row 5", async function () {
  return await clickElement(this.page, "div:nth-child(5) span:nth-child(6)");
});
When("The first user clicks reservation button", async function () {
  return await clickElement(this.page, ".acceptin-button");
});

Then("The first user sees the title {string}", async function (string) {
  const actual = await getText(this.page, ".ticket__check-title");
  const expected = await string;
  await expect(actual).contains(expected);
});

// Сценарий второго теста:
When("The second user chooses the day", async function () {
  return await clickElement(this.page, "a:nth-child(7)");
});
When("The second user chooses time and cinema hall", async function () {
  return await clickElement(
    this.page,
    ".movie-seances__time[href='#'][data-seance-id='218']"
  );
});
When("The second user chooses a VIP seat 3 row 4", async function () {
  return await clickElement(this.page, "div:nth-child(4) span:nth-child(3)");
});
When("The second user clicks reservation button", async function () {
  return await clickElement(this.page, ".acceptin-button");
});

Then("The second user sees the price {string}", async function (string) {
  const actual = await getText(this.page, "body main p:nth-child(6)");
  const expected = await string;
  await expect(actual).contains(expected);
});

// Сценарий третьего теста:
When("The third user chooses the day", async function () {
  return await clickElement(this.page, "a:nth-child(2)");
});
When("The third user chooses time and cinema hall", async function () {
  return await clickElement(
    this.page,
    ".movie-seances__time[href='#'][data-seance-id='217']"
  );
});
When(
  "The third user chooses an already reservated seat 4 row 1",
  async function () {
    return await clickElement(
      this.page,
      "div[class='buying-scheme__wrapper'] div:nth-child(1) span:nth-child(4)"
    );
  }
);
When("The third user clicks reservation button", async function () {
  return await clickElement(this.page, ".acceptin-button");
});

Then("reservation button is non-active", async function () {
  const isDisabled = await this.page.$eval(
    "button.acceptin-button",
    (button) => {
      return button.disabled;
    }
  );
  await expect(isDisabled).to.equal(true);
});
