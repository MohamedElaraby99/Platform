import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./../styles/ExamsSystem.css";

const ExamsSystem = () => {
  const questionsArray = [
    {
      id: 1,
      question: "تعرضت اوروبا لانتكاسه حضاريه من خلال",
      options: [
        "العصور القديمه",
        "العصور الوسطي",
        "العصور الحديثه",
        "التاريخ المعاصر",
      ],
      correctAnswer: 1,
      image: "",
    },
    {
      id: 2,
      question: "تم اكتشاف قاره استراليا في",
      options: [
        "العصور القديمه",
        "العصور الوسطي",
        "العصور الحديثه",
        "التاريخ المعاصر",
      ],
      correctAnswer: 2,
      image: "",
    },
    {
      id: 3,
      question: "العامل الأساسي الذي يعد اول بناء معظم الحضارات القديمه هو",
      options: [
        "معرفة الإنسان الزراعة",
        "معرفة الإنسان الكتابة",
        "بناء المعابد و المقابر",
        "معرفة و اكتشاف المعادن",
      ],
      correctAnswer: 1,
      image: null,
    },
    {
      id: 4,
      question:
        "أدت الرحلات الاستكشافية للرحالة الأوربيين خلال العصور الحديثة إلى",
      options: [
        "قيام الثورة الصناعية",
        "ظهور النهضة الأوروبية",
        "قيام حركة الاستعمار الأوروبي",
        "حدوث حركات التحرر و الاستقلال",
      ],
      correctAnswer: 2,
      image: null,
    },
    {
      id: 5,
      question: "اطول اشعاع حضاري على مر العصور التاريخية كان منبعه من",
      options: ["الشرق الأوسط", "الدول الأوروبيه", "شمال اسيا", "بلاد الفرس"],
      correctAnswer: 0,
      image: null,
    },
  ];

  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleAnswerChange = (questionId, optionIndex) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: optionIndex,
    }));
  };

  const handleSubmit = () => {
    if (Object.keys(answers).length !== questionsArray.length) {
      toast.error("يرجى الإجابة على جميع الأسئلة قبل التقديم!", {
        position: "top-center",
      });
      return;
    }

    let correctCount = 0;
    questionsArray.forEach((q) => {
      if (answers[q.id] === q.correctAnswer) {
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

  return (
    <div className="exam-system-container">
      <h2 className="exam-system-title">الامتحان</h2>
      <form className="exam-system-form">
        {questionsArray.map((q, index) => (
          <div key={q.id} className="exam-question-container">
            <h3 className="exam-question">
              السؤال {index + 1}: {q.question}
            </h3>

            {q.image && (
              <div className="exam-image-container">
                <img
                  src={q.image}
                  alt={`صورة للسؤال ${index + 1}`}
                  className="exam-image"
                />
              </div>
            )}

            <ul className="exam-options-list">
              {q.options.map((option, optIndex) => {
                let optionClass = "exam-option";
                if (submitted) {
                  if (optIndex === q.correctAnswer) {
                    optionClass += " exam-option-correct";
                  } else if (answers[q.id] === optIndex) {
                    optionClass += " exam-option-wrong";
                  }
                } else if (answers[q.id] === optIndex) {
                  optionClass += " exam-option-selected";
                }

                return (
                  <li key={optIndex} className={optionClass}>
                    <input
                      type="radio"
                      id={`option-${q.id}-${optIndex}`}
                      name={`question-${q.id}`}
                      value={optIndex}
                      checked={answers[q.id] === optIndex}
                      onChange={() => handleAnswerChange(q.id, optIndex)}
                      className="exam-radio"
                    />
                    <label htmlFor={`option-${q.id}-${optIndex}`}>
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

      <ToastContainer />
    </div>
  );
};

export default ExamsSystem;
