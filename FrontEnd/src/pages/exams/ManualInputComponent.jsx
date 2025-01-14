import React, { useState } from "react";
import { toast } from "react-toastify";

const ManualInputComponent = ({ onAddQuestions }) => {
  const [question, setQuestion] = useState("");
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

    const newQuestion = {
      question,
      options,
      correctAnswer,
    };

    onAddQuestions([newQuestion]);
    setQuestion("");
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
        الخيارات:
        {options.map((option, index) => (
          <input
            key={index}
            type="text"
            value={option}
            onChange={(e) =>
              setOptions(
                options.map((opt, i) => (i === index ? e.target.value : opt))
              )
            }
            placeholder={`الخيار ${index + 1}`}
          />
        ))}
      </label>
      <label>
        الإجابة الصحيحة:
        <select
          value={correctAnswer === null ? "" : correctAnswer}
          onChange={(e) => setCorrectAnswer(parseInt(e.target.value, 10))}
        >
          <option value="">اختر الإجابة الصحيحة</option>
          {options.map((_, index) => (
            <option key={index} value={index}>
              الخيار {index + 1}
            </option>
          ))}
        </select>
      </label>
      <button onClick={handleAddQuestion}>إضافة السؤال</button>
    </div>
  );
};

export default ManualInputComponent;
