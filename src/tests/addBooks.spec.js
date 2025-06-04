import { test, expect } from '@playwright/test';

test.describe('Lägg till ny bok', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://tap-ht24-testverktyg.github.io/exam-template/');
  });

  test('ska kunna lägga till en ny bok och se den i katalogen', async ({ page }) => {
    const addBookBtn = page.getByRole('button', { name: 'Lägg till bok' });
    const katalogBtn = page.getByRole('button', { name: 'Katalog' });
    const titleInput = page.getByTestId('add-input-title');
    const authorInput = page.getByTestId('add-input-author');
    const saveBtn = page.getByRole('button', { name: 'Lägg till ny bok' });

    // Navigera till "Lägg till bok"
    await addBookBtn.click({ timeout: 500 });
    await expect(page.getByText('Titel')).toBeVisible({ timeout: 500 });

    // Fyll i titel och författare
    await titleInput.fill('Testbok', { timeout: 500 });
    await authorInput.fill('Testförfattare', { timeout: 500 });

    // Klicka på "Lägg till ny bok"
    await saveBtn.click({ timeout: 500 });

    // Navigera till "Katalog" och kontrollera att boken visas
    await katalogBtn.click({ timeout: 500 });
    await expect(page.getByText('Testbok')).toBeVisible({ timeout: 500 });
    await expect(page.getByText('Testförfattare')).toBeVisible({ timeout: 500 });
  });

  test('ska inte tillåta att lägga till bok utan titel', async ({ page }) => {
    const addBookBtn = page.getByRole('button', { name: 'Lägg till bok' });
    const authorInput = page.getByTestId('add-input-author');
    const saveBtn = page.getByRole('button', { name: 'Lägg till ny bok' });

    await addBookBtn.click({ timeout: 500 });
    await authorInput.fill('Testförfattare', { timeout: 500 });

    // Kontrollera att knappen är inaktiv eller inget händer
    await expect(saveBtn).toBeDisabled({ timeout: 500 });
  });

  test('ska inte tillåta att lägga till bok utan författare', async ({ page }) => {
    const addBookBtn = page.getByRole('button', { name: 'Lägg till bok' });
    const titleInput = page.getByTestId('add-input-title');
    const saveBtn = page.getByRole('button', { name: 'Lägg till ny bok' });

    await addBookBtn.click({ timeout: 500 });
    await titleInput.fill('Testbok', { timeout: 500 });

    // Kontrollera att knappen är inaktiv eller inget händer
    await expect(saveBtn).toBeDisabled({ timeout: 500 });
  });

  test('ska nollställa formuläret efter att bok lagts till', async ({ page }) => {
    const addBookBtn = page.getByRole('button', { name: 'Lägg till bok' });
    const titleInput = page.getByTestId('add-input-title');
    const authorInput = page.getByTestId('add-input-author');
    const saveBtn = page.getByRole('button', { name: 'Lägg till ny bok' });

    await addBookBtn.click({ timeout: 500 });
    await titleInput.fill('Testbok', { timeout: 500 });
    await authorInput.fill('Testförfattare', { timeout: 500 });
    await saveBtn.click({ timeout: 500 });

    // Kontrollera att fälten är tomma efter tillägg
    await expect(titleInput).toHaveValue('', { timeout: 500 });
    await expect(authorInput).toHaveValue('', { timeout: 500 });
  });
});
