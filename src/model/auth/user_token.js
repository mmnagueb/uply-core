const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const UserTokenSchema = new Schema({
    username: {
        type: Schema.Types.ObjectId,
        ref: "UserProfile",
        required: "Username is required.",
        trim: true,
        lowercase: true
    },
    accessToken: {
        type: String,
        required: true,
    },
    refreshToken: {
        type: String,
        required: true,
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

UserTokenSchema.pre("save", function (next) {
    this.updatedAt = Date.now();
    next();
});

const UserToken = model("UserToken", UserTokenSchema);
module.exports = UserToken;
