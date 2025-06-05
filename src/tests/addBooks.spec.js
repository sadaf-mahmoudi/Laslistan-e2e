import { test, expect } from '@playwright/test';

test.describe("Lägg till bok", () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://tap-ht24-testverktyg.github.io/exam-template/');
  });

  //Test för att lägga till en bok och kontrollera att den visas i katalogen
  test("En ny bok med titel och författare visas i katalogen", async ({ page }) => {
    await page.getByRole("button", { name: "Lägg till bok" }).click();  
    await page.getByTestId("add-input-title").fill("Så här försover du dig med stil");  
    await page.getByTestId("add-input-author").fill("Lena Snoozberg");  
    await page.getByRole("button", { name: "Lägg till ny bok" }).click(); 

    await page.getByRole("button", { name: "Katalog" }).click();  // Navigerar till katalogvyn

    await expect(page.getByText("Så här försover du dig med stil")).toBeVisible();  // Verifierar att boken syns
    await expect(page.getByText("Lena Snoozberg")).toBeVisible();  //Här verifieras att författaren syns
  });

  //Test för att säkerställa att Lägg till ny bok-knappen är inaktiv om titel saknas
  test("Spara-knappen ska vara avstängd om titel saknas", async ({ page }) => {
    await page.getByRole("button", { name: "Lägg till bok" }).click();  // Klickar på "Lägg till bok"
    await page.getByTestId("add-input-author").fill("Bengt Pennlös");  
    const knapp = page.getByRole("button", { name: "lägg till ny bok" });  
    await expect(knapp).toBeDisabled();  
  });

  //Test för att säkerställa att "Lägg till ny bok-knappen är inaktiv om författare saknas
  test("Spara-knappen ska vara avstängd om författare saknas", async ({ page }) => {
    await page.getByRole("button", { name: "Lägg till bok" }).click();  
    await page.getByTestId("add-input-title").fill("Osynliga boken");  // Fyller i titel
    const knapp = page.getByRole("button", { name: "lägg till ny bok" });  
    await expect(knapp).toBeDisabled();  
  });

  //Test för att säkerställa att formuläret rensas efter att en bok lagts till
  test("Formuläret rensas efter att en bok läggs till", async ({ page }) => {
    await page.getByRole("button", { name: "Lägg till bok" }).click(); 
    await page.getByTestId("add-input-title").fill("Morgonrutiner för nattugglor");  
    await page.getByTestId("add-input-author").fill("Nina Mörker");  
    await page.getByRole("button", { name: "Lägg till ny bok" }).click(); 

    await expect(page.getByTestId("add-input-title")).toHaveValue("");  //Här verifieras titelfältet tom
    await expect(page.getByTestId("add-input-author")).toHaveValue("");  
  });

});
