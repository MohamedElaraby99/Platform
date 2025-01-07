import React, { useState } from "react";
import Dropzone from "react-dropzone";
import "./../../styles/dashboard/AddFile.css";

const AddPdf = () => {
  const [pdfData, setPdfData] = useState({
    name: "",
    file: null, // Replace link with a file object
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

  const handleFileDrop = (acceptedFiles) => {
    if (acceptedFiles.length === 0) {
      setMessage("يرجى اختيار ملف PDF صالح");
      return;
    }

    const file = acceptedFiles[0];
    if (file.type !== "application/pdf") {
      setMessage("يرجى اختيار ملف بصيغة PDF فقط");
      return;
    }

    setPdfData({
      ...pdfData,
      file: file,
    });

    setMessage("تم اختيار الملف بنجاح");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!pdfData.name || !pdfData.file || !pdfData.stage) {
      setMessage("الرجاء ملء جميع الحقول");
      return;
    }

    // Simulate PDF data submission
    console.log("PDF added:", {
      name: pdfData.name,
      fileName: pdfData.file.name,
      stage: pdfData.stage,
    });

    setMessage("تم إضافة ملف PDF بنجاح!");

    // Reset form
    setPdfData({
      name: "",
      file: null,
      stage: "",
    });
  };

  return (
    <div className="add-pdf">
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
            <label>تحميل ملف PDF:</label>
            <Dropzone onDrop={handleFileDrop} accept=".pdf" maxFiles={1}>
              {({ getRootProps, getInputProps }) => (
                <div
                  {...getRootProps()}
                  className="dropzone"
                  style={{
                    border: "2px dashed #ccc",
                    padding: "20px",
                    textAlign: "center",
                    cursor: "pointer",
                    borderRadius: "5px",
                    backgroundColor: "#f9f9f9",
                  }}
                >
                  <input {...getInputProps()} />
                  {pdfData.file ? (
                    <p>تم اختيار الملف: {pdfData.file.name}</p>
                  ) : (
                    <p>اسحب وأسقط ملف PDF هنا أو انقر لاختيار ملف</p>
                  )}
                </div>
              )}
            </Dropzone>
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
              <option value="المرحلة الابتدائية"> اولى ثانوي </option>
              <option value="المرحلة الإعدادية"> ثانية ثانوي </option>
              <option value="المرحلة الثانوية"> ثالثة ثانوي </option>
            </select>
          </div>

          <button type="submit" className="submit-button">
            إضافة ملف PDF
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPdf;
