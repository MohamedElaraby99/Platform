import React, { useState } from "react";
import "./../styles/AllPDFs.css";

// Simulated list of PDF files
const pdfFiles = [
  {
    id: 1,
    name: "كتاب الرياضيات",
    url: "/assets/محمد العربي .pdf",
    grade: "أولى ثانوي",
  },
  {
    id: 2,
    name: "كتاب الفيزياء",
    url: "/assets/محمد العربي .pdf",
    grade: "ثاني ثانوي",
  },
  {
    id: 3,
    name: "كتاب اللغة العربية",
    url: "/assets/محمد العربي .pdf",
    grade: "ثالث ثانوي",
  },
  {
    id: 4,
    name: "كتاب التاريخ",
    url: "/assets/محمد العربي .pdf",
    grade: "ثاني ثانوي",
  },
];

const AllPDFs = () => {
  const [pdfs, setPdfs] = useState(pdfFiles); // Use the external data
  const [searchTerm, setSearchTerm] = useState("");
  const [editingPdf, setEditingPdf] = useState(null);
  const [editData, setEditData] = useState({ name: "", url: "", grade: "" });

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("هل تريد حذف هذا الملف؟");
    if (confirmDelete) {
      const updatedPdfs = pdfs.filter((pdf) => pdf.id !== id);
      setPdfs(updatedPdfs);
    }
  };

  const handleEdit = (id) => {
    const pdfToEdit = pdfs.find((pdf) => pdf.id === id);
    setEditingPdf(id);
    setEditData({ ...pdfToEdit });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData({
      ...editData,
      [name]: value,
    });
  };

  const handleEditSave = () => {
    const updatedPdfs = pdfs.map((pdf) =>
      pdf.id === editingPdf ? { ...pdf, ...editData } : pdf
    );
    setPdfs(updatedPdfs);
    setEditingPdf(null);
  };

  const handleEditCancel = () => {
    setEditingPdf(null);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setEditData({ ...editData, url: fileUrl });
    }
  };

  const handleViewPdf = (url) => {
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

  const filteredPdfs = pdfs.filter(
    (pdf) =>
      pdf.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pdf.grade.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="all-pdfs-container">
      <h2>إدارة ملفات PDF</h2>
      <div className="search-container">
        <input
          type="text"
          placeholder="ابحث باسم الملف أو المرحلة الدراسية"
          value={searchTerm}
          onChange={handleSearch}
          className="search-input"
        />
      </div>
      <div className="pdfs-table">
        <table>
          <thead>
            <tr>
              <th>اسم الملف</th>
              <th>المرحلة الدراسية</th>
              <th>رابط الملف</th>
              <th>الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            {filteredPdfs.map((pdf) => (
              <tr key={pdf.id}>
                {editingPdf === pdf.id ? (
                  <>
                    <td>
                      <input
                        type="text"
                        name="name"
                        value={editData.name}
                        onChange={handleEditChange}
                        className="edit-input"
                      />
                    </td>
                    <td>
                      <select
                        name="grade"
                        value={editData.grade}
                        onChange={handleEditChange}
                        className="edit-select"
                      >
                        <option value="أولى ثانوي">أولى ثانوي</option>
                        <option value="ثاني ثانوي">ثاني ثانوي</option>
                        <option value="ثالث ثانوي">ثالث ثانوي</option>
                      </select>
                    </td>
                    <td>
                      {editData.url ? (
                        <a
                          href={editData.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="link-button"
                        >
                          عرض الملف
                        </a>
                      ) : (
                        <span>لا يوجد ملف مرفوع</span>
                      )}
                      <input
                        type="file"
                        accept="application/pdf"
                        onChange={handleFileUpload}
                        className="file-upload"
                      />
                    </td>
                    <td>
                      <button onClick={handleEditSave} className="save-button">
                        حفظ
                      </button>
                      <button
                        onClick={handleEditCancel}
                        className="cancel-button"
                      >
                        إلغاء
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{pdf.name}</td>
                    <td>{pdf.grade}</td>
                    <td>
                      <button
                        onClick={() => handleViewPdf(pdf.url)}
                        className="view-button"
                      >
                        عرض الملف
                      </button>
                    </td>
                    <td className="actions-cell">
                      <button
                        onClick={() => handleEdit(pdf.id)}
                        className="edit-button"
                      >
                        تعديل
                      </button>
                      <button
                        onClick={() => handleDelete(pdf.id)}
                        className="delete-button"
                      >
                        حذف
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllPDFs;
