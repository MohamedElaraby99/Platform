import React, { useState } from "react";
import DropzoneComponent from "./../../components/DropzoneComponent";
import FixArabicWordsComponent from "./../../components/FixArabicWordsComponent";
import Tesseract from "tesseract.js";
import { getDocument } from "pdfjs-dist/legacy/build/pdf";
import "react-toastify/dist/ReactToastify.css";
import "./../../styles/dashboard/AddExam.css";
import { GlobalWorkerOptions } from "pdfjs-dist";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry";

GlobalWorkerOptions.workerSrc = pdfjsWorker;

const AutomaticExamComponent = ({ setQuestions }) => {
  const [message, setMessage] = useState(
    "اختر ملف PDF أو صورة لاستخراج النصوص"
  );
  const [loading, setLoading] = useState(false);
  const [rawText, setRawText] = useState("");
  const [questions, setLocalQuestions] = useState([]); // حالة محلية للأسئلة
  const [isFileUploaded, setIsFileUploaded] = useState(false); // حالة لمعرفة إذا تم رفع الملف

  const onDrop = (acceptedFiles) => {
    const selectedFile = acceptedFiles[0];
    if (!selectedFile) {
      setMessage("يرجى اختيار ملف صالح.");
      return;
    }

    // تحديث حالة رفع الملف
    setIsFileUploaded(true);

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
      setMessage("تم استخراج النصوص بنجاح. يمكنك الآن تصحيح النصوص.");
    } catch (error) {
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
        setMessage("تم استخراج النصوص بنجاح. يمكنك الآن تصحيح النصوص.");
      };
      reader.readAsArrayBuffer(file);
    } catch (error) {
      setMessage(
        "حدث خطأ أثناء استخراج النصوص من PDF. يرجى المحاولة مرة أخرى."
      );
    } finally {
      setLoading(false);
    }
  };

  const extractQuestions = (text) => {
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
      correctAnswer: null,
      image: null,
    }));

    setLocalQuestions(extractedQuestions);
    setQuestions(extractedQuestions); // تحديث الأسئلة في المكون الرئيسي
    setMessage("تم استخراج الأسئلة بنجاح!");
  };

  const handleOptionSelect = (questionId, optionIndex) => {
    const updatedQuestions = questions.map((q) =>
      q.id === questionId ? { ...q, correctAnswer: optionIndex } : q
    );
    setLocalQuestions(updatedQuestions);
    setQuestions(updatedQuestions);
  };

  const handleImageUpload = (questionId, file) => {
    const reader = new FileReader();
    reader.onload = () => {
      const updatedQuestions = questions.map((q) =>
        q.id === questionId ? { ...q, image: reader.result } : q
      );
      setLocalQuestions(updatedQuestions);
      setQuestions(updatedQuestions);
    };
    reader.readAsDataURL(file);
  };

  const handleQuestionEdit = (questionId, newQuestion) => {
    const updatedQuestions = questions.map((q) =>
      q.id === questionId ? { ...q, question: newQuestion } : q
    );
    setLocalQuestions(updatedQuestions);
    setQuestions(updatedQuestions);
  };

  const handleOptionEdit = (questionId, optionIndex, newOption) => {
    const updatedQuestions = questions.map((q) => {
      if (q.id === questionId) {
        const updatedOptions = [...q.options];
        updatedOptions[optionIndex] = newOption;
        return { ...q, options: updatedOptions };
      }
      return q;
    });
    setLocalQuestions(updatedQuestions);
    setQuestions(updatedQuestions);
  };

  return (
    <div className="automatic-exam-container">
      {!isFileUploaded && <DropzoneComponent onDrop={onDrop} />}
          {loading &&
              <p>جارٍ استخراج النصوص، يرجى الانتظار...</p>
          }
      {rawText && (
        <FixArabicWordsComponent
          text={rawText}
          onFixComplete={extractQuestions}
        />
      )}
      {message && <p>{message}</p>}

      {questions.length > 0 && (
        <div>
          <h4>الأسئلة المستخرجة:</h4>
          {questions.map((q) => (
            <details key={q.id} style={{ marginBottom: "20px" }}>
              <summary>
                <strong>السؤال {q.id}:</strong>
              </summary>
              {q.image && (
                      <div
                          style={{ marginBottom: "10px" }}>
                  <img
                    src={q.image}
                    alt={`صورة للسؤال ${q.id}`}
                    style={{ width: "150px", height: "150px" }}
                  />
                </div>
              )}
                  <textarea
                      className="question-textarea"
                    type="text"
                rows="2"
                cols="50"
                value={q.question}
                onChange={(e) => handleQuestionEdit(q.id, e.target.value)}
              />
              <ul className="options">
                {q.options.map((option, index) => (
                  <li key={index}>
                    <input
                      type="text"
                      value={option}
                      onChange={(e) =>
                        handleOptionEdit(q.id, index, e.target.value)
                      }
                    />
                    <label>
                      <input
                        type="radio"
                        name={`correctAnswer-${q.id}`}
                        value={index}
                        checked={q.correctAnswer === index}
                        onChange={() => handleOptionSelect(q.id, index)}
                      />
                      الإجابة الصحيحة
                    </label>
                  </li>
                ))}
              </ul>
              <div>
                <strong>إضافة صورة:</strong>
                <input
                  type="file"
                  onChange={(e) => handleImageUpload(q.id, e.target.files[0])}
                />
              </div>
            </details>
          ))}
        </div>
      )}
    </div>
  );
};

export default AutomaticExamComponent;
