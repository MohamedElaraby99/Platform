import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./../styles/HomePage.css";

const HomePage = () => {
  const announcements = [
    {
      title: "إعلان هام عن موعد الامتحانات",
      content: "تبدأ الامتحانات النهائية يوم 10 يناير 2024. يرجى الاستعداد.",
    },
    {
      title: "فتح باب التسجيل للمسابقات العلمية",
      content:
        "باب التسجيل مفتوح للمشاركة في المسابقات العلمية حتى نهاية الشهر.",
    },
    {
      title: "تحديث جديد في المناهج الدراسية",
      content: "تم إضافة محتوى جديد إلى منهج الرياضيات. يرجى مراجعته.",
    },
  ];

  const upcomingExams = [
    { name: "Mathematics Exam", date: "2024-01-10" },
    { name: "Science Exam", date: "2024-01-15" },
    { name: "History Exam", date: "2024-01-20" },
  ];

  const pdfs = [
    { name: "Math Notes", url: "/pdfs/math-notes.pdf" },
    { name: "Science Notes", url: "/pdfs/science-notes.pdf" },
    { name: "History Notes", url: "/pdfs/history-notes.pdf" },
  ];

  const videos = [
    {
      title: "Introduction to Math",
      url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    },
    {
      title: "Science Basics",
      url: "https://www.youtube.com/embed/2Vv-BfVoq4g",
    },
    {
      title: "History Overview",
      url: "https://www.youtube.com/embed/3JZ_D3ELwOQ",
    },
  ];

  // Create a reference for the video container
  const videoContainerRefs = useRef([]);
  const [fullscreenIndex, setFullscreenIndex] = useState(null);

  // Function to handle fullscreen toggle
  const handleFullscreenToggle = (index) => {
    const container = videoContainerRefs.current[index];
    if (
      document.fullscreenElement ||
      document.webkitFullscreenElement ||
      document.mozFullScreenElement ||
      document.msFullscreenElement
    ) {
      // If already in fullscreen, exit fullscreen
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
      setFullscreenIndex(null); // Exit fullscreen mode
    } else {
      // If not in fullscreen, enter fullscreen
      if (container.requestFullscreen) {
        container.requestFullscreen();
      } else if (container.webkitRequestFullscreen) {
        container.webkitRequestFullscreen();
      } else if (container.mozRequestFullScreen) {
        container.mozRequestFullScreen();
      } else if (container.msRequestFullscreen) {
        container.msRequestFullscreen();
      }
      setFullscreenIndex(index); // Track fullscreen mode
    }
  };

  return (
    <div className="home-page">
      {/* Section: Announcements */}
      <section className="section announcements-section">
        <h2>
          <span className="material-icons">campaign</span>
          إعلانات مهمة
        </h2>
        <ul className="announcements-list">
          {announcements.map((announcement, index) => (
            <li key={index} className="announcement-item">
              <h3 className="announcement-title">{announcement.title}</h3>
              <p className="announcement-content">{announcement.content}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Section: Educational Videos */}
      <section className="section video-section">
        <h2>
          <span className="material-icons">book</span>
          فيديوهات تعليمية
        </h2>
        <div className="videos-grid">
          {videos.map((video, index) => (
            <div
              className="video-container"
              key={index}
              ref={(el) => (videoContainerRefs.current[index] = el)}
            >
              <iframe
                src={`${video.url}?modestbranding=1&rel=0&controls=1&fs=0`}
                title={video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              ></iframe>
              <div className="top-overlay"></div>
              <button
                className="fullscreen-button"
                onClick={() => handleFullscreenToggle(index)}
              >
                {fullscreenIndex === index ? "تصغير الشاشة" : "تكبير الشاشة"}
              </button>
            </div>
          ))}
        </div>
        <p className="view-all-videos">
          <Link to="/courses" className="view-all-videos">
            مشاهدة كل الفيديوهات التعليمية
          </Link>
        </p>
      </section>

      {/* Section: Upcoming Exams */}
      <section className="section exams-section">
        <h2>
          <span className="material-icons">edit</span>
          الامتحانات القادمة
        </h2>
        <ul className="exam-list">
          {upcomingExams.map((exam, index) => (
            <li key={index} className="exam-item">
              <span>{exam.name}</span>
              <span>{exam.date}</span>
            </li>
          ))}
        </ul>
        <p className="view-all-videos">
          <Link to="/exams" className="view-all-videos">
            مشاهدة كل الامتحانات{" "}
          </Link>
        </p>
      </section>

      {/* Section: PDF Downloads */}
      <section className="section pdf-section">
        <h2>
          <span className="material-icons">picture_as_pdf</span>
          ملفات PDF للتنزيل
        </h2>
        <ul className="pdf-list">
          {pdfs.map((pdf, index) => (
            <li key={index} className="pdf-item">
              <a href={pdf.url} download>
                {pdf.name}
              </a>
            </li>
          ))}
        </ul>
        <p className="view-all-videos">
          <Link to="/pdf" className="view-all-videos">
            مشاهدة كل ملفات PDF
          </Link>
        </p>
      </section>
    </div>
  );
};

export default HomePage;
