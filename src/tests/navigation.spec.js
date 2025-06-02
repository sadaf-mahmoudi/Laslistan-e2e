import { test, expect } from '@playwright/test';

test.describe('Navigering mellan vyer', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://tap-ht24-testverktyg.github.io/exam-template/');
  });

  test('ska kunna navigera mellan Katalog, Lägg till bok och Mina böcker', async ({ page }) => {
    const katalogBtn = page.getByRole('button', { name: 'Katalog' });
    const addBookBtn = page.getByRole('button', { name: 'Lägg till bok' });
    const myBooksBtn = page.getByRole('button', { name: 'Mina böcker' });

    // Navigera till "Lägg till bok" och kontrollera att "Titel" visas
    await addBookBtn.click();
    await expect(page.getByText('Titel')).toBeVisible();

    // Gå till "Katalog" och kontrollera att "Bertil Flimmer" visas
    await katalogBtn.click();
    await expect(page.getByText('Bertil Flimmer')).toBeVisible();

    // Gå till "Mina böcker" och kontrollera tom lista
    await myBooksBtn.click();
    await expect(page.getByText(/När du valt/i)).toBeVisible();

    // Navigera tillbaka till "Katalog" och kontrollera igen
    await katalogBtn.click();
    await expect(page.getByText('Bertil Flimmer')).toBeVisible();
  });
});
