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
