# Personal Library Tracker

A React web application for searching books via the Google Books API and managing a personal wish list.

## Live Demo

**[library-wishlist-app.vercel.app](https://library-wishlist-app.vercel.app)**

## Features

- **Book Search** — Search by title or author with real-time results from the Google Books API
- **Wish List** — Add/remove books to a personal wish list that persists across page refreshes
- **Book Details** — Click any book card to view its full description in a modal
- **Responsive Design** — Works on mobile, tablet, and desktop screens

## Tech Stack

| Layer            | Technology                      |
|------------------|---------------------------------|
| Framework        | React 19 + TypeScript           |
| Build Tool       | Vite 7                          |
| Routing          | React Router v7                 |
| Styling          | Tailwind CSS v4                 |
| State Management | React Context API + useReducer  |
| Persistence      | localStorage                    |
| API              | Google Books API (optional key via `VITE_GOOGLE_BOOKS_API_KEY`) |

## Architecture Decisions

### State Management — Context + localStorage
The wish list state lives in a React Context (`WishListProvider`) so both the Search and Wish List pages can access it. State is initialized from `localStorage` on app load and synced back on every change via `useEffect`.

### Data Fetching — useReducer + AbortController
`useBookSearch` uses `useReducer` to manage the `loading` / `error` / `books` state as a single unit, avoiding cascading re-renders. An `AbortController` cancels in-flight requests when the query changes, preventing stale results from overwriting newer ones.

### Debounce — Separation of Concerns
The `useDebounce` hook lives at the page level (`SearchPage`), not inside `SearchBar`. The search bar is a pure UI component (`value` + `onChange`), while the page orchestrates: raw input → debounced value (600ms, min 2 chars) → API call.

### API Type Mapping
A minimal `GoogleVolumeItem` type captures only the fields we use. A `mapVolumeToBook()` function transforms API responses into our internal `Book` type at the boundary, so the rest of the app never touches `volumeInfo` directly.

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Installation

```bash
git clone https://github.com/pt190800/library-wishlist-app
cd library-wishlist-app
npm install
```

### Environment Variables

Create a `.env.local` file in the project root:

```
VITE_GOOGLE_BOOKS_API_KEY=your_google_books_api_key
```

Without this key the app falls back to unauthenticated requests, which are subject to strict rate limiting and may return `429` errors under normal usage. A free key can be obtained from the [Google Cloud Console](https://console.cloud.google.com/) by enabling the **Books API** under *APIs & Services*.

> `.env.local` is listed in `.gitignore` and will never be committed to the repository.

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── Navbar.tsx              Navigation bar with active route highlighting
│   ├── SearchBar.tsx           Controlled text input (UI only)
│   ├── BookCard.tsx            Book display card with action button slot
│   ├── BookDetailModal.tsx     Modal overlay with full book description
│   └── LoadingSpinner.tsx      CSS spinner for loading states
├── pages/
│   ├── SearchPage.tsx          Search + results grid + debounce logic
│   └── WishListPage.tsx        Saved books grid + empty state
├── context/
│   └── WishListContext.tsx     Wish list state + localStorage sync
├── hooks/
│   ├── useDebounce.ts          Generic debounce hook (600ms default)
│   └── useBookSearch.ts        Google Books API fetch with useReducer
├── types/
│   └── book.ts                 Book type + API types + mapper function
├── App.tsx                     Router + Provider + layout
├── main.tsx                    Entry point
└── index.css                   Tailwind CSS import
```
