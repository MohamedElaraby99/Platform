import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./../styles/exams.css";

const ExamsPage = () => {
  // بيانات ديمو محلية
  const demoExams = [
    {
      id: 1,
      name: "امتحان الرياضيات",
      date: "",
    },
    {
      id: 2,
      name: "امتحان الفيزياء",
      date: "",
    },
    {
      id: 3,
      name: "امتحان الكيمياء",
      date: "",
    },
  ];

  const [exams, setExams] = useState([]); // حالة الامتحانات
  const [currentTime, setCurrentTime] = useState(new Date()); // الوقت الحالي
  const [loading, setLoading] = useState(true); // حالة التحميل

  // جلب البيانات من بيانات الديمو
  useEffect(() => {
    // محاكاة التأخير لتحاكي الـ API
    const fetchExams = async () => {
      setLoading(true);
      setTimeout(() => {
        setExams(demoExams); // تعيين بيانات الديمو
        setLoading(false); // إنهاء التحميل
      }, 1000);
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
