import React, { useState, useCallback } from "react";
import DropzoneComponent from "./../../components/DropzoneComponent";
import QuestionsListComponent from "./../../components/QuestionsListComponent";
import FixArabicWordsComponent from "./../../components/FixArabicWordsComponent";
import Tesseract from "tesseract.js";
import { getDocument } from "pdfjs-dist";
import "pdfjs-dist/build/pdf.worker.entry";
import "./../../styles/dashboard/AddExam.css";

const CreateExamComponent = () => {
  const [file, setFile] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [message, setMessage] = useState(
    "اختر ملف PDF أو صورة لاستخراج النصوص"
  );
  const [loading, setLoading] = useState(false);
  const [rawText, setRawText] = useState("");
  const [inputMode, setInputMode] = useState("upload"); // "upload" or "manual"

  const onDrop = (acceptedFiles) => {
    const selectedFile = acceptedFiles[0];
    if (!selectedFile) {
      setMessage("يرجى اختيار ملف صالح.");
      return;
    }

    setFile(selectedFile);
    const isPDF = selectedFile.type === "application/pdf";
    if (isPDF) {
      extractTextFromPDF(selectedFile);
    } else {
      extractTextFromImage(selectedFile);
    }
  };

  const extractTextFromImage = async (file) => {
    setLoading(true);
    setMessage("جارٍ استخراج النصوص من الصورة، يرجى الانتظار...");
    try {
      const { data } = await Tesseract.recognize(file, "ara", {
        logger: (info) => console.log(info),
      });
      setRawText(data.text);
    } catch (error) {
      console.error("Error extracting text from image:", error);
      setMessage(
        "حدث خطأ أثناء استخراج النصوص من الصورة. يرجى المحاولة مرة أخرى."
      );
    } finally {
      setLoading(false);
    }
  };

  const extractTextFromPDF = async (file) => {
    setLoading(true);
    setMessage("جارٍ استخراج النصوص من PDF، يرجى الانتظار...");
    try {
      const reader = new FileReader();
      reader.onload = async () => {
        const typedarray = new Uint8Array(reader.result);
        const pdf = await getDocument(typedarray).promise;

        let fullText = "";
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const textContent = await page.getTextContent();
          fullText +=
            textContent.items.map((item) => item.str).join(" ") + "\n";
        }

        setRawText(fullText);
      };
      reader.readAsArrayBuffer(file);
    } catch (error) {
      console.error("Error extracting text from PDF:", error);
      setMessage(
        "حدث خطأ أثناء استخراج النصوص من PDF. يرجى المحاولة مرة أخرى."
      );
    } finally {
      setLoading(false);
    }
  };

  const extractQuestions = useCallback(
    (text) => {
      const questionRegex =
        /(\d+|[١-٩]\d*)\s*[-.]*\s*(.+?)\s*ا\s*\)\s*(.+?)\s*ب\s*\)\s*(.+?)\s*ج\s*\)\s*(.+?)\s*د\s*\)\s*(.+?)(?=\d+|[١-٩]\d*|$)/gs;

      const matches = [...text.matchAll(questionRegex)];
      const extractedQuestions = matches.map((match, index) => ({
        id: index + 1,
        question: match[2].trim(),
        options: [
          match[3].trim(),
          match[4].trim(),
          match[5].trim(),
          match[6].trim(),
        ],
        correctAnswer: null, // Add correctAnswer field
        image: null,
      }));

      setQuestions(extractedQuestions);
      setMessage("تم استخراج الأسئلة بنجاح!");
    },
    [setQuestions]
  );

  const handleImageUpload = (index, file) => {
    const reader = new FileReader();
    reader.onload = () => {
      const updatedQuestions = [...questions];
      updatedQuestions[index].image = reader.result;
      setQuestions(updatedQuestions);
    };
    reader.readAsDataURL(file);
  };

  const addManualQuestion = () => {
    setQuestions([
      ...questions,
      {
        id: questions.length + 1,
        question: "",
        options: ["", "", "", ""],
        correctAnswer: null,
        image: null,
      },
    ]);
  };

  const updateManualQuestion = (index, field, value) => {
    const updatedQuestions = [...questions];
    if (field === "question") {
      updatedQuestions[index].question = value;
    } else if (field.startsWith("correctAnswer")) {
      updatedQuestions[index].correctAnswer = parseInt(value, 10);
    } else {
      const [optionIndex] = field.split("-");
      updatedQuestions[index].options[optionIndex] = value;
    }
    setQuestions(updatedQuestions);
  };

  const submitExam = () => {
    console.log("Exam Submitted:", questions);
    setMessage("تم تقديم الامتحان بنجاح!");
  };

  return (
    <div className="create-exam-container">
      <h2>إنشاء امتحان</h2>
      {message && <p>{message}</p>}

      {/* Input mode selection */}
      <div className="input-mode-selection">
        <label>
          <input
            type="radio"
            name="inputMode"
            value="upload"
            checked={inputMode === "upload"}
            onChange={(e) => {
              setInputMode(e.target.value);
              setQuestions([]); // Clear questions when switching to upload mode
            }}
          />
          إدخال من ملف
        </label>
        <label>
          <input
            type="radio"
            name="inputMode"
            value="manual"
            checked={inputMode === "manual"}
            onChange={(e) => setInputMode(e.target.value)}
          />
          إدخال يدوي
        </label>
      </div>

      {/* File upload mode */}
      {inputMode === "upload" && !file && <DropzoneComponent onDrop={onDrop} />}
      {loading && inputMode === "upload" && (
        <p>جارٍ استخراج النصوص، يرجى الانتظار...</p>
      )}
      {rawText && inputMode === "upload" && (
        <FixArabicWordsComponent
          text={rawText}
          onFixComplete={extractQuestions}
        />
      )}

      {/* Manual question input mode */}
      {inputMode === "manual" && (
        <div className="manual-input">
          <button onClick={addManualQuestion}>إضافة سؤال جديد</button>
          <p>عدد الأسئلة: {questions.length}</p>
          {questions.map((q, index) => (
            <div key={q.id} className="manual-question">
              <textarea
                placeholder="أدخل نص السؤال"
                value={q.question}
                onChange={(e) =>
                  updateManualQuestion(index, "question", e.target.value)
                }
              />
              {q.options.map((option, optIndex) => (
                <div key={optIndex} className="option-container">
                  <input
                    placeholder={`خيار ${optIndex + 1}`}
                    value={option}
                    onChange={(e) =>
                      updateManualQuestion(
                        index,
                        `${optIndex}-option`,
                        e.target.value
                      )
                    }
                  />
                  <label>
                    <input
                      type="radio"
                      name={`correctAnswer-${index}`}
                      value={optIndex}
                      checked={q.correctAnswer === optIndex}
                      onChange={(e) =>
                        updateManualQuestion(
                          index,
                          "correctAnswer",
                          e.target.value
                        )
                      }
                    />
                    الإجابة الصحيحة
                  </label>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      {questions.length > 0 && inputMode === "upload" && (
        <QuestionsListComponent
          questions={questions}
          handleImageUpload={handleImageUpload}
          submitExam={submitExam}
        />
      )}
    </div>
  );
};

export default CreateExamComponent;
