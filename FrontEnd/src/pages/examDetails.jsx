import React from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import "./../styles/examDetails.css";

const ExamDetails = () => {
  const { id } = useParams(); // استلام id من الرابط
  const location = useLocation();
  const navigate = useNavigate(); // لاستخدام التنقل
  const exam = location.state?.exam; // البيانات الإضافية الممررة

  if (!id) {
    return <p>معرف الامتحان غير موجود!</p>;
  }

  const handleStartExam = () => {
    if (exam) {
      // التنقل إلى صفحة بدء الامتحان مع تمرير البيانات
      navigate(`/exams/start/${id}`, { state: { exam } });
    } else {
      console.error("لا توجد بيانات الامتحان!");
    }
  };

  return (
    <div>
      <h2>تفاصيل الامتحان</h2>

      {exam ? (
        <div>
          <p>اسم الامتحان: {exam.title}</p>
          <p>الوصف: {exam.description}</p>
          <p>عدد الأسئلة: {exam.questionsCount}</p>
          <p>مدة الامتحان: {exam.duration} دقيقة</p>
          <button className="start-exam-button" onClick={handleStartExam}>
            بدء الامتحان
          </button>
        </div>
      ) : (
        <p>لا توجد بيانات إضافية للامتحان.</p>
      )}
    </div>
  );
};

export default ExamDetails;
