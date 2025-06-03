# Laslistan-e2e
# Läslistan – End-to-End Testning med Playwright

Detta projekt innehåller E2E-tester för webbsidan **Läslistan** – en sida där användare kan se en bokkatalog, favoritmarkera böcker och lägga till egna böcker.

## Projektstruktur

- `src/`: Innehåller all testkod.
- `src/tests/`: Varje vy har en egen `.spec.js`-fil med Playwright-tester.
- `README.md`: Denna fil.
- `STORIES.md`: User stories för all funktionalitet som testas.

## Funktionalitet som testas

- Navigering mellan "Katalog", "Lägg till bok" och "Mina böcker".
- Att alla böcker i katalogen visar både titel och författare.
- Att användaren kan favoritmarkera en bok och se den i "Mina böcker".
- Att användaren kan ta bort en favoritbok.
- Att användaren kan lägga till en egen bok via formulär.

## Köra tester

```bash
npm install
npm run test-e2e
