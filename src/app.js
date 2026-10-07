const express = require("express")

const ConnectDatabase = require("./Day1/database/database");
const User = require("./Day2/user");
const bycript = require("bcrypt")
const app = express();


app.use(express.json());

app.post("/post/user", async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).send("Email already registered")
        };
        const passwordHash = await bycript.hash(password, 10);

        const user = new User({
            firstName,
            lastName,
            email,
            password: passwordHash

        });
        await user.save();
        return res.status(201).send("User created successfully");

    } catch (error) {
        console.error(error);
        res.status(400).send(error.message);
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
