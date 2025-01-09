import React, { useRef, useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import "./../styles/VideoDetailsPage.css";

const VideoDetailsPage = () => {
  const location = useLocation();
  const { state } = location;
  console.log("state", state);
  
  const [video ] = useState(state?.video); // Store video data
  const [loading ] = useState(false); // Loading state
  const [error] = useState(null); // Error state

  const videoContainerRef = useRef(null); 
  const [isFullscreen, setIsFullscreen] = useState(false); 
  const [isPlaying, setIsPlaying] = useState(false); 
  const playerRef = useRef(null); 

  const extractEmbedUrl = (url) => {
    console.log("from extractEmbedUrl");
    
    if (!url) {
      return null; 
    }
    const regExp =
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regExp);
    if (match) {
      return `https://www.youtube.com/embed/${match[1]}?enablejsapi=1&modestbranding=1&rel=0&controls=1`;
    }
    return null;
  };

  // Memoized function to handle YouTube player state change
  const handlePlayerStateChange = useCallback((event) => {
    if (event.data === window.YT.PlayerState.PLAYING) {
      setIsPlaying(true); // Video is playing
    } else {
      setIsPlaying(false); // Video is paused or stopped
    }
  }, []);

  useEffect(() => {
    // Initialize YouTube Player API
    if (window.YT && window.YT.Player) {
      playerRef.current = new window.YT.Player("youtube-player", {
        events: {
          onStateChange: handlePlayerStateChange,
        },
      });
    } else {
      // Load YouTube IFrame API if not already loaded
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      window.onYouTubeIframeAPIReady = () => {
        playerRef.current = new window.YT.Player("youtube-player", {
          events: {
            onStateChange: handlePlayerStateChange,
          },
        });
      };
    }
  }, [handlePlayerStateChange]);

  // Toggle fullscreen
  const handleFullscreenToggle = () => {
    const container = videoContainerRef.current;
    if (
      document.fullscreenElement ||
      document.webkitFullscreenElement ||
      document.mozFullScreenElement ||
      document.msFullscreenElement
    ) {
      // Exit fullscreen
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
      setIsFullscreen(false);
    } else {
      // Enter fullscreen
      if (container.requestFullscreen) {
        container.requestFullscreen();
      } else if (container.webkitRequestFullscreen) {
        container.webkitRequestFullscreen();
      } else if (container.mozRequestFullScreen) {
        container.mozRequestFullScreen();
      } else if (container.msRequestFullscreen) {
        container.msRequestFullscreen();
      }
      setIsFullscreen(true);
    }
  };

  if (loading) {
    return <p>جارٍ تحميل بيانات الفيديو...</p>;
  }

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  if (!video) {
    return <p>لا يوجد فيديو لعرضه.</p>;
  }

  const videoEmbedUrl = extractEmbedUrl(video?.lesson_link);

  return (
    <div className="video-details">
      <div className="video-titlee">
        <h1>{video.title}</h1>
      </div>
      <div className="video-details-page">
        <div className="video-player-container" ref={videoContainerRef}>
            <iframe
              id="youtube-player"
              src={videoEmbedUrl}
              title={video.title}
              className={`video-player ${isFullscreen ? "fullscreen" : ""}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            ></iframe>
          <button
            className="fullscreen-button"
            onClick={handleFullscreenToggle}
          >
            {isFullscreen ? "تصغير الشاشة" : "تكبير الشاشة"}
          </button>
        </div>

        <div className="video-description-container">
          <div className="video-description">
            <h3 className="description-title">وصف الفيديو</h3>
            <p className="description">{video.description || "لا يوجد وصف"}</p>
          </div>
          <div className="notes-container">
            <h3 className="notes-title">ملاحظات</h3>
            <p className="notes">{video.notes || "لا توجد ملاحظات"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoDetailsPage;
