import React, { useState } from "react";
import { toast } from "react-toastify";
import mammoth from "mammoth";
import Loader from "./../../pages/Loader.jsx";
import "./FileInputComponent.css"; // Importing a separate CSS file

const FileInputComponent = ({ onAddQuestions }) => {
  const [parsedQuestions, setParsedQuestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFileImport = async (e) => {
    const file = e.target.files[0];

    if (file && file.name.endsWith(".docx")) {
      const reader = new FileReader();

      reader.onload = async (event) => {
        const arrayBuffer = event.target.result;

        try {
          setLoading(true);

          const htmlContent = await extractContentFromDocxToHTML(arrayBuffer);

          const questions = parseHtmlToQuestions(htmlContent);

          if (questions.length > 0) {
            setParsedQuestions(questions);
            onAddQuestions(questions);
            toast.success("تم استرجاع المحتوى بنجاح!", {
              position: "top-center",
            });
          } else {
            toast.warn("ليس هناك اسئلة في الملف.", {
              position: "top-center",
            });
          }
        } catch (error) {
          console.error(error);
          toast.error("حدث خطأ في استرجاع المحتوى.", {
            position: "top-center",
          });
        } finally {
          setLoading(false);
        }
      };

      reader.readAsArrayBuffer(file);
    } else {
      toast.error("الرجاء رفع ملف .docx فقط.", {
        position: "top-center",
      });
    }
  };

  const extractContentFromDocxToHTML = async (arrayBuffer) => {
    const result = await mammoth.convertToHtml({ arrayBuffer });
    return result.value;
  };

  const parseHtmlToQuestions = (htmlContent) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, "text/html");

    const questions = [];
    const paragraphs = doc.querySelectorAll("p");

    let currentQuestion = null;

    paragraphs.forEach((p) => {
      const text = p.textContent.trim();
      const questionMatch = text.match(/^\d+[)-]?\s*(.*)$/);
      const image = p.querySelector("img");

      if (questionMatch) {
        if (currentQuestion) questions.push(currentQuestion);
        currentQuestion = {
          question: questionMatch[1].trim(),
          options: [],
          correctAnswer: null,
          image: null,
        };
      } else if (/^[أ-ي]-|^[1-9]\./.test(text)) {
        if (currentQuestion) {
          currentQuestion.options.push(
            text.replace(/^[أ-ي]-|^[1-9]\./, "").trim()
          );
        }
      } else if (text.startsWith("الإجابة:")) {
        if (currentQuestion) {
          currentQuestion.correctAnswer = text.replace("الإجابة:", "").trim();
        }
      }

      if (image && currentQuestion) {
        currentQuestion.image = image.src;
      }
    });

    if (currentQuestion) questions.push(currentQuestion);

    return questions;
  };

  const handleSetCorrectAnswer = (questionIndex, optionIndex) => {
    setParsedQuestions((prevQuestions) => {
      const updatedQuestions = [...prevQuestions];
      updatedQuestions[questionIndex].correctAnswer = optionIndex;
      return updatedQuestions;
    });
  };

  return (
    <div className="file-input-container">
      <h3>استخراج الاسئلة من ملف Word</h3>
      <input
        type="file"
        accept=".docx"
        onChange={handleFileImport}
        className="file-input"
      />
      {loading && <Loader />}
      {!loading && parsedQuestions.length > 0 && (
        <div className="questions-container">
          <h3>قائمة الاسئلة:</h3>
          {parsedQuestions.map((q, index) => (
            <details key={index} className="question-item">
              <summary>
                <strong>السؤال {index + 1}:</strong>{" "}
                {q.question || "ليس هناك نص لهذا السؤال"}
              </summary>
              <ul className="options-list">
                {q.options.map((option, optIndex) => (
                  <li key={optIndex} className="option-item">
                    <span>{option}</span>
                    <button
                      onClick={() => handleSetCorrectAnswer(index, optIndex)}
                      className={`selectt-answer-button ${
                        q.correctAnswer === optIndex ? "selected" : ""
                      }`}
                    >
                      {q.correctAnswer === optIndex
                        ? "تم اختياره"
                        : "اختيار الإجابة"}
                    </button>
                  </li>
                ))}
              </ul>
              {q.image && (
                <div className="question-image">
                  <p>
                    <strong>الصورة:</strong>
                  </p>
                  <img
                    src={q.image}
                    alt={`الصورة ${index + 1}`}
                    className="question-image"
                  />
                </div>
              )}
            </details>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileInputComponent;
