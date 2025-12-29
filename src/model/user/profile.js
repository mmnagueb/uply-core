const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const utils = require("../../utils/index");

var UserProfileSchema = new Schema({
  userAccount: {
    type: Schema.Types.ObjectId,
    ref: "UserAuth",
    required: "User account is required.",
  },
  firstNameAr: { type: String, trim: true },
  middleNameAr: { type: String, trim: true },
  lastNameAr: { type: String, trim: true },
  firstNameEn: { type: String, trim: true },
  middleNameEn: { type: String, trim: true },
  lastNameEn: { type: String, trim: true },
  fullNameAr: {
    type: String,
    trim: true,
    default: function () {
      return this.firstNameAr + " " + this.middleNameAr + " " + this.lastNameAr;
    },
  },
  fullNameEn: {
    type: String,
    trim: true,
    default: function () {
      return [this.firstNameEn, this.middleNameEn, this.lastNameEn]
        .filter(n => n !== undefined)
        .join(" ");
    },
  },
  nationalId: { type: String, trim: true },
  mobileNumber: { type: String, trim: true },
  gender: { type: String, enum: ["male", "female"], trim: true },
  dateOfBirth: { type: Date },
  userCity: { type: String, enum: utils.saudiCities },
  major: { type: String },
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

const UserProfile = model("UserProfile", UserProfileSchema);
module.exports = UserProfile;
