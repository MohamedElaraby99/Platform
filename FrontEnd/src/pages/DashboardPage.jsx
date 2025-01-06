import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./../styles/dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div
      className={`dashboard ${
        location.pathname === "/add-user" ? "active" : ""
      }`}
    >
      <header className="dashboard-header">
        <div>
          <h1>نظرة عامة على اللوحة</h1>
          <p className="dashboard-welcome">مرحباً بك من جديد، مستر محمود</p>
        </div>
      </header>

      <div className="stats">
        <div className="stat-item" onClick={() => navigate("/all-videos")}>
          <h2>3</h2>
          <p className="stat-title">إجمالي الفيديوهات</p>
          <p className="show-details">عرض</p>
        </div>
        <div className="stat-item" onClick={() => navigate("/all-pdfs")}>
          <h2>3</h2>
          <p className="stat-title">إجمالي ملفات PDF</p>
          <p className="show-details">عرض</p>
        </div>
        <div className="stat-item" onClick={() => navigate("/all-exams")}>
          <h2>1</h2>
          <p className="stat-title">إجمالي الاختبارات</p>
          <p className="show-details">عرض</p>
        </div>
        <div className="stat-item" onClick={() => navigate("/all-users")}>
          <h2>2</h2>
          <p className="stat-title">إجمالي المستخدمين </p>
          <p className="show-details">عرض</p>
        </div>
        <div className="stat-item" onClick={() => navigate("/all-posts")}>
          <h2>3</h2>
          <p className="stat-title">إجمالي الإعلانات</p>
          <p className="show-details">عرض</p>
        </div>
      </div>

      <div className="actions">
        <div className="quick-upload">
          <h3>رفع سريع</h3>

          <button className="video-btn" onClick={() => navigate("/add-video")}>
            <span className="fluent--video-28-filled"></span>
            <span className="invisible-char">هلا</span>
            <span className="add-text"> اضافة فيديو جديد</span>
          </button>

          <button className="pdf-btn" onClick={() => navigate("/add-pdf")}>
            <span className="bxs--file-pdf "></span>
            <span className="invisible-char">هلا</span>
            <span className="add-text"> اضافة PDF جديد</span>
          </button>
        </div>
        <div className="quick-actions">
          <h3>إجراءات سريعة</h3>

          <button className="add-btn" onClick={() => navigate("/add-user")}>
            <span className="mdi--user-add"></span>
            <span className="invisible-char">هلا</span>
            <span className="add-text"> اضافة مستخدم جديد</span>
          </button>

          <button className="exam-btn" onClick={() => navigate("/add-exam")}>
            <span className="fa6-solid--pen"></span>
            <span className="invisible-char">هلا</span>
            <span className="add-text"> اضافة امتحان جديد </span>
          </button>

          <button className="post-btn" onClick={() => navigate("/add-post")}>
            <span className="mdi--bullhorn"></span>
            <span className="invisible-char">هلا</span>
            <span className="add-text"> إضافة إعلان جديد </span>
          </button>
        </div>
      </div>

      <div className="recent-activity">
        <h3>النشاط الأخير</h3>
        <ul>
          <li>تم رفع فيديو جديد: "مقدمة إلى الرياضيات" - منذ ساعتين</li>
          <li>تمت إضافة ملف PDF: "ورقة صيَغ الفيزياء" - منذ 4 ساعات</li>
          <li>إعلان جديد: "تحديث النظام الأسبوع المقبل" - منذ 3 ساعات</li>
          <li>
            تم إنشاء اختبار جديد: "الاختبار النهائي للكيمياء" - منذ 6 ساعات
          </li>
          <li>تم تسجيل مستخدم جديد: سارة جونسون - منذ 8 ساعات</li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
