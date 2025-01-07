import React from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import "./../styles/examDetails.css";

const examsData = [
  {
    id: 1,
    name: "امتحان الرياضيات",
    date: "2025-01-10",
    description: "امتحان يتناول أساسيات الرياضيات.",
    status: "متاح",
  },
  {
    id: 2,
    name: "امتحان اللغة العربية",
    date: "2025-01-15",
    description: "اختبار في قواعد ومهارات اللغة العربية.",
    status: "متاح",
  },
  {
    id: 3,
    name: "امتحان الفيزياء",
    date: "2025-01-20",
    description: "امتحان شامل في الفيزياء الحديثة.",
    status: "متاح",
  },
  {
    id: 4,
    name: "امتحان التاريخ",
    date: "2025-01-25",
    description: "اختبار حول الأحداث التاريخية المهمة.",
    status: "قادم",
  },
];

const ExamDetails = () => {
  const { id } = useParams(); // Get the exam ID from the URL
  const navigate = useNavigate();

  const exam = examsData.find((exam) => exam.id === parseInt(id));

  if (!exam) {
    return <p>الامتحان غير موجود.</p>;
  }

  return (
    <div className="exam-details">
      <h2>{exam.name}</h2>
      <p>التاريخ: {exam.date}</p>
      <p>الوصف: {exam.description}</p>
      <p className={`status ${exam.status}`}>الحالة: {exam.status}</p>

      {/* عرض زر البدء إذا كان الامتحان متاحًا */}
      {exam.status === "متاح" && (
        <Link to={`/exams/start/${exam.id}`} className="start-exam-button">
          ابدأ الامتحان
        </Link>
      )}

      {/* عرض زر العودة دائمًا */}
      <button className="back-button" onClick={() => navigate(-1)}>
        العودة إلى الامتحانات
      </button>
    </div>
  );
};

export default ExamDetails;
