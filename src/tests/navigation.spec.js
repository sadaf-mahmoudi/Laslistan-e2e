import { test, expect } from '@playwright/test';

test.describe('Navigering mellan vyer', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://tap-ht24-testverktyg.github.io/exam-template/');
  });

  test('Användare kan gå mellan tre vyer: "Katalog", "Lägg till bok" och "Mina böcker"', async ({ page }) => {
    
    // Kontrollera att "Lägg till bok"-knappen finns och är klickbar
    const addBookButton = page.getByRole('button', { name: /lägg till bok/i });
    await expect(addBookButton).toBeEnabled();  // Timeout hanteras automatiskt
    await addBookButton.click();

    // Kontrollera att vi ser "Lägg till ny bok"-knappen när vi är på "Lägg till bok"-vyn
    const addNewBookButton = page.getByRole('button', { name: /lägg till ny bok/i });
    await expect(addNewBookButton).toBeVisible();  // Timeout hanteras automatiskt

    // Gå till "Mina böcker" och kontrollera att ett tomt meddelande visas om inga favoriter finns
    const myBooksButton = page.getByRole('button', { name: /mina böcker/i });
    await expect(myBooksButton).toBeEnabled();
    await myBooksButton.click();

    const emptyMessage = page.getByText(/när du valt, kommer dina favoritböcker att visas här/i);
    await expect(emptyMessage).toBeVisible();

    // Gå till "Katalog" och verifiera att vi ser minst en bok
    const katalogButton = page.locator('[data-testid="catalog"]');
    await expect(katalogButton).toBeEnabled();
    await katalogButton.click();

    const books = page.locator('.book'); // Letar efter minst en bok på katalogsidan
    await expect(books.first()).toBeVisible();
  });
});
