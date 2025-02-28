import React, { useState } from "react";
import { CircleHelp } from "lucide-react";
import "./../styles/landingPage.css";

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    if (activeIndex === index) {
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
    }
  };

  // هنا أمثلة على الأسئلة؛ يمكنك استبدالها بالبيانات الحقيقية أو استخدام map
  const faqData = [
    {
      question: "هل يمكنني الاعتماد علي المنصة كدرس وحيد في المواد المقدمه ؟",
      answer:
        "نعم، يمكنك الاعتماد علي المنصة كدرس وحيد في المواد المقدمه لانها تقدم كل شئ يمكن ان تحتاجه مثل فيديوهات الشرح والحل والتفاعل مع المدرس والاختبارات وملفات والمذكرات .",
    },
    {
      question: "هل يوجد دعم فني للمنصة؟",
      answer: "نعم، يوجد دعم فني متواصل على مدار الساعة.",
    },
    {
      question: "ما هي الاشتراكات المتاحة؟",
      answer: "يمكنك الدفع بالحصة، أو بالشهر، أو بالترم.",
    },
    {
      question: "ما طرق الدفع اللتي يمكن ان استخدمها في دفع الاشتراك ؟",
      answer:
        "يوجد تحويل انستا باي (InstaPay) وفودافون كاش (Vodafone Cash) واتصالات كاش (Etisalat Cash) وارانج كاش (Orange Cash) و وي باي (wePay).",
    },
    {
      question: "هل يتم تحديث المحتوى بانتظام؟",
      answer:
        "بالطبع، نحن نعمل على تحديث المحتوى وإضافة مميزات جديدة باستمرار.",
    },
  ];

  return (
    <div className="question-section">
      <h2 className="question-title">الأسئلة الشائعة</h2>
      <h1 className="question-subtitle">عندك أي سؤال؟</h1>
      <div className="question-content">
        <div className="question-image">
          <img className="question-imagee" src={require("./../images/inquiry.webp")} alt="" />
        </div>
        <div className="question-container">
          {faqData.map((item, index) => (
            <div
              key={index}
              className={`question-card ${
                activeIndex === index ? "active" : ""
              }`}
              onClick={() => toggleAccordion(index)}
            >
              <div className="question-header">
                <div className="question-icon">
                  <CircleHelp className="question-icon-svg" />
                </div>
                <h3 className="question-text">{item.question}</h3>
              </div>
              <p className="question-answerrr">{item.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQSection;
