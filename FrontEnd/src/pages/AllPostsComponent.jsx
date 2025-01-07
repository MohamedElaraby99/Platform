import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./../styles/dashboard/posts.css";

const AllPostsComponent = () => {
  // List of posts
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

  const [selectedPost, setSelectedPost] = useState(null);
  const [editingPost, setEditingPost] = useState(null);
  const [editContent, setEditContent] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // Function to view post details
  const viewPostDetails = (post) => {
    setSelectedPost(post);
    setEditingPost(null); // Exit editing mode
  };

  // Function to open edit mode
  const editPost = (post) => {
    setEditingPost(post);
    setEditContent(post.content);
    setSelectedPost(null); // Exit details view
  };

  // Function to save edited post
  const saveEditPost = () => {
    if (!editContent.trim()) {
      toast.error("لا يمكن أن يكون محتوى الإعلان فارغًا!");
      return;
    }

    setPosts(
      posts.map((post) =>
        post.id === editingPost.id ? { ...post, content: editContent } : post
      )
    );
    toast.success("تم تحديث الإعلان بنجاح!");
    setEditingPost(null);
    setSelectedPost(null);
  };

  // Function to cancel editing
  const cancelEdit = () => {
    setEditingPost(null);
    setEditContent("");
    toast.info("تم إلغاء التعديلات.");
  };

  // Function to delete a post
  const deletePost = (id) => {
    const confirmed = window.confirm("هل أنت متأكد من حذف هذا الإعلان؟");
    if (confirmed) {
      setPosts(posts.filter((post) => post.id !== id));
      if (selectedPost && selectedPost.id === id) {
        setSelectedPost(null); // Exit details view if the deleted post was being viewed
      }
      if (editingPost && editingPost.id === id) {
        setEditingPost(null); // Exit edit mode if the deleted post was being edited
      }
      toast.success("تم حذف الإعلان بنجاح!");
    }
  };

  // Function to filter posts based on search term
  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="all-posts-component">
      {/* Toast Notifications */}
      <ToastContainer />

      <header className="posts-header">
        <h2>إدارة الإعلانات</h2>
        <input
          type="text"
          placeholder="ابحث عن إعلان..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </header>

      <div className="posts-container">
        <ul className="posts-list">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
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
                    className="edit-post-btn"
                    onClick={() => editPost(post)}
                  >
                    تعديل
                  </button>
                  <button
                    className="delete-post-btn"
                    onClick={() => deletePost(post.id)}
                  >
                    حذف
                  </button>
                </div>
              </li>
            ))
          ) : (
            <p className="no-posts-message">لا توجد إعلانات مطابقة للبحث.</p>
          )}
        </ul>

        {/* View Post Details */}
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

        {/* Edit Post */}
        {editingPost && (
          <div className="post-edit">
            <h3>تعديل محتوى الإعلان</h3>
            <h4>{editingPost.title}</h4>
            <textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              className="edit-textarea"
            />
            <div className="edit-actions">
              <button className="save-edit-btn" onClick={saveEditPost}>
                حفظ
              </button>
              <button className="cancel-edit-btn" onClick={cancelEdit}>
                إلغاء
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllPostsComponent;
