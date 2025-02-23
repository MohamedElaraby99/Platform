import React, { useState, useEffect } from "react";
import LazyLoad from "react-lazyload";
import { FloatingWhatsApp } from "react-floating-whatsapp";
import {
  Sun,
  Moon,
  GraduationCap,
  BookOpen,
  Award,
  Users,
  ArrowRight,
  MessagesSquare,
  LogIn,
  SquarePlus,
} from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./../styles/landingPage.css";
import Loader from "./Loader";
import FAQSection from "./FAQSection.jsx";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
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
      {/* قسم الشريط العلوي */}
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
            onClick={() => navigate("/landing")}
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

      {/* قسم الصفحة الرئيسية (Hero) */}
      <LazyLoad
        height={300}
        offset={100}
        once
        placeholder={
          <div>
            <Loader />
          </div>
        }
      >
        <section className="hero" data-aos="fade-up">
          <div className="hero-content">
            <div className="hero-text">
              <h1>حوّل رحلتك التعليمية</h1>
              <p>
                اكتشف طريقة جديدة لاستيعاب مادة التاريخ والجغرافيا للثانوية
                العامة مع منصتنا المبتكرة. احصل على دروس متميزة تُعد خصيصاً
                لتبسيط مفاهيم التاريخ والجغرافيا، وتفاعل مع مدرسين خبراء يقدمون
                لك استراتيجيات تحضير فعالة، وحقق أهدافك التعليمية بوتيرتك
                الخاصة.
              </p>
              <button
                onClick={() => navigate("/signup")}
                className="sign-upp-btn"
              >
                <GraduationCap size={30} />
                ابدأ اليوم
                <ArrowRight size={30} />
              </button>
            </div>
            <div className="hero-image">
              <img src={require("./../images/19755.png")} alt="طلاب يتعلمون" />
            </div>
          </div>
        </section>
      </LazyLoad>

      {/* قسم "من نحن" */}
      <LazyLoad
        height={300}
        offset={100}
        once
        placeholder={
          <div>
            <Loader />
          </div>
        }
      >
        <section className="aboutt" id="about" data-aos="fade-up">
          <div className="aboutt-container">
            <div className="about-image">
              <img src={require("./../images/9348846.png")} alt="محمود توكل" />
            </div>
            <div className="about-text">
              <h2>من نحن</h2>
              <p>
                أهلاً، نحن منصة التوكل تحت إشراف المستر محمود توكل، دراسات عليا
                بجامعة القاهرة ومتخصص في مادة التاريخ والجغرافيا للثانوية
                العامة. أمتلك خبرة واسعة في تدريس هذه المواد وأسعى لتقديم أفضل
                المحتويات التعليمية التي تساعد الطلاب على تحقيق النجاح والتفوق.
              </p>
            </div>
          </div>
        </section>
      </LazyLoad>

      {/* قسم المميزات */}
      <LazyLoad
        height={300}
        offset={100}
        once
        placeholder={
          <div>
            <Loader />
          </div>
        }
      >
        <section className="features" id="features" data-aos="fade-up">
          <div className="features-grid">
            <div className="feature-card">
              <GraduationCap className="feature-icon" />
              <h3>امتحانات وواجبات تفاعلية</h3>
              <p>
                اختبر معلوماتك في مادة التاريخ والجغرافيا مع امتحانات دورية
                وواجبات تحاكي أسلوب الاختبارات الفعلية.
              </p>
            </div>
            <div className="feature-card">
              <BookOpen className="feature-icon" />
              <h3>فيديوهات تعليمية</h3>
              <p>
                شاهد دروس فيديو توضيحية تشرح المفاهيم الرئيسية وتبسط مادة
                التاريخ والجغرافيا بطريقة سهلة وممتعة.
              </p>
            </div>
            <div className="feature-card">
              <Award className="feature-icon" />
              <h3>ملفات PDF شاملة</h3>
              <p>
                احصل على ملفات PDF مفصلة تحتوي على ملخصات ومواد دراسية تساعدك
                على مراجعة الدروس بعمق.
              </p>
            </div>
            <div className="feature-card">
              <Users className="feature-icon" />
              <h3>سهولة الاستخدام</h3>
              <p>
                استخدم منصة التوكل للتعلم من خلال واجهة مستخدم سهلة، وتحقيق
                نجاحك في مادة التاريخ والجغرافيا بكل سهولة.
              </p>
            </div>
            <div className="feature-card">
              <MessagesSquare className="feature-icon" />
              <h3>سهولة التواصل</h3>
              <p>
                تواصل مع المنصة بشكل مباشر في أي وقت تريد، واستفد من الشروحات
                المخصصة لاستفساراتك.
              </p>
            </div>
          </div>
        </section>
      </LazyLoad>

      {/* قسم المواد */}
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
        <section className="subjects" data-aos="fade-up">
          <div className="subjects-container" data-aos="fade-up">
            <h2 data-aos="fade-up">المواد الدراسية </h2>
            <div className="subject-cards">
              <button
                onClick={() => navigate("/history")}
                className="subject-card"
              >
                <h3>التاريخ</h3>
                <img
                  className="logoo"
                  src={require("./../images/historySub.png")}
                  alt="مادة التاريخ"
                />
                <p>
                  معلومات الاشتراك والدفع لتستطيع ان تتمتع بالمتحتوي الخاص بنا
                </p>
              </button>
              <button onClick={() => navigate("/geo")} className="subject-card">
                <h3>الجغرافيا</h3>
                <img
                  className="logoo"
                  src={require("./../images/geoSub.png")}
                  alt="مادة الجغرافيا"
                />
                <p>
                  معلومات الاشتراك والدفع لتستطيع ان تتمتع بالمتحتوي الخاص بنا
                </p>
              </button>
            </div>
          </div>
        </section>
      </LazyLoad>

      {/* قسم الاسالة */}
      <LazyLoad height={200} offset={100} once placeholder={<Loader />}>
        <FAQSection />
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

export default LandingPage;
