const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    username: { type: String,required:true},
    avatar: { type: String },
    bio: { type: String },
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User"}],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User"}],
    profilePicture: {
        type: String,
        default: '', // Default profile picture
    },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
