Please add your logo to the project's `public/` folder so the app can load it.

Steps:

1. Copy your logo file from:
   C:\Users\hp\Downloads\Bright-Future\public\logo.png

   to this project folder:
   e:\Desktop\Bright-Future\public\logo.png

2. Start the dev server (if not running). For Vite projects in PowerShell use:

   npm run dev

3. Verify:
   - The tab favicon should show the logo (the HTML uses `/logo.png`).
   - The header (in `src/App.tsx`) should display the logo image next to the site title.

Notes:
- If your file has a different name, either rename it to `logo.png` or update the image `src` references in `index.html` and `src/App.tsx`.
- `public` folder in Vite is served at the root, so `/logo.png` will resolve correctly.
