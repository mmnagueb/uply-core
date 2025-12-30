/// TODO Course Schema
// const mongoose = require("mongoose");
// const { Schema, model } = mongoose;

// var CourseSchema = new Schema({
//     courseNameEn: {
//         type: String,
//         required: true,
//         trim: true,
//         lowercase: true,
//     },
//     email: {
//         type: String,
//         required: true,
//         trim: true,
//         lowercase: true,
//     },
//     password: { 
//         type: String, 
//         required: true,
//     },
//     // auto-generated from backend
//     createdAt: {
//         type: Date,
//         default: () => Date.now(),
//         immutable: true,
//     },
//     // auto-generated from backend
//     updatedAt: {
//         type: Date,
//     },
// });

// CourseSchema.pre("save", function (next) {
//     this.updatedAt = Date.now();
//     next();
// });

// const Course = model("CourseSchema", CourseSchema);
// module.exports = Course;