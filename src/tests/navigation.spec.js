import { test, expect } from '@playwright/test';

test.describe("Navigering mellan vyer", () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://tap-ht24-testverktyg.github.io/exam-template/');
  });
//Test för att kontrollera navigering mellan vyerna "Katalog", "Lägg till bok" och "Mina böcker"
  test("Navigera från Katalog till Lägg till bok och sen till Mina böcker", async ({ page }) => {
    await page.getByRole("button", { name: "Lägg till bok" }).click();
    await expect(page.getByTestId("add-input-title")).toBeVisible();

    await page.getByRole("button", { name: "Mina böcker" }).click();
    await expect(page.getByText("dina favoritböcker")).toBeVisible();
  });
//Test för att kontrollera navigering mellan "Lägg till bok", "Katalog" och "Mina böcker"
  test("Gå från Lägg till bok till Katalog och vidare till Mina böcker", async ({ page }) => {
    await page.getByRole("button", { name: "Lägg till bok" }).click();
    await page.getByRole("button", { name: "Katalog" }).click();
    await expect(page.getByText("Bertil Flimmer")).toBeVisible();

    await page.getByRole("button", { name: "Mina böcker" }).click();
    await expect(page.getByText("dina favoritböcker")).toBeVisible();
  });
//Test för att kontrollera navigering från "Mina böcker" till "Katalog" och sedan till "Lägg till bok"
  test("Från Mina böcker till Katalog och sen till Lägg till bok", async ({ page }) => {
    await page.getByRole("button", { name: "Mina böcker" }).click();
    await expect(page.getByText("dina favoritböcker")).toBeVisible();

    await page.getByRole("button", { name: "Katalog" }).click();
    await expect(page.getByText("Kaffekokaren som visste för mycket")).toBeVisible();

    await page.getByRole("button", { name: "Lägg till bok" }).click();
    await expect(page.getByTestId("add-input-author")).toBeVisible();
  });

});
