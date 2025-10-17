# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# Pinterest-style Image Gallery

A responsive Pinterest-style image gallery built with Vite + React + Tailwind CSS using the Unsplash API. Supports infinite scroll, pagination controls, and a modal lightbox.

## Features
- Masonry layout (CSS columns) — images keep aspect ratio
- Responsive: Mobile 1 column, Tablet 2–3 columns, Desktop 4–5 columns
- Infinite scroll (20 images per request)
- Pagination controls + current page display (works together with infinite scroll)
- Image modal / lightbox (click outside, Esc, X to close)
- Loading states and user-friendly error handling

## Tech stack
- Vite + React
- Tailwind CSS (all styling)
- Axios
- @tanstack/react-query (for fetching & caching)
- Unsplash API

## Setup

### Prerequisites
- Node.js >= 18 (recommended) and npm
- Unsplash developer account and an Access Key: https://unsplash.com/developers

### Installation
1. Clone repo:
   ```bash
   git clone https://github.com/shailysharma13/Vite-React-pinterest-gallery.git
   cd pinterest-gallery