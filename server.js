// Minimal production server for Hostinger's Node.js hosting (Passenger).
// Serves the Vite build in ./dist and falls back to index.html for any
// route that isn't a real file — this is what lets client-side routes
// like /admin, /writer, /engineer, /tithee, /reviews/:slug work when a
// visitor lands on them directly instead of navigating in-app.
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.join(__dirname, "dist");

const app = express();
app.use(express.static(DIST));

app.use((req, res) => {
  // real static assets (js/css/svg/etc.) that genuinely don't exist
  // should still 404 — only unmatched *routes* fall back to index.html.
  if (path.extname(req.path)) return res.status(404).end();
  res.sendFile(path.join(DIST, "index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`unsaidscript listening on port ${PORT}`));
