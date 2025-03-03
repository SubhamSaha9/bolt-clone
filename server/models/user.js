const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
    },
    image: {
        type: String,
    },
    token: {
        type: Number,
        default: 50000
    }
},
    { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;