import React from "react";
import "./../styles/pdfs.css";

// Simulated list of PDF files
const pdfFiles = [
  {
    id: 1,
    name: "كتاب الرياضيات",
    url: "/assets/محمد العربي .pdf", // Ensure this path is correct and matches your hosted files
  },
  {
    id: 2,
    name: "كتاب الفيزياء",
    url: "/assets/محمد العربي .pdf",
  },
  {
    id: 3,
    name: "كتاب اللغة العربية",
    url: "/assets/محمد العربي .pdf",
  },
  {
    id: 4,
    name: "كتاب التاريخ",
    url: "/assets/محمد العربي .pdf",
  },
];

const PdfPage = () => {
  const handleViewPdf = (url) => {
    // Open a new fullscreen window
    const newWindow = window.open("", "_blank", "fullscreen=yes");

    if (newWindow) {
      newWindow.document.write(`
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>عرض الملف</title>
            <style>
              body {
                margin: 0;
                padding: 0;
                overflow: hidden;
                background-color: #000;
                display: flex;
                justify-content: center;
                align-items: center;
              }
              iframe {
                width: 100vw;
                height: 100vh;
                border: none;
              }
            </style>
          </head>
          <body>
            <iframe src="${url}#toolbar=0&navpanes=0&scrollbar=0"></iframe>
            <script>
              // Disable right-click
              document.addEventListener('contextmenu', (event) => event.preventDefault());
              
              // Disable PrintScreen and other keyboard shortcuts
              document.addEventListener('keydown', (event) => {
                if (event.key === 'PrintScreen') {
                  alert('Screenshots are disabled!');
                  navigator.clipboard.writeText('');
                  event.preventDefault();
                }
                if (
                  (event.ctrlKey && event.key === 's') ||  // Ctrl + S
                  (event.ctrlKey && event.key === 'p') ||  // Ctrl + P
                  event.key === 'F12' // F12 Developer Tools
                ) {
                  alert('This action is disabled!');
                  event.preventDefault();
                }
              });
            </script>
          </body>
        </html>
      `);
    } else {
      alert("Please allow pop-ups for this site.");
    }
  };

  return (
    <div className="pdf-page">
      <h2>المذكرات أو الملخصات</h2>
      <div className="pdf-container">
        {pdfFiles.map((pdf) => (
          <div key={pdf.id} className="pdf-card">
            <h3>{pdf.name}</h3>
            <div className="pdf-actions">
              <button
                onClick={() => handleViewPdf(pdf.url)}
                className="pdf-button"
              >
                عرض الملف
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PdfPage;
