const Lesson = require("../models/Lesson");

const getAllLessons = async (req, res) => {
  try {
    const { role, stage, subject } = req;
    console.log('subject', subject);
        
    let lessons;
    if (role === "admin") {
      lessons = await Lesson.find();
    } else if (stage) {
      lessons = await Lesson.find({ stage, subject : subject === "تاريخ وجغرافيا" ? { $exists: true } : subject });
      console.log(lessons);
      
    } else {
      // If the user has no stage (and is not admin), return an error
      return res.status(403).json({ message: "Access denied" });
    }
    return res.status(200).json(lessons);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createLesson = async (req, res) => {
  const { title, lesson_link, stage, description, notes, subject } = req.body;
  if (!title) {
    return res.status(400).json({ message: " العنوان مطلوب" });
  }
  if (!lesson_link) {
    return res.status(400).json({ message: " رابط الفيديو مطلوب" });
  }
  if (!stage) {
    return res.status(400).json({ message: "المرحلة الدراسية مطلوبة" });
  }
  if (!subject) {
    return res.status(400).json({ message: "المادة الدراسية مطلوبة" });
  }

  try {
    const lesson = new Lesson({
      title,
      lesson_link,
      stage,
      description,
      notes,
      subject,
    });
    await lesson.save();

    return res
      .status(200)
      .json({ message: "الفيديو تم انشاءه بنجاح", ...lesson });
  } catch (error) {
    console.error("Error creating lesson:", error);
  }
};

const updateLesson = async (req, res) => {
  const { id } = req.params;
  const { title, lesson_link, stage, description, notes, subject } = req.body;
  if (!title) {
    return res.status(400).json({ message: "العنوان مطلوب" });
  }
  if (!lesson_link) {
    return res.status(400).json({ message: " رابط الفيديو مطلوب" });
  }
  if (!stage) {
    return res.status(400).json({ message: "المرحلة الدراسية مطلوبة" });
  }

  if (!subject) {
    return res.status(400).json({ message: "المادة الدراسية مطلوبة" });
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

  return res.status(200).json({ message: "تم حذف الفيديو بنجاح" });
};

module.exports = {
  getAllLessons,
  createLesson,
  updateLesson,
  deleteLesson,
};
