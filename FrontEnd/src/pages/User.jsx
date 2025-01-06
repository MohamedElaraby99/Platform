import React from "react";
import "./../styles/User.css";

const UserPage = ({ onSignOut }) => {
  const userName = "محمود توكل"; // يمكنك جلب اسم المستخدم من قاعدة بيانات أو من props

  return (
    <div className="user-page">
      <div className="user-info">
        <h2>مرحبًا، {userName}</h2>
        <button className="logout-button" onClick={onSignOut}>
          تسجيل الخروج
        </button>
      </div>
    </div>
  );
};

export default UserPage;
