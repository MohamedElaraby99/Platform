import React, { useState } from "react";
import { toast } from "react-toastify";
import { renderAsync } from "docx-preview";

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

          // استخراج الصور والنصوص باستخدام docx-preview
          const content = await extractContentWithDocxPreview(arrayBuffer);
          const { texts, images } = content;

          // ربط النصوص والصور
          const questions = parseQuestionsWithImages(texts, images);

          if (questions.length > 0) {
            setParsedQuestions(questions);
            onAddQuestions(questions);
            toast.success("تم استخراج الأسئلة والصور وربطها بنجاح!", {
              position: "top-center",
            });
          } else {
            toast.error("لم يتم العثور على أسئلة أو صور في الملف.", {
              position: "top-center",
            });
          }
        } catch (error) {
          console.error(error);
          toast.error("حدث خطأ أثناء قراءة الملف. تأكد من صحة الملف.", {
            position: "top-center",
          });
        } finally {
          setLoading(false);
        }
      };

      reader.readAsArrayBuffer(file);
    } else {
      toast.error("الرجاء اختيار ملف Word بصيغة .docx", {
        position: "top-center",
      });
    }
  };

  const extractContentWithDocxPreview = async (arrayBuffer) => {
    const container = document.createElement("div");
    await renderAsync(arrayBuffer, container);

    const paragraphs = Array.from(container.querySelectorAll("p"));
    const images = Array.from(container.querySelectorAll("img")).map((img) => ({
      src: img.src,
      alt: img.alt || "",
    }));

    const texts = paragraphs.map((p) => p.textContent.trim()).filter((t) => t);

    return { texts, images };
  };

  const parseQuestionsWithImages = (texts, images) => {
    const questions = [];
    let currentQuestion = null;
    let currentImageIndex = 0;

    texts.forEach((text) => {
      // التعرف على السؤال
      const questionMatch = text.match(/^\d+[)-]?\s*(.*)$/);
      if (questionMatch) {
        if (currentQuestion) {
          questions.push(currentQuestion);
        }
        currentQuestion = {
          question: questionMatch[1].trim(),
          options: [],
          correctAnswer: null,
          image: null,
        };
      } else if (/^[أ-ي]-|^[أ-ي]\)|^[أ-ي]\s|^•/.test(text)) {
        // استخراج الخيارات
        if (currentQuestion) {
          currentQuestion.options.push(
            text.replace(/^[أ-ي]\s*[-)]?\s*|^•\s*/, "").trim()
          );
        }
      } else if (text.startsWith("الإجابة:")) {
        // استخراج الإجابة الصحيحة
        if (currentQuestion) {
          const correctIndex =
            parseInt(text.replace("الإجابة:", "").trim(), 10) - 1;
          currentQuestion.correctAnswer = correctIndex;
        }
      }

      // ربط الصور بالسؤال
      if (images[currentImageIndex]) {
        if (currentQuestion && !currentQuestion.image) {
          currentQuestion.image = images[currentImageIndex].src;
          currentImageIndex++;
        }
      }
    });

    if (currentQuestion) questions.push(currentQuestion);

    return questions;
  };

  return (
    <div>
      <h3>تحميل ملف أسئلة</h3>
      <input type="file" accept=".docx" onChange={handleFileImport} />
      {loading && (
        <div className="loader-container">
          <div className="loader"></div>
          <p>جاري استخراج الأسئلة والصور وربطها...</p>
        </div>
      )}
      {!loading && parsedQuestions.length > 0 && (
        <div>
          <h3>الأسئلة المستخرجة:</h3>
          {parsedQuestions.map((q, index) => (
            <details key={index}>
              <summary>
                <strong>السؤال {index + 1}:</strong>{" "}
                {q.question || "السؤال غير متوفر"}
              </summary>
              <ul>
                {q.options.map((option, optIndex) => (
                  <li
                    key={optIndex}
                    style={{
                      color: q.correctAnswer === optIndex ? "green" : "black",
                    }}
                  >
                    {option}
                  </li>
                ))}
              </ul>
              {q.image && (
                <div>
                  <img
                    src={q.image}
                    alt={`Question ${index + 1}`}
                    style={{ maxWidth: "100%", height: "auto" }}
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
