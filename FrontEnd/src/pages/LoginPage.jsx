import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./../styles/LoginPage.css";

const LoginForm = ({ setRole }) => {
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Retrieve saved login data if available
  useEffect(() => {
    const savedUsername = localStorage.getItem("userName");
    const savedPassword = localStorage.getItem("password");
    const savedRememberMe = localStorage.getItem("rememberMe") === "true";

    if (savedRememberMe) {
      setUsername(savedUsername || "");
      setPassword(savedPassword || "");
      setRememberMe(savedRememberMe);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Make the API request to the login endpoint
      const response = await axios.post("http://localhost:8000/auth/login", {
        username: userName,
        password: password,
      });

      const { role, accessToken } = response.data;
      console.log(response);
      
      // Set role and token in localStorage
      setRole(role);
      localStorage.setItem("role", role);
      localStorage.setItem("accessToken", accessToken);

      // If "Remember Me" is checked, save username and password
      if (rememberMe) {
        localStorage.setItem("userName", userName);
        localStorage.setItem("password", password);
        localStorage.setItem("rememberMe", "true");
      } else {
        localStorage.removeItem("userName");
        localStorage.removeItem("password");
        localStorage.removeItem("rememberMe");
      }

      // Redirect based on role
      if (role === "admin") {
        navigate("/dashboard");
      } else {
        navigate("/home");
      }
    } catch (error) {
      setError(
        error.response?.data?.message || "اسم المستخدم أو كلمة المرور غير صحيحة"
      );
    }
  };

  return (
    <div className="login-page-container">
      <div className="login-page">
        {/* Left Section */}
        <div className="left-side">
          <h1 className="welcome-text">مرحبًا بعودتك!</h1>
          <p className="welcome-subtext">
            يرجى تسجيل الدخول إلى حسابك للمتابعة.
          </p>
        </div>

        {/* Right Section */}
        <div className="right-side">
          <div className="login-form-container">
            <h2 className="login-title">تسجيل الدخول</h2>
            <form onSubmit={handleLogin} className="login-form">
              <div className="input-container">
                <label htmlFor="userName">اسم المستخدم</label>
                <input
                  type="text"
                  id="userName"
                  value={userName}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="input-container">
                <label htmlFor="password">كلمة المرور</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {error && <p className="error-message">{error}</p>}
              <div className="options">
                <label className="remember-me">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  تذكرني
                </label>
              </div>
              <button type="submit" className="login-button">
                تسجيل الدخول
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
