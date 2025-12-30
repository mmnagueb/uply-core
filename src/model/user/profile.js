const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const utils = require("../../utils/index");

function validateCity(city) {
  return utils.saudiCities.includes(city);
}
var UserProfileSchema = new Schema(
  {
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
    nationalId: { type: String, trim: true },
    mobileNumber: { type: String, trim: true },
    gender: { type: String, enum: ["male", "female"], trim: true },
    dateOfBirth: { type: Date },
    userCity: {
      type: String,
      enum: utils.saudiCities, 
      validate: [validateCity, "City is not valid"],
    },
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
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

UserProfileSchema.virtual("fullNameAr").get(function () {
  return [this.firstNameAr, this.middleNameAr, this.lastNameAr]
    .filter(Boolean)
    .join(" ");
});

UserProfileSchema.virtual("fullNameEn").get(function () {
  return [this.firstNameEn, this.middleNameEn, this.lastNameEn]
    .filter(Boolean)
    .join(" ");
});

UserProfileSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const UserProfile = model("UserProfile", UserProfileSchema);
module.exports = UserProfile;
