import React from "react";
import { saveAs } from "file-saver";
import { Document, Packer, Paragraph, TextRun, ImageRun } from "docx";

const ExportToWordComponent = ({ questions }) => {
  // تعريف الدالة convertImageToBase64
  const convertImageToBase64 = async (url) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      console.error("Failed to convert image to Base64:", error);
      throw error;
    }
  };

  const handleExport = async () => {
    const doc = new Document({
      creator: "Exam Generator",
      description: "Generated Exam Document",
      title: "Exam Questions",
    });

    const sections = await Promise.all(
      questions.map(async (question, index) => {
        const children = [
          new Paragraph({
            children: [
              new TextRun({
                text: `السؤال ${index + 1}: ${question.question}`,
                bold: true,
                size: 24,
              }),
            ],
          }),
        ];

        question.options.forEach((option, optIndex) => {
          children.push(
            new Paragraph({
              children: [
                new TextRun({
                  text: `${optIndex + 1}. ${option}`,
                  size: 20,
                }),
              ],
              spacing: { after: 200 },
            })
          );
        });

        if (question.image) {
          try {
            const base64Image = await convertImageToBase64(question.image);
            children.push(
              new Paragraph({
                children: [
                  new ImageRun({
                    data: Buffer.from(base64Image.split(",")[1], "base64"),
                    transformation: { width: 400, height: 300 },
                  }),
                ],
              })
            );
          } catch (error) {
            console.error("Error loading image:", error);
          }
        }

        return { children };
      })
    );

    doc.addSection({
      children: sections.flatMap((section) => section.children),
    });

    const buffer = await Packer.toBlob(doc);
    saveAs(buffer, "الأسئلة.docx");
  };

  return (
    <div className="export-to-word-container">
      <h3>تصدير الأسئلة إلى Word</h3>
      <button onClick={handleExport} className="export-to-word-button">
        تحميل كملف Word
      </button>
    </div>
  );
};


export default ExportToWordComponent;
