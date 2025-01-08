import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./../../styles/dashboard/AddUser.css";

const AddUser = () => {
  const [user, setUser] = useState({
    type: "student", // Default to student
    name: "",
    username: "",
    password: "",
    stage: "",
  });

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
    if (!user.name) {
      toast.error("الرجاء إدخال الاسم!");
      return;
    }
    if (!user.username) {
      toast.error("الرجاء إدخال اسم المستخدم!");
      return;
    }
    if (!user.password) {
      toast.error("الرجاء إدخال كلمة المرور!");
      return;
    }
    if (user.type === "student" && !user.stage) {
      toast.error("الرجاء اختيار المرحلة الدراسية!");
      return;
    }

    // Simulate saving user data
    console.log("User added:", user);

    // Reset form
    setUser({
      type: "student",
      name: "",
      username: "",
      password: "",
      stage: "",
    });

    // Show success toast
    toast.success("تم إضافة المستخدم بنجاح!");
  };

  return (
    <div className="add-user">
      {/* Toast Notifications */}
      <ToastContainer position="top-center" autoClose={3000} />

      <div className="add-user-container">
        <h2>إضافة مستخدم جديد</h2>
        <form onSubmit={handleSubmit} className="add-user-form">
          <div className="form-group">
            <label htmlFor="type">نوع المستخدم:</label>
            <select
              id="type"
              name="type"
              value={user.type}
              onChange={handleChange}
            >
              <option value="student">طالب</option>
              <option value="admin">مشرف</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="name">الاسم :</label>
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleChange}
              placeholder="أدخل الاسم الكامل"
            />
          </div>
          <div className="form-group">
            <label htmlFor="username">اسم المستخدم:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={user.username}
              onChange={handleChange}
              placeholder="أدخل اسم المستخدم (على سبيل المثال: ali123)"
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
          {user.type === "student" && (
            <div className="form-group">
              <label htmlFor="stage">المرحلة الدراسية:</label>
              <select
                id="stage"
                name="stage"
                value={user.stage}
                onChange={handleChange}
              >
                <option value="">اختر المرحلة الدراسية</option>
                <option value="أولى ثانوي">أولى ثانوي</option>
                <option value="ثانية ثانوي">ثانية ثانوي</option>
                <option value="ثالثة ثانوي">ثالثة ثانوي</option>
              </select>
            </div>
          )}
          <button type="submit" className="submit-button">
            {user.type === "student" ? "إضافة طالب" : "إضافة مشرف"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
