import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./../styles/exams.css";
import Loader from "./Loader";

const ExamsPage = () => {
  const [exams, setExams] = useState([]);
  const [filteredExams, setFilteredExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTitle, setSelectedTitle] = useState("all"); // اسم الامتحان المختار

  useEffect(() => {
    const fetchExams = async () => {
      try {
        setLoading(true);
        const accessToken = localStorage.getItem("accessToken");
        const response = await fetch("http://localhost:8000/exams", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch exams");
        }

        const data = await response.json();
        setExams(data);
        setFilteredExams(data); // عرض جميع الامتحانات عند البداية
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("An error occurred while fetching exams.");
        setLoading(false);
      }
    };

    fetchExams();
  }, []);

  // تصفية الامتحانات بناءً على اسم الامتحان (title)
  useEffect(() => {
    if (selectedTitle === "all") {
      setFilteredExams(exams); // عرض جميع الامتحانات إذا تم اختيار "الكل"
    } else {
      setFilteredExams(
        exams.filter((exam) =>
          exam.title.toLowerCase().includes(selectedTitle.toLowerCase())
        )
      ); // تصفية حسب الاسم
    }
  }, [selectedTitle, exams]);

  if (loading) return <Loader />;
  if (error) return <div className="error">{error}</div>;
  if (filteredExams.length === 0)
    return <div className="no-exams">لا يوجد امتحانات حالياً</div>;

  return (
    <div className="exams-page">
      <h2>الامتحانات</h2>

      {/* قائمة منسدلة لاختيار اسم الامتحان */}
      <div className="filter-container">
        <label htmlFor="exam-title">تصفية حسب اسم الامتحان:</label>
        <select
          id="exam-title"
          value={selectedTitle}
          onChange={(e) => setSelectedTitle(e.target.value)}
        >
          <option value="all">الكل</option>
          {exams.map((exam) => (
            <option key={exam._id} value={exam.title}>
              {exam.title}
            </option>
          ))}
        </select>
      </div>

      <div className="exams-container">
        {filteredExams.map((exam) => (
          <div key={exam._id} className="exam-card">
            <h3>{exam.title}</h3>
            <p>التاريخ: {new Date(exam.date).toLocaleString()}</p>
            <p>
              النوع: <span>{exam.type === "exam" ? "امتحان" : "تدريب"}</span>
            </p>
            <p>
              الحالة:
              <span className={`status ${exam.status}`}>{exam.status}</span>
            </p>
            {exam.status === "متاح" && (
              <Link
                to={`/exams/details/${exam._id}`}
                className="exam-button"
                state={{ exam }}
              >
                عرض التفاصيل
              </Link>
            )}
            {exam.status === "قادم" && (
              <button className="exam-button disabled" disabled>
                غير متاح حاليًا
              </button>
            )}
            {exam.status === "منتهي" && (
              <Link
                to={`/exams/details/${exam._id}`}
                className="exam-button"
                state={{ exam }}
              >
                عرض التفاصيل
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExamsPage;
