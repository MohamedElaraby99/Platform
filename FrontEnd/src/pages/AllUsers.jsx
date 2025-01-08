import React, { useState, useEffect } from "react";
import "./../styles/AllUsers.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const AllUsers = () => {
  const [users, setUsers] = useState([]); // جميع المستخدمين
  const [searchTerm, setSearchTerm] = useState(""); // مصطلح البحث
  const [loading, setLoading] = useState(true); // حالة التحميل
  const [error, setError] = useState(""); // حالة الخطأ
  const [selectedTable, setSelectedTable] = useState("students"); // الجدول المختار

  const [students, setStudents] = useState([
    {
      id: 1,
      name: "احمد محمد",
      username: "ahmed123",
      grade: "أولى ثانوي",
      password: "123456",
    },
    {
      id: 2,
      name: "منى علي",
      username: "mona456",
      grade: "ثانية ثانوي",
      password: "123456",
    },
    {
      id: 3,
      name: "سارة حسن",
      username: "sara789",
      grade: "ثالثة ثانوي",
      password: "123456",
    },
  ]);

  // State for managers
  const [managers, setManagers] = useState([
    {
      id: 1,
      name: "مستر محمود توكل",
      username: "admin123",
      password: "adminpass",
    },
    {
      id: 2,
      name: "ادمن منى",
      username: "admin456",
      password: "adminpass",
    },
  ]);

  useEffect(() => {
    const fetchUsers = async () => {
      const accessToken = localStorage.getItem("accessToken");
      try {
        const response = await axios.get("http://localhost:8000/users", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setUsers(response.data);
      } catch (err) {
        if (err.response && err.response.status === 403) {
          localStorage.removeItem("accessToken"); // إزالة التوكن غير الصالح
          setError("انتهت صلاحية الجلسة. يرجى تسجيل الدخول مرة أخرى.");
        } else {
          setError("حدث خطأ أثناء تحميل البيانات.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const [editingUser, setEditingUser] = useState(null);
  const [editData, setEditData] = useState({
    name: "",
    username: "",
    grade: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // const handleDelete = (id, type) => {
  //   const targetArray = type === "student" ? students : managers;
  //   const targetSetter = type === "student" ? setStudents : setManagers;

  //   const userToDelete = targetArray.find((user) => user.id === id);
  //   const confirmDelete = window.confirm(
  //     `هل أنت متأكد من حذف المستخدم "${userToDelete.name}"؟`
  //   );
  //   if (confirmDelete) {
  //     const updatedUsers = targetArray.filter((user) => user.id !== id);
  //     targetSetter(updatedUsers);
  //     toast.success(`تم حذف المستخدم "${userToDelete.name}" بنجاح!`);
  //   }
  // };

  // const handleEdit = (id, type) => {
  //   const targetArray = type === "student" ? students : managers;
  //   const userToEdit = targetArray.find((user) => user.id === id);
  //   setEditingUser({ id, type });
  //   setEditData({ ...userToEdit });
  // };

  // const handleEditChange = (e) => {
  //   const { name, value } = e.target;
  //   setEditData({
  //     ...editData,
  //     [name]: value,
  //   });
  // };

  // const handleEditSave = () => {
  //   if (!editData.name || !editData.username || !editData.password) {
  //     toast.error("يرجى ملء جميع الحقول قبل الحفظ!");
  //     return;
  //   }

  //   const targetArray = editingUser.type === "student" ? students : managers;
  //   const targetSetter =
  //     editingUser.type === "student" ? setStudents : setManagers;

  //   const updatedUsers = targetArray.map((user) =>
  //     user.id === editingUser.id ? { ...user, ...editData } : user
  //   );
  //   targetSetter(updatedUsers);
  //   setEditingUser(null);
  //   toast.success("تم تحديث بيانات المستخدم بنجاح!");
  // };

  // const handleEditCancel = () => {
  //   setEditingUser(null);
  //   toast.info("تم إلغاء التعديلات.");
  // };



  // تصفية المستخدمين حسب البحث
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // تصفية الطلاب
  const filteredStudents = filteredUsers.filter(
    (user) => user.role === "student"
  );
  console.log("Filtered Students:", filteredStudents); // عرض الطلاب المصفاة

  // تصفية المشرفين
  const filteredAdmins = filteredUsers.filter((user) => user.role === "admin");
  console.log("Filtered Admins:", filteredAdmins); // عرض المشرفين المصفاة

  if (loading) {
    console.log("Loading users...");
    return <p>جارٍ تحميل البيانات...</p>;
  }

  if (error) {
    console.log("Error encountered:", error);
    return <p className="error-message">{error}</p>;
  }

  return (
    <div className="all-users-container">
      <ToastContainer />
      <h2>إدارة المستخدمين</h2>
      <div className="search-container">
        <input
          type="text"
          placeholder="ابحث بالاسم أو اسم المستخدم"
          value={searchTerm}
          onChange={handleSearch}
          className="search-input"
        />
        <select
          className="table-selector"
          value={selectedTable}
          onChange={(e) => setSelectedTable(e.target.value)}
        >
          <option value="students">جدول الطلاب</option>
          <option value="managers">جدول المشرفين</option>
        </select>
      </div>

      {selectedTable === "students" && (
        <div className="users-table">
          <h3>جدول الطلاب</h3>
          <table>
            <thead>
              <tr>
                <th>الاسم</th>
                <th>اسم المستخدم</th>
                <th>السنة الدراسية</th>
                <th>كلمة المرور</th>
                <th>الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((user) => (
                <tr key={user.id}>
                  {editingUser?.id === user.id &&
                  editingUser?.type === "student" ? (
                    <>
                      <td>
                        <input
                          type="text"
                          name="name"
                          value={editData.name}
                          // onChange={handleEditChange}
                          className="edit-input"
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          name="username"
                          value={editData.username}
                          // onChange={handleEditChange}
                          className="edit-input"
                        />
                      </td>
                      <td>
                        <select
                          name="grade"
                          value={editData.grade}
                          // onChange={handleEditChange}
                          className="edit-select"
                        >
                          <option value="أولى ثانوي">أولى ثانوي</option>
                          <option value="ثانية ثانوي">ثانية ثانوي</option>
                          <option value="ثالثة ثانوي">ثالثة ثانوي</option>
                        </select>
                      </td>
                      <td>
                        <div className="password-container">
                          <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="كلمة المرور الجديدة"
                            value={editData.password}
                            // onChange={handleEditChange}
                            className="edit-input"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="toggle-password-button"
                          >
                            <FontAwesomeIcon
                              icon={showPassword ? faEyeSlash : faEye}
                            />
                          </button>
                        </div>
                      </td>
                      <td>
                        <button
                          // onClick={handleEditSave}
                          className="save-button"
                        >
                          حفظ
                        </button>
                        <button
                          // onClick={handleEditCancel}
                          className="cancel-button"
                        >
                          إلغاء
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td>{user.name}</td>
                      <td>{user.username}</td>
                      <td>{user.stage}</td>
                      <td>******</td>
                      <td className="actions-cell">
                        <button
                          // onClick={() => handleEdit(user.id, "student")}
                          className="edit-button"
                        >
                          تعديل
                        </button>
                        <button
                          // onClick={() => handleDelete(user.id, "student")}
                          className="delete-button"
                        >
                          حذف
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selectedTable === "managers" && (
        <div className="users-table">
          <h3>جدول المشرفين</h3>
          <table>
            <thead>
              <tr>
                <th>الاسم</th>
                <th>اسم المستخدم</th>
                <th>كلمة المرور</th>
                <th>الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {filteredAdmins.map((user) => (
                <tr key={user.id}>
                  {editingUser?.id === user.id &&
                  editingUser?.type === "manager" ? (
                    <>
                      <td>
                        <input
                          type="text"
                          name="name"
                          value={editData.name}
                          // onChange={handleEditChange}
                          className="edit-input"
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          name="username"
                          value={editData.username}
                          // onChange={handleEditChange}
                          className="edit-input"
                        />
                      </td>
                      <td>
                        <div className="password-container">
                          <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="كلمة المرور الجديدة"
                            value={editData.password}
                            // onChange={handleEditChange}
                            className="edit-input"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="toggle-password-button"
                          >
                            <FontAwesomeIcon
                              icon={showPassword ? faEyeSlash : faEye}
                            />
                          </button>
                        </div>
                      </td>
                      <td>
                        <button
                          // onClick={handleEditSave}
                          className="save-button"
                        >
                          حفظ
                        </button>
                        <button
                          // onClick={handleEditCancel}
                          className="cancel-button"
                        >
                          إلغاء
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td>{user.name}</td>
                      <td>{user.username}</td>
                      <td>******</td>
                      <td className="actions-cell">
                        <button
                          // onClick={() => handleEdit(user.id, "manager")}
                          className="edit-button"
                        >
                          تعديل
                        </button>
                        <button
                          // onClick={() => handleDelete(user.id, "manager")}
                          className="delete-button"
                        >
                          حذف
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AllUsers;
