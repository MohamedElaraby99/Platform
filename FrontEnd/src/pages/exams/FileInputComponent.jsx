import React, { useState } from "react";
import { toast } from "react-toastify";
import mammoth from "mammoth";
import Loader from "./../../pages/Loader.jsx"; // Importing the Loader component

const FileInputComponent = ({ onAddQuestions }) => {
  const [parsedQuestions, setParsedQuestions] = useState([]);
  const [loading, setLoading] = useState(false); // State for loader control

  const handleFileImport = async (e) => {
    const file = e.target.files[0];

    if (file && file.name.endsWith(".docx")) {
      const reader = new FileReader();

      reader.onload = async (event) => {
        const arrayBuffer = event.target.result;

        try {
          setLoading(true); // Show loader

          // Convert .docx to HTML using mammoth.js
          const htmlContent = await extractContentFromDocxToHTML(arrayBuffer);
          console.log("Extracted HTML:", htmlContent);

          // Parse HTML to extract questions and images
          const questions = parseHtmlToQuestions(htmlContent);

          if (questions.length > 0) {
            setParsedQuestions(questions);
            onAddQuestions(questions);
            toast.success("Questions and images extracted successfully!", {
              position: "top-center",
            });
          } else {
            toast.warn("No questions or images found in the file.", {
              position: "top-center",
            });
          }
        } catch (error) {
          console.error(error);
          toast.error("An error occurred while processing the file.", {
            position: "top-center",
          });
        } finally {
          setLoading(false); // Hide loader
        }
      };

      reader.readAsArrayBuffer(file);
    } else {
      toast.error("Please upload a valid .docx file.", {
        position: "top-center",
      });
    }
  };

  const extractContentFromDocxToHTML = async (arrayBuffer) => {
    const result = await mammoth.convertToHtml({ arrayBuffer });
    const htmlContent = result.value; // HTML content from the .docx file
    return htmlContent;
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
        // Start a new question
        if (currentQuestion) questions.push(currentQuestion);
        currentQuestion = {
          question: questionMatch[1].trim(),
          options: [],
          correctAnswer: null,
          image: null,
        };
      } else if (/^[أ-ي]-|^[1-9]\./.test(text)) {
        // Add options
        if (currentQuestion) {
          currentQuestion.options.push(
            text.replace(/^[أ-ي]-|^[1-9]\./, "").trim()
          );
        }
      } else if (text.startsWith("الإجابة:")) {
        // Add correct answer
        if (currentQuestion) {
          currentQuestion.correctAnswer = text.replace("الإجابة:", "").trim();
        }
      }

      // Link images to the question
      if (image && currentQuestion) {
        currentQuestion.image = image.src;
      }
    });

    // Push the last question
    if (currentQuestion) questions.push(currentQuestion);

    return questions;
  };

  return (
    <div>
      <h3>Upload Questions File</h3>
      <input type="file" accept=".docx" onChange={handleFileImport} />
      {loading && <Loader />} {/* Show loader while loading */}
      {!loading && parsedQuestions.length > 0 && (
        <div>
          <h3>Extracted Questions:</h3>
          {parsedQuestions.map((q, index) => (
            <details key={index}>
              <summary>
                <strong>Question {index + 1}:</strong>{" "}
                {q.question || "No question text available"}
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
                  <p>
                    <strong>Image:</strong>
                  </p>
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
