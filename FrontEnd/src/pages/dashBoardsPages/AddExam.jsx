import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ManualQuestionComponent from "./../../pages/exams/ManualQuestionComponent";
import AutomaticExamComponent from "./../../pages/exams/AutomaticExamComponent";
import "./../../styles/dashboard/AddExam.css";

const CreateExamComponent = () => {
  const [inputMode, setInputMode] = useState("upload");
  const [questions, setQuestions] = useState([]);
  const [showPreview, setShowPreview] = useState(false); // للتحكم في عرض المعاينة

  const handleExamSubmit = () => {
    if (questions.length === 0) {
      toast.error("لا توجد أسئلة لتقديمها. يرجى إضافة أسئلة أولاً.", {
        position: "top-center",
      });
      return;
    }

    // قم هنا بإرسال الأسئلة إلى السيرفر أو حفظها
    console.log("تم تقديم الامتحان:", questions);

    // إظهار رسالة النجاح باستخدام toast
    toast.success("تم تقديم الامتحان بنجاح!", {
      position: "top-center",
    });
  };

  const handlePreview = () => {
    if (questions.length === 0) {
      toast.warn("لا توجد أسئلة لمشاهدتها. يرجى إضافة أسئلة أولاً.", {
        position: "top-center",
      });
      return;
    }

    // عرض المعاينة
    setShowPreview(true);
  };

  return (
    <div className="create-exam-page">
      <div className="create-exam-container">
        <h2>إنشاء امتحان</h2>

        <div className="input-mode-selection">
          <label>
            <input
              type="radio"
              name="inputMode"
              value="upload"
              checked={inputMode === "upload"}
              onChange={() => setInputMode("upload")}
            />
            إدخال من ملف
          </label>
          <label>
            <input
              type="radio"
              name="inputMode"
              value="manual"
              checked={inputMode === "manual"}
              onChange={() => setInputMode("manual")}
            />
            إدخال يدوي
          </label>
        </div>

        {inputMode === "upload" && (
          <AutomaticExamComponent setQuestions={setQuestions} />
        )}
        {inputMode === "manual" && (
          <ManualQuestionComponent
            questions={questions}
            setQuestions={setQuestions}
          />
        )}

        {/* أزرار تقديم الامتحان والمعاينة */}
        <div className="exam-buttons">
          <button
            className="preview-button"
            onClick={handlePreview}
            style={{ marginRight: "10px", padding: "10px 20px" }}
          >
            مشاهدة مسبقة
          </button>
          <button className="submitt-button" onClick={handleExamSubmit} style={{ padding: "10px 20px" }}>
            تقديم الامتحان
          </button>
        </div>

        {/* عرض المعاينة */}
        {showPreview && (
          <div className="exam-preview">
            <h3>معاينة الامتحان</h3>
            {questions.length > 0 ? (
              <ul>
                {questions.map((q, index) => (
                  <li key={index} style={{ marginBottom: "10px" }}>
                    <strong>السؤال {index + 1}:</strong> {q.question}
                    <ul>
                      {q.options.map((option, optIndex) => (
                        <li
                          key={optIndex}
                          style={{
                            color:
                              q.correctAnswer === optIndex ? "green" : "black", // لون أخضر للإجابة الصحيحة
                          }}
                        >
                          <span>خيار {optIndex + 1}: </span>
                          {option}
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            ) : (
              <p>لا توجد أسئلة.</p>
            )}
            <button
              className="close-preview-button"
              onClick={() => setShowPreview(false)}
              style={{ marginTop: "20px", padding: "10px 20px" }}
            >
              إغلاق المعاينة
            </button>
          </div>
        )}

        {/* ToastContainer لإظهار الإشعارات */}
        <ToastContainer />
      </div>
    </div>
  );
};

export default CreateExamComponent;
