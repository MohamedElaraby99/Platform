import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./../styles/exams.css";

const ExamsPage = () => {
  const [exams, setExams] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [loading, setLoading] = useState(true); // حالة التحميل
  const [error, setError] = useState(null); // حالة الخطأ

  useEffect(() => {
    // استدعاء API لجلب بيانات الامتحانات
    const fetchExams = async () => {
      try {
        const response = await axios.get("http://localhost:8000/exams");
        setExams(response.data); // تعيين البيانات المستلمة في الحالة
        setLoading(false); // إنهاء حالة التحميل
      } catch (err) {
        setError("فشل في جلب بيانات الامتحانات. حاول مرة أخرى لاحقًا.");
        setLoading(false); // إنهاء حالة التحميل حتى في حالة الخطأ
      }
    };

    fetchExams();
  }, []);

  // تحديث الوقت الحالي كل ثانية
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer); // تنظيف المؤقت عند إلغاء المكون
  }, []);

  // تحديث حالة الامتحانات بناءً على الوقت الحالي
  const updatedExams = exams.map((exam) => {
    const examTime = new Date(exam.date);
    if (examTime < currentTime) {
      return { ...exam, status: "منتهي" };
    } else if (examTime > currentTime) {
      return { ...exam, status: "قادم" };
    } else {
      return { ...exam, status: "متاح" };
    }
  });

  // عرض حالة التحميل أو الخطأ
  if (loading) {
    return <div className="loading">جاري تحميل الامتحانات...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

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
