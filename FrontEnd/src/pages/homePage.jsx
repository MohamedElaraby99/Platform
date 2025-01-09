import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./../styles/HomePage.css";

const HomePage = () => {

  // References for each video container
  const videoContainerRefs = useRef([]);
  const [fullscreenIndex, setFullscreenIndex] = useState(null);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true); // حالة التحميل
  const [error, setError] = useState(null); // حالة الخطأ

  // جلب الفيديوهات من API عند تحميل الصفحة
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken"); // الحصول على رمز المصادقة
        const response = await axios.get("http://localhost:8000/lessons", {
          headers: {
            Authorization: `Bearer ${accessToken}`, // تضمين التوكن
          },
        });

        setVideos(response.data); // تخزين البيانات القادمة من API
        setError(null); // إعادة تعيين الخطأ إذا نجحت العملية
      } catch (err) {
        setError("حدث خطأ أثناء تحميل الفيديوهات."); // التعامل مع الأخطاء
      } finally {
        setLoading(false); // إنهاء حالة التحميل
      }
    };

    fetchVideos();
  }, []);

  // Extract video ID from URL
  const extractVideoId = (url) => {
    const regExp =
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regExp);
    return match ? match[1] : null; // إذا تم العثور على ID
  };

  if (loading) {
    return <p>جارٍ تحميل الفيديوهات...</p>; // Display loading state
  }

  if (error) {
    return <p className="error-message">{error}</p>; // Display error message
  }

  return (
    <div className="home-page">
      {/* Announcements Section */}
      <section className="section announcements-section">
        <h2>
          <span className="material-icons">campaign</span>
          إعلانات مهمة
        </h2>
        {/* Announcements content */}
      </section>

      {/* Educational Videos Section */}
      {/* <section className="section video-section">
        <h2>
          <span className="material-icons">book</span>
          فيديوهات تعليمية
        </h2>
        <div className="videos-grid">
          {videos.map((video, index) => {
            const videoId = extractVideoId(video?.lesson_link); // Extract video ID
            const thumbnailUrl = videoId
              ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
              : "https://via.placeholder.com/300x200.png?text=No+Thumbnail"; // Default thumbnail

            return (
              <div
                className="video-container"
                key={video._id}
                ref={(el) => (videoContainerRefs.current[index] = el)}
              >
                <iframe
                  src={`${videoId}?modestbranding=1&rel=0&controls=1&fs=0`}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  className="video-iframe"
                ></iframe>
                <div className="top-overlay"></div>
                <div className="video-info">
                  <h3>{video.title}</h3>
                  <p>{video.description || "لا يوجد وصف"}</p>
                </div>
              </div>
            );
          })}
        </div>
        <p className="view-all-videos">
          <Link to="/courses" className="view-all-videos">
            مشاهدة كل الفيديوهات التعليمية
          </Link>
        </p>
      </section> */}

      {/* Upcoming Exams Section */}
      <section className="section exams-section">
        <h2>
          <span className="material-icons">edit</span>
          الامتحانات القادمة
        </h2>
        {/* Upcoming exams content */}
      </section>

      {/* PDF Downloads Section */}
      <section className="section pdf-section">
        <h2>
          <span className="material-icons">picture_as_pdf</span>
          ملفات PDF للتنزيل
        </h2>
        {/* PDF files content */}
      </section>
    </div>
  );
};

export default HomePage;
