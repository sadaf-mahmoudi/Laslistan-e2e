import { test, expect } from '@playwright/test';

test.describe("Katalog-vy", () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto('https://tap-ht24-testverktyg.github.io/exam-template/');
  });

  test('Varje bok visar både titel och författare', async ({ page }) => {
    const booksWithAuthors = [
      { title: "Hur man tappar bort sin TV-fjärr 10 gånger om dagen", author: "Bertil Flimmer" },
      { title: "Kaffekokaren som visste för mycket", author: "Saga Espresson" },
      { title: "Min katt är min chef", author: "Kattis Jamsson" },
      { title: "100 sätt att undvika måndagar", author: "Göran Snooze" },
      { title: "Gräv där du står – och hitta en pizzameny", author: "Maja Skruv" },
      { title: "Jag trodde det var tisdag", author: "Kim Vilsen" },
      { title: "Att prata med växter – och vad de egentligen tycker om dig", author: "Flora Tistel" },
    ];

    for (const book of booksWithAuthors) {
      await expect(page.getByText(book.title)).toBeVisible({ timeout: 5000 });
      await expect(page.getByText(book.author)).toBeVisible({ timeout: 5000 });
    }
  });

  test("Klicka på hjärtat för att favoritmarkera en bok och kontrollera att den visas i 'Mina böcker'", async ({ page }) => {
    const bookTitle = "Hur man tappar bort sin TV-fjärr 10 gånger om dagen";
    
    // Klicka på hjärtat för att favoritmarkera
    await page.getByTestId(`star-${bookTitle}`).click({ timeout: 5000 });
    
    // Navigera till "Mina böcker" och kontrollera att boken finns där
    await page.getByRole("button", { name: "Mina böcker" }).click({ timeout: 5000 });
    const myBok = page.getByText(bookTitle);
    await expect(myBok).toBeVisible({ timeout: 5000 });
  });

  test("Klicka på hjärtat för att favoritmarkera flera böcker och kontrollera att de visas i 'Mina böcker'", async ({ page }) => {
    const bookTitles = [
      "Hur man tappar bort sin TV-fjärr 10 gånger om dagen",
      "Jag trodde det var tisdag"
    ];

    // Favoritmarkera böckerna
    for (const title of bookTitles) {
      await page.getByTestId(`star-${title}`).click({ timeout: 5000 });
    }

    // Navigera till "Mina böcker" och kontrollera att de är synliga
    await page.getByRole("button", { name: "Mina böcker" }).click({ timeout: 5000 });
    for (const title of bookTitles) {
      const myBok = page.getByText(title);
      await expect(myBok).toBeVisible({ timeout: 5000 });
    }
  });

  test("Klicka på hjärtat för att ta bort favoritmarkering", async ({ page }) => {
    const bookTitle = "100 sätt att undvika måndagar";
    
    // Klicka på hjärtat för att favoritmarkera och sedan ta bort favoritmarkeringen
    await page.getByTestId(`star-${bookTitle}`).click({ timeout: 5000 });
    await page.getByTestId(`star-${bookTitle}`).click({ timeout: 5000 });
    
    // Kontrollera att boken inte syns i "Mina böcker"
    await page.getByRole("button", { name: "Mina böcker" }).click({ timeout: 5000 });
    const myBok = page.getByText(bookTitle);
    await expect(myBok).not.toBeVisible({ timeout: 5000 });
  });

  test("Favoritmarkera → avmarkera → favoritmarkera igen, och kontrollera att boken visas korrekt i 'Mina böcker'", async ({ page }) => {
    const bookTitle = "100 sätt att undvika måndagar";
    
    // Favoritmarkera, avmarkera och favoritmarkera igen
    await page.getByTestId(`star-${bookTitle}`).click({ timeout: 5000 });
    await page.getByTestId(`star-${bookTitle}`).click({ timeout: 5000 });
    await page.getByTestId(`star-${bookTitle}`).click({ timeout: 5000 });

    // Kontrollera att boken syns i "Mina böcker"
    await page.getByRole("button", { name: "Mina böcker" }).click({ timeout: 5000 });
    const text = page.getByText(bookTitle);
    await expect(text).toBeVisible({ timeout: 5000 });
  });
});
