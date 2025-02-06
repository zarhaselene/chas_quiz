## Gruppuppgift: Skapa ett Quiz med Next.js och Global StateS

I det här gruppprojektet ska ni skapa ett interaktivt quiz med hjälp av Next.js och Context för global state-hantering.

## Sätt upp projektet

Öppna en terminal och navigera (cd) till den katalog där ni vill skapa ert projekt.
Skapa ett nytt Next.js-projekt: npx create-next-app@latest quiz-app.
Gå in i projektet: cd quiz-app.
Projektinstruktioner
Använd Next.js routing för att skapa minst två sidor: en Admin-sida och en Quiz-sida.

## På Admin-sidan ska administratörer kunna lägga till, ta bort och uppdatera quizfrågor.

## På Quiz-sidan ska användare kunna starta ett quiz, välja svar på flervalsfrågor, och till slut se sitt resultat.

## Designa quizfrågor som flervalsfrågor där användaren väljer ett svar från flera alternativ.

## Överväg vilken data som behövs för att skapa frågor med tillhörande svarsalternativ och hur ni kan hålla reda på antal rätt i ett quiz.

## Implementera lämpliga Context-metoder för att hantera tillstånd och logik.

🏃 Extrauppgifter

## Lägg till spelare: Implementera funktionalitet för att låta användare ange sina namn innan de startar quizet. Håll reda på vilken spelare som spelar och visa en high-score-sida med de bästa resultaten.

## Skapa flera quiz: Utveckla applikationen så att den har flera olika quiz på separata sidor. Användare kan välja vilket quiz de vill ta från en huvudmeny.

## Använd localStorage: Implementera localStorage för att spara och ladda quizfrågor, så att admin kan återanvända dem även efter att webbläsaren stängts.

## Responsiv design: Se till att ert quiz ser bra ut och fungerar på både mobiltelefoner, surfplattor och datorer.

## Stil och användarupplevelse: Använd CSS eller ett ramverk som Tailwind CSS för att förbättra användargränssnittet och användarupplevelsen på er quizsida.

<!-- This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/pages/api-reference/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/pages/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn-pages-router) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/pages/building-your-application/deploying) for more details. -->
