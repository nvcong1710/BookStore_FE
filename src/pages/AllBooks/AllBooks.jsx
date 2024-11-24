import React, { useEffect, useState, useContext } from "react";
import ProductPrice from "../../component/ProductPrice";
import "rc-slider/assets/index.css";
import Axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { UserContext } from "../../../src/context/UserContext";

const AllBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchBooks = async () => {
      const apiUrl = "http://localhost:8080/api/sach/getallsach";
      try {
        const response = await Axios.get(apiUrl, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`
          }
        });
        setBooks(response.data || []);
      } catch (error) {
        setBooks([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [user.token]);

  const handleSearch = async () => {
    if (searchQuery.trim() !== "") {
      const searchUrl = `http://localhost:8080/api/sach/timsachtheotieude/${searchQuery}`;
      setLoading(true);
      try {
        const response = await Axios.get(searchUrl, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`
          }
        });
        setBooks(response.data || []);
      } catch (error) {
        console.error("Error searching books:", error);
        setBooks([]);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between gap-2 mb-6">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm kiếm sách theo tiêu đề"
            className="border rounded p-2 w-full md:w-1/2"
          />
          <button
            onClick={handleSearch}
            className="bg-blue-500 text-white p-2 rounded w-full md:w-[100px] md:ml-2"
          >
            Tìm kiếm
          </button>
        </div>
        <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          <div className="col-span-5">
            {loading ? (
              <p>Loading...</p>
            ) : books.length === 0 ? (
              <p>No books found.</p>
            ) : (
              <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-2 sm:gap-4">
                {books.map((book) => (
                  <div
                    key={book.id}
                    className="p-2 sm:p-4 lg:p-6 border bg-white shadow-sm relative overflow-hidden transition-transform transform hover:scale-105 hover:shadow-md"
                  >
                    {/* Ảnh sách */}
                    <a href={`/sach/${book.id}`} className="block mb-2 sm:mb-4 lg:mb-6">
                      <img
                        src={
                          book.photoURL
                            ? book.photoURL.includes("/")
                              ? book.photoURL
                              : `http://localhost:8080/sach_image/${book.photoURL}`
                            : "https://bookstoreromanceday.org/wp-content/uploads/2020/08/book-cover-placeholder.png"
                        }
                        alt={book.tieuDe}
                        className="w-full h-48 sm:h-64 lg:h-72 object-cover"
                      />
                    </a>

                    <div>
                      <a
                        href={`/sach/${book.id}`}
                        className="block text-sm sm:text-lg lg:text-xl font-semibold mb-1 sm:mb-2 lg:mb-4 line-clamp-2"
                      >
                        {book.tieuDe}
                      </a>
                      <div>
                        <span className="text-blue-500 font-bold text-sm sm:text-md lg:text-lg">
                          <ProductPrice price={book.gia} />
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        {/*  */}
      </div>
    </div>
  );
};

export default AllBooks;
