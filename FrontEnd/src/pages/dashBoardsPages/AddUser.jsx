import React, { useState } from "react";
import "./../../styles/dashboard/AddUser.css";

const AddUser = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
    stage: "",
  });

  const [message, setMessage] = useState("");

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform validation
    if (!user.username || !user.password || !user.stage) {
      setMessage("الرجاء ملء جميع الحقول");
      return;
    }

    // Simulate saving user data
    console.log("User added:", user);

    // Reset form
    setUser({
      username: "",
      password: "",
      stage: "",
    });

    // Show success message
    setMessage("تم إضافة المستخدم بنجاح!");
  };

  return (
    <div className="add-user-container">
      <h2>إضافة مستخدم جديد</h2>
      {message && <p className="message">{message}</p>}
      <form onSubmit={handleSubmit} className="add-user-form">
        <div className="form-group">
          <label htmlFor="username">اسم المستخدم:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={user.username}
            onChange={handleChange}
            placeholder="أدخل اسم المستخدم"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">كلمة المرور:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={user.password}
            onChange={handleChange}
            placeholder="أدخل كلمة المرور"
          />
        </div>
        <div className="form-group">
          <label htmlFor="stage">المرحلة الدراسية:</label>
          <select
            id="stage"
            name="stage"
            value={user.stage}
            onChange={handleChange}
          >
            <option value="">اختر المرحلة الدراسية</option>
            <option value="المرحلة الابتدائية">المرحلة الابتدائية</option>
            <option value="المرحلة الإعدادية">المرحلة الإعدادية</option>
            <option value="المرحلة الثانوية">المرحلة الثانوية</option>
          </select>
        </div>
        <button type="submit" className="submit-button">
          إضافة مستخدم
        </button>
      </form>
    </div>
  );
};

export default AddUser;
