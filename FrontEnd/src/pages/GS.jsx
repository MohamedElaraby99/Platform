import React, { useState, useEffect } from "react";
import LazyLoad from "react-lazyload";
import { FloatingWhatsApp } from "react-floating-whatsapp";
import { Moon, Sun, LogIn, SquarePlus } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./../styles/landingPage.css";
import Loader from "./Loader";
import { useNavigate } from "react-router-dom";
import "./../styles/subscriptionSection.css";

const GeoS = () => {
  const subscriptionPlans = [
    {
      id: 1,
      title: "اشتراك ترم",
      image: require("./../images/11.png"),
      features: [
        " وصول كامل لجميع الدروس طوال الترم",
        " وصول كامل لجميع الامتحانات التفاعلية طوال الترم",
        "وصول كامل لجميع المذكرات طوال الترم",
        " وصول كامل لجميع التدريبات طوال الترم",
        " التواصل مع المعلم",
        "دعم فني 24/7",
      ],
      price: "600 جنيه",
    },
    {
      id: 2,
      title: "اشتراك شهري",
      image: require("./../images/13.png"),
      features: [
        " وصول كامل لجميع الدروس طوال الشهر",
        " وصول كامل لجميع الامتحانات التفاعلية طوال الشهر",
        "وصول كامل لجميع المذكرات طوال الشهر",
        " وصول كامل لجميع التدريبات طوال الشهر",
        " التواصل مع المعلم",
        "دعم فني 24/7",
      ],
      price: "200 جنيه",
    },
  ];
  const navigate = useNavigate();
  const [theme, setTheme] = useState(() => {
    // تحميل الثيم المحفوظ من التخزين المحلي عند تحميل الصفحة
    return localStorage.getItem("theme") || "light";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    AOS.init({ duration: 1000, once: true });
  }, [theme]);

  useEffect(() => {
    // حفظ الثيم في التخزين المحلي عند تغييره
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
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
            <button onClick={() => navigate("/signup")} className="sign-up-btn">
              <SquarePlus size={20} /> التسجيل
            </button>
          </div>
        </nav>
      </LazyLoad>

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
        <div className="hero">
          <section className="subscription-cards" dir="rtl">
            <h2 className="cards-title">خطط الاشتراك في مادة الجغرافيا</h2>
            <div className="cards-container">
              {subscriptionPlans.map((plan) => (
                <div className="card" key={plan.id}>
                  <img
                    src={plan.image}
                    alt={plan.title}
                    className="card-image"
                  />
                  <h3>{plan.title}</h3>
                  <p className="price">السعر: {plan.price}</p>
                  <ul className="features-list">
                    {plan.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                  <button className="subscribe-btn">اشترك</button>
                </div>
              ))}
            </div>
          </section>
        </div>
      </LazyLoad>

      {/* قسم الفوتر */}
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
            {/* About the Platform */}
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

            {/* Center Logo and Tagline */}
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

            {/* Social Media Links */}
            <div className="footer-section">
              <h3 className="footer-title">قنوات التواصل</h3>
              <div className="social-links">
                <a
                  href="https://www.tiktok.com/@mahmoud.tawakol0?is_from_webapp=1&sender_device=pc"
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
                  href="https://www.facebook.com/profile.php?id=100063763039756&mibextid=ZbWKwL"
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
                    alt="Instagram"
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

          {/* Bottom Section */}
          <div className="footer-bottom">
            <p className="footer-text">
              &copy; {new Date().getFullYear()} - منصة مستر محمود توكل - جميع
              الحقوق - محفوظة
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

      {/* زر واتساب عائم */}
      <FloatingWhatsApp
        phoneNumber="+201120646425" // استبدل برقم واتساب الصحيح مع رمز الدولة
        accountName="محمود توكل"
        statusMessage="متصل"
        chatMessage="مرحباً! كيف يمكننا مساعدتك؟"
        allowEsc
        allowClickAway
        notification
        notificationSound
        avatar={require("./../images/avatarr.png")} // استبدل بمسار الصورة إذا رغبت
      />
    </div>
  );
};

export default GeoS;
