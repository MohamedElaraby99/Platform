const mongoose = require("mongoose");

const lessonSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  lesson_link: {
    type: String,
    required: true,
  },
  stage: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  notes: {
    type: String,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model("Lesson", lessonSchema);
