# Shopping List

This app is a small shopping list app (similar to a TODO List) that lets you create, edit and delete groceries to buy.

The app is built using React + TypeScript + Vite and connects to a NODE + Express + postgres backend.

To run the app you must first install dependencies: 
```
npm i
```
- To run locally for development:
```
npm run dev
```
- To build the production app:
```
npm run build
```

The configs are set in a way that it will serve the app at the root path for local development, but under the `/ShoppingList` path for my github pages. Feel free to modify the `vite.config.ts` file and the router under `main.tsx` to adapt it to your needs.