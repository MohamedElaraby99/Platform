import React, { useState } from "react";
import { toast } from "react-toastify";
import JSZip from "jszip";

const FileInputComponent = ({ onAddQuestions }) => {
  const [parsedQuestions, setParsedQuestions] = useState([]);
  const [loading, setLoading] = useState(false); // حالة لتحديد إذا كان الاستخراج قيد التنفيذ

  const handleFileImport = async (e) => {
    const file = e.target.files[0];

    if (file && file.name.endsWith(".docx")) {
      const reader = new FileReader();

      reader.onload = async (event) => {
        const arrayBuffer = event.target.result;

        try {
          setLoading(true); // بدء العملية
          const zip = new JSZip();
          await zip.loadAsync(arrayBuffer);

          // استخراج النصوص والصور من الملف
          const extractedData = await extractContent(zip);
          const questions = parseContentWithImages(extractedData);

          if (questions.length > 0) {
            setParsedQuestions(questions);
            onAddQuestions(questions); // تمرير الأسئلة إلى المكون الأب
            toast.success("تم استخراج الأسئلة والصور بنجاح!", {
              position: "top-center",
            });
          } else {
            toast.error("لم يتم العثور على أسئلة في الملف.", {
              position: "top-center",
            });
          }
        } catch (error) {
          toast.error("حدث خطأ أثناء قراءة الملف. تأكد من صحة الملف.", {
            position: "top-center",
          });
        } finally {
          setLoading(false); // إنهاء العملية
        }
      };

      reader.readAsArrayBuffer(file);
    } else {
      toast.error("الرجاء اختيار ملف Word بصيغة .docx", {
        position: "top-center",
      });
    }
  };

  const extractContent = async (zip) => {
    const text = await zip.file("word/document.xml").async("string");
    const mediaFiles = zip.file(/word\/media\/.*/);

    const images = await Promise.all(
      mediaFiles.map(async (file) => {
        const base64 = await file.async("base64");
        return {
          name: file.name,
          data: `data:image/png;base64,${base64}`, // افترض أن الصور بصيغة PNG
        };
      })
    );

    return { text, images };
  };

  const parseContentWithImages = ({ text, images }) => {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(text, "application/xml");
    const paragraphs = Array.from(xmlDoc.getElementsByTagName("w:p"));

    const questions = [];
    let currentQuestion = null;
    let imageIndex = 0;

    paragraphs.forEach((p) => {
      const texts = Array.from(p.getElementsByTagName("w:t"))
        .map((t) => t.textContent.trim())
        .join(" ");

      console.log("Extracted texts:", texts); // تحقق من النصوص المستخرجة

      // مطابقة الأسئلة
      const questionMatch = texts.match(/^(\d+)\)\s*(.*?)\s*(\[image\])?/i);
      if (questionMatch) {
        console.log("Matched question:", questionMatch); // تحقق من مطابقة السؤال

        if (currentQuestion) {
          questions.push(currentQuestion);
        }

        currentQuestion = {
          question: questionMatch[2].trim(),
          options: [],
          correctAnswer: null,
          image: null, // Placeholder للصورة المرتبطة
        };

        // إذا كان هناك صورة مرتبطة بالسؤال
        if (questionMatch[3]) {
          currentQuestion.image = images[imageIndex]?.data || null;
          imageIndex++;
        }
      } else if (/^[ا-ي]-/.test(texts)) {
        // إذا كان النص خيارًا للإجابة
        if (currentQuestion) {
          currentQuestion.options.push(texts.replace(/^[ا-ي]-/, "").trim());
        }
      } else if (texts.startsWith("الإجابة:")) {
        // مطابقة الإجابة الصحيحة
        if (currentQuestion) {
          const correctIndex =
            parseInt(texts.replace("الإجابة:", "").trim(), 10) - 1;
          currentQuestion.correctAnswer = correctIndex;
        }
      } else if (images[imageIndex]) {
        // إضافة صورة إذا ظهرت خارج السياق المتوقع
        if (currentQuestion && !currentQuestion.image) {
          currentQuestion.image = images[imageIndex]?.data || null;
          imageIndex++;
        }
      }
    });

    // إضافة السؤال الأخير (إن وجد)
    if (currentQuestion) {
      questions.push(currentQuestion);
    }

    return questions;
  };


  return (
    <div>
      <h3>تحميل ملف أسئلة</h3>
      <input type="file" accept=".docx" onChange={handleFileImport} />
      {loading && (
        <div className="loader-container">
          <div className="loader"></div>
          <p>جاري استخراج الأسئلة والصور...</p>
        </div>
      )}
      {!loading && parsedQuestions.length > 0 && (
  <div>
    <h3>الأسئلة المستخرجة:</h3>
    {parsedQuestions.map((q, index) => (
      <details key={index}>
        {/* عرض السؤال */}
        <summary>
          <strong>السؤال {index + 1}:</strong> {q.question || "السؤال غير متوفر"}
        </summary>
        {/* عرض الخيارات */}
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
        {/* عرض الصورة إن وجدت */}
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
