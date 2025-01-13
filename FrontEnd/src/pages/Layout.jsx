import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./../styles/Layout.css";

const Layout = ({ children, role, onSignOut }) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="layout">
      <header className="header">
        <div className="logo-container" onClick={() => navigate("/home")}>
          <img
            className="logo"
            src={require("./../images/loginlogo.png")}
            alt="محمود توكل"
          />
          <h1>
            مــنص<span class="highlight-dot">ـة</span> الــتوك
            <span class="highlight-dot">ـل</span>
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

      <main className="main-content">
        {/* Sidebar */}
        <aside className="sidebar">
          <ul>
            <li className={location.pathname === "/home" ? "active" : ""}>
              <Link to="/home">
                <span className="material-icons">home</span> الرئيسية
              </Link>
            </li>
            <li
              className={
                location.pathname === "/courses" ||
                location.pathname === "/video-details"
                  ? "active"
                  : ""
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
                  location.pathname.startsWith("/dashboard") ||
                  location.pathname.startsWith("/add-") ||
                  location.pathname.startsWith("/edit-") ||
                  location.pathname.startsWith("/all-") ||
                  location.pathname.startsWith("/delete-") ||
                  location.pathname.startsWith("/show-")
                    ? "active"
                    : ""
                }
              >
                <Link to="/dashboard">
                  <span className="material-icons">settings</span> لوحة التحكم
                </Link>
              </li>
            )}
          </ul>
        </aside>

        {/* Page Content */}
        <div className="page-content">{children}</div>
      </main>
    </div>
  );
};

export default Layout;
