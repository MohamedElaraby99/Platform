import React, { useState } from "react";
import "./../styles/dashboard/posts.css";

const AllPostsComponent = () => {
  // قائمة الإعلانات (محاكاة للبيانات)
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "تحديث النظام الأسبوع المقبل",
      time: "منذ 3 ساعات",
      content: "سيتم إجراء تحديث شامل للنظام الأسبوع المقبل.",
    },
    {
      id: 2,
      title: "تحديث في محتوى الرياضيات",
      time: "منذ 5 ساعات",
      content: "تم إضافة مواضيع جديدة في مادة الرياضيات.",
    },
    {
      id: 3,
      title: "إعلان هام: موعد الامتحانات",
      time: "منذ يوم واحد",
      content: "موعد الامتحانات النهائية هو 15 يناير 2025.",
    },
  ]);

  // حالة لتتبع الإعلان المعروض حاليًا
  const [selectedPost, setSelectedPost] = useState(null);

  // وظيفة لعرض تفاصيل إعلان معين
  const viewPostDetails = (post) => {
    setSelectedPost(post);
  };

  // وظيفة لحذف إعلان
  const deletePost = (id) => {
    setPosts(posts.filter((post) => post.id !== id));
    // إذا كان الإعلان المحذوف هو نفسه المعروض، قم بإغلاق نافذة التفاصيل
    if (selectedPost && selectedPost.id === id) {
      setSelectedPost(null);
    }
  };

  return (
    <div className="all-posts-component">
      <header className="posts-header">
        <h2>جميع الإعلانات</h2>
      </header>

      <div className="posts-container">
        <ul className="posts-list">
          {posts.map((post) => (
            <li key={post.id} className="post-item">
              <div className="post-content">
                <h4>{post.title}</h4>
                <span className="post-time">{post.time}</span>
              </div>
              <div className="post-actions">
                <button
                  className="view-post-btn"
                  onClick={() => viewPostDetails(post)}
                >
                  عرض التفاصيل
                </button>
                <button
                  className="delete-post-btn"
                  onClick={() => deletePost(post.id)}
                >
                  حذف
                </button>
              </div>
            </li>
          ))}
        </ul>

        {selectedPost && (
          <div className="post-details">
            <h3>تفاصيل الإعلان</h3>
            <h4>{selectedPost.title}</h4>
            <p>{selectedPost.content}</p>
            <button
              className="close-details-btn"
              onClick={() => setSelectedPost(null)}
            >
              إغلاق
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllPostsComponent;
