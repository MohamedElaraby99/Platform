const mongoose = require("mongoose");

const announcementSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  stage: {
    type: Object,
    required: true,
  },
});

module.exports = mongoose.model("Announcement", announcementSchema);
