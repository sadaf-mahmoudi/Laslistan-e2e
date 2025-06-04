import { test, expect } from '@playwright/test';

test.describe('Mina böcker', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://tap-ht24-testverktyg.github.io/exam-template/');
  });

  test('ska visa ett meddelande om att listan är tom när inga favoritböcker finns', async ({ page }) => {
    // Kontrollera att knappen "Mina böcker" är synlig och klickbar
    const myBooksBtn = page.getByRole('button', { name: 'Mina böcker' });
    await expect(myBooksBtn).toBeVisible();
    await expect(myBooksBtn).toBeEnabled();

    // Klicka på knappen "Mina böcker"
    await myBooksBtn.click({ timeout: 5000 });  // Timeout för att ge tillräckligt med tid för att navigera

    // Vänta på att texten om tom lista ska bli synlig
    const emptyListText = page.getByText(/När du valt/i);
    await expect(emptyListText).toBeVisible({ timeout: 5000 });  // Timeout på 5 sekunder för textens synlighet
  });
});
