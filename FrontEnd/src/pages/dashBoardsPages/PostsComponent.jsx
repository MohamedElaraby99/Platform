import React, { useState } from "react";
import "./../../styles/dashboard/addPosts.css";

const CreatePostComponent = () => {
  // حالة لتخزين تفاصيل الإعلان الجديد
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [publishTime, setPublishTime] = useState("");
  const [selectedYears, setSelectedYears] = useState([]);

  // قائمة السنوات الدراسية (محاكاة للبيانات)
  const years = ["الصف الأول", "الصف الثاني", "الصف الثالث"];

  // وظيفة لإضافة إعلان جديد
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !details || !publishTime || selectedYears.length === 0) {
      alert("يرجى تعبئة جميع الحقول");
      return;
    }

    const newPost = {
      id: Date.now(),
      title,
      details,
      publishTime,
      years: selectedYears,
    };

    console.log("تم إنشاء الإعلان:", newPost);

    // إعادة تعيين الحقول بعد الإرسال
    setTitle("");
    setDetails("");
    setPublishTime("");
    setSelectedYears([]);
  };

  // وظيفة لتحديث السنوات الدراسية المختارة
  const handleYearToggle = (year) => {
    if (selectedYears.includes(year)) {
      setSelectedYears(selectedYears.filter((y) => y !== year));
    } else {
      setSelectedYears([...selectedYears, year]);
    }
  };

  return (
    <div className="create-post-component">
      <header className="posts-header">
        <h2>إنشاء إعلان جديد</h2>
      </header>

      <form className="post-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">عنوان الإعلان:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="أدخل عنوان الإعلان"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="details">تفاصيل الإعلان:</label>
          <textarea
            id="details"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            placeholder="أدخل تفاصيل الإعلان"
            required
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="publishTime">وقت النشر:</label>
          <input
            type="datetime-local"
            id="publishTime"
            value={publishTime}
            onChange={(e) => setPublishTime(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>السنة الدراسية الموجهة:</label>
          <div className="years-checkboxes">
            {years.map((year) => (
              <div key={year} className="checkbox-item">
                <input
                  type="checkbox"
                  id={year}
                  checked={selectedYears.includes(year)}
                  onChange={() => handleYearToggle(year)}
                />
                <label htmlFor={year}>{year}</label>
              </div>
            ))}
          </div>
        </div>

        <button type="submit" className="submit-btn">
          إنشاء الإعلان
        </button>
      </form>
    </div>
  );
};

export default CreatePostComponent;
