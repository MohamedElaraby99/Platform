import React, { useRef, useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import "./../styles/VideoDetailsPage.css";

const VideoDetailsPage = () => {
  const location = useLocation();
  const { state } = location;
  const [video] = useState(state?.video);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [quality, setQuality] = useState("auto");
  const [volume, setVolume] = useState(50);
  const [isRotated, setIsRotated] = useState(false);
  const videoContainerRef = useRef(null);
  const playerRef = useRef(null);

  const extractEmbedUrl = (url) => {
    if (!url) return null;
    const regExp =
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regExp);
    return match
      ? `https://www.youtube.com/embed/${match[1]}?enablejsapi=1&modestbranding=1&rel=0&controls=0`
      : null;
  };

  useEffect(() => {
    if (window.YT && window.YT.Player) {
      playerRef.current = new window.YT.Player("youtube-player");
    } else {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(tag);

      window.onYouTubeIframeAPIReady = () => {
        playerRef.current = new window.YT.Player("youtube-player");
      };
    }
  }, []);

  const handleFullscreenToggle = () => {
    const container = videoContainerRef.current;
    if (!document.fullscreenElement) {
      container?.requestFullscreen?.();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.();
      setIsFullscreen(false);
    }
  };

  const handleRotateScreen = () => {
    setIsRotated(!isRotated);
    if (window.screen.orientation) {
      if (!isRotated) {
        window.screen.orientation.lock("landscape");
      } else {
        window.screen.orientation.unlock();
      }
    }
  };

  const handlePlayPause = () => {
    if (playerRef.current) {
      if (isPlaying) {
        playerRef.current.pauseVideo();
      } else {
        playerRef.current.playVideo();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleQualityChange = (event) => {
    const newQuality = event.target.value;
    setQuality(newQuality);
    if (playerRef.current) {
      playerRef.current.setPlaybackQuality(newQuality);
    }
  };

  const handleVolumeChange = (event) => {
    const newVolume = event.target.value;
    setVolume(newVolume);
    if (playerRef.current) {
      playerRef.current.setVolume(newVolume);
    }
  };

  if (!video) {
    return <p>لا يوجد فيديو لعرضه.</p>;
  }

  const videoEmbedUrl = extractEmbedUrl(video?.lesson_link);

  return (
    <div
      className={`video-details-page-container ${
        isFullscreen ? "fullscreen-mode" : ""
      }`}
    >
      <div className="video-details">
        <div className="video-title">
          <h1>{video.title}</h1>
        </div>
        <div className="video-details-page">
          <div className="video-player-container" ref={videoContainerRef}>
            <div className="video-overlay"></div>
            <iframe
              id="youtube-player"
              src={videoEmbedUrl}
              title={video.title}
              className={`video-player ${isFullscreen ? "fullscreen" : ""}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            ></iframe>

            {/* ✅ شريط التحكم أسفل الفيديو */}
            <div className="video-controls">
              <button className="control-button" onClick={handlePlayPause}>
                {isPlaying ? "⏸️ إيقاف" : "▶️ تشغيل"}
              </button>

              <select
                className="control-select"
                onChange={handleQualityChange}
                value={quality}
              >
                <option value="auto">تلقائي</option>
                <option value="highres">عالية جدًا</option>
                <option value="hd1080">1080p</option>
                <option value="hd720">720p</option>
                <option value="large">480p</option>
                <option value="medium">360p</option>
                <option value="small">240p</option>
              </select>

              <input
                type="range"
                className="volume-slider"
                min="0"
                max="100"
                value={volume}
                onChange={handleVolumeChange}
              />

              <button
                className="control-button"
                onClick={handleFullscreenToggle}
              >
                {isFullscreen ? "🔲 تصغير" : "⛶ تكبير"}
              </button>

              {/* ✅ زر قلب الشاشة يظهر فقط على الموبايل أو التابلت */}
              <button
                className="control-button rotate-button"
                onClick={handleRotateScreen}
              >
                🔄 قلب الشاشة
              </button>
            </div>
          </div>

          <div className="video-description-container">
            <div className="video-description">
              <h3 className="description-title">وصف الفيديو</h3>
              <p className="description">
                {video.description || "لا يوجد وصف"}
              </p>
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
