import React from "react";
import { useNavigate } from "react-router-dom";
import "./../styles/courses.css";

const CoursesPage = () => {
  const navigate = useNavigate();

  const videos = [
    {
      title: "تعلم البرمجة",
      url: "https://www.youtube.com/watch?v=4TapXBH14Mk",
      description: "هذا فيديو تعليمي لتعلم البرمجة خطوة بخطوة.",
      notes: "ملاحظات عن الفيديو",
    },
    {
      title: "أساسيات الرياضيات",
      url: "https://www.youtube.com/watch?v=2Vv-BfVoq4g",
      description: "فيديو يشرح أساسيات الرياضيات.",
      notes: "ملاحظات عن الفيديو",
    },
    {
      title: "دورة في التصميم",
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      description: "تعلم التصميم خطوة بخطوة.",
      notes: "ملاحظات عن الفيديو",
    },
  ];

  const extractVideoId = (url) => {
    const regExp =
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regExp);
    return match ? match[1] : null; // إذا تم العثور على ID
  };


  const handleVideoClick = (video) => {
    navigate("/video-details", { state: video });
  };

  return (
    <div className="courses-page">
      <h2 className="section-title">
        <span className="material-icons">book</span>
        فيديوهات الشرح
      </h2>
      <section className="video-section">
        <div className="videos-grid">
          {videos.map((video, index) => {
            const videoId = extractVideoId(video.url); // استخراج Video ID
            const thumbnailUrl = videoId
              ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
              : "https://via.placeholder.com/300x200.png?text=No+Thumbnail"; // صورة افتراضية

            return (
              <div
                className="video-container"
                key={index}
                onClick={() => handleVideoClick(video)}
              >
                <img
                  src={thumbnailUrl}
                  alt={video.title}
                  className="video-thumbnail"
                />
                <div className="video-info">
                  <h1 className="video-title">{video.title}</h1>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default CoursesPage;
