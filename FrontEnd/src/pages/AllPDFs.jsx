import React, { useState } from "react";
import "./../styles/AllPDFs.css";

const AllPDFs = () => {
  const [pdfs, setPdfs] = useState([
    {
      id: 1,
      name: "دليل الرياضيات",
      grade: "أولي ثانوي",
      link: "https://example.com/pdf1",
    },
    {
      id: 2,
      name: "ملخص الفيزياء",
      grade: "ثاني ثانوي",
      link: "https://example.com/pdf2",
    },
    {
      id: 3,
      name: "مراجعة الكيمياء",
      grade: "ثالث ثانوي",
      link: "https://example.com/pdf3",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleDelete = (id) => {
    const updatedPdfs = pdfs.filter((pdf) => pdf.id !== id);
    setPdfs(updatedPdfs);
  };

  const filteredPdfs = pdfs.filter(
    (pdf) => pdf.name.includes(searchTerm) || pdf.grade.includes(searchTerm)
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
                <td>{pdf.name}</td>
                <td>{pdf.grade}</td>
                <td>
                  <a
                    href={pdf.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-button"
                  >
                    فتح الملف
                  </a>
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(pdf.id)}
                    className="delete-button"
                  >
                    حذف
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllPDFs;
