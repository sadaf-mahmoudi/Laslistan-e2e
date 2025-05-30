import { test, expect } from '@playwright/test'

test.describe('Navigation', () => {
  test('should navigate to Catalog view', async ({ page }) => {
    await page.goto('https://tap-ht24-testverktyg.github.io/exam-template/')
    await expect(page.getByRole('heading', { name: 'Katalog' })).toBeVisible()
  })

  test('should navigate to Add Book view', async ({ page }) => {
    await page.goto('https://tap-ht24-testverktyg.github.io/exam-template/')
    await page.getByRole('link', { name: 'Lägg till bok' }).click()
    await expect(page.getByRole('heading', { name: 'Lägg till bok' })).toBeVisible()
  })

  test('should navigate to My Books view', async ({ page }) => {
    await page.goto('https://tap-ht24-testverktyg.github.io/exam-template/')
    await page.getByRole('link', { name: 'Mina böcker' }).click()
    await expect(page.getByRole('heading', { name: 'Mina böcker' })).toBeVisible()
  })
})
