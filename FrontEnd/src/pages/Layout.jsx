import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./../styles/Layout.css";
import { useNavigate } from "react-router-dom";

const Layout = ({ children, role, onSignOut }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Save the current path to localStorage whenever it changes
  useEffect(() => {
    if (location.pathname !== "/login") {
      localStorage.setItem("lastVisitedPath", location.pathname);
      console.log("Path saved to localStorage:", location.pathname); 
    }
  }, [location]);

  return (
    <div className="layout">
      <header className="header">
        <div className="logo-container" onClick={() => navigate("/home")}>
          <img
            className="logo"
            src={require("./../images/logo.png")}
            alt="محمود توكل"
          />
          <h1 className="flash">المنصة التعليمية لمستر توكل</h1>
        </div>
        <div className="search-container">
          <input type="search" placeholder="بحث..." className="search-bar" />
          <button className="material-icons search-icon">search</button>
        </div>
        <div className="user-menu">
          {/* Link to User Page */}
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
        <aside className="sidebar">
          <ul>
            <li className={location.pathname === "/home" ? "active" : ""}>
              <Link to="/home">
                <span className="material-icons">home</span> الرئيسية
              </Link>
            </li>
            <li className={location.pathname === "/courses" ? "active" : ""}>
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
                  location.pathname === "/dashboard" ||
                  location.pathname === "/add-user" ||
                  location.pathname === "/add-video" ||
                  location.pathname === "/add-pdf" ||
                  location.pathname === "/add-exam" ||
                  location.pathname === "/all-videos" ||
                  location.pathname === "/all-pdfs" ||
                  location.pathname === "/all-exams" ||
                  location.pathname === "/all-users" ||
                  location.pathname === "/user" ||
                  location.pathname === "/edit-user" ||
                  location.pathname === "/edit-video" ||
                  location.pathname === "/edit-pdf" ||
                  location.pathname === "/edit-exam" ||
                  location.pathname === "/all-posts" ||
                  location.pathname === "/add-post"
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
        <div className="page-content">{children}</div>
      </main>
    </div>
  );
};

export default Layout;
