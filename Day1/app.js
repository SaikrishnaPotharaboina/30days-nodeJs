const express = require("express");
const mongoose = require("mongoose");

const app = express();

const ConnectDatabase = require("./database/database");

const dummyUsers = [
    {
        name: "Saikrishna",
        age: 22,
        email: "saikrishna@gmail.com"
    },
    {
        name: "Rahul",
        age: 23,
        email: "rahul@gmail.com"
    },
    {
        name: "Arjun",
        age: 24,
        email: "arjun@gmail.com"
    },
    {
        name: "Priya",
        age: 21,
        email: "priya@gmail.com"
    }
];

ConnectDatabase()
    .then(async () => {
        console.log("✅ Connected successfully with DB");

        const db = mongoose.connection.db;

        await db.collection("users").insertMany(dummyUsers);

        console.log("✅ Dummy data inserted");

        app.listen(3000, () => {
            console.log("🚀 Server running on port 3000");
        });
    })
    .catch((err) => {
        console.error("❌ Database connection error:");
        console.error(err);
    });
