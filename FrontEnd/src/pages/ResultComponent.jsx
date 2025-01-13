import React from "react";
import { useNavigate } from "react-router-dom";
import "./../styles/ResultComponent.css";

const ResultComponent = ({ questionsArray, answers }) => {
  const navigate = useNavigate();

  // حساب النتيجة
  const correctAnswersCount = questionsArray.reduce((count, question) => {
    if (answers[question._id] === question.correctAnswer) {
      return count + 1;
    }
    return count;
  }, 0);

  const totalQuestions = questionsArray.length;
  const percentage = ((correctAnswersCount / totalQuestions) * 100).toFixed(0);

  const handleBackToExams = () => {
    navigate("/exams");
  };

  return (
    <div className="result-container">
      <div className="result-header">
        <h2>نتيجة الامتحان</h2>
        <div className="result-score-circle">
          <div className="circle">
            <div className="circle-inner">{percentage}%</div>
          </div>
          <p>
            أجبت {correctAnswersCount} من {totalQuestions} إجابة صحيحة
          </p>
        </div>
      </div>

      <ul className="result-list">
        {questionsArray.map((q, index) => (
          <li key={q._id} className="result-item">
            <p className="result-question">
              <strong>السؤال {index + 1}:</strong> {q.questionText}
            </p>
            <p
              className={`result-answer ${
                answers[q._id] === q.correctAnswer ? "correct" : "wrong"
              }`}
            >
              <strong>إجابتك:</strong>{" "}
              {q.options[answers[q._id]] || "لم يتم الإجابة"}
            </p>
            <p className="result-correct-answer">
              <strong>الإجابة الصحيحة:</strong> {q.options[q.correctAnswer]}
            </p>
            {answers[q._id] !== q.correctAnswer && q.explanation && (
              <p className="result-explanation">
                <strong>التعليل:</strong> {q.explanation}
              </p>
            )}
          </li>
        ))}
      </ul>

      <button onClick={handleBackToExams} className="back-to-exams-button">
        العودة إلى صفحة الامتحانات
      </button>
    </div>
  );
};

export default ResultComponent;
