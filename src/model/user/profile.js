const mongoose = require("mongoose");
const { Schema, model } = mongoose;

var UserProfileSchema = new Schema({
    first_name: {
        type: String,
        // required: "First name is required.",
        trim: true,
    },
    last_name: {
        type: String,
        trim: true,
    },
    username: {
        type: String,
        required: "Username is required.",
        // unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: "Email is required.",
        // unique: true,
        trim: true, 
    },
    // auto-generated from backend
    createdAt: {
        type: Date,
        default: () => Date.now(),
        immutable: true,
    },
    // auto-generated from backend
    updatedAt: {
        type: Date,
    },
});

UserProfileSchema.pre("save", function (next) {
    this.updatedAt = Date.now();
    next();
});

const userProfile = model("userProfile", UserProfileSchema);
module.exports = userProfile;
