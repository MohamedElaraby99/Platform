import React, { useState } from "react";
import { toast } from "react-toastify";

const ManualInputComponent = ({ onAddQuestion }) => {
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

    onAddQuestion(newQuestion);
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
    <div className="question-input">
      <h3>إدخال سؤال</h3>
      <label>السؤال:</label>
      <textarea
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        className="question-textarea"
        placeholder="أدخل السؤال"
        rows="3"
      />
      <label>إضافة صورة (اختياري):</label>
      <input type="file" className="image-input" onChange={handleImageUpload} />
      <div className="image-preview-container">
        {image && (
          <div className="image-preview-wrapper">
            <img src={image} alt="Preview" className="image-preview" />
            <button
              onClick={() => setImage(null)}
              className="delete-image-button"
            >
              حذف الصورة
            </button>
          </div>
        )}
      </div>

      <div className="answer-options">
        <label>الإجابات:</label>
        {options.map((option, index) => (
          <div
            key={index}
            className={`option ${correctAnswer === index ? "correct" : ""}`}
          >
            <input
              className="option-radio"
              type="radio"
              name="correctAnswer"
              checked={correctAnswer === index}
              onChange={() => setCorrectAnswer(index)}
            />
            <input
              className="option-input"
              type="text"
              placeholder={`الإجابة ${index + 1}`}
              value={option}
              onChange={(e) =>
                setOptions(
                  options.map((opt, i) => (i === index ? e.target.value : opt))
                )
              }
            />
          </div>
        ))}
      </div>
      <label>التعليل (في حالة الخطأ):</label>
      <textarea
        value={explanation}
        onChange={(e) => setExplanation(e.target.value)}
        className="explanation-textarea"
        placeholder="أدخل التعليل"
        rows="3"
      />
      <button onClick={handleAddQuestion} className="add-question-button">
        إضافة السؤال
      </button>
    </div>
  );
};

export default ManualInputComponent;
