const Lesson = require("../models/Lesson");

const getAllLessons = async (req, res) => {
  // const users = await User.find().select("-password").lean();
  const lessons = await Lesson.find();
  res.json(lessons);
};

const createLesson = async (req, res) => {
  const { title, lesson_link, stage, description, notes } = req.body;
  if (!title) {
    return res.status(400).json({ message: " العنوان مطلوب" });
  }
  if (!lesson_link) {
    return res.status(400).json({ message: " رابط الفيديو مطلوب" });
  }
  if (!stage) {
    return res.status(400).json({ message: "المرحلة الدراسية مطلوبة" });
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
      .json({ message: "الفيديو تم انشاءه بنجاح", ...lesson });
  } catch (error) {
    console.error("Error creating lesson:", error);
  }

};

const updateLesson = async (req, res) => {
  const { id, title, lesson_link, stage, description, notes } = req.body;
  if (!title) {
    return res.status(400).json({ message: "العنوان مطلوب" });
  }
  if (!lesson_link) {
    return res.status(400).json({ message: " رابط الفيديو مطلوب" });
  }
  if (!stage) {
    return res.status(400).json({ message: "المرحلة الدراسية مطلوبة" });
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
    .json({ message: "الفيديو تم انشاءه بنجاح" });
};

module.exports = {
  getAllLessons,
  createLesson,
  updateLesson,
};
