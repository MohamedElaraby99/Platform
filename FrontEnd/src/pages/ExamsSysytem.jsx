import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import ResultComponent from "./ResultComponent"; // استيراد مكون عرض النتيجة
import "react-toastify/dist/ReactToastify.css";
import "./../styles/ExamsSystem.css";

const ExamsSystem = () => {
  const [questionsArray] = useState([
    {
      _id: 1,
      questionText: "ما هو أكبر كوكب في النظام الشمسي؟",
      options: ["الأرض", "المريخ", "المشتري", "زحل"],
      correctAnswer: 2,
      image:
        "https://th.bing.com/th?id=OIP.6L7shpwxVAIr279rA0B1JQHaE7&w=306&h=204&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2",
    },
    {
      _id: 2,
      questionText: "من هو مؤسس شركة مايكروسوفت؟",
      options: ["ستيف جوبز", "بيل جيتس", "مارك زوكربيرغ", "إيلون ماسك"],
      correctAnswer: 1,
      image:
        "https://th.bing.com/th?id=OIP.6L7shpwxVAIr279rA0B1JQHaE7&w=306&h=204&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2",
    },
    {
      _id: 3,
      questionText: "ما هي عاصمة اليابان؟",
      options: ["طوكيو", "سول", "بكين", "هونغ كونغ"],
      correctAnswer: 0,
      image: null,
    },
  ]);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [showResult, setShowResult] = useState(false); // حالة لعرض مكون النتيجة

  const handleAnswerChange = (questionId, optionIndex) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: optionIndex,
    }));
  };

  const handleSubmit = () => {
    let correctCount = 0;
    questionsArray.forEach((q) => {
      if (answers[q._id] === q.correctAnswer) {
        correctCount++;
      }
    });

    toast.success(
      `تم تقديم الامتحان بنجاح! إجاباتك الصحيحة: ${correctCount}/${questionsArray.length}`,
      {
        position: "top-center",
      }
    );

    setSubmitted(true);
  };

  const handleShowResult = () => {
    setShowResult(true); // الانتقال إلى عرض النتيجة
  };

  if (showResult) {
    // إذا كانت حالة عرض النتيجة مفعلة
    return (
      <ResultComponent questionsArray={questionsArray} answers={answers} />
    );
  }

  return (
    <div className="exam-system-container">
      <h2 className="exam-system-title">الامتحان</h2>
      <form className="exam-system-form">
        {questionsArray.map((q, index) => (
          <div key={q._id} className="exam-question-container">
            {q.image && (
              <div className="exam-image-container">
                <img
                  src={q.image}
                  alt={`صورة للسؤال ${index + 1}`}
                  className="exam-image"
                />
              </div>
            )}

            <h3 className="exam-question">
              السؤال {index + 1}: {q.questionText}
            </h3>

            <ul className="exam-options-list">
              {q.options.map((option, optIndex) => {
                let optionClass = "exam-option";
                if (submitted) {
                  if (optIndex === q.correctAnswer) {
                    optionClass += " exam-option-correct";
                  } else if (answers[q._id] === optIndex) {
                    optionClass += " exam-option-wrong";
                  }
                } else if (answers[q._id] === optIndex) {
                  optionClass += " exam-option-selected";
                }

                return (
                  <li key={optIndex} className={optionClass}>
                    <input
                      type="radio"
                      id={`option-${q._id}-${optIndex}`}
                      name={`question-${q._id}`}
                      value={optIndex}
                      checked={answers[q._id] === optIndex}
                      onChange={() => handleAnswerChange(q._id, optIndex)}
                      className="exam-radio"
                    />
                    <label
                      className="exam-option-label"
                      htmlFor={`option-${q._id}-${optIndex}`}
                    >
                      {option}
                    </label>
                  </li>
                );
              })}
            </ul>

            {submitted && (
              <p className="exam-correct-answer">
                الإجابة الصحيحة: {q.options[q.correctAnswer]}
              </p>
            )}
          </div>
        ))}

        {!submitted && (
          <button
            type="button"
            onClick={handleSubmit}
            className="exam-submit-button"
          >
            تقديم الامتحان
          </button>
        )}
      </form>

      {submitted && (
        <button
          type="button"
          onClick={handleShowResult}
          className="show-result-button"
        >
          عرض النتيجة
        </button>
      )}

      <ToastContainer />
    </div>
  );
};

export default ExamsSystem;
