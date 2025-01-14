const e = require("express");
const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: [{ type: String, required: true }],
  correctAnswer: { type: String, required: true },
  why: { type: String },
});

const examSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    date: { type: Date, required: true },
    duration: { type: Number, required: true },
    questions: [questionSchema],
    stage: { type: String, required: true },
    type: {
      type: String,
      default: "امتحان",
      enum: ["امتحان", "تدريب"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Exam", examSchema);
