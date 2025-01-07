import React from "react";
import "./../styles/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <p className="footer-title">تواصل معنا</p>
          <p>
            <a
              href={`https://wa.me/${201120646425}`}
              target="_blank"
              rel="noopener noreferrer"
              className="whatsapp-link"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
                alt="WhatsApp"
                className="social-icon"
              />
              <span className="invisible-char">و</span>
              واتساب
            </a>
          </p>
          <p>اتصل بنا : 01023607948</p>
          <p>العنوان: سنتر التوكل اداب شارع بايرو، المنصورة، مصر</p>
        </div>
        <div className="footer-section">
          <p>تابعنا على</p>
          <div className="social-links">
            <a
              href="https://www.facebook.com/profile.php?id=100063763039756&mibextid=ZbWKwL"
              target="_blank"
              rel="noopener noreferrer"
              className="facebook-link"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
                alt="Facebook"
                className="social-icon"
              />
              <span className="invisible-char">ف</span>
              سنتر التوكل
            </a>
            <a
              href="https://www.youtube.com/channel/UCxyz123456789"
              target="_blank"
              rel="noopener noreferrer"
              className="youtube-link"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/4/42/YouTube_icon_%282013-2017%29.png"
                alt="YouTube"
                className="social-icon"
              />
              <span className="invisible-char">ف</span>
              قناة اليوتيوب
            </a>
            <a
              href="https://www.tiktok.com/@mahmoud.tawakol0?is_from_webapp=1&sender_device=pc"
              target="_blank"
              rel="noopener noreferrer"
              className="tiktok-link"
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/3046/3046127.png"
                alt="TikTok"
                className="social-icon"
              />
              <span className="invisible-char">ف</span>
              صفحة التيكتوك
            </a>
            <a
              href="https://www.facebook.com/mahmoud.tawkal.3?mibextid=ZbWKwL"
              target="_blank"
              rel="noopener noreferrer"
              className="facebook-link"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
                alt="Facebook"
                className="social-icon"
              />
              <span className="invisible-char">ف</span>
              مستر محمود توكل
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p className="copyright">
          منصة مستر محمود توكل - جميع الحقوق محفوظة &copy;
          {new Date().getFullYear()}
        </p>
        <a
          href="https://www.facebook.com/profile.php?id=100004214012271&mibextid=ZbWKwL"
          className="developer"
          target="_blank"
          rel="noopener noreferrer"
        >
          المطور
        </a>
      </div>
    </footer>
  );
};

export default Footer;
