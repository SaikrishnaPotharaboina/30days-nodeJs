const express = require("express")

const ConnectDatabase = require("./Day1/database/database");
const User = require("./Day2/user");
const bycript = require("bcrypt")
const app = express();
const jwt = require('jsonwebtoken');

const cookieParser = require('cookie-parser');



app.use(express.json());
app.use(cookieParser());

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



app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        // Email not found
        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        // Check password
        const isPasswordValid = await user.validatePassword(password);

        if (!isPasswordValid) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }
        const token = await user.getJWT();

        res.cookie("token", token);
        console.log(token)

        // Login successful
        return res.status(200).json({
            message: "Login successful",
            data: user
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Something went wrong",
            error: error.message
        });
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
