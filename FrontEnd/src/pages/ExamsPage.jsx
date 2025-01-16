import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./../styles/exams.css";
import Loader from "./Loader";

const ExamsPage = () => {
  const [exams, setExams] = useState([]);
  const [filteredExams, setFilteredExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedType, setSelectedType] = useState("all"); // Filter by type

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
         console.log("data", data);
        setFilteredExams(data); // Show all exams initially
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("An error occurred while fetching exams.");
        setLoading(false);
      }
    };

    fetchExams();
  }, []);

  // Filter exams by title and type
  useEffect(() => {
    let filtered = exams;

    if (selectedType !== "all") {
      filtered = filtered.filter((exam) => exam.type === selectedType);
    }

    setFilteredExams(filtered);
  }, [ selectedType, exams]);

  if (loading) return <Loader />;
  if (error) return <div className="error">{error}</div>;
  if (filteredExams.length === 0)
    return <div className="no-exams">لا يوجد امتحانات حالياً</div>;

  return (
    <div className="exams-page">
      <h2>الامتحانات</h2>

      {/* Filters */}
      <div className="filter-container">

        {/* Filter by Type */}
        <label htmlFor="exam-type">تصفية حسب النوع:</label>
        <select
          id="exam-type"
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
        >
          <option value="all">الكل</option>
          <option value="exam">امتحان</option>
          <option value="training">تدريب</option>
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
