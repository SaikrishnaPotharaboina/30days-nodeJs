const express = require("express");
const app = express();

const ConnectDatabase = require("./database/database");

ConnectDatabase()
    .then(() => {
        console.log("✅ Connected successfully with DB");

        app.listen(3000, () => {
            console.log("🚀 Server is successfully listening on port 3000");
        });
    })
    .catch((err) => {
        console.error("❌ Connection error with DB:");
        console.error(err);
    });
