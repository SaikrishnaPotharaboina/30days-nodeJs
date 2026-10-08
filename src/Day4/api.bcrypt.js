const User = require("../Day2/user")
const bcrypt = require("bcrypt")

app.post("/post/user", async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).send("Email already registered")
        };

        //bcrypt.hash its convert into hash ex Saikrishna => a random hash($s$udfhoofhedhf244f).. help full for password encrypted.
        const passwordHash = await bcrypt.hash(password, 10);

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
