import React, { useState } from "react";
import "./../styles/pdfs.css";

// Simulated list of PDF files
const pdfFiles = [
  {
    id: 1,
    name: "كتاب الرياضيات",
    url: "/assets/محمد العربي .pdf",
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
  const [selectedPdf, setSelectedPdf] = useState(null);

  // Function to handle viewing a PDF
  const handleViewPdf = (url) => {
    setSelectedPdf(url);
  };

  // Block right-click
  const blockRightClick = (e) => {
    e.preventDefault();
    alert("Right-click is disabled!");
  };

  // Block PrintScreen (PrtSc)
  const blockPrintScreen = (e) => {
    if (e.key === "PrintScreen") {
      alert("Screenshots are not allowed!");
      e.preventDefault();
    }
  };

  React.useEffect(() => {
    // Add event listeners for preventing screenshots and right-click
    document.addEventListener("contextmenu", blockRightClick);
    document.addEventListener("keydown", blockPrintScreen);

    return () => {
      // Cleanup event listeners when component unmounts
      document.removeEventListener("contextmenu", blockRightClick);
      document.removeEventListener("keydown", blockPrintScreen);
    };
  }, []);

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

      {selectedPdf && (
        <div className="pdf-viewer-container">
          <iframe
            src={`${selectedPdf}#toolbar=0`} // Disable PDF toolbar
            title="PDF Viewer"
            className="pdf-viewer"
          ></iframe>
          <div className="pdf-overlay"></div>
        </div>
      )}
    </div>
  );
};

export default PdfPage;
