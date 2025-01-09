import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./../styles/HomePage.css";

const HomePage = () => {

  const [videos, setVideos] = useState([]); // Array to hold video data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const navigate = useNavigate(); // For navigation to the details page
  // Fetch videos from API on page load
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken"); // Get the token
        const response = await axios.get("http://localhost:8000/lessons", {
          headers: {
            Authorization: `Bearer ${accessToken}`, // Include the token
          },
        });

        setVideos(response.data); // Set the video data
        setError(null); // Clear any errors
      } catch (err) {
        setError("حدث خطأ أثناء تحميل الفيديوهات."); // Handle errors
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchVideos();
  }, []);

  // Extract video ID from URL
  const extractVideoId = (url) => {
    const regExp =
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regExp);
    return match ? match[1] : null; // Return video ID if found
  };

  // Handle click on video thumbnail
  const handleVideoClick = (video) => {
    navigate(`/video-details/${video._id}`, {
      state: { video },
    }); // التنقل إلى صفحة التفاصيل مع id الفيديو
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
      </section>

      {/* Educational Videos Section */}
      <section className="section video-section">
        <h2>
          <span className="material-icons">book</span>
          فيديوهات تعليمية
        </h2>
        <div className="videos-grid">
          {videos.map((video) => {
            const videoId = extractVideoId(video.lesson_link); // Extract video ID
            const thumbnailUrl = videoId
              ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
              : null;

            return (
              <div
                className="video-container"
                key={video._id}
                onClick={() => handleVideoClick(video)} // On click, store the video URL and ID
              >
                {thumbnailUrl ? (
                  <img
                    src={thumbnailUrl}
                    alt={video.title}
                    className="video-thumbnail"
                  />
                ) : (
                  <p>رابط الفيديو غير صالح</p>
                )}
              </div>
            );
          })}
        </div>
        <p className="view-all-videos">
          <Link to="/courses" className="view-all-videos">
            مشاهدة كل الفيديوهات التعليمية
          </Link>
        </p>
      </section>

      {/* Upcoming Exams Section */}
      <section className="section exams-section">
        <h2>
          <span className="material-icons">edit</span>
          الامتحانات القادمة
        </h2>
      </section>

      {/* PDF Downloads Section */}
      <section className="section pdf-section">
        <h2>
          <span className="material-icons">picture_as_pdf</span>
          ملفات PDF للتنزيل
        </h2>
      </section>
    </div>
  );
};

export default HomePage;
