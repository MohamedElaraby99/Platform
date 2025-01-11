import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateExamComponent = () => {
  const [questions, setQuestions] = useState([]);
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [explanation, setExplanation] = useState("");
  const [image, setImage] = useState(null);

  const handleAddQuestion = () => {
    if (!question || correctAnswer === null) {
      toast.error("يرجى إدخال السؤال واختيار الإجابة الصحيحة.", {
        position: "top-center",
      });
      return;
    }

    const newQuestion = {
      question,
      options,
      correctAnswer,
      explanation,
      image,
    };

    setQuestions([...questions, newQuestion]);
    setQuestion("");
    setOptions(["", "", "", ""]);
    setCorrectAnswer(null);
    setExplanation("");
    setImage(null);
    toast.success("تم إضافة السؤال بنجاح!", { position: "top-center" });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="container">
      <h2>إنشاء امتحان</h2>
      <div className="question-input">
        <h3>إدخال سؤال يدويًا</h3>
        <div>
          <label>السؤال:</label>
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="أدخل السؤال"
            rows="3"
            style={{ width: "100%", marginBottom: "10px" }}
          />
        </div>
        <div>
          <label>إضافة صورة (اختياري):</label>
          <input type="file" onChange={handleImageUpload} />
          {image && (
            <img
              src={image}
              alt="Preview"
              style={{ maxWidth: "100px", marginTop: "10px" }}
            />
          )}
        </div>
        <div>
          <label>الإجابات:</label>
          {options.map((option, index) => (
            <input
              key={index}
              type="text"
              placeholder={`الإجابة ${index + 1}`}
              value={option}
              onChange={(e) =>
                setOptions(
                  options.map((opt, i) => (i === index ? e.target.value : opt))
                )
              }
              style={{ display: "block", marginBottom: "5px" }}
            />
          ))}
        </div>
        <div>
          <label>اختر الإجابة الصحيحة:</label>
          {options.map((_, index) => (
            <label key={index} style={{ marginRight: "10px" }}>
              <input
                type="radio"
                name="correctAnswer"
                value={index}
                checked={correctAnswer === index}
                onChange={() => setCorrectAnswer(index)}
              />
              {`إجابة ${index + 1}`}
            </label>
          ))}
        </div>
        <div>
          <label>التعليل (في حالة الخطأ):</label>
          <textarea
            value={explanation}
            onChange={(e) => setExplanation(e.target.value)}
            placeholder="أدخل التعليل"
            rows="3"
            style={{ width: "100%", marginBottom: "10px" }}
          />
        </div>
        <button onClick={handleAddQuestion} style={{ marginTop: "10px" }}>
          إضافة السؤال
        </button>
      </div>

      <div style={{ marginTop: "20px" }}>
        <h3>موقع استخراج النصوص</h3>
        <iframe
          src="http://localhost:8000/api/proxy"
          title="OCRify"
          style={{
            width: "100%",
            height: "600px",
            border: "1px solid #ddd",
          }}
        />
      </div>

      <div style={{ marginTop: "20px" }}>
        <h3>الأسئلة المضافة</h3>
        {questions.length > 0 ? (
          <ul>
            {questions.map((q, index) => (
              <li key={index} style={{ marginBottom: "10px" }}>
                <strong>السؤال {index + 1}:</strong> {q.question}
                {q.image && (
                  <img
                    src={q.image}
                    alt={`Question ${index + 1}`}
                    style={{ maxWidth: "50px", marginLeft: "10px" }}
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
                <p>
                  <strong>التعليل:</strong> {q.explanation || "لا يوجد تعليل"}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p>لا توجد أسئلة مضافة بعد.</p>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default CreateExamComponent;
