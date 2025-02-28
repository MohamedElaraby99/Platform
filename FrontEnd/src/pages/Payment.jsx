import React, { useState, useEffect } from "react";
import LazyLoad from "react-lazyload";
import { Moon, Sun, LogIn, Copy } from "lucide-react";
import Loader from "./Loader";
import "./../styles/landingPage.css";
import { useNavigate } from "react-router-dom";
import "./../styles/SignUpPage.css";
import "./../styles/payment.css";
import { FloatingWhatsApp } from "react-floating-whatsapp";
import "aos/dist/aos.css";
import AOS from "aos";
import we from "./../images/we.png";
import InstaPay from "./../images/InstaPay.png";
import Voda from "./../images/voda.png";
import Etisalat from "./../images/Etisalat.png";
import Orange from "./../images/Orange.png";

const Payment = () => {
  const [formData, setFormData] = useState({
    paymentMethod: "",
    paymentScreenshot: null,
  });

  const [error, setError] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const paymentMethods = [
    { name: "إنستا باي (InstaPay)", image: InstaPay },
    { name: "فودافون كاش (Vodafone Cash)", image: Voda },
    { name: "اتصالات كاش (Etisalat Cash)", image: Etisalat },
    { name: "أورانج كاش (Orange Cash)", image: Orange },
    { name: "وي باي (wePay)", image: we },
  ];

  const paymentNumbers = {
    "إنستا باي (InstaPay)": "01234567890",
    "فودافون كاش (Vodafone Cash)": "01012345678",
    "اتصالات كاش (Etisalat Cash)": "01123456789",
    "أورانج كاش (Orange Cash)": "01298765432",
    "وي باي (wePay)": "01555555555",
  };

  const navigate = useNavigate();
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme || "light";
  });

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
    AOS.init({ duration: 1000, once: true });
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSelect = (method) => {
    setFormData({ ...formData, paymentMethod: method });
    setIsOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.paymentMethod) {
      setError("يرجى اختيار طريقة دفع");
      return;
    }

    if (!formData.paymentScreenshot) {
      setError("يرجى رفع سكرين شوت للتحويل");
      return;
    }

    setError("");
    console.log("Payment Data Submitted:", formData);
  };

   const copyNumber = (number) => {
     navigator.clipboard.writeText(number);
     alert("تم نسخ الرقم: " + number);
   };

  return (
    <div dir="rtl">
      <LazyLoad height={100} offset={100} once placeholder={<Loader />}>
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

      <LazyLoad height={100} offset={100} once>
        <div className="payment-container">
          <div className="payment-content">
            <h1 className="payment-title">الدفع</h1>
            <form className="payment-form" onSubmit={handleSubmit}>
              <div className="custom-select" onClick={() => setIsOpen(!isOpen)}>
                <div className="selected-option">
                  {formData.paymentMethod ? (
                    <>
                      <img
                        src={
                          paymentMethods.find(
                            (method) => method.name === formData.paymentMethod
                          ).image
                        }
                        alt={formData.paymentMethod}
                      />
                      <span>{formData.paymentMethod}</span>
                    </>
                  ) : (
                    <span>اختر طريقة الدفع</span>
                  )}
                </div>
                {isOpen && (
                  <div className="options">
                    {paymentMethods.map((method) => (
                      <div
                        key={method.name}
                        className="option"
                        onClick={() => handleSelect(method.name)}
                      >
                        <img
                          className="option-image"
                          src={method.image}
                          alt={method.name}
                        />
                        <span>{method.name}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {formData.paymentMethod && (
                <div className="payment-instructions">
                  <p>
                    قم بالتحويل على الرقم :
                    <strong className="payment-number">
                      {paymentNumbers[formData.paymentMethod]}{" "}
                      <span
                        className="copy-number"
                        onClick={() =>
                          copyNumber(paymentNumbers[formData.paymentMethod])
                        }
                      >
                      
                        <Copy size={20} />
                      </span>
                    </strong>
                  </p>
                  <p>
                    ثم ارسل لقطة الشاشة (سكرين شوت) للتحويل هنا، وفي خلال 24
                    ساعة سيرسل لك المستر على الواتساب بأن تم تفعيل حسابك ويتحدث
                    معك مباشرة.
                  </p>
                  <label className="payment-screenshot">
                    ارسل لقطة الشاشة للتحويل الخاص بك :
                    <input
                      className="payment-screenshot-input"
                      type="file"
                      name="paymentScreenshot"
                      onChange={handleChange}
                      accept="image/*"
                      required
                    />
                  </label>
                </div>
              )}

              {error && <p className="error-message">{error}</p>}
              <button type="submit">تأكيد الدفع</button>
            </form>
          </div>
        </div>
      </LazyLoad>

      <LazyLoad height={200} offset={100} once placeholder={<Loader />}>
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
              محفوظة
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

export default Payment;
