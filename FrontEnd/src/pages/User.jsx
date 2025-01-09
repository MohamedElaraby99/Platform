import React from "react";
import "./../styles/User.css";

const UserPage = ({ onSignOut }) => {
  const userName = localStorage.getItem("userName");
  
  return (
    <div className="user-page">
      <div className="user-info">
        <h2>
          مرحباً بك،
          <h2 className="user-name">{userName}</h2>
        </h2>
        <button className="logout-button" onClick={onSignOut}>
          تسجيل الخروج
        </button>
      </div>
    </div>
  );
};

export default UserPage;
