import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import ManualQuestionComponent from "./../../pages/exams/ManualQuestionComponent";
import AutomaticExamComponent from "./../../pages/exams/AutomaticExamComponent";
import "./../../styles/dashboard/AddExam.css";

const CreateExamComponent = () => {
  const [inputMode, setInputMode] = useState("upload");
  const [questions, setQuestions] = useState([]);
  const [examTitle, setExamTitle] = useState("");
  const [examDate, setExamDate] = useState("");
  const [examGrade, setExamGrade] = useState("");
  const [showPreview, setShowPreview] = useState(false);

  const handleExamSubmit = async () => {
    if (!examTitle || !examDate || !examGrade) {
      toast.error(
        "يرجى تعبئة جميع بيانات الامتحان (العنوان، التاريخ، المرحلة الدراسية).",
        {
          position: "top-center",
        }
      );
      return;
    }

    if (questions.length === 0) {
      toast.error("لا توجد أسئلة لتقديمها. يرجى إضافة أسئلة أولاً.", {
        position: "top-center",
      });
      return;
    }

    try {
      const examPayload = {
        title: examTitle,
        date: examDate,
        grade: examGrade,
        questions,
      };

      await axios.post("http://localhost:8000/exams", examPayload);

      toast.success("تم تقديم الامتحان بنجاح!", {
        position: "top-center",
      });

      // إعادة تعيين الحقول بعد الإرسال
      setQuestions([]);
      setExamTitle("");
      setExamDate("");
      setExamGrade("");
    } catch (error) {
      console.error("خطأ أثناء تقديم الامتحان:", error);
      toast.error("حدث خطأ أثناء تقديم الامتحان. حاول مرة أخرى.", {
        position: "top-center",
      });
    }
  };

  const handlePreview = () => {
    if (questions.length === 0) {
      toast.warn("لا توجد أسئلة لمشاهدتها. يرجى إضافة أسئلة أولاً.", {
        position: "top-center",
      });
      return;
    }

    setShowPreview(true);
  };

  return (
    <div className="container">
    <div className="create-exam-page">
      <div className="create-exam-container">
        <h2>إنشاء امتحان</h2>
        <div className="input-container">
          <label htmlFor="examTitle">عنوان الامتحان:</label>
          <input
            className="input-field"
            type="text"
            id="examTitle"
            value={examTitle}
            onChange={(e) => setExamTitle(e.target.value)}
            placeholder="أدخل عنوان الامتحان"
            required
          />
        </div>
        <div className="input-container">
          <label htmlFor="examDate">تاريخ الامتحان:</label>
          <input
            type="date"
            id="examDate"
            value={examDate}
            onChange={(e) => setExamDate(e.target.value)}
            required
            className="input-field"
          />
        </div>
        <div className="input-container">
          <label htmlFor="examGrade">المرحلة الدراسية:</label>
          <select
            id="examGrade"
            value={examGrade}
            onChange={(e) => setExamGrade(e.target.value)}
            required
            className="input-field"
          >
            <option value="" disabled>
              اختر المرحلة الدراسية
            </option>
            <option value="أولى ثانوي">أولى ثانوي</option>
            <option value="ثانية ثانوي">ثانية ثانوي</option>
            <option value="ثالثة ثانوي">ثالثة ثانوي</option>
          </select>
        </div>
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
            className="previeww-button"
            onClick={handlePreview}
            style={{ padding: "10px 20px" }}
          >
            مشاهدة مسبقة
          </button>
          <button
            className="submitt-button"
            onClick={handleExamSubmit}
            style={{ padding: "10px 20px" }}
          >
            تقديم الامتحان
          </button>
        </div>

        {/* معاينة الامتحان */}
        {showPreview && (
          <div className="exam-preview">
            <h3>معاينة الامتحان</h3>
            <p>عنوان الامتحان: {examTitle}</p>
            <p>تاريخ الامتحان: {examDate}</p>
            <p>المرحلة الدراسية: {examGrade}</p>
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
                              q.correctAnswer === optIndex ? "green" : "black",
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

        <ToastContainer />
      </div>
      </div>
    </div>
  );
};

export default CreateExamComponent;
