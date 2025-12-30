const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const courseSchema = new Schema(
  {
    courseName: {
      en: {
        type: String,
        required: [true, "Course name (English) is required"],
        trim: true,
      },
      ar: {
        type: String,
        required: [true, "Course name (Arabic) is required"],
        trim: true,
      },
    },
    courseDesc: {
      en: { type: String, trim: true },
      ar: { type: String, trim: true },
    },
    courseStatus: {
      en: {
        type: String,
        enum: ["Open", "Closed"],
        default: "Open",
        required: true,
      },
      ar: {
        type: String,
        enum: ["مفتوح", "مغلق"],
        default: "مفتوح",
        required: true,
      },
    },
    courseDomain: {
      en: {
        type: String,
        enum: ["AI", "Cybersecurity", "IoT", "Mobile", "Web", "Data"],
        required: true,
      },
      ar: {
        type: String,
        enum: [
          "الذكاء الاصطناعي",
          "الأمن السيبراني",
          "إنترنت الأشياء",
          "التطبيقات المحمولة",
          "الويب",
          "البيانات",
        ],
        required: true,
      },
    },
    courseMethod: {
      en: { type: String, enum: ["online", "physical"], required: true },
      ar: { type: String, enum: ["عبر الإنترنت", "حضوري"], required: true },
    },
    courseType: {
      en: { type: String, enum: ["course", "workshop"], required: true },
      ar: { type: String, enum: ["دورة", "ورشة عمل"], required: true },
    },
    courseLocation: {
      en: { type: String, trim: true },
      ar: { type: String, trim: true },
    },

    // Single-language / numeric / other fields
    coursePrice: {
      type: Number,
      required: [true, "Course price is required"],
      min: [0, "Price cannot be negative"],
    },
    courseDiscount: {
      type: Number,
      min: [0, "Discount cannot be negative"],
      max: [100, "Discount cannot exceed 100"],
      default: 0,
    },
    coursePeriod: { type: Date, required: [true, "Course period is required"] },
    courseLength: {
      type: Number,
      required: [true, "Course length is required"],
      min: [0, "Course length cannot be negative"],
    },
    courseImage: { type: String, trim: true },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

courseSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const Course = model("Course", courseSchema);
module.exports = Course;
