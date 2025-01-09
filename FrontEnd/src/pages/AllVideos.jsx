import React, { useState, useEffect } from "react";
import axios from "axios";
import "./../styles/AllVideos.css";

const AllVideos = () => {
  const [videos, setVideos] = useState([]); // Initially empty array for fetched videos
  const [searchTerm, setSearchTerm] = useState("");
  const [editingVideo, setEditingVideo] = useState(null); // For editing state
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch videos (lessons) from the API
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken"); // Retrieve token from localStorage
        if (!accessToken) {
          throw new Error("Access token is missing.");
        }

        const response = await axios.get("http://localhost:8000/lessons", {
          headers: {
            Authorization: `Bearer ${accessToken}`, // Include token in Authorization header
          },
        });
        setVideos(response.data); // Set fetched lessons as videos
        setError(null);
      } catch (err) {
        console.error("حدث خطأ أثناء جلب بيانات الفيديوهات:", err);
        setError("Failed to fetch videos. Please check your credentials.");
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchVideos();
  }, []);
// Fetch videos only once on component mount

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("هل أنت متأكد من حذف هذا الفيديو؟");
    if (confirmDelete) {
      const updatedVideos = videos.filter((video) => video._id !== id);
      setVideos(updatedVideos);
    }
  };

  const handleEdit = (video) => {
    setEditingVideo({ ...video }); // Clone the video object to edit
  };

  const handleSaveEdit = () => {
    const updatedVideos = videos.map((video) =>
      video._id === editingVideo._id ? editingVideo : video
    );
    setVideos(updatedVideos);
    setEditingVideo(null);
  };

  const handleCancelEdit = () => {
    setEditingVideo(null);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingVideo({ ...editingVideo, [name]: value });
  };

  const filteredVideos = videos.filter(
    (video) =>
      video.title.includes(searchTerm) || video.stage.includes(searchTerm)
  );

  if (loading) {
    return <p>Loading videos...</p>;
  }

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  return (
    <div className="all-videos-container">
      <h2>إدارة الفيديوهات</h2>
      <div className="search-container">
        <input
          type="text"
          placeholder="ابحث باسم الفيديو أو الفئة"
          value={searchTerm}
          onChange={handleSearch}
          className="search-input"
        />
      </div>
      <div className="videos-table">
        <table>
          <thead>
            <tr>
              <th>اسم الفيديو</th>
              <th>الرابط</th>
              <th>المرحلة الدراسية</th>
              <th>الوصف</th>
              <th>الملاحظات</th>
              <th>الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            {filteredVideos.map((video) => (
              <tr key={video._id}>
                <td>
                  {editingVideo && editingVideo._id === video._id ? (
                    <input
                      type="text"
                      name="title"
                      value={editingVideo.title}
                      onChange={handleEditChange}
                      className="edit-input"
                    />
                  ) : (
                    video.title
                  )}
                </td>
                <td>
                  {editingVideo && editingVideo._id === video._id ? (
                    <input
                      type="text"
                      name="lesson_link"
                      value={editingVideo.lesson_link}
                      onChange={handleEditChange}
                      className="edit-input"
                    />
                  ) : (
                    <a
                      className="youtube-link"
                      href={video.lesson_link}
                      target="_blank"
                      rel="noreferrer"
                    >
                      رابط الفيديو
                    </a>
                  )}
                </td>
                <td>
                  {editingVideo && editingVideo._id === video._id ? (
                    <select
                      name="stage"
                      value={editingVideo.stage}
                      onChange={handleEditChange}
                      className="edit-input"
                    >
                      <option value="اولي ثانوي">اولي ثانوي</option>
                      <option value="ثاني ثانوي">ثاني ثانوي</option>
                      <option value="ثالث ثانوي">ثالث ثانوي</option>
                    </select>
                  ) : (
                    video.stage
                  )}
                </td>
                <td>
                  {editingVideo && editingVideo._id === video._id ? (
                    <textarea
                      name="description"
                      value={editingVideo.description}
                      onChange={handleEditChange}
                      className="edit-input"
                    />
                  ) : (
                    video.description
                  )}
                </td>
                <td>
                  {editingVideo && editingVideo._id === video._id ? (
                    <textarea
                      name="notes"
                      value={editingVideo.notes}
                      onChange={handleEditChange}
                      className="edit-input"
                    />
                  ) : (
                    video.notes
                  )}
                </td>
                <td>
                  {editingVideo && editingVideo._id === video._id ? (
                    <>
                      <button onClick={handleSaveEdit} className="save-button">
                        حفظ
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="cancel-button"
                      >
                        إلغاء
                      </button>
                    </>
                  ) : (
                    <div className="actions">
                      <button
                        onClick={() => handleEdit(video)}
                        className="edit-button"
                      >
                        تعديل
                      </button>
                      <button
                        onClick={() => handleDelete(video._id)}
                        className="delete-button"
                      >
                        حذف
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllVideos;
