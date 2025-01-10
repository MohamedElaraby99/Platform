const Announcement = require("../models/Announcement");

const getAnnouncements = async (req, res) => {
  const announcements = await Announcement.find();
  res.status(200).json(announcements);
};

const createAnnouncement = async (req, res) => {
  const { title, description, stage } = req.body;
  if (!title) {
    return res.status(400).json({ message: "العنوان مطلوب" });
  }
  if (!description) {
    return res.status(400).json({ message: " الوصف مطلوب" });
  }
  if (!stage) {
    return res.status(400).json({ message: "المرحلة الدراسية مطلوبة " });
  }

  const announcement = await Announcement.create({
    title,
    description,
    stage,
  });
  return res.status(200).json(announcement);
};

const updateAnnouncement = async (req, res) => {
  const { id } = req.params;
  const { title, description, stage } = req.body;
  if (!title) {
    return res.status(400).json({ message: "العنوان مطلوب" });
  }
  if (!description) {
    return res.status(400).json({ message: " الوصف مطلوب" });
  }
  if (!stage) {
    return res.status(400).json({ message: "المرحلة الدراسية مطلوبة " });
  }

  const announcement = await Announcement.findByIdAndUpdate(id, {
    ...req.body,
  });

  if (!announcement) {
    return res.status(404).json({ message: "الإعلان غير موجود" });
  }

  const updatedAnnouncement = await Announcement.findById(id);
  return res.status(200).json(updatedAnnouncement);
};

const deleteAnnouncement = async (req, res) => {
  const { id } = req.params;
  const announcement = await Announcement.findByIdAndDelete(id);
  if (!announcement) {
    return res.status(404).json({ message: "الإعلان غير موجود" });
  }
  return res.status(200).json({ message: "تم حذف الإعلان بنجاح" });
};

module.exports = {
  getAnnouncements,
  createAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
};
