const mongoose = require("mongoose");
const validator = require("validator")

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

const User = mongoose.model("User", userSchema);

module.exports = User;
