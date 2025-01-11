useEffect(() => {
  const fetchPosts = async () => {
    try {
      const response = await axios.get("http://localhost:8000/announcements", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setPosts(response.data);
    } catch (error) {
      toast.error("حدث خطأ أثناء تحميل الإعلانات.");
    }
  };

  fetchPosts();
}, []);
