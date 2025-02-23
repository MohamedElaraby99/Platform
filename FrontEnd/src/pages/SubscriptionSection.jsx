import React from "react";
import "./../styles/subscriptionSection.css";

const SubscriptionSection = () => {
  return (
    <section className="subscription" id="subscription">
      <div className="subscription-container">
        <h2>باقات الاشتراك</h2>
        <p>
          اختر الباقة المناسبة لمادتك (التاريخ أو الجغرافيا) والمستوى (أولى
          ثانوي، ثانية ثانوي، ثالثة ثانوي). يمكنك اختيار الدفع بالحصة أو بالشهر
          أو بالترم.
        </p>
        <div className="subscription-cards">
          {/* أولى ثانوي */}
          <div className="subscription-card">
            <h3>أولى ثانوي - التاريخ</h3>
            <ul>
              <li>بالحصه: 50 جنيه</li>
              <li>بالشهر: 400 جنيه</li>
              <li>بالترم: 1000 جنيه</li>
            </ul>
          </div>
          <div className="subscription-card">
            <h3>أولى ثانوي - الجغرافيا</h3>
            <ul>
              <li>بالحصه: 50 جنيه</li>
              <li>بالشهر: 400 جنيه</li>
              <li>بالترم: 1000 جنيه</li>
            </ul>
          </div>
          {/* ثانية ثانوي */}
          <div className="subscription-card">
            <h3>ثانية ثانوي - التاريخ</h3>
            <ul>
              <li>بالحصه: 60 جنيه</li>
              <li>بالشهر: 450 جنيه</li>
              <li>بالترم: 1100 جنيه</li>
            </ul>
          </div>
          <div className="subscription-card">
            <h3>ثانية ثانوي - الجغرافيا</h3>
            <ul>
              <li>بالحصه: 60 جنيه</li>
              <li>بالشهر: 450 جنيه</li>
              <li>بالترم: 1100 جنيه</li>
            </ul>
          </div>
          {/* ثالثة ثانوي */}
          <div className="subscription-card">
            <h3>ثالثة ثانوي - التاريخ</h3>
            <ul>
              <li>بالحصه: 70 جنيه</li>
              <li>بالشهر: 500 جنيه</li>
              <li>بالترم: 1200 جنيه</li>
            </ul>
          </div>
          <div className="subscription-card">
            <h3>ثالثة ثانوي - الجغرافيا</h3>
            <ul>
              <li>بالحصه: 70 جنيه</li>
              <li>بالشهر: 500 جنيه</li>
              <li>بالترم: 1200 جنيه</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SubscriptionSection;
