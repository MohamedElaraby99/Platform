import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./../../styles/dashboard/addPosts.css";

const CreatePostComponent = () => {
  // State to store posts
  const [posts, setPosts] = useState([]);

  // States for new post fields
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [selectedYears, setSelectedYears] = useState([]);

  // List of years
  const years = ["الصف الأول", "الصف الثاني", "الصف الثالث"];

  // Function to handle new post creation
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !details || selectedYears.length === 0) {
      toast.error("يرجى تعبئة جميع الحقول!");
      return;
    }

    const newPost = {
      id: Date.now(),
      title,
      details,
      years: selectedYears,
    };

    // Add the new post to the list
    setPosts((prevPosts) => [...prevPosts, newPost]);

    // Reset fields
    setTitle("");
    setDetails("");
    setSelectedYears([]);

    // Show success toast
    toast.success("تم إنشاء الإعلان بنجاح!");
  };

  // Function to toggle selected years
  const handleYearToggle = (year) => {
    if (selectedYears.includes(year)) {
      setSelectedYears(selectedYears.filter((y) => y !== year));
    } else {
      setSelectedYears([...selectedYears, year]);
    }
  };

  return (
    <div className="create-post-component">
      <ToastContainer />
      <header className="posts-header">
        <h2>إنشاء إعلان جديد</h2>
      </header>

      <form className="post-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">عنوان الإعلان:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="أدخل عنوان الإعلان"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="details">تفاصيل الإعلان:</label>
          <textarea
            id="details"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            placeholder="أدخل تفاصيل الإعلان"
            required
          ></textarea>
        </div>

        <div className="form-group">
          <label>السنة الدراسية الموجهة:</label>
          <div className="years-checkboxes">
            {years.map((year) => (
              <div key={year} className="checkbox-item">
                <input
                  type="checkbox"
                  id={year}
                  checked={selectedYears.includes(year)}
                  onChange={() => handleYearToggle(year)}
                />
                <label htmlFor={year}>{year}</label>
              </div>
            ))}
          </div>
        </div>

        <button type="submit" className="submit-btn">
          إنشاء الإعلان
        </button>
      </form>
    </div>
  );
};

export default CreatePostComponent;
