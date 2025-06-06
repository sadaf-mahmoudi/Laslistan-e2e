Projektet innehåller end-to-end-tester för sidan Läslistan.

Först började jag med att skapa en mapp i VS code som heter src och lägga till mappen tests i den, därefter skapade jag en README.md fil och en STORIES.md för att skriva user-stories i den och vad man gjort under projektet. Språk jag har använt är Javascript och Playwright som testverktyg. 

Sedan strukturerade jag filerna korrekt, efter det skrev jag user stories i STORIES.md, därfeter skapade jag fyra filer som skulle testa e2e-tester för läslistan. Jag har testat användarens möjligheter att, lägga till böcker, se och markera favoriter, navigera mellan vyer och säkerställa att data visas korrekt i katalogen och i Mina böcker. Jag gjorde en testfil i taget och testade en och en inte alla fyra testfiler samtidigt tills jag var säker på att alla var gröna, då körde jag alla, och där fick jag 14 tester visade grönt.

Så det som jag har testat i projektet är att jag byggt fyra testfiler som täcker funktionaliteten, skrivit 13 user-stories med acceptanskriterier. Man kör testerna genom att köra npx playwright test eller npm run test-e2e.