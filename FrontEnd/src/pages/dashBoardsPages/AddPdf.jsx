import React, { useState } from "react";
import "./../../styles/dashboard/AddFile.css";

const AddPdf = () => {
  const [pdfData, setPdfData] = useState({
    name: "",
    link: "",
    stage: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPdfData({
      ...pdfData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!pdfData.name || !pdfData.link || !pdfData.stage) {
      setMessage("الرجاء ملء جميع الحقول");
      return;
    }

    // Simulate PDF data submission
    console.log("PDF added:", pdfData);

    setMessage("تم إضافة ملف PDF بنجاح!");

    // Reset form
    setPdfData({
      name: "",
      link: "",
      stage: "",
    });
  };

  return (
    <div className="add-pdf-container">
      <h2>إضافة ملف PDF جديد</h2>
      {message && <p className="message">{message}</p>}
      <form onSubmit={handleSubmit} className="add-pdf-form">
        <div className="form-group">
          <label htmlFor="name">اسم الملف:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={pdfData.name}
            onChange={handleChange}
            placeholder="أدخل اسم الملف"
          />
        </div>
        <div className="form-group">
          <label htmlFor="link">رابط الملف:</label>
          <input
            type="text"
            id="link"
            name="link"
            value={pdfData.link}
            onChange={handleChange}
            placeholder="أدخل رابط ملف PDF"
          />
        </div>
        <div className="form-group">
          <label htmlFor="stage">المرحلة الدراسية:</label>
          <select
            id="stage"
            name="stage"
            value={pdfData.stage}
            onChange={handleChange}
          >
            <option value="">اختر المرحلة الدراسية</option>
            <option value="المرحلة الابتدائية">المرحلة الابتدائية</option>
            <option value="المرحلة الإعدادية">المرحلة الإعدادية</option>
            <option value="المرحلة الثانوية">المرحلة الثانوية</option>
          </select>
        </div>
        <button type="submit" className="submit-button">
          إضافة ملف PDF
        </button>
      </form>
    </div>
  );
};

export default AddPdf;
