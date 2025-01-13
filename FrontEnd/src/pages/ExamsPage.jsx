import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./../styles/exams.css";

const ExamsPage = () => {
  const [exams, setExams] = useState([]); // حالة الامتحانات
  const [currentTime, setCurrentTime] = useState(new Date()); // الوقت الحالي
  const [loading, setLoading] = useState(true); // حالة التحميل
  const [error, setError] = useState(null); // حالة الخطأ


  // جلب الامتحانات من API
  useEffect(() => {
    const fetchExams = async () => {
      try {
        setLoading(true); // بدء التحميل
        const accessToken = localStorage.getItem("accessToken");
        const response = await fetch("http://localhost:8000/exams", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        if (!response.ok) {
          throw new Error("فشل في جلب الامتحانات");
        }
        const data = await response.json();
        setExams(data); // تخزين البيانات
        setLoading(false); // إنهاء التحميل
      } catch (err) {
        setError("حدث خطأ أثناء جلب الامتحانات");
        setLoading(false); // إنهاء التحميل حتى عند الخطأ
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

  // عرض حالة التحميل
  if (loading) {
    return <div className="loading">جاري تحميل الامتحانات...</div>;
  }

  // عرض حالة الخطأ
  if (error) {
    return <div className="error">{error}</div>;
  }

  // عرض رسالة إذا لم توجد امتحانات
  if (updatedExams.length === 0) {
    return <div className="no-exams">لا يوجد امتحانات حالياً</div>;
  }

  return (
    <div className="exams-page">
      <h2> الامتحانات</h2>

      <div className="exams-container">
        {updatedExams.map((exam) => {
          const examTime = new Date(exam.date);

          return (
            <div key={exam._id} className="exam-card">
              <h3>{exam.name}</h3>
              <p>التاريخ: {examTime.toLocaleString()}</p>
              <p className="status-label">
                الحالة:{" "}
                <span className={`status ${exam.status}`}>{exam.status}</span>
              </p>
              {exam.status === "منتهي" && (
                <Link
                  to={`/exams/details/${exam._id}`}
                  className="exam-button"
                  state={{ exam }}
                >
                  عرض التفاصيل
                </Link>
              )}
              {exam.status === "متاح" && (
                <Link
                  to={`/exams/start/${exam._id}`}
                  className="exam-button active-btn"
                  state={{ exam }}
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
