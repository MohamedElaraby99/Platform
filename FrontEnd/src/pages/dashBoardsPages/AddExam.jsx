import React, { useState, useCallback } from "react";
import DropzoneComponent from "./../../components/DropzoneComponent";
import QuestionsListComponent from "./../../components/QuestionsListComponent";
import FixArabicWordsComponent from "./../../components/FixArabicWordsComponent";
import Tesseract from "tesseract.js";
import { getDocument } from "pdfjs-dist";
import "pdfjs-dist/build/pdf.worker.entry";
import "./../../styles/dashboard/AddExam.css";

const CreateExamFromImage = () => {
  const [file, setFile] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [message, setMessage] = useState(
    "اختر ملف PDF أو صورة لاستخراج النصوص"
  );
  const [loading, setLoading] = useState(false);
  const [rawText, setRawText] = useState("");

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

  const submitExam = () => {
    console.log("Exam Submitted:", questions);
    setMessage("تم تقديم الامتحان بنجاح!");
  };

  return (
    <div className="create-exam-container">
      <h2>إنشاء امتحان من صورة أو ملف PDF</h2>
      {message && <p>{message}</p>}

      {!file && <DropzoneComponent onDrop={onDrop} />}

      {loading && <p>جارٍ استخراج النصوص، يرجى الانتظار...</p>}

      {rawText && (
        <FixArabicWordsComponent
          text={rawText}
          onFixComplete={extractQuestions}
        />
      )}

      {questions.length > 0 && (
        <QuestionsListComponent
          questions={questions}
          handleImageUpload={handleImageUpload}
          submitExam={submitExam}
        />
      )}
    </div>
  );
};

export default CreateExamFromImage;
