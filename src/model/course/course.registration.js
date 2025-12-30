const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const CourseRegistrationSchema = new Schema(
  {
    courseId: {
      type: Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "UserProfile",
      required: true,
    },
    registerationStatus: {
      en: { type: String, enum: ['Submitted', 'Under Review', 'Accepted', 'Rejected'], default: 'Submitted'},
      ar: { type: String, enum: ['بالانتظار', 'تحت المراجعة', ' مقبول', 'مرفوض'], default: 'بالانتظار'},
    },
    paymentStatus: { type: Boolean, default: false },
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
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

CourseRegistrationSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const CourseRegistration = model(
  "CourseRegistration",
  CourseRegistrationSchema
);
module.exports = CourseRegistration;
