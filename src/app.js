const express = require("express");
const mongoose = require("mongoose");

const app = express();

const ConnectDatabase = require("./Day1/database/database");

ConnectDatabase()
    .then(async () => {
        console.log("✅ Connected successfully with DB");
        app.listen(3000, () => {
            console.log("🚀 Server running on port 3000");
        });
    })
    .catch((err) => {
        console.error("❌ Database connection error:");
        console.error(err);
    });
