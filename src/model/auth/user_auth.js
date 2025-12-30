const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const bcrypt = require("bcrypt");
const SALT_WORK_FACTOR = 10;

/**
 * Validates whether an email address:
 * 1. Has a valid email format
 * 2. Belongs to an allowed list of common email providers
 *
 * This function performs **client-side validation only**.
 * It does NOT check whether the email actually exists.
 *
 * @param {string} email - The email address to validate
 * @returns {boolean} Returns true if the email format is valid
 *                    and the provider is allowed; otherwise false
 *
 * @example
 * validateEmail("user@gmail.com");     // true
 * validateEmail("user@unknown.com");   // false
 * validateEmail("user@gmail");         // false
 * validateEmail("user@gmail.c");       // false
 * validateEmail("@gmail.c");           // false
 */
function validateEmail(email) {
  if (typeof email !== "string") {
    return false;
  }

  const trimmedEmail = email.trim().toLowerCase();

  // Basic email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!emailRegex.test(trimmedEmail)) {
    return false;
  }

  const allowedProviders = [
    "gmail.com",
    "yahoo.com",
    "outlook.com"
  ];
  const domain = trimmedEmail.split("@")[1];
  return allowedProviders.includes(domain);
}

/**
 * Validates whether a password meets defined complexity requirements.
 *
 * Rules:
 * - Minimum 8 characters
 * - At least one uppercase letter
 * - At least one lowercase letter
 * - At least one number
 * - At least one special character
 *
 * @param {string} password - The password to validate
 * @returns {boolean} Returns true if the password is strong enough,
 *                    otherwise false
 */
function validatePassword(password) {
  if (typeof password !== "string") {
    return false;
  }

  const minLength = 8;
  const hasUpperCase = /[A-Z]/;
  const hasLowerCase = /[a-z]/;
  const hasNumber = /[0-9]/;
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;

  return (
    password.length >= minLength &&
    hasUpperCase.test(password) &&
    hasLowerCase.test(password) &&
    hasNumber.test(password) &&
    hasSpecialChar.test(password)
  );
}

var UserAuthSchema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        maxlength: [25, "username should be less than 25 characters"],
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        /// TODO: below validator will be enabled prior go-live
        // validate: [validateEmail, "Email address is not valid"],
    },
    password: { 
        type: String, 
        required: true,
        /// TODO: below validator will be enabled prior go-live
        // validate: [validatePassword, "Password is not complex."],
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