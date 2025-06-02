import { test, expect } from '@playwright/test';

test.describe('Mina böcker', () => {
  // Körs före varje test – går till webbplatsens startsida
  test.beforeEach(async ({ page }) => {
    await page.goto('https://tap-ht24-testverktyg.github.io/exam-template/');
  });

  test('ska visa tom lista eller favoritböcker', async ({ page }) => {
    // Hitta och klicka på knappen för "Mina böcker"
    const myBooksBtn = page.getByRole('button', { name: 'Mina böcker' });
    await myBooksBtn.click();

    // Hämtar texten som visas om inga favoritböcker är valda
    const tomText = page.getByText(/När du valt/i);
    await expect(tomText).toBeVisible();  //Förväntar sig att texten är synlig
  });
});
