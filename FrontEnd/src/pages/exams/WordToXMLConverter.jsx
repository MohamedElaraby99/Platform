import React, { useState } from "react";
import JSZip from "jszip";
import { saveAs } from "file-saver";

const WordToXMLConverter = () => {
  const [loading, setLoading] = useState(false);

  const handleFileImport = async (e) => {
    const file = e.target.files[0];

    if (file && file.name.endsWith(".docx")) {
      const reader = new FileReader();

      reader.onload = async (event) => {
        const arrayBuffer = event.target.result;

        try {
          setLoading(true);
          const zip = new JSZip();
          await zip.loadAsync(arrayBuffer);

          // استخراج محتوى XML من ملف Word
          const documentXML = await zip
            .file("word/document.xml")
            ?.async("string");
          if (!documentXML) {
            throw new Error(
              "لم يتم العثور على ملف document.xml داخل ملف Word."
            );
          }

          // تحويل محتوى XML إلى ملف جديد
          const blob = new Blob([documentXML], { type: "application/xml" });
          saveAs(blob, `${file.name.replace(".docx", "")}.xml`);

          alert("تم تحويل ملف Word إلى XML بنجاح!");
        } catch (error) {
          console.error("حدث خطأ أثناء تحويل الملف:", error);
          alert("فشل تحويل ملف Word إلى XML. تأكد من صحة الملف.");
        } finally {
          setLoading(false);
        }
      };

      reader.readAsArrayBuffer(file);
    } else {
      alert("يرجى اختيار ملف Word بصيغة .docx.");
    }
  };

  return (
    <div>
      <h3>تحويل ملف Word إلى XML</h3>
      <input type="file" accept=".docx" onChange={handleFileImport} />
      {loading && <p>جاري التحويل...</p>}
    </div>
  );
};

export default WordToXMLConverter;
