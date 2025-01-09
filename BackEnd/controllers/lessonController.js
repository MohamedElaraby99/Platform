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
  const { id } = req.params;
  const { title, lesson_link, stage } = req.body;
  if (!title) {
    return res.status(400).json({ message: "العنوان مطلوب" });
  }
  if (!lesson_link) {
    return res.status(400).json({ message: " رابط الفيديو مطلوب" });
  }
  if (!stage) {
    return res.status(400).json({ message: "المرحلة الدراسية مطلوبة" });
  }

  const lesson = await Lesson.findByIdAndUpdate(id, req.body);

  if (!lesson) {
    return res.status(404).json({ message: "الفيديو غير موجود" });
  }

  const updatedLesson = await Lesson.findById(id);
  return res.status(200).json(updatedLesson);
};

const deleteLesson = async (req, res) => {
  const { id } = req.params;
  const lesson = await Lesson.findByIdAndDelete(id);

  if (!lesson) {
    return res.status(404).json({ message: "الفيديو غير موجود" });
  }

  return res.status(200).json({message: "تم حذف الفيديو بنجاح"});
};

module.exports = {
  getAllLessons,
  createLesson,
  updateLesson,
  deleteLesson
};
