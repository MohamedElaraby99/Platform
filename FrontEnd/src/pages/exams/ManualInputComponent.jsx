import React, { useState } from "react";
import { toast } from "react-toastify";

const ManualInputComponent = ({ onAddQuestions }) => {
  const [question, setQuestion] = useState("");
  const [why, setWhy] = useState(""); // حقل التعليل الجديد
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctAnswer, setCorrectAnswer] = useState(null);

  const handleAddQuestion = () => {
    if (!question.trim()) {
      toast.error("يرجى إدخال نص السؤال!");
      return;
    }

    if (options.some((option) => !option.trim())) {
      toast.error("يرجى إدخال جميع الخيارات!");
      return;
    }

    if (correctAnswer === null) {
      toast.error("يرجى تحديد الإجابة الصحيحة!");
      return;
    }

    if (!why.trim()) {
      toast.error("يرجى إدخال التعليل!");
      return;
    }

    const newQuestion = {
      question,
      why, // إضافة التعليل إلى السؤال
      options,
      correctAnswer,
    };

    onAddQuestions([newQuestion]);
    setQuestion("");
    setWhy(""); // إعادة تعيين التعليل بعد إضافة السؤال
    setOptions(["", "", "", ""]);
    setCorrectAnswer(null);
    toast.success("تم إضافة السؤال بنجاح!");
  };

  return (
    <div>
      <h3>إضافة سؤال يدوي</h3>
      <label>
        نص السؤال:
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="أدخل نص السؤال"
        ></textarea>
      </label>
      <label>
        التعليل:
        <textarea
          value={why}
          onChange={(e) => setWhy(e.target.value)}
          placeholder="أدخل التعليل لهذا السؤال"
        ></textarea>
      </label>
      <label>
        الخيارات:
        {options.map((option, index) => (
          <div key={index} className="option-container" >
            <input
              type="text"
              value={option}
              onChange={(e) =>
                setOptions(
                  options.map((opt, i) => (i === index ? e.target.value : opt))
                )
              }
              placeholder={`الخيار ${index + 1}`}
              style={{ flex: 1 }}
            />
            <button
              onClick={() => setCorrectAnswer(index)}
              style={{
                marginLeft: "10px",
                backgroundColor: correctAnswer === index ? "green" : "gray",
                color: "white",
                border: "none",
                cursor: "pointer",
                padding: "5px 10px",
              }}
            >
              {correctAnswer === index ? "✓" : "اختر كإجابة صحيحة"}
            </button>
          </div>
        ))}
      </label>
      <button onClick={handleAddQuestion}>إضافة السؤال</button>
    </div>
  );
};

export default ManualInputComponent;
