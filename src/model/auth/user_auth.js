const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const bcrypt = require("bcrypt");
const SALT_WORK_FACTOR = 10;

var UserAuthSchema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    password: { type: String, required: true },
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

UserAuthSchema.pre("save", function (next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified("password")) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) return next(err);
            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

UserAuthSchema.pre("save", function (next) {
    this.updatedAt = Date.now();
    next();
});

UserAuthSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

const UserAuth = model("UserAuth", UserAuthSchema);
module.exports = UserAuth;