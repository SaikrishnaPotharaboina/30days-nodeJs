const express = require("express")
const User = require("./Day2/user")
const app = express();
app.use(express.json());

app.post("/post/user", async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;

        const user = new User({
            firstName,
            lastName,
            email,
            password

        });

        const existingUser = await User.findOne({ email })

        if (existingUser) {
            res.status(400).send("Email already registered")
        };


        await user.save();
        res.send("User created successfully");

    } catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }


});
