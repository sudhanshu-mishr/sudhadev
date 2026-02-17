<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1NylpXdcuf3ylB_zF3QoAJNOKTtSPepgj

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Deploy to Render

This project includes a `render.yaml` file for easy deployment as a Blueprint.

**Frontend (Static Site):**
- **Build Command:** `npm install && npm run build`
- **Publish Directory:** `dist`
- **Environment Variables:**
  - `VITE_API_URL`: URL of the deployed backend service.

**Backend (Web Service):**
- **Build Command:** `cd server && npm install`
- **Start Command:** `cd server && node index.js`
- **Environment Variables:**
  - `GEMINI_API_KEY`: Your Gemini API Key.
