import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import ProductPrice from "../../component/ProductPrice";
import "rc-slider/assets/index.css";
import Axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { UserContext } from "../../../src/context/UserContext";

const AllBooks = () => {
  const [books, setBooks] = useState([]);
  const [tooltipText, setTooltipText] = useState("");
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
        console.error("Error fetching books:", error);
        setBooks([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

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
        <div className="flex justify-between mb-6">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm kiếm sách theo tiêu đề"
            className="border rounded p-2 w-full md:w-1/2"
          />
          <button
            onClick={handleSearch}
            className="bg-blue-500 text-white p-2 rounded ml-2"
          >
            Tìm kiếm
          </button>
          <div></div>
        </div>
        <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
          <div className="col-span-4">
            {loading ? (
              <p>Loading...</p>
            ) : books.length === 0 ? (
              <p>No books found.</p>
            ) : (
              <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2">
                {books.map((book) => (
                  <div
                    key={book.id}
                    className="hover:-top-4 hover:-left-4 hover:p-8 hover:w-[calc(100%+32px)] hover:z-10 hover:-mb-[33px]  p-4 border border-collapse bg-white hover:shadow-md overflow-hidden relative"
                  >
                    <div className="group">
                      <a
                        href={`/sach/${book.id}`}
                        className="flex justify-center"
                      >
                        <img
                          src={
                            book.photoURL
                              ? book.photoURL.includes("/")
                                ? book.photoURL
                                : `http://localhost:8080/sach_image/${book.photoURL}`
                              : "https://bookstoreromanceday.org/wp-content/uploads/2020/08/book-cover-placeholder.png"
                          }
                          alt={book.tieuDe}
                          className="w-auto h-64 object-cover z-20"
                        />
                      </a>
                      <div className="absolute inset-0 items-center justify-center transition-opacity hidden group-hover:block duration-300">
                        <div className="absolute inset-0 flex flex-col items-end justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="flex flex-col pt-5">
                            <div
                              className="bg-white bg-opacity-50 rounded-full p-2 cursor-pointer"
                              title="Xem nhanh"
                              onMouseEnter={() => setTooltipText("Xem nhanh")}
                              onMouseLeave={() => setTooltipText("")}
                            >
                              <svg
                                className="w-6 h-6 text-slate-800 hover:text-blue-600"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                <circle cx="12" cy="12" r="3"></circle>
                              </svg>
                              {tooltipText === "Xem nhanh" && (
                                <div className="absolute right-4 translate-y-1 bg-gray-700 text-white px-2 py-1 rounded-md text-sm z-20">
                                  Xem nhanh
                                </div>
                              )}
                            </div>
                            <div
                              className="bg-white bg-opacity-50 rounded-full p-2 cursor-pointer"
                              title="Add to wishlist"
                              onMouseEnter={() =>
                                setTooltipText("Add to wishlist")
                              }
                              onMouseLeave={() => setTooltipText("")}
                            >
                              <svg
                                className="w-6 h-6 text-slate-800 hover:text-blue-600 hover:fill-current"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path d="M20.84 4.61a5.96 5.96 0 0 0-8.49 0L12 5.76l-.35-.15a5.96 5.96 0 0 0-8.49 8.49l8.49 8.49 8.49-8.49a5.96 5.96 0 0 0 0-8.49z"></path>
                              </svg>
                              {tooltipText === "Add to wishlist" && (
                                <div className="absolute right-4 translate-y-1 bg-gray-700 text-white px-2 py-1 rounded-md text-sm z-20">
                                  Add to wishlist
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="relative bg-white bg-opacity-50 rounded-full p-4 pb-8 cursor-pointer">
                            <svg
                              className="h-6 w-6 text-slate-800 hover:text-blue-600"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="2"
                              stroke="currentColor"
                              aria-hidden="true"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                              ></path>
                            </svg>
                          </div>
                        </div>
                      </div>
                      <div className="p-2">
                        <a
                          href={`/sach/${book.id}`}
                          className="flex text-lg font-semibold mb-2"
                        >
                          <p className="line-clamp-2 z-20">{book.tieuDe}</p>
                        </a>
                        <div className="flex items-center">
                          <span className="text-blue-500 font-bold">
                            <ProductPrice price={book.gia} />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllBooks;
