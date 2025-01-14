import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./../styles/AllExams.css";
import Loader from "./Loader";

const AllExams = () => {
  const [exams, setExams] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStage, setSelectedStage] = useState("");
  const [selectedExamStudents, setSelectedExamStudents] = useState([]);
  const [loadingStudents, setLoadingStudents] = useState(false);

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const response = await axios.get("http://localhost:8000/exams", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          params: {
            stage: selectedStage,
          },
        });
        setExams(response.data);
        
      } catch (error) {
        console.error("حدث خطأ أثناء جلب الامتحانات:", error);
        toast.error("تعذر تحميل قائمة الامتحانات.");
      }
    };

    fetchExams();
  }, [selectedStage]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleStageChange = (e) => {
    setSelectedStage(e.target.value);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("هل تريد حذف هذا الامتحان؟");
    if (confirmDelete) {
      try {
        const accessToken = localStorage.getItem("accessToken");
        await axios.delete(`http://localhost:8000/exams/${id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setExams(exams.filter((exam) => exam.id !== id));
        toast.success("تم حذف الامتحان بنجاح!");
      } catch (error) {
        console.error("حدث خطأ أثناء حذف الامتحان:", error);
        toast.error("تعذر حذف الامتحان. حاول مرة أخرى.");
      }
    }
  };

  const handleViewStudents = async (examId) => {
    setLoadingStudents(true);
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.get(
        `http://localhost:8000/exams/${examId}/students`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setSelectedExamStudents(response.data);
    } catch (error) {
      console.error("حدث خطأ أثناء جلب بيانات الطلاب:", error);
      toast.error("تعذر جلب بيانات الطلاب. حاول مرة أخرى.");
    } finally {
      setLoadingStudents(false);
    }
  };

  const handleCloseStudents = () => {
    setSelectedExamStudents([]);
  };

  const filteredExams = exams.filter((exam) => exam.title.includes(searchTerm));

  return (
    <div className="all-exams-container">
      <h2>إدارة الامتحانات</h2>
      <div className="search-container">
        <select
          name="stage"
          value={selectedStage}
          onChange={handleStageChange}
          className="stage-dropdown"
        >
          <option value="">اختر المرحلة الدراسية</option>
          <option value="أولى ثانوي">أولى ثانوي</option>
          <option value="ثانية ثانوي">ثانية ثانوي</option>
          <option value="ثالثة ثانوي">ثالثة ثانوي</option>
        </select>
        <input
          type="text"
          placeholder="ابحث باسم الامتحان"
          value={searchTerm}
          onChange={handleSearch}
          className="search-input"
        />
      </div>
      <div className="exams-table">
        <table>
          <thead>
            <tr>
              <th>اسم الامتحان</th>
              <th>تاريخ الامتحان</th>
              <th>وقت الامتحان</th>
              <th>مدة الامتحان (دقائق)</th>
              <th>حالة الامتحان</th>
              <th>الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            {filteredExams.map((exam) => (
              <tr key={exam.id}>
                <td>{exam.title}</td>
                <td>{new Date(exam.date).toLocaleDateString()}</td>
                <td>{new Date(exam.date).toLocaleTimeString()}</td>
                <td>{exam.duration}</td>
                <td>{exam.status}</td>
                <td className="actionss">
                  <button
                    onClick={() => handleViewStudents(exam.id)}
                    className="view-students-button"
                    disabled={exam.status === "قادم"}
                  >
                    عرض نتائج الطلاب
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

      {selectedExamStudents.length > 0 && (
        <div className="students-container">
          <h3>الطلاب الذين امتحنوا:</h3>
          {loadingStudents ? (
            <Loader />
          ) : (
            <table>
              <thead>
                <tr>
                  <th>اسم الطالب</th>
                  <th>الدرجة</th>
                </tr>
              </thead>
              <tbody>
                {selectedExamStudents.map((student, index) => (
                  <tr key={index}>
                    <td>{student.name}</td>
                    <td>{student.grade}</td>
                  </tr>
                ))}
              </tbody>
            </table>
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
