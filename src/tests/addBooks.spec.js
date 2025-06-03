import { test, expect } from '@playwright/test';

test.describe('Lägga till ny bok i katalogen', () => {

  test.beforeEach(async ({ page }) => {
    // Öppna applikationen innan varje test
    await page.goto('https://tap-ht24-testverktyg.github.io/exam-template/');
  });

  test('ska kunna lägga till en ny bok och se den i katalogen', async ({ page }) => {
    // Hämta knappar och formulärfält
    const addBookBtn = page.getByRole('button', { name: 'Lägg till bok' });
    const katalogBtn = page.getByRole('button', { name: 'Katalog' });
    const titleInput = page.getByTestId('add-input-title');
    const authorInput = page.getByTestId('add-input-author');
    const saveBtn = page.getByRole('button', { name: 'Lägg till ny bok' });

    // 1. Navigera till "Lägg till bok"
    await addBookBtn.click();
    await expect(page.getByText('Titel')).toBeVisible();

    // 2. Fyll i bokinformation
    await titleInput.fill('testTitle');
    await authorInput.fill('testAuthor');

    // 3. Klicka på "Lägg till ny bok"
    await saveBtn.click();

    // 4. Navigera till "Katalog" och verifiera att boken visas
    await katalogBtn.click();
    await expect(page.getByText('testAuthor')).toBeVisible();
  });
});
