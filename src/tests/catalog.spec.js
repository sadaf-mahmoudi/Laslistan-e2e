import { test, expect } from '@playwright/test';

test.describe("Bokkatalog och favoriter", () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://tap-ht24-testverktyg.github.io/exam-template/');
  });

  test('Varje bok visar både titel och författare', async ({ page }) => {
    const booksWithAuthors = [
      {
        title: "Hur man tappar bort sin TV-fjärr 10 gånger om dagen",
        author: "Bertil Flimmer",
      },
      {
        title: "Kaffekokaren som visste för mycket",
        author: "Saga Espresson",
      },
      {
        title: "Min katt är min chef",
        author: "Kattis Jamsson",
      },
      {
        title: "100 sätt att undvika måndagar",
        author: "Göran Snooze",
      },
      {
        title: "Gräv där du står – och hitta en pizzameny",
        author: "Maja Skruv",
      },
      {
        title: "Jag trodde det var tisdag",
        author: "Kim Vilsen",
      },
      {
        title: "Att prata med växter – och vad de egentligen tycker om dig",
        author: "Flora Tistel",
      },
    ];

    for (const book of booksWithAuthors) {
      await expect(page.getByText(book.title)).toBeVisible();
      await expect(page.getByText(book.author)).toBeVisible();
    }
  });

  test("Favoritmarkera en bok genom att klicka på hjärtat", async ({ page }) => {
    await page.locator('[data-testid="star-Hur man tappar bort sin TV-fjärr 10 gånger om dagen"]').click();
    await page.getByRole("button", { name: "mina böcker" }).click();
    const myBook = page.getByText("Hur man tappar bort sin TV-fjärr 10 gånger om dagen");
    await expect(myBook).toBeVisible();
  });

  test("Ta bort favoritmarkering genom att klicka på hjärtat igen", async ({ page }) => {
    await page.locator("[data-testid='star-100 sätt att undvika måndagar']").click();
    await page.locator("[data-testid='star-100 sätt att undvika måndagar']").click();
    await page.getByRole("button", { name: "mina böcker" }).click();
    const myBook = page.getByText("100 sätt att undvika måndagar");
    await expect(myBook).not.toBeVisible();
  });

});
