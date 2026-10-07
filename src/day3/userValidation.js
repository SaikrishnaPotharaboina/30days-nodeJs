const express = require("express")
const User = require("./Day2/user")
const app = express();
app.use(express.json());
const bcrypt = require('bcrypt')


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
