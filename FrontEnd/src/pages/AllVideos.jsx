import React, { useState } from "react";
import "./../styles/AllVideos.css";

const AllVideos = () => {
  const [videos, setVideos] = useState([
    { id: 1, title: "تعلم البرمجة", category: "اولي ثانوي" },
    { id: 2, title: "أساسيات الرياضيات", category: "ثاني ثانوي" },
    { id: 3, title: "فيزياء المستوى الأول", category: "ثالث ثانوي" },
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleDelete = (id) => {
    const updatedVideos = videos.filter((video) => video.id !== id);
    setVideos(updatedVideos);
  };

  const filteredVideos = videos.filter(
    (video) =>
      video.title.includes(searchTerm) || video.category.includes(searchTerm)
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
              <th>المرحلة الدراسية</th>
              <th>الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            {filteredVideos.map((video) => (
              <tr key={video.id}>
                <td>{video.title}</td>
                <td>{video.category}</td>
                <td>
                  <button
                    onClick={() => handleDelete(video.id)}
                    className="delete-button"
                  >
                    حذف
                  </button>
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
