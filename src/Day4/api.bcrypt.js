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
