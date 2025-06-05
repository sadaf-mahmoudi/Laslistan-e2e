import { test, expect } from '@playwright/test';

test.describe("Mina böcker-vy", () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://tap-ht24-testverktyg.github.io/exam-template/');
  });
//Test för att säkerställa att favoritböcker visas korrekt i Mina böcker
  test("Favoritböcker visas korrekt i Mina böcker-vyn", async ({ page }) => {
    await page.getByTestId("star-Min katt är min chef").click();
    await page.getByTestId("star-Att prata med växter – och vad de egentligen tycker om dig").click();
    await page.getByRole("button", { name: "Mina böcker" }).click();

    await expect(page.getByText("Min katt är min chef")).toBeVisible();
    await expect(page.getByText("Att prata med växter – och vad de egentligen tycker om dig")).toBeVisible();
  });
//Test för att säkerställa att om inga böcker är favoritmarkerade, så visas ett tomt meddelande
  test("Om inga böcker är favoritmarkerade visas ett tomt meddelande", async ({ page }) => {
    await page.getByRole("button", { name: "Mina böcker" }).click();
    const tomtMeddelande = page.getByText("När du valt, kommer dina favoritböcker att visas här.");
    await expect(tomtMeddelande).toBeVisible();
  });

});
