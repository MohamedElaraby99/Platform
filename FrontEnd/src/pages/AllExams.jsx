import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./../styles/AllExams.css";

const AllExams = () => {
  const [exams, setExams] = useState([
    {
      id: 1,
      name: "امتحان الرياضيات",
      grade: "أولى ثانوي",
      date: "2025-01-01",
      students: [
        { name: "أحمد علي", grade: 85 },
        { name: "سارة محمد", grade: 90 },
      ],
    },
    {
      id: 2,
      name: "امتحان الفيزياء",
      grade: "ثانية ثانوي",
      date: "2025-02-01",
      students: [
        { name: "عمر خالد", grade: 78 },
        { name: "نادية إبراهيم", grade: 82 },
      ],
    },
  ]); // بيانات الامتحانات التجريبية
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedExam, setSelectedExam] = useState(null); // حالة لعرض الطلاب

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleMakeAvailable = (id) => {
    toast.success("تم جعل الامتحان متاحًا للطلاب!");
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("هل تريد حذف هذا الامتحان؟");
    if (confirmDelete) {
      const updatedExams = exams.filter((exam) => exam.id !== id);
      setExams(updatedExams);
      toast.success("تم حذف الامتحان بنجاح!");
    }
  };

  const handleViewStudents = (exam) => {
    setSelectedExam(exam);
  };

  const handleCloseStudents = () => {
    setSelectedExam(null);
  };

  const filteredExams = exams.filter(
    (exam) => exam.name.includes(searchTerm) || exam.grade.includes(searchTerm)
  );

  return (
    <div className="all-exams-container">
      <h2>إدارة الامتحانات</h2>
      <div className="search-container">
        <input
          type="text"
          placeholder="ابحث باسم الاختبار أو المرحلة الدراسية"
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
              <th>المرحلة الدراسية</th>
              <th>تاريخ الامتحان</th>
              <th>الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            {filteredExams.map((exam) => (
              <tr key={exam.id}>
                <td>{exam.name}</td>
                <td>{exam.grade}</td>
                <td>{exam.date}</td>
                <td className="actionss">
                  <button
                    onClick={() => handleMakeAvailable(exam.id)}
                    className="make-available-button"
                  >
                    جعل الامتحان متاحًا
                  </button>
                  <button
                    onClick={() => handleViewStudents(exam)}
                    className="view-students-button"
                  >
                    عرض الطلاب
                  </button>
                  <button
                    onClick={() => handleDelete(exam.id)}
                    className="deletee-button"
                  >
                    حذف
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* عرض الطلاب الذين امتحنوا الامتحان */}
      {selectedExam && (
        <div className="students-container">
          <h3>الطلاب الذين امتحنوا: {selectedExam.name}</h3>
          {selectedExam.students.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>اسم الطالب</th>
                  <th>درجة الامتحان</th>
                </tr>
              </thead>
              <tbody>
                {selectedExam.students.map((student, index) => (
                  <tr key={index}>
                    <td>{student.name}</td>
                    <td>{student.grade}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>لا يوجد طلاب لهذا الامتحان.</p>
          )}
          <button onClick={handleCloseStudents} className="close-button">
            إغلاق
          </button>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default AllExams;
