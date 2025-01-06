import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import Tesseract from "tesseract.js";
import { getDocument } from "pdfjs-dist";
import "pdfjs-dist/build/pdf.worker.entry"; // For PDF.js worker
import "./../../styles/dashboard/AddExam.css";

const CreateExamFromImage = () => {
  const [file, setFile] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [message, setMessage] = useState(
    "اختر ملف PDF أو صورة لاستخراج النصوص"
  );
  const [loading, setLoading] = useState(false);

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

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpeg", ".jpg", ".bmp", ".tiff"],
      "application/pdf": [".pdf"],
    },
    maxFiles: 1,
  });

  const extractTextFromImage = async (file) => {
    setLoading(true);
    setMessage("جارٍ استخراج النصوص من الصورة، يرجى الانتظار...");
    try {
      const { data } = await Tesseract.recognize(file, "ara", {
        logger: (info) => console.log(info),
      });
      const extractedText = data.text;
      console.log("Extracted Text (Image):", extractedText);

      const cleanedText = cleanText(extractedText);
      console.log("Cleaned Text (Image):", cleanedText);

      extractQuestions(cleanedText);
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
        let highlightedTexts = []; // لتخزين النصوص المظللة

        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const textContent = await page.getTextContent();

          const pageText = textContent.items.map((item) => item.str).join(" ");
          fullText += pageText + "\n";
        }

        console.log("Extracted Text (PDF):", fullText);

        const cleanedText = cleanText(fullText);
        console.log("Cleaned Text (PDF):", cleanedText);

        extractQuestions(cleanedText);
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

  const cleanText = (text) => {
    const linesToIgnore = [
      /محمود توكل/gi,
      /الصفحة \d+/gi,
      /اسئلة متعددة علي الوحده الاولي/gi,
    ];

    let cleanedText = text;
    linesToIgnore.forEach((regex) => {
      cleanedText = cleanedText.replace(regex, "").trim();
    });

    return cleanedText.replace(/\s+/g, " ").trim();
  };

  const extractQuestions = (text) => {
    const questionRegex =
      /(\d+|[١-٩]\d*)\s*[-.]*\s*(.+?)\s*ا\s*\)\s*(.+?)\s*ب\s*\)\s*(.+?)\s*ج\s*\)\s*(.+?)\s*د\s*\)\s*(.+?)(?=\d+|[١-٩]\d*|$)/gs;

    const matches = [...text.matchAll(questionRegex)];
    console.log("Number of Matches Found:", matches.length);

    const extractedQuestions = matches.map((match, index) => ({
      id: index + 1,
      question: match[2].trim(),
      options: [
        match[3].trim(),
        match[4].trim(),
        match[5].trim(),
        match[6].trim(),
      ],
      image: null, // Placeholder for an attached image
    }));

    setQuestions(extractedQuestions);
    setMessage("تم استخراج الأسئلة بنجاح!");
  };

  const handleImageUpload = (index, file) => {
    const reader = new FileReader();
    reader.onload = () => {
      const updatedQuestions = [...questions];
      updatedQuestions[index].image = reader.result;
      setQuestions(updatedQuestions);
    };
    reader.readAsDataURL(file);
  };

  const handleEdit = (index, key, value) => {
    const updatedQuestions = [...questions];
    if (key === "question") {
      updatedQuestions[index].question = value;
    } else if (key === "correctAnswer") {
      updatedQuestions[index].correctAnswer = value;
    } else {
      updatedQuestions[index].options[key] = value;
    }
    setQuestions(updatedQuestions);
  };

  const submitExam = () => {
    console.log("Exam Submitted:", questions);
    setMessage("تم تقديم الامتحان بنجاح!");
  };

  return (
    <div className="create-exam-container">
      <h2>إنشاء امتحان من صورة أو ملف PDF</h2>
      {message && <p>{message}</p>}

      {!file && (
        <div
          {...getRootProps()}
          className={`dropzone ${isDragActive ? "active-dropzone" : ""}`}
        >
          <input {...getInputProps()} />
          <p className="dropzone-text">
            اسحب وأسقط صورة أو ملف PDF هنا، أو انقر لاختيار ملف
          </p>
        </div>
      )}

      {loading && <p>جارٍ استخراج النصوص، يرجى الانتظار...</p>}

      {questions.length > 0 && (
        <div className="questions-list">
          <h3>الأسئلة المستخرجة:</h3>
          <ul>
            {questions.map((q, index) => (
              <li key={index}>
                {q.image && (
                  <img
                    src={q.image}
                    alt={`Image for Question ${q.id}`}
                    style={{ maxWidth: "100%", marginBottom: "10px" }}
                  />
                )}
                <details>
                  <summary>
                    <strong>السؤال {q.id}:</strong>
                  </summary>
                  <input
                    type="text"
                    value={q.question}
                    onChange={(e) =>
                      handleEdit(index, "question", e.target.value)
                    }
                    style={{
                      width: "100%",
                      marginBottom: "10px",
                      padding: "5px",
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                    }}
                  />
                  <ul>
                    {q.options.map((option, idx) => (
                      <li key={idx}>
                        <input
                          type="text"
                          value={option}
                          onChange={(e) =>
                            handleEdit(index, idx, e.target.value)
                          }
                          style={{
                            width: "100%",
                            marginBottom: "5px",
                            padding: "5px",
                            border: "1px solid #ccc",
                            borderRadius: "4px",
                          }}
                        />
                      </li>
                    ))}
                  </ul>
                  <label>
                    أرفق صورة للسؤال:
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        handleImageUpload(index, e.target.files[0])
                      }
                      style={{ marginTop: "10px" }}
                    />
                  </label>
                </details>
              </li>
            ))}
          </ul>
          <button
            onClick={submitExam}
            style={{
              marginTop: "20px",
              padding: "10px 20px",
              backgroundColor: "#4caf50",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            تقديم الامتحان
          </button>
        </div>
      )}
    </div>
  );
};

export default CreateExamFromImage;
