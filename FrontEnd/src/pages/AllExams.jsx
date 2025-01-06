import React, { useState } from "react";
import "./../styles/AllExams.css";

const AllExams = () => {
  const [exams, setExams] = useState([
    {
      id: 1,
      name: "امتحان الرياضيات",
      subject: "رياضيات",
      date: "2023-12-01",
      status: "متاح",
      sy: "اولي ثانوي",
    },
    {
      id: 2,
      name: "امتحان الفيزياء",
      subject: "فيزياء",
      date: "2023-12-05",
      status: "متاح",
      sy: "ثاني ثانوي",
    },
    {
      id: 3,
      name: "امتحان الكيمياء",
      subject: "كيمياء",
      date: "2023-12-10",
      status: "انتهى",
      sy: "ثالث ثانوي",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleDelete = (id) => {
    const updatedExams = exams.filter((exam) => exam.id !== id);
    setExams(updatedExams);
  };

  const filteredExams = exams.filter(
    (exam) =>
      exam.name.includes(searchTerm) || exam.subject.includes(searchTerm)
  );

  return (
    <div className="all-exams-container">
      <h2>إدارة الاختبارات</h2>
      <div className="search-container">
        <input
          type="text"
          placeholder="ابحث باسم الاختبار أو المادة"
          value={searchTerm}
          onChange={handleSearch}
          className="search-input"
        />
      </div>
      <div className="exams-table">
        <table>
          <thead>
            <tr>
              <th>اسم الاختبار</th>
              <th>السنة الدراسية</th>
              <th>المادة</th>
                          <th>التاريخ</th>
                          <th>الحالة</th>
              <th>الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            {filteredExams.map((exam) => (
              <tr key={exam.id}>
                    <td>{exam.name}</td>
                    <td>{exam.sy}</td>
                <td>{exam.subject}</td>
                    <td>{exam.date}</td>
                    <td>{exam.status}</td>
                <td>
                  <button
                    onClick={() => handleDelete(exam.id)}
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

export default AllExams;
