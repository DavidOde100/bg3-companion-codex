// Backup of original root-level server.js (in-memory character list)
// Renamed to avoid accidental execution — the active server is `server/server.js`.
// Original content preserved below.
// ---------------- BEGIN ORIGINAL ----------------
// Simple Express server for the companion codex
const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000; // local dev port

// Serve static files from the `public` folder
app.use(express.static(path.join(__dirname, "public")));

// In-memory list of companion characters (used by API and pages)
const characters = [
  {
    slug: "astarion",
    name: "Astarion",
    race: "High Elf",
    classType: "Rogue",
    role: "Stealth / Lockpicking",
    personality: "Charming, sarcastic, dramatic, and dangerous.",
    backstory: "A vampire spawn trying to escape the control of his former master.",
    strengths: "Great for stealth, traps, persuasion, and sneak attacks.",
    weakness: "Can be fragile in direct combat.",
    quote: "Careful, I bite.",
    image: "/images/astarion.png",
    vibe: "Chaotic elegance",
    difficulty: "Medium"
  }
  // ... (original file contained the full list)
];

// Root page - serves the index HTML
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// API: return all characters as JSON
app.get("/api/characters", (req, res) => {
  res.json(characters);
});

// API: return a single character by `slug`
app.get("/api/characters/:slug", (req, res) => {
  const character = characters.find((char) => char.slug === req.params.slug);

  if (!character) {
    // Not found -> JSON 404
    return res.status(404).json({ error: "Character not found" });
  }

  res.json(character);
});

// Page route: serve the character detail page (client will fetch JSON)
app.get("/characters/:slug", (req, res) => {
  const character = characters.find((char) => char.slug === req.params.slug);

  if (!character) {
    // If slug unknown, show friendly 404 page
    return res.status(404).sendFile(path.join(__dirname, "public", "404.html"));
  }

  res.sendFile(path.join(__dirname, "public", "detail.html"));
});

// Fallback 404 for any other routes
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "public", "404.html"));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

// ----------------- END ORIGINAL -----------------
