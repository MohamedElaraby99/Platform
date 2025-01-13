import React, { useState, useEffect } from "react";
import axios from "axios";
import "./../styles/AllPDFs.css";

const AllPDFs = () => {
  const [pdfs, setPdfs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingPdf, setEditingPdf] = useState(null);
  const [editData, setEditData] = useState({ title: "", file: "", stage: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(""); // لإظهار رسالة عند التعديل

  // Fetch files on component mount
  useEffect(() => {
    const fetchPdfs = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const response = await axios.get("http://localhost:8000/files", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setPdfs(response.data);
        setLoading(false);
      } catch (err) {
        setError("حدث خطأ أثناء جلب الملفات.");
        setLoading(false);
      }
    };

    fetchPdfs();
  }, []);

  // Handle delete operation
  const handleDelete = async (_id) => {
    const confirmDelete = window.confirm("هل تريد حذف هذا الملف؟");
    if (confirmDelete) {
      try {
        const accessToken = localStorage.getItem("accessToken");
        await axios.delete(`http://localhost:8000/files/${_id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const updatedPdfs = pdfs.filter((pdf) => pdf._id !== _id);
        setPdfs(updatedPdfs);
        setMessage("تم حذف الملف بنجاح."); // إظهار رسالة بعد الحذف
      } catch (error) {
        console.error("حدث خطأ أثناء حذف الملف:", error);
        alert("لم يتم حذف الملف. حاول مرة أخرى.");
      }
    }
  };

  // Handle edit start
  const handleEdit = (_id) => {
    const pdfToEdit = pdfs.find((pdf) => pdf._id === _id);
    setEditingPdf(_id);
    setEditData({ ...pdfToEdit });
    setMessage(""); // مسح الرسالة عند بدء التعديل
  };

  // Handle input changes during editing
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData({
      ...editData,
      [name]: value,
    });
  };

  // Handle save operation for edited data
  const handleEditSave = async () => {
    if (!editingPdf) {
      alert("تعذر حفظ التعديلات لأن معرف الملف غير موجود.");
      return;
    }

    // سجل البيانات المرسلة للتأكد من صحتها
    console.log("Editing PDF ID:", editingPdf);
    console.log("Edit Data to be sent:", editData);

    try {
      const accessToken = localStorage.getItem("accessToken");

      // إرسال الطلب إلى الخادم
      const response = await axios.put(
        `http://localhost:8000/files/${editingPdf}`,
        {
          title: editData.title,
          stage: editData.stage,
          file: editData.file, // URL الخاص بالملف
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      // تحديث الحالة بعد التعديل
      const updatedPdfs = pdfs.map((pdf) =>
        pdf._id === editingPdf ? response.data : pdf
      );
      setPdfs(updatedPdfs);
      setEditingPdf(null);
      setMessage("تم تعديل البيانات بنجاح!"); // إظهار رسالة عند الحفظ
    } catch (error) {
      console.error("حدث خطأ أثناء حفظ التعديلات:", error);

      // عرض رسالة خطأ أكثر تفصيلًا
      if (error.response && error.response.data) {
        alert(`خطأ: ${error.response.data.message}`);
      } else {
        alert("لم يتم حفظ التعديلات. حاول مرة أخرى.");
      }
    }
  };

  // Cancel editing mode
  const handleEditCancel = () => {
    setEditingPdf(null);
    setMessage(""); // مسح الرسالة عند إلغاء التعديل
  };

  // Open a video in a new window
  const handleViewPdf = (file) => {
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
            <iframe src="${file}#toolbar=0&navpanes=0&scrollbar=0"></iframe>
          </body>
        </html>
      `);
    } else {
      alert("Please allow pop-ups for this site.");
    }
  };

  // Filter files based on search term
  const filteredPdfs = pdfs.filter(
    (pdf) =>
      pdf.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pdf.stage.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <p>جارٍ تحميل الملفات...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="all-pdfs-container">
      <h2>إدارة الملفات</h2>
      {message && <p className="success-message">{message}</p>}{" "}
      {/* عرض الرسالة */}
      <div className="search-container">
        <input
          type="text"
          placeholder="ابحث باسم الملف أو المرحلة الدراسية"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
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
            {filteredPdfs.map((pdf, index) => (
              <tr key={pdf._id || `pdf-${index}`}>
                {editingPdf === pdf._id ? (
                  <>
                    <td>
                      <input
                        type="text"
                        name="title"
                        value={editData.title}
                        onChange={handleEditChange}
                        className="edit-input"
                      />
                    </td>
                    <td>
                      <select
                        name="stage"
                        value={editData.stage}
                        onChange={handleEditChange}
                        className="edit-select"
                      >
                        <option value="أولى ثانوي">أولى ثانوي</option>
                        <option value="ثاني ثانوي">ثاني ثانوي</option>
                        <option value="ثالث ثانوي">ثالث ثانوي</option>
                      </select>
                    </td>
                    <td>
                      <a
                        href={editData.file}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link-button"
                      >
                        عرض الملف
                      </a>
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
                    <td>{pdf.title}</td>
                    <td>{pdf.stage}</td>
                    <td>
                      <button
                        onClick={() => handleViewPdf(pdf.file)}
                        className="view-button"
                      >
                        عرض الملف
                      </button>
                    </td>
                    <td className="actions-cell">
                      <button
                        onClick={() => handleEdit(pdf._id)}
                        className="edit-button"
                      >
                        تعديل
                      </button>
                      <button
                        onClick={() => handleDelete(pdf._id)}
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
