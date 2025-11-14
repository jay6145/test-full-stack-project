const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

app.get("/", (req, res) => {
    res.json({
        status: "API running on Dokploy",
        secret: process.env.API_SECRET || "No env variable"
    });
});

app.listen(3001, () => console.log("API listening on port 3001"));
