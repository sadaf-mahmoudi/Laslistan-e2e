import { test, expect } from '@playwright/test';

test.describe("Lägga till böcker", () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://tap-ht24-testverktyg.github.io/exam-template/');
  });

  // Själva testet: lägger till en bok i "Mina böcker"
  test("Lägg till en bok i Mina böcker", async ({ page }) => {

    await page.locator('[data-testid="star-Hur man tappar bort sin TV-fjärr 10 gånger om dagen"]').click();

    // Navigerar till fliken "Mina böcker"
    await page.getByRole("button", { name: "mina böcker" }).click();

    // Hämtar texten för boken i "Mina böcker" och kontrollerar att den syns
    const myBook = page.getByText("Hur man tappar bort sin TV-fjärr 10 gånger om dagen");
    await expect(myBook).toBeVisible(); // Bekräftar att boken sparats
  });

});
