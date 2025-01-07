import React, { useState } from "react";
import ExamStatus from "../components/ExamStatus";
import "./../styles/AllExams.css";

const AllExams = () => {
  const [exams, setExams] = useState([
    {
      id: 1,
      name: "امتحان الرياضيات",
      subject: "رياضيات",
      startDate: "2025-01-10",
      endDate: "2025-01-20",
      sy: "اولي ثانوي",
      students: [
        { name: "أحمد علي", grade: 85 },
        { name: "محمود سعيد", grade: 90 },
        { name: "سارة عبد الله", grade: 78 },
      ],
    },
    {
      id: 2,
      name: "امتحان الفيزياء",
      subject: "فيزياء",
      startDate: "2025-02-01",
      endDate: "2025-02-10",
      sy: "ثاني ثانوي",
      students: [
        { name: "عمر خالد", grade: 88 },
        { name: "نادية محمد", grade: 92 },
        { name: "كريم حسام", grade: 80 },
      ],
    },
    {
      id: 3,
      name: "امتحان الكيمياء",
      subject: "كيمياء",
      startDate: "2024-12-15",
      endDate: "2024-12-25",
      sy: "ثالث ثانوي",
      students: [
        { name: "هالة إبراهيم", grade: 75 },
        { name: "مصطفى حسن", grade: 89 },
        { name: "ريم فتحي", grade: 84 },
      ],
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedExam, setSelectedExam] = useState(null); // For viewing student details
  const [studentSearchTerm, setStudentSearchTerm] = useState("");

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleStudentSearch = (e) => {
    setStudentSearchTerm(e.target.value);
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("هل تريد حذف هذا الامتحان؟");
    if (confirmDelete) {
      const updatedExams = exams.filter((exam) => exam.id !== id);
      setExams(updatedExams);
    }
  };

  const handleViewStudents = (exam) => {
    setSelectedExam(exam);
  };

  const handleCloseStudents = () => {
    setSelectedExam(null); // Close the student view
    setStudentSearchTerm(""); // Reset the student search term
  };

  const filteredExams = exams.filter(
    (exam) =>
      exam.name.includes(searchTerm) || exam.subject.includes(searchTerm)
  );

  const filteredStudents =
    selectedExam?.students.filter((student) =>
      student.name.includes(studentSearchTerm)
    ) || [];

  return (
    <div className="all-exams-container">
      <h2>إدارة الامتحانات</h2>
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
              <th>تاريخ البداية</th>
              <th>تاريخ النهاية</th>
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
                <td>{exam.startDate}</td>
                <td>{exam.endDate}</td>
                <td>
                  <ExamStatus
                    startDate={exam.startDate}
                    endDate={exam.endDate}
                  />
                </td>
                <td className="actions">
                  <button
                    onClick={() => handleViewStudents(exam)}
                    className="view-students-button"
                  >
                    عرض الطلاب
                  </button>
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

      {/* View students for a specific exam */}
      {selectedExam && (
        <div className="students-container">
          <h3>الطلاب الذين امتحنوا: {selectedExam.name}</h3>
          <input
            type="text"
            placeholder="ابحث باسم الطالب"
            value={studentSearchTerm}
            onChange={handleStudentSearch}
            className="search-input"
          />
          <table className="students-table">
            <thead>
              <tr>
                <th>اسم الطالب</th>
                <th>درجة الامتحان</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student, index) => (
                <tr key={index}>
                  <td>{student.name}</td>
                  <td>{student.grade}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={handleCloseStudents} className="close-button">
            إغلاق
          </button>
        </div>
      )}
    </div>
  );
};

export default AllExams;
