import React, { useState } from "react";
import "./../styles/AllVideos.css";

const AllVideos = () => {
  const [videos, setVideos] = useState([
    {
      id: 1,
      title: "تعلم البرمجة",
      youtubeLink: "https://youtube.com/example1",
      stage: "اولي ثانوي",
      description: "شرح أساسيات البرمجة للمبتدئين",
      notes: "الفيديو متاح في كل الأوقات",
    },
    {
      id: 2,
      title: "أساسيات الرياضيات",
      youtubeLink: "https://youtube.com/example2",
      stage: "ثاني ثانوي",
      description: "مراجعة شاملة على الجبر والهندسة",
      notes: "الفيديو يحتوي على أسئلة إضافية",
    },
    {
      id: 3,
      title: "فيزياء المستوى الأول",
      youtubeLink: "https://youtube.com/example3",
      stage: "ثالث ثانوي",
      description: "شرح قوانين الحركة الديناميكية",
      notes: "الفيديو يشرح كافة الأمثلة بالتفصيل",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [editingVideo, setEditingVideo] = useState(null); // For editing state

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("هل أنت متأكد من حذف هذا الفيديو؟");
    if (confirmDelete) {
      const updatedVideos = videos.filter((video) => video.id !== id);
      setVideos(updatedVideos);
    }
  };

  const handleEdit = (video) => {
    setEditingVideo({ ...video }); // Clone the video object to edit
  };

  const handleSaveEdit = () => {
    const updatedVideos = videos.map((video) =>
      video.id === editingVideo.id ? editingVideo : video
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
              <tr key={video.id}>
                <td>
                  {editingVideo && editingVideo.id === video.id ? (
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
                  {editingVideo && editingVideo.id === video.id ? (
                    <input
                      type="text"
                      name="youtubeLink"
                      value={editingVideo.youtubeLink}
                      onChange={handleEditChange}
                      className="edit-input"
                    />
                  ) : (
                      <a 
                      className="youtube-link"
                      href={video.youtubeLink}
                      target="_blank"
                      rel="noreferrer"
                    >
                      رابط الفيديو
                    </a>
                  )}
                </td>
                <td>
                  {editingVideo && editingVideo.id === video.id ? (
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
                  {editingVideo && editingVideo.id === video.id ? (
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
                  {editingVideo && editingVideo.id === video.id ? (
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
                  {editingVideo && editingVideo.id === video.id ? (
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
                    <div div className="actions">
                      <button
                        onClick={() => handleEdit(video)}
                        className="edit-button"
                      >
                        تعديل
                      </button>
                      <button
                        onClick={() => handleDelete(video.id)}
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
