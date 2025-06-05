import { test, expect } from '@playwright/test';

test.describe("Katalogvy", () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://tap-ht24-testverktyg.github.io/exam-template/');
  });
//Test för att säkerställa att alla böcker i katalogen visar både titel och författare
  test("Alla böcker i katalogen visar titel och författare", async ({ page }) => {
    const boklista = [
      { titel: "Hur man tappar bort sin TV-fjärr 10 gånger om dagen", författare: "Bertil Flimmer" },
      { titel: "Kaffekokaren som visste för mycket", författare: "Saga Espresson" },
      { titel: "Min katt är min chef", författare: "Kattis Jamsson" },
      { titel: "100 sätt att undvika måndagar", författare: "Göran Snooze" },
      { titel: "Gräv där du står – och hitta en pizzameny", författare: "Maja Skruv" },
      { titel: "Jag trodde det var tisdag", författare: "Kim Vilsen" },
      { titel: "Att prata med växter – och vad de egentligen tycker om dig", författare: "Flora Tistel" }
    ];

    for (const bok of boklista) {
      await expect(page.getByText(bok.titel)).toBeVisible();
      await expect(page.getByText(bok.författare)).toBeVisible();
    }
  });
//Test för att markera en bok som favorit och kontrollera att den dyker upp i Mina böcker
  test("Markera en bok som favorit och kontrollera att den syns i Mina böcker", async ({ page }) => {
    await page.getByTestId("star-Min katt är min chef").click();
    await page.getByRole("button", { name: "Mina böcker" }).click();

    await expect(page.getByText("Min katt är min chef")).toBeVisible();
  });
//Test för att markera flera böcker som favoriter och kontrollera att båda dyker upp i Mina böcker
  test("Markera flera böcker som favoriter och kontrollera att båda syns", async ({ page }) => {
    await page.getByTestId("star-Gräv där du står – och hitta en pizzameny").click();
    await page.getByTestId("star-Kaffekokaren som visste för mycket").click();
    await page.getByRole("button", { name: "Mina böcker" }).click();

    await expect(page.getByText("Gräv där du står – och hitta en pizzameny")).toBeVisible();
    await expect(page.getByText("Kaffekokaren som visste för mycket")).toBeVisible();
  });
//Test för att avmarkera en favoritbok och säkerställa att den inte längre syns i Mina böcker
  test("Avmarkera en favoritbok – den ska inte synas i Mina böcker", async ({ page }) => {
    await page.getByTestId("star-100 sätt att undvika måndagar").click();
    await page.getByTestId("star-100 sätt att undvika måndagar").click(); 
    await page.getByRole("button", { name: "Mina böcker" }).click();

    await expect(page.getByText("100 sätt att undvika måndagar")).not.toBeVisible();
  });
//Test för att markera, avmarkera och återigen markera en bok som favorit, och verifiera att den syns i Mina böcker
  test("Favorit-ejfavorit-favorit igen, boken ska visas till sist", async ({ page }) => {
    const bok = "Jag trodde det var tisdag";
    await page.getByTestId(`star-${bok}`).click();
    await page.getByTestId(`star-${bok}`).click();
    await page.getByTestId(`star-${bok}`).click();

    await page.getByRole("button", { name: "Mina böcker" }).click();
    await expect(page.getByText(bok)).toBeVisible();
  });

});
