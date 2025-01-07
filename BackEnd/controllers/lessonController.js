const Lesson = require("../models/Lesson");

const getAllLessons = async (req, res) => {
  // const users = await User.find().select("-password").lean();
  const lessons = await Lesson.find();
  res.json(lessons);
};

const createLesson = async (req, res) => {
  const { title, lesson_link, stage, description, notes } = req.body;
  if (!title) {
    return res.status(400).json({ message: "title field is required" });
  }
  if (!lesson_link) {
    return res.status(400).json({ message: "lesson_link field is required" });
  }
  if (!stage) {
    return res.status(400).json({ message: "stage field is required" });
  }

  try {
    const lesson = await Lesson.create({
      title,
      lesson_link,
      stage,
      description,
      notes,
    });
    return res
      .status(200)
      .json({ message: "The lesson is created successfully", ...lesson });
  } catch (error) {
    console.error("Error creating lesson:", error);
  }

};

const updateLesson = async (req, res) => {
  const { id, title, lesson_link, stage, description, notes } = req.body;
  if (!title) {
    return res.status(400).json({ message: "title field is required" });
  }
  if (!lesson_link) {
    return res.status(400).json({ message: "lesson_link field is required" });
  }
  if (!stage) {
    return res.status(400).json({ message: "stage field is required" });
  }

  const foundLesson = await Lesson.findOne({ username }).exec();

  const lesson = await Lesson.create({
    title,
    lesson_link,
    stage,
    description,
    notes,
  });
  return res
    .status(200)
    .json({ message: "The lesson is created successfully" });
};

module.exports = {
  getAllLessons,
  createLesson,
  updateLesson,
};
