import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./../../styles/dashboard/AddExam.css";
import FileInputComponent from "./../../pages/exams/FileInputComponent";

const CreateExamComponent = () => {
  const [questions, setQuestions] = useState([]);
  const [inputMode, setInputMode] = useState("file"); // "manual" or "file"

  const handleAddQuestions = (importedQuestions) => {
    setQuestions([...questions, ...importedQuestions]);
  };

  return (
    <div className="container">
      <h2 className="exam-title">إنشاء امتحان</h2>

      {/* اختيار وضع الإدخال */}
      <div className="input-mode-selector">
        <label>
          <input
            type="radio"
            name="inputMode"
            value="file"
            checked={inputMode === "file"}
            onChange={() => setInputMode("file")}
          />
          تحميل ملف
        </label>
      </div>

      {/* عرض المكونات بناءً على وضع الإدخال */}
      {inputMode === "file" && (
        <FileInputComponent onAddQuestions={handleAddQuestions} />
      )}

      {/* عرض الأسئلة المضافة */}
      <div className="added-questions">
        <h3>الأسئلة المضافة</h3>
        {questions.length > 0 ? (
          questions.map((q, index) => (
            <details key={index} className="question-details">
              <summary>
                <strong>السؤال {index + 1}:</strong> {q.question}
              </summary>
              {q.image && (
                <img
                  src={q.image}
                  alt={`Question ${index + 1}`}
                  className="question-image"
                />
              )}
              <ul>
                {q.options.map((option, optIndex) => (
                  <li
                    key={optIndex}
                    style={{
                      color: q.correctAnswer === optIndex ? "green" : "black",
                    }}
                  >
                    <span>خيار {optIndex + 1}: </span>
                    {option}
                  </li>
                ))}
              </ul>
            </details>
          ))
        ) : (
          <p>لا توجد أسئلة مضافة بعد.</p>
        )}
      </div>

      <ToastContainer />
    </div>
  );
};

export default CreateExamComponent;
