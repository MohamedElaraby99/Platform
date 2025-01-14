import React, { useState, useEffect } from "react";
import axios from "axios";
import "./../styles/pdfs.css";
import Loader from "./Loader";

const PdfPage = () => {
  const [pdfFiles, setPdfFiles] = useState([]); // حالة لتخزين ملفات PDF
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // جلب الملفات من API
    const fetchPdfs = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken"); // تأكد من وجود التوكن
        const response = await axios.get("http://localhost:8000/files", {
          headers: {
            Authorization: `Bearer ${accessToken}`, // تضمين التوكن في الطلب
          },
        });
        setPdfFiles(response.data); // تخزين الملفات
        setLoading(false);
      } catch (err) {
        setError("حدث خطأ أثناء تحميل الملفات.");
        setLoading(false);
      }
    };

    fetchPdfs();
  }, []);

  console.log(pdfFiles);
  

  const handleViewPdf = (url) => {
    // فتح نافذة جديدة للعرض
    const newWindow = window.open("", "_blank", "fullscreen=yes");

    if (newWindow) {
      newWindow.document.write(`
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>عرض الملف</title>
            <style>
              body {
                margin: 0;
                padding: 0;
                overflow: hidden;
                background-color: #000;
                display: flex;
                justify-content: center;
                align-items: center;
              }
              iframe {
                width: 100vw;
                height: 100vh;
                border: none;
              }
            </style>
          </head>
          <body>
            <iframe src="${url}#toolbar=0&navpanes=0&scrollbar=0"></iframe>
          </body>
        </html>
      `);
    } else {
      alert("Please allow pop-ups for this site.");
    }
  };

  if (loading) return <Loader />;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="pdf-page">
      <h2>المذكرات أو الملخصات</h2>
      <div className="pdf-container">
        {pdfFiles.map((pdf) => (
          <div key={pdf._id} className="pdf-card">
            <h3>{pdf.title}</h3>
            <div className="pdf-actions">
              <button
                onClick={() => handleViewPdf(pdf.file)}
                className="pdf-button"
              >
                عرض الملف
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PdfPage;
