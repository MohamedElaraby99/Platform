import React, { useState } from "react";
import "./../styles/AllUsers.css";

const AllUsers = () => {
  const [users, setUsers] = useState([
    { id: 1, name: "أحمد محمد", grade: "الصف الأول الثانوي" },
    { id: 2, name: "منى علي", grade: "الصف الثاني الثانوي" },
    { id: 3, name: "سارة حسن", grade: "الصف الثالث الثانوي" },
    // يمكنك إضافة المزيد من المستخدمين
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleDelete = (id) => {
    const updatedUsers = users.filter((user) => user.id !== id);
    setUsers(updatedUsers);
  };

  const filteredUsers = users.filter(
    (user) => user.name.includes(searchTerm) || user.grade.includes(searchTerm)
  );

  return (
    <div className="all-users-container">
      <h2>إدارة المستخدمين</h2>
      <div className="search-container">
        <input
          type="text"
          placeholder="ابحث بالاسم أو المرحلة الدراسية"
          value={searchTerm}
          onChange={handleSearch}
          className="search-input"
        />
      </div>
      <div className="users-table">
        <table>
          <thead>
            <tr>
              <th>اسم المستخدم</th>
              <th>المرحلة الدراسية</th>
              <th>الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.grade}</td>
                <td>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="delete-button"
                  >
                    حذف
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
