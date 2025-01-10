const express = require("express");
const router = express.Router();

// بيانات تجريبية للامتحانات
const examsData = [
  {
    id: 1,
    name: "امتحان الرياضيات",
    subject: "رياضيات",
    startDate: "2025-01-10",
    endDate: "2025-01-20",
    sy: "اولي ثانوي",
    students: [
      { name: "أحمد علي", grade: 85 },
      { name: "محمود سعيد", grade: 90 },
      { name: "سارة عبد الله", grade: 78 },
    ],
  },
  {
    id: 2,
    name: "امتحان الفيزياء",
    subject: "فيزياء",
    startDate: "2025-02-01",
    endDate: "2025-02-10",
    sy: "ثاني ثانوي",
    students: [
      { name: "عمر خالد", grade: 88 },
      { name: "نادية محمد", grade: 92 },
      { name: "كريم حسام", grade: 80 },
    ],
  },
];

// استرجاع جميع الامتحانات
router.get("/", (req, res) => {
  res.status(200).json(examsData);
});

module.exports = router;
