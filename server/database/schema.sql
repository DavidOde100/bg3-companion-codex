DROP TABLE IF EXISTS characters;

CREATE TABLE characters (
    id SERIAL PRIMARY KEY,
    slug VARCHAR(100) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    race VARCHAR(100) NOT NULL,
    class_type VARCHAR(100) NOT NULL,
    role VARCHAR(150) NOT NULL,
    personality TEXT NOT NULL,
    backstory TEXT NOT NULL,
    strengths TEXT NOT NULL,
    weakness TEXT NOT NULL,
    quote TEXT,
    image VARCHAR(255),
    vibe VARCHAR(100),
    difficulty VARCHAR(50)
);