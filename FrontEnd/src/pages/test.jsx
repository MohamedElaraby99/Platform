// const handleViewStudents = async (examId) => {
//   setLoadingStudents(true);
//   try {
//     const accessToken = localStorage.getItem("accessToken");
//     const response = await axios.get(
//       `${process.env.REACT_APP_BASE_URL}/exams/${examId}/students`,
//       {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         },
//       }
//     );
//     setSelectedExamStudents(response.data);
//   } catch (error) {
//     console.error("حدث خطأ أثناء جلب بيانات الطلاب:", error);
//     toast.error("تعذر جلب بيانات الطلاب. حاول مرة أخرى.");
//   } finally {
//     setLoadingStudents(false);
//   }
// };


// onClick={() => handleViewStudents(exam.id)}