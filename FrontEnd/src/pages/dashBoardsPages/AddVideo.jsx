import React, { useState } from "react";
import "./../../styles/dashboard/AddVideo.css";

const AddVideo = () => {
  const [videoData, setVideoData] = useState({
    title: "",
    youtubeLink: "",
    stage: "",
    description: "", // وصف الفيديو
    notes: "", // ملاحظات الفيديو
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVideoData({
      ...videoData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { title, youtubeLink, stage, description, notes } = videoData;

    if (!title || !youtubeLink || !stage || !description || !notes) {
      setMessage("الرجاء ملء جميع الحقول");
      return;
    }

    // Simulate video data submission
    console.log("Video added:", videoData);

    setMessage("تم إضافة الفيديو بنجاح!");

    // Reset form
    setVideoData({
      title: "",
      youtubeLink: "",
      stage: "",
      description: "",
      notes: "",
    });
  };

  return (
    <div className="add-video-container">
      <h2>إضافة فيديو جديد</h2>
      {message && <p className="message">{message}</p>}
      <form onSubmit={handleSubmit} className="add-video-form">
        <div className="form-group">
          <label htmlFor="title">عنوان الفيديو:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={videoData.title}
            onChange={handleChange}
            placeholder="أدخل عنوان الفيديو"
          />
        </div>
        <div className="form-group">
          <label htmlFor="youtubeLink">رابط الفيديو على يوتيوب:</label>
          <input
            type="text"
            id="youtubeLink"
            name="youtubeLink"
            value={videoData.youtubeLink}
            onChange={handleChange}
            placeholder="أدخل رابط يوتيوب"
          />
        </div>
        <div className="form-group">
          <label htmlFor="stage">المرحلة الدراسية:</label>
          <select
            id="stage"
            name="stage"
            value={videoData.stage}
            onChange={handleChange}
          >
            <option value="">اختر المرحلة الدراسية</option>
            <option value="المرحلة الابتدائية">المرحلة الابتدائية</option>
            <option value="المرحلة الإعدادية">المرحلة الإعدادية</option>
            <option value="المرحلة الثانوية">المرحلة الثانوية</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="description">وصف الفيديو:</label>
          <textarea
            id="description"
            name="description"
            value={videoData.description}
            onChange={handleChange}
            placeholder="أدخل وصف الفيديو"
          />
        </div>
        <div className="form-group">
          <label htmlFor="notes">ملاحظات الفيديو:</label>
          <textarea
            id="notes"
            name="notes"
            value={videoData.notes}
            onChange={handleChange}
            placeholder="أدخل ملاحظات الفيديو"
          />
        </div>
        <button type="submit" className="submit-button">
          إضافة فيديو
        </button>
      </form>
    </div>
  );
};

export default AddVideo;
