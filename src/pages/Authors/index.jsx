import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../../../../website_ban_sach_fe/src/context/UserContext";



const AuthorsPage = () => {
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/api/tacgia/getalltacgia", {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`
          }
        }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch authors");
        }
        const data = await response.json();
        setAuthors(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching authors:", error);
      }
    };

    fetchAuthors();
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-4 mt-4">
      <h1 className="text-3xl font-bold mb-8 mt-4">Tác giả</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8">
          {/* {randomAuthors.map((author) => ( */}
          {authors.map((author) => (
            <div key={author.id} className="flex flex-col items-center px-4">
              <div className="flex flex-col items-center">
                <a href={`/tac-gia/${author.id}`}>
                  <img
                    className="flex items-center h-48 w-48 rounded-full ring-2 ring-white object-cover"
                    src={
                      author.image
                        ? author.image.includes("/")
                          ? author.image
                          : `http://localhost:8080/tg_image/${author.image}`
                        : "https://bizweb.dktcdn.net/100/363/455/articles/blank-author-33728236-0ca7-4f4e-a265-ddcd14036f53.jpg?v=1705287921247"
                    }
                    alt={author.tenTacGia}
                  />
                </a>
                <a href={`/tac-gia/${author.id}`}>
                  <h3 className="mt-2 text-base font-medium text-lg text-gray-900">
                    {author.tenTacGia}
                  </h3>
                </a>
              </div>
            </div>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AuthorsPage;
