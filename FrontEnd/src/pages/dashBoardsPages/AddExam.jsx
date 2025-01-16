import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import "./../../styles/dashboard/AddExam.css";
import FileInputComponent from "./../../pages/exams/FileInputComponent";
import ManualInputComponent from "./../../pages/exams/ManualInputComponent";
import moment from "moment";

const CreateExamComponent = () => {
  const [questions, setQuestions] = useState([]);
  const [inputMode, setInputMode] = useState("file");
  const [examDetails, setExamDetails] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    duration: "",
    stage: "",
    type: "", // نوع الامتحان
  });

  const handleAddQuestions = (importedQuestions) => {
    // تحديث الأسئلة بدون تعديل التعليل
    setQuestions([...questions, ...importedQuestions]);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setExamDetails({
      ...examDetails,
      [name]: value,
    });
  };

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][field] = value;
    setQuestions(updatedQuestions);
  };

  const handleSubmit = async () => {
    if (
      !examDetails.title ||
      !examDetails.description ||
      !examDetails.date ||
      !examDetails.duration ||
      !examDetails.stage ||
      !examDetails.type || // التحقق من نوع الامتحان
      questions.length === 0
    ) {
      toast.error("يرجى ملء جميع الحقول وإضافة الأسئلة!");
      return;
    }

    // تنسيق بيانات الامتحان للإرسال
    const examData = {
      title: examDetails.title,
      description: examDetails.description,
      date: moment.utc(examDetails.date).format("YYYY-MM-DDTHH:mm:ss.SSZ"),
      duration: parseInt(examDetails.duration, 10),
      questions,
      stage: examDetails.stage,
      type: examDetails.type, // إرسال نوع الامتحان
    };

    console.log("Exam Data Sent:", examData);

    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.post(
        "http://localhost:8000/exams",
        examData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("تم إنشاء الامتحان بنجاح!");

      setExamDetails({
        title: "",
        description: "",
        date: "",
        duration: "",
        stage: "",
        type: "",
      });
      setQuestions([]);
      console.log("Exam Created Successfully:", response.data);
    } catch (error) {
      console.error("حدث خطأ أثناء إنشاء الامتحان:", error);
      toast.error("حدث خطأ أثناء إنشاء الامتحان. حاول مرة أخرى.");
    }
  };

  return (
    <div className="container">
      <h2 className="exam-title">إنشاء امتحان</h2>

      <div className="exam-details">
        <label>
          عنوان الامتحان:
          <input
            type="text"
            name="title"
            value={examDetails.title}
            onChange={handleInputChange}
            placeholder="أدخل عنوان الامتحان"
          />
        </label>
        <label>
          وصف الامتحان:
          <textarea
            name="description"
            value={examDetails.description}
            onChange={handleInputChange}
            placeholder="أدخل وصف الامتحان"
          ></textarea>
        </label>
        <label>
          نوع الامتحان:
          <select
            name="type"
            id="type"
            value={examDetails.type}
            onChange={handleInputChange}
          >
            <option value="" disabled>اختر نوع الامتحان</option>
            <option value="امتحان">امتحان</option>
            <option value="تدريب">تدريبات</option>
          </select>
        </label>
        <label>
          تاريخ الامتحان:
          <input
            type="datetime-local"
            name="date"
            value={examDetails.date}
            onChange={handleInputChange}
          />
        </label>
        <label>
          مدة الامتحان (بالدقائق):
          <input
            type="number"
            name="duration"
            value={examDetails.duration}
            onChange={handleInputChange}
            placeholder="أدخل مدة الامتحان بالدقائق"
          />
        </label>
        <label>
          المرحلة الدراسية:
          <select
            name="stage"
            value={examDetails.stage}
            onChange={handleInputChange}
          >
            <option value="" disabled>اختر المرحلة الدراسية</option>
            <option value="أولى ثانوي">أولى ثانوي</option>
            <option value="ثانية ثانوي">ثانية ثانوي</option>
            <option value="ثالثة ثانوي">ثالثة ثانوي</option>
          </select>
        </label>
      </div>

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

      {inputMode === "file" && (
        <FileInputComponent onAddQuestions={handleAddQuestions} />
      )}
      {inputMode === "manual" && (
        <ManualInputComponent onAddQuestions={handleAddQuestions} />
      )}

      <div className="added-questions">
        <h3>الأسئلة المضافة</h3>
        {questions.length > 0 ? (
          questions.map((q, index) => (
            <details key={index} className="question-details">
              <summary>
                <strong>السؤال {index + 1}:</strong> {q.question}
              </summary>
              <label
                value={q.question}
                onChange={(e) =>
                  handleQuestionChange(index, "question", e.target.value)
                }
                placeholder="أدخل نص السؤال"
              ></label>
              {q.image && (
                <img
                  src={q.image}
                  alt={`Question ${index + 1}`}
                  className="question-image"
                />
              )}
              {q.why && (
                <p>
                  <strong>التعليل:</strong> {q.why}
                </p>
              )}
              <ul>
                {q.options.map((option, optIndex) => (
                  <li key={optIndex}>
                    خيار {optIndex + 1}: {option}
                  </li>
                ))}
              </ul>
            </details>
          ))
        ) : (
          <p>لا توجد أسئلة مضافة بعد.</p>
        )}
      </div>

      <button onClick={handleSubmit} className="submit-button">
        إنشاء الامتحان
      </button>

      <ToastContainer />
    </div>
  );
};

export default CreateExamComponent;
