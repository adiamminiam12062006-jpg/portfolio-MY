# Pravin Kumar V M — Immersive 3D Portfolio

A React + Vite portfolio with a scroll-story layout and a real-time 3D scene built using Three.js and React Three Fiber. It takes inspiration from premium 3D product storytelling patterns, but uses an original developer-workstation visual concept.

## Stack choice
- React + Vite: fast frontend and build tool.
- Three.js + React Three Fiber: interactive real-time 3D.
- Vercel: free hosting for a personal portfolio on the Hobby plan.
- No Express/MongoDB required for this version because the site is static and portfolio content does not need a backend. Add a backend only if you need dynamic content, an admin dashboard, or stored contact messages.

## Run locally on Windows
1. Install Node.js LTS from https://nodejs.org/ if needed.
2. Extract this ZIP.
3. Open `pravin_3d_react_vercel` in VS Code.
4. In VS Code, choose Terminal → New Terminal.
5. Run:
   ```bash
   npm install
   npm run dev
   ```
6. Open the local URL printed by Vite, usually `http://localhost:5173`.

## Add your photo
Copy a clear photo to the `public` folder and name it exactly:
`profile-portrait.png`
It will appear in the floating portrait panel. Without it, the portfolio uses a `PK` placeholder.

## Before publishing
- Replace the example GitHub URLs with your real GitHub profile and repository links.
- Verify the IBM programme details and all profile descriptions/dates.
- Add certificate verification URLs if available.
- Your email and LinkedIn profile are populated from your uploaded profile PDF.

## Deploy free on Vercel
**Option A — GitHub import (recommended)**
1. Create a GitHub repository and push this folder's contents to it.
2. Sign in at https://vercel.com/ and choose **Add New → Project**.
3. Import the GitHub repository.
4. Framework preset should detect Vite. If asked: Build command `npm run build`; Output directory `dist`.
5. Click Deploy. Vercel will give you a `*.vercel.app` address.

**Option B — Vercel CLI**
1. Install Node.js.
2. In this project folder run `npm install`.
3. Run `npm run build` to check the production build.
4. Run `npx vercel` and follow the prompts. For production use `npx vercel --prod`.

The free Vercel Hobby plan is currently intended for personal projects and includes automatic HTTPS and Git-based deployments. Read current limits before publishing: https://vercel.com/docs/plans/hobby

## Important
- A stable internet connection is required for Google Fonts and package downloads.
- WebGL-capable browser/hardware is recommended for the 3D scene.
- The `vercel.json` rewrite supports the client-side portfolio route behavior.
"# Pravin-Portfolio" 
"# Pravin-Portfolio" 
