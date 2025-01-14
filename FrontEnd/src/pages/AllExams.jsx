import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./../styles/AllExams.css";
import Loader from "./Loader";

const AllExams = () => {
  const [exams, setExams] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStage, setSelectedStage] = useState("أولى ثانوي"); // المرحلة الافتراضية
  const [loading, setLoading] = useState(false);

  // Fetch exams when selectedStage changes
  useEffect(() => {
    const fetchExams = async () => {
      setLoading(true);
      try {
        const accessToken = localStorage.getItem("accessToken");
        const url = `http://localhost:8000/exams/?stage=${encodeURIComponent(
          selectedStage
        )}`;

        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        console.log("Exams fetched:", response.data); // تحقق من البيانات المستلمة
        setExams(response.data); // Update exams state
      } catch (error) {
        console.error("حدث خطأ أثناء جلب الامتحانات:", error);
        toast.error("تعذر تحميل قائمة الامتحانات.");
      } finally {
        setLoading(false);
      }
    };

    fetchExams();
  }, [selectedStage]); // يتم استدعاء التأثير عند تغيير المرحلة

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

  const filteredExams = exams.filter((exam) =>
    exam.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          <option value="" disabled>اختر المرحلة الدراسية</option>
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

      {loading ? (
        <Loader />
      ) : (
        <div className="exams-table">
          {filteredExams.length > 0 ? (
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
          ) : (
            <p>لا توجد امتحانات لهذه المرحلة.</p>
          )}
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default AllExams;
