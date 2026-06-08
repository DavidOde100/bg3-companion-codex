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
  },
  {
    slug: "shadowheart",
    name: "Shadowheart",
    race: "High Half-Elf",
    classType: "Cleric",
    role: "Healing / Support",
    personality: "Secretive, loyal, sharp, and conflicted.",
    backstory: "A cleric with a mysterious past and a hidden connection to Shar.",
    strengths: "Useful for healing, buffs, defense, and support magic.",
    weakness: "Not the strongest damage dealer early on.",
    quote: "I still have a few tricks left.",
    image: "/images/shadowheart.png",
    vibe: "Dark devotion",
    difficulty: "Easy"
  },
  {
    slug: "gale",
    name: "Gale",
    race: "Human",
    classType: "Wizard",
    role: "Magic Damage",
    personality: "Intelligent, dramatic, curious, and ambitious.",
    backstory: "A talented wizard carrying a dangerous magical condition.",
    strengths: "Powerful spells, area damage, and utility magic.",
    weakness: "Low health and needs protection.",
    quote: "A rough tempest I will raise.",
    image: "/images/gale.png",
    vibe: "Arcane scholar",
    difficulty: "Medium"
  },
  {
    slug: "laezel",
    name: "Lae’zel",
    race: "Githyanki",
    classType: "Fighter",
    role: "Frontline Damage",
    personality: "Aggressive, disciplined, blunt, and fearless.",
    backstory: "A warrior raised under strict githyanki traditions.",
    strengths: "Strong melee attacks, armor, and survivability.",
    weakness: "Can be harsh in social situations.",
    quote: "Enough waiting. We strike.",
    image: "/images/laezel.png",
    vibe: "Warrior discipline",
    difficulty: "Easy"
  },
  {
    slug: "wyll",
    name: "Wyll",
    race: "Human",
    classType: "Warlock",
    role: "Ranged Magic",
    personality: "Heroic, honorable, charming, and conflicted.",
    backstory: "A monster hunter known as the Blade of Frontiers.",
    strengths: "Reliable ranged damage and charisma-based dialogue.",
    weakness: "Limited spell slots compared to other casters.",
    quote: "The Blade stands ready.",
    image: "/images/wyll.png",
    vibe: "Hero with a secret",
    difficulty: "Medium"
  },
  {
    slug: "karlach",
    name: "Karlach",
    race: "Tiefling",
    classType: "Barbarian",
    role: "Tank / Melee Damage",
    personality: "Loud, warm-hearted, loyal, and explosive.",
    backstory: "A warrior with an infernal engine burning inside her chest.",
    strengths: "High damage, strong health, and great frontline power.",
    weakness: "Limited ranged options.",
    quote: "Soldier!",
    image: "/images/karlach.png",
    vibe: "Fire-hearted warrior",
    difficulty: "Easy"
  },
  {
    slug: "halsin",
    name: "Halsin",
    race: "Wood Elf",
    classType: "Druid",
    role: "Nature Magic / Shapeshifting",
    personality: "Wise, calm, protective, and grounded.",
    backstory: "A respected druid leader connected deeply to nature.",
    strengths: "Flexible magic, healing, and wild shape forms.",
    weakness: "Can feel less specialized than other companions.",
    quote: "Nature will have its balance.",
    image: "/images/halsin.png",
    vibe: "Guardian of nature",
    difficulty: "Medium"
  },
  {
    slug: "minthara",
    name: "Minthara",
    race: "Drow",
    classType: "Paladin",
    role: "Melee / Divine Damage",
    personality: "Commanding, ruthless, strategic, and intense.",
    backstory: "A drow warrior with a dangerous past and strong convictions.",
    strengths: "Powerful smites, armor, and leadership energy.",
    weakness: "Harder to recruit depending on story choices.",
    quote: "Weakness must be cut away.",
    image: "/images/minthara.png",
    vibe: "Ruthless authority",
    difficulty: "Hard"
  },
  {
    slug: "jaheira",
    name: "Jaheira",
    race: "Half-Elf",
    classType: "Druid",
    role: "Support / Nature Combat",
    personality: "Wise, sarcastic, experienced, and brave.",
    backstory: "A veteran hero with years of battle and leadership behind her.",
    strengths: "Balanced support, nature magic, and experience.",
    weakness: "Joins later in the game.",
    quote: "The old ways still have teeth.",
    image: "/images/jaheira.png",
    vibe: "Veteran protector",
    difficulty: "Medium"
  },
  {
    slug: "minsc",
    name: "Minsc",
    race: "Human",
    classType: "Ranger",
    role: "Physical Damage",
    personality: "Bold, funny, loyal, and unpredictable.",
    backstory: "A legendary ranger known for his courage and his hamster companion.",
    strengths: "Strong physical attacks and fun character energy.",
    weakness: "Joins very late in the game.",
    quote: "Go for the eyes, Boo!",
    image: "/images/minsc.png",
    vibe: "Chaotic heroism",
    difficulty: "Medium"
  },
  {
    slug: "the-dark-urge",
    name: "The Dark Urge",
    race: "Dragonborn",
    classType: "Sorcerer",
    role: "Custom Origin / Magic Damage",
    personality: "Mysterious, violent, haunted, and unpredictable.",
    backstory: "An origin character struggling against dark impulses.",
    strengths: "Unique story content and strong magic potential.",
    weakness: "Story choices can be morally difficult.",
    quote: "Something inside me wants blood.",
    image: "/images/dark-urge.png",
    vibe: "Dark mystery",
    difficulty: "Hard"
  },
  {
    slug: "tav",
    name: "Tav",
    race: "Custom",
    classType: "Custom",
    role: "Player Choice",
    personality: "Defined by the player’s choices.",
    backstory: "A fully custom adventurer shaped by the player.",
    strengths: "Flexible build, personality, and story direction.",
    weakness: "Less preset backstory than origin characters.",
    quote: "The adventure begins with you.",
    image: "/images/tav.png",
    vibe: "Limitless potential",
    difficulty: "Varies"
  }
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