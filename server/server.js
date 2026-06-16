require("dotenv").config();

const express = require("express");
const path = require("path");

const pool = require("./config/database");
const characterRoutes = require("./routes/characterRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

const clientPath = path.join(__dirname, "../client");

app.use(express.json());
app.use(express.static(clientPath));

app.use("/api/characters", characterRoutes);

app.get("/api/database-test", async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT NOW() AS current_time"
        );

        res.json({
            connected: true,
            databaseTime: result.rows[0].current_time
        });
    } catch (error) {
        console.error("Database test failed:", error);

        res.status(500).json({
            connected: false,
            error: "Unable to connect to PostgreSQL"
        });
    }
});

app.get("/", (req, res) => {
    res.sendFile(path.join(clientPath, "index.html"));
});

app.get("/characters/:slug", async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT slug FROM characters WHERE slug = $1",
            [req.params.slug]
        );

        if (result.rows.length === 0) {
            return res
                .status(404)
                .sendFile(path.join(clientPath, "404.html"));
        }

        res.sendFile(path.join(clientPath, "detail.html"));
    } catch (error) {
        console.error("Failed to check character:", error);

        res.status(500).send("Internal server error");
    }
});

app.use((req, res) => {
    res.status(404).sendFile(
        path.join(clientPath, "404.html")
    );
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});