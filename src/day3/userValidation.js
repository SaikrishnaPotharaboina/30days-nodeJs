const express = require("express")
const User = require("./Day2/user")
const app = express();
app.use(express.json());
const bcrypt = require('bcrypt')

app.post("/post/user", async (req, res) => {
    try {


        const { firstName, lastName, email, password } = req.body;

        const passwordHash = await password.bcrypt(password, 10);

        const user = new User({
            firstName,
            lastName,
            email,
            password: passwordHash

        });

        const existingUser = await User.findOne({ email })

        if (existingUser) {
            res.status(400).send("Email already registered")
        };


        const savedUser = await user.save();
        res.status(200).json({
            message: "User created successfully",
            data: savedUser
        });

    } catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }


});
