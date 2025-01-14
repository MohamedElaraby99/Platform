import React from "react";
import "./../styles/User.css";

const UserPage = ({ onSignOut }) => {
  
  return (
    <div className="user-page">
      <div className="user-info">
        <button className="logout-button" onClick={onSignOut}>
          تسجيل الخروج
        </button>
      </div>
    </div>
  );
};

export default UserPage;
