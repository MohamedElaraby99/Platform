import React, { useRef, useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import "./../styles/VideoDetailsPage.css";

const VideoDetailsPage = () => {
  const location = useLocation();
  const { state } = location;
  const [video] = useState(state?.video); // Store video data
  const [isFullscreen, setIsFullscreen] = useState(false); // Fullscreen state
  const [isPlaying, setIsPlaying] = useState(false); // Video play state
  const videoContainerRef = useRef(null);
  const playerRef = useRef(null);

  const extractEmbedUrl = (url) => {
    if (!url) return null;
    const regExp =
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regExp);
    return match
      ? `https://www.youtube.com/embed/${match[1]}?enablejsapi=1&modestbranding=1&rel=0&controls=1`
      : null;
  };

  const handlePlayerStateChange = useCallback((event) => {
    setIsPlaying(event.data === window.YT.PlayerState.PLAYING);
  }, []);

  useEffect(() => {
    if (window.YT && window.YT.Player) {
      playerRef.current = new window.YT.Player("youtube-player", {
        events: { onStateChange: handlePlayerStateChange },
      });
    } else {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(tag);

      window.onYouTubeIframeAPIReady = () => {
        playerRef.current = new window.YT.Player("youtube-player", {
          events: { onStateChange: handlePlayerStateChange },
        });
      };
    }
  }, [handlePlayerStateChange]);

  const handleFullscreenToggle = () => {
    const container = videoContainerRef.current;

    if (document.fullscreenElement) {
      document.exitFullscreen?.();
      setIsFullscreen(false);
    } else {
      container?.requestFullscreen?.();
      setIsFullscreen(true);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  if (!video) {
    return <p>لا يوجد فيديو لعرضه.</p>;
  }

  const videoEmbedUrl = extractEmbedUrl(video?.lesson_link);

  return (
    <div className="video-details-page-container">
    <div className="video-details">
      <div className="video-title">
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
    </div>
  );
};

export default VideoDetailsPage;
