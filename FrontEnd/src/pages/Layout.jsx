import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./../styles/Layout.css";

const Layout = ({ children, role, onSignOut }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className={`layout ${isSidebarOpen ? "menu-open" : ""}`}>
      <header className="header">
        <div className="burger-menu" onClick={toggleSidebar}>
          <img
            className="burger-icon"
            src={require(`./../images/${
              isSidebarOpen ? "close-icon.png" : "menu-bar.png"
            }`)}
            alt="Menu"
          />
        </div>
        <div className="logo-container" onClick={() => navigate("/home")}>
          <img
            className="logo"
            src={require("./../images/0d231dfe-f53b-42fb-aa49-90b4d32966af.png")}
            alt="محمود توكل"
          />
          <h1>
            مــنص<span className="highlight-dot">ـة</span> الــتوك
            <span className="highlight-dot">ـل</span>
          </h1>
        </div>

        <div className="user-menu">
          <Link to="/user">
            <div
              className={`user-avatar ${
                location.pathname === "/user" ? "active" : ""
              }`}
            ></div>
          </Link>
        </div>
      </header>

      {/* ✅ إضافة الـ Overlay عند فتح القائمة الجانبية */}
      {isSidebarOpen && <div className="overlay" onClick={toggleSidebar}></div>}

      <main className="main-content">
        {/* Sidebar */}
        <aside className={`sidebar ${isSidebarOpen ? "open" : "closed"}`}>
          <ul>
            <li className={location.pathname === "/home" ? "active" : ""}>
              <Link to="/home">
                <span className="material-icons">home</span> الرئيسية
              </Link>
            </li>
            <li
              className={
                location.pathname.startsWith("/courses") ? "active" : ""
              }
            >
              <Link to="/courses">
                <span className="material-icons">book</span> الفيديوهات
                التعليمية
              </Link>
            </li>
            <li
              className={location.pathname.startsWith("/exams") ? "active" : ""}
            >
              <Link to="/exams">
                <span className="material-icons">edit</span> الامتحانات
              </Link>
            </li>
            <li className={location.pathname === "/pdf" ? "active" : ""}>
              <Link to="/pdf">
                <span className="material-icons">picture_as_pdf</span> ملفات PDF
              </Link>
            </li>
            {role === "admin" && (
              <li
                className={
                  location.pathname.startsWith("/dashboard") ? "active" : ""
                }
              >
                <Link to="/dashboard">
                  <span className="material-icons">settings</span> لوحة التحكم
                </Link>
              </li>
            )}
          </ul>
        </aside>

        <div className="page-content">{children}</div>
      </main>
    </div>
  );
};

export default Layout;
