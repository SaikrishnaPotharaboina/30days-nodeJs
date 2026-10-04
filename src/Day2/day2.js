const express = require("express")

const ConnectDatabase = require("./Day1/database/database");
const User = require("./Day2/user")
const app = express();






app.get("/user/:id", async (req, res) => {
    try {

        const id = req.params.id;

        const user = await User.findById(id);

        res.send(user);
        console.log(user);

    } catch (error) {
        console.error(error);
        res.status(500).send("Something went wrong");
    }
});

app.get("/user/:id", async (req, res) => {
    try {

        const id = req.params.id;

        const user = await User.findByIdAndUpdate(id, { firstName: "krishna" }, { new: true });

        res.send(user);
        console.log(user);

    } catch (error) {
        console.error(error);
        res.status(500).send("Something went wrong");
    }
});

app.get("/user/:id", async (req, res) => {
    try {

        const id = req.params.id;

        const user = await User.findByIdAndUpdate(id, { firstName: "krishna" }, { new: true });

        res.send(user);
        console.log(user);

    } catch (error) {
        console.error(error);
        res.status(500).send("Something went wrong");
    }
});


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
