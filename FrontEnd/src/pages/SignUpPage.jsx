import React, { useState, useEffect } from "react";
import LazyLoad from "react-lazyload";
import { Moon, Sun, LogIn } from "lucide-react";
import Loader from "./Loader";
import "./../styles/landingPage.css";
import { useNavigate } from "react-router-dom";
import "./../styles/SignUpPage.css";
import { FloatingWhatsApp } from "react-floating-whatsapp";
import "aos/dist/aos.css";
import AOS from "aos";

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    username: "",
    governorate: "",
    password: "",
    confirmPassword: "",
    studentPhone: "",
    parentPhone: "",
    academicYear: "", // إضافة السنة الدراسية
  });

  const [error, setError] = useState(""); // حالة لتتبع رسالة الخطأ

  const governorates = [
    "القاهرة",
    "الجيزة",
    "الإسكندرية",
    "الدقهلية",
    "الشرقية",
    "القليوبية",
    "المنوفية",
    "الغربية",
    "البحيرة",
    "كفر الشيخ",
    "دمياط",
    "بورسعيد",
    "الإسماعيلية",
    "السويس",
    "الفيوم",
    "بني سويف",
    "المنيا",
    "أسيوط",
    "سوهاج",
    "قنا",
    "الأقصر",
    "أسوان",
    "البحر الأحمر",
    "الوادي الجديد",
    "مطروح",
    "شمال سيناء",
    "جنوب سيناء",
  ];

  const academicYears = ["أولى ثانوي", "ثانية ثانوي", "ثالثة ثانوي"]; // قائمة السنوات الدراسية

  const navigate = useNavigate();
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    AOS.init({ duration: 1000, once: true });
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // التحقق من تطابق كلمة المرور وتأكيدها
    if (formData.password !== formData.confirmPassword) {
      setError("كلمة المرور وتأكيدها غير متطابقين");
      return;
    }

    setError("");
    console.log("Form Data Submitted:", formData);
  };

  return (
    <div dir="rtl">
      <LazyLoad
        height={100}
        offset={100}
        once
        placeholder={
          <div>
            <Loader />
          </div>
        }
      >
        <nav className="nav" data-aos="fade-down">
          <div
            className="nav-logo navv"
            onClick={() => navigate("/")}
            style={{ cursor: "pointer" }}
          >
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
          <div className="nav-links">
            <button onClick={toggleTheme} className="theme-toggle">
              {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
            </button>
            <button onClick={() => navigate("/login")} className="sign-in-btn">
              <LogIn size={20} /> الدخول
            </button>
          </div>
        </nav>
      </LazyLoad>
      <div className="signup-containerr" data-aos="fade-down">
        <div className="signup-image">
          <img
            className="signup-image"
            src={require("./../images/signup.png")}
            alt="تسجيل"
          />
        </div>
        <div className="signup-form-container">
          <h2 className="signup-title">انشاء حساب </h2>
          <form className="signup-form" onSubmit={handleSubmit}>
            <label>
              الاسم بالكامل:
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              البريد الإلكتروني:
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              اسم المستخدم:
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              المحافظة:
              <select
                name="governorate"
                value={formData.governorate}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  اختر المحافظة
                </option>
                {governorates.map((gov) => (
                  <option key={gov} value={gov}>
                    {gov}
                  </option>
                ))}
              </select>
            </label>
            <label>
              السنة الدراسية:
              <select
                name="academicYear"
                value={formData.academicYear}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  اختر السنة الدراسية
                </option>
                {academicYears.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </label>
            <label>
              رقم هاتف الطالب:
              <input
                type="tel"
                name="studentPhone"
                value={formData.studentPhone}
                onChange={handleChange}
                required
                pattern="[0-9]{11}"
                placeholder="مثال: 01234567890"
              />
            </label>
            <label>
              رقم هاتف الوالد:
              <input
                type="tel"
                name="parentPhone"
                value={formData.parentPhone}
                onChange={handleChange}
                required
                pattern="[0-9]{11}"
                placeholder="مثال: 01234567890"
              />
            </label>
            <label>
              كلمة المرور:
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              تأكيد كلمة المرور:
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
              {error && <p className="error-message">{error}</p>}
            </label>
            <button type="submit">إنشاء الحساب</button>
          </form>
        </div>
      </div>

      <LazyLoad
        height={200}
        offset={100}
        once
        placeholder={
          <div>
            <Loader />
          </div>
        }
      >
        <footer className="footerr">
          <div className="footer-container">
            <div className="footer-section">
              <h3 className="footer-title">عن المنصة</h3>
              <ul className="footer-links">
                <li></li>
                <li>
                  <a href="tel:01023607948" className="footer-link">
                    الاتصال بنا
                  </a>
                </li>
              </ul>
            </div>
            <div className="footer-section footer-center">
              <img
                src={require("./../images/footer.png")}
                alt="Platform Logo"
                className="footer-logo"
              />
              <p className="footer-tagline">
                التاريخ والجغرافيا منهج طويل والتوكل فيه الدليل
              </p>
            </div>
            <div className="footer-section">
              <h3 className="footer-title">قنوات التواصل</h3>
              <div className="social-links">
                <a
                  href="https://www.tiktok.com/@mahmoud.tawakol0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                >
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/3046/3046127.png"
                    alt="TikTok"
                    className="social-icon"
                  />
                </a>
                <a
                  href="https://www.facebook.com/profile.php?id=100063763039756"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                >
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
                    alt="Facebook"
                    className="social-icon"
                  />
                </a>
                <a
                  href={`https://wa.me/${201120646425}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                >
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
                    alt="WhatsApp"
                    className="social-icon"
                  />
                </a>
                <a
                  href="https://www.youtube.com/@%D8%A7%D9%84%D8%AA%D9%88%D9%83%D9%84-90"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                >
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/4/42/YouTube_icon_%282013-2017%29.png"
                    alt="YouTube"
                    className="social-icon"
                  />
                </a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p className="footer-text">
              © {new Date().getFullYear()} - منصة مستر محمود توكل - جميع الحقوق
              - محفوظة
            </p>
            <p>
              <a
                href="https://www.facebook.com/share/15yTFSwF4n/"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link developer-link"
              >
                تصميم وتطوير بواسطة فكرة - Fikra Software
              </a>
            </p>
          </div>
        </footer>
      </LazyLoad>
      <FloatingWhatsApp
        phoneNumber="+201120646425"
        accountName="محمود توكل"
        statusMessage="متصل"
        chatMessage="مرحباً! كيف يمكننا مساعدتك؟"
        allowEsc
        allowClickAway
        notification
        notificationSound
        avatar={require("./../images/avatarr.png")}
      />
    </div>
  );
};

export default SignUpPage;
