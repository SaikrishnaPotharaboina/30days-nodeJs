const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt")
const JWT = require("jsonwebtoken")

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("inavalid email : " + value)
            }
        },
    },
    password: {
        type: String,
        required: true,
        unique: true,
        validate(value) {
            if (!validator.isStrongPassword(value)) {
                throw new Error("password is not Strong")
            }
        },
    },
}, { timestamps: true });




userSchema.methods.getJWT = async function () {
    const user = this;
    const token = await JWT.sign({ _id: user._id }, "SAI@!143", { expiresIn: "1d" });
    return token;
};

userSchema.methods.validatePassword = async function (passwordInputByUser) {
    const user = this;
    const passwordHash = user?.password;
    const isPasswordValid = await bcrypt.compare(passwordInputByUser, passwordHash);
    return isPasswordValid
};


const User = mongoose.model("User", userSchema);

module.exports = User;
