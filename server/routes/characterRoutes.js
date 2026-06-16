const express = require("express");
const pool = require("../config/database");

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const search = req.query.search?.trim() || "";
        const requestedField = req.query.field || "name";

        const searchableFields = {
            name: "name",
            race: "race",
            class: "class_type",
            role: "role",
            difficulty: "difficulty"
        };

        const databaseColumn =
            searchableFields[requestedField] || "name";

        let query = `
            SELECT
                id,
                slug,
                name,
                race,
                class_type AS "classType",
                role,
                personality,
                backstory,
                strengths,
                weakness,
                quote,
                image,
                vibe,
                difficulty
            FROM characters
        `;

        const values = [];

        if (search !== "") {
            query += ` WHERE ${databaseColumn} ILIKE $1`;
            values.push(`%${search}%`);
        }

        query += " ORDER BY name ASC";

        console.log("Search:", {
            search,
            requestedField,
            databaseColumn
        });

        console.log("SQL Query:", query.trim());
        console.log("Values:", values);

        const result = await pool.query(query, values);

        console.log("Rows returned from DB:", result.rows.length);

        res.json(result.rows);
    } catch (error) {
        console.error("Failed to retrieve characters:", error);

        res.status(500).json({
            error: "Unable to retrieve characters."
        });
    }
});

router.get("/:slug", async (req, res) => {
    try {
        const query = `
            SELECT
                id,
                slug,
                name,
                race,
                class_type AS "classType",
                role,
                personality,
                backstory,
                strengths,
                weakness,
                quote,
                image,
                vibe,
                difficulty
            FROM characters
            WHERE slug = $1
        `;

        const result = await pool.query(query, [req.params.slug]);

        if (result.rows.length === 0) {
            return res.status(404).json({
                error: "Character not found."
            });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error("Failed to retrieve character:", error);

        res.status(500).json({
            error: "Unable to retrieve character."
        });
    }
});

module.exports = router;