import React, { useState } from "react";
import axios from "axios";
import "./../../styles/dashboard/AddVideo.css";

const AddVideo = () => {
  const [videoData, setVideoData] = useState({
    title: "",
    lesson_link: "",
    stage: "",
    description: "", // وصف الفيديو
    notes: "", // ملاحظات الفيديو
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVideoData({
      ...videoData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, youtubeLink, stage, description, notes } = videoData;

    // تحقق من أن الحقول ليست فارغة
    if (!title || !youtubeLink || !stage || !description || !notes) {
      setMessage("");
      setError("الرجاء ملء جميع الحقول.");
      return;
    }

    // إعداد البيانات لإرسالها إلى API
    const requestData = {
      title,
      lesson_link: youtubeLink, // تحويل youtubeLink إلى lesson_link (الاسم المتوقع في API)
      stage,
      description,
      notes,
    };

    try {
      setLoading(true);
      setError("");
      setMessage("");

      const accessToken = localStorage.getItem("accessToken"); // جلب التوكن من LocalStorage
      await axios.post(`${process.env.REACT_APP_BASE_URL}/lessons`, requestData, {
        headers: {
          Authorization: `Bearer ${accessToken}`, // تضمين التوكن في الرؤوس
        },
      });

      setMessage("تم إضافة الفيديو بنجاح!");
      setError("");

      // إعادة تعيين النموذج
      setVideoData({
        title: "",
        youtubeLink: "",
        stage: "",
        description: "",
        notes: "",
      });
    } catch (err) {
      setError("حدث خطأ أثناء إضافة الفيديو. الرجاء المحاولة مرة أخرى.");
      console.error("Error adding video:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-video-container">
      <h2>إضافة فيديو جديد</h2>
      {message && <p className="message success-message">{message}</p>}
      {error && <p className="message error-message">{error}</p>}
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
            <option value="أولى ثانوي">أولى ثانوي</option>
            <option value="ثانية ثانوي">ثانية ثانوي</option>
            <option value="ثالثة ثانوي">ثالثة ثانوي</option>
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
        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? "جارٍ الإضافة..." : "إضافة فيديو"}
        </button>
      </form>
    </div>
  );
};

export default AddVideo;
