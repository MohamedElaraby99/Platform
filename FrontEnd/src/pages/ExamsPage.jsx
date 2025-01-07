import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./../styles/exams.css";

const examsData = [
  {
    id: 1,
    name: "امتحان الرياضيات",
    date: "2024-02-10T10:00:00",
    status: "متاح",
  },
  {
    id: 2,
    name: "امتحان اللغة العربية",
    date: "2025-01-01T00:00:00",
    status: "متاح",
  },
  {
    id: 3,
    name: "امتحان الفيزياء",
    date: "2025-01-01T12:35:00",
    status: "متاح",
  },
  {
    id: 4,
    name: "امتحان التاريخ",
    date: "2025-01-25T12:00:00",
    status: "قادم",
  },
];

const ExamsPage = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer); // تنظيف المؤقت عند إلغاء المكون
  }, []);

  // تحديث حالة الامتحان بناءً على الوقت الحالي
  const updatedExams = examsData.map((exam) => {
    const examTime = new Date(exam.date);
    if (examTime < currentTime) {
      return { ...exam, status: "منتهي" };
    } else if (examTime > currentTime) {
      return { ...exam, status: "قادم" };
    } else {
      return { ...exam, status: "متاح" };
    }
  });

  return (
    <div className="exams-page">
      <h2> الامتحانات</h2>

      <div className="exams-container">
        {updatedExams.map((exam) => {
          const examTime = new Date(exam.date);

          return (
            <div key={exam.id} className="exam-card">
              <h3>{exam.name}</h3>
              <p>التاريخ: {examTime.toLocaleString()}</p>
              <p className="status-label">
                الحالة:{" "}
                <span className={`status ${exam.status}`}>{exam.status}</span>
              </p>
              {exam.status === "منتهي" && (
                <Link to={`/exams/details/${exam.id}`} className="exam-button">
                  عرض التفاصيل
                </Link>
              )}
              {exam.status === "متاح" && (
                <Link
                  to={`/exams/start/${exam.id}`}
                  className="exam-button active-btn"
                >
                  ابدأ الامتحان
                </Link>
              )}
              {exam.status === "قادم" && (
                <button className="exam-button disabled" disabled>
                  غير متاح حاليًا
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ExamsPage;
