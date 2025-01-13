const { clickElement, getText } = require("./lib/commands.js");
//const { generateName } = require("./lib/util.js");

let page;

beforeEach(async () => {
  page = await browser.newPage();
  await page.goto("https://qamid.tmweb.ru/client/index.php");
  //await page.setDefaultNavigationTimeout(0);
});

afterEach(() => {
  page.close();
});

describe("Cinema ticket reservation app", () => {
  test("Positive 1: Should reservate ticket for Witcher", async () => {
    await clickElement(page, "a:nth-child(5)"); // Выбирает день недели и кликает через кастомную функцию clickElement
    await clickElement(
      page,
      ".movie-seances__time[href='#'][data-seance-id='223']"
    ); // Выбирает время и зал, кликает
    await clickElement(page, "div:nth-child(5) span:nth-child(6)"); // Выбирает и кликает на место в зале
    await clickElement(page, ".acceptin-button"); // Нажимает на элемент-кнопку забронировать
    const expected = "Вы выбрали билеты:";
    const actual = await getText(page, ".ticket__check-title"); // Получаем фактический текст из селектора через кастомную функцию getText
    await expect(actual).toContain(expected);
  });

  test("Positive 2: Should reservate ticket for VIP seat for Mickey Mouse", async () => {
    await clickElement(page, "a:nth-child(7)");
    await clickElement(
      page,
      ".movie-seances__time[href='#'][data-seance-id='218']"
    );
    await clickElement(page, "div:nth-child(4) span:nth-child(3)");
    await clickElement(page, ".acceptin-button");
    const expected = "Стоимость: 3500 руб.";
    const actual = await getText(page, "body main p:nth-child(6)");
    await expect(actual).toContain(expected);
  });

  test("Negative: Shouldn't reservate already taken seat for Stalker", async () => {
    await clickElement(page, "a:nth-child(2)");
    await clickElement(
      page,
      ".movie-seances__time[href='#'][data-seance-id='217']"
    );
    await clickElement(
      page,
      "div[class='buying-scheme__wrapper'] div:nth-child(1) span:nth-child(4)"
    );
    await clickElement(page, ".acceptin-button");
    // Возвращает неактивное состояние кнопки disabled=true
    const isDisabled = await page.$eval("button.acceptin-button", (button) => {
      return button.disabled;
    });
    await expect(isDisabled).toEqual(true); // Ассерт на то, что кнопка будет иметь атрибут disabled=true
  });
});
