import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../../../src/context/UserContext";

import { useParams } from "react-router-dom";
// import { getBooksByCategory } from './api';
import ProductPrice from "../../component/ProductPrice";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import Axios from "axios";
import ReactPaginate from "react-paginate";
import "bootstrap/dist/css/bootstrap.min.css";

const MIN = 10000;
const MAX = 400000;

const BooksByCategoryPage = () => {
  const { category } = useParams();
  const [books, setBooks] = useState([]);
  const [price, setPrice] = useState([MIN, MAX]);
  const [tooltipText, setTooltipText] = useState("");
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalpage, setTotalpage] = useState(1);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchBooks = () => {
      const apiUrl =
        `http://localhost:8080/api/sach/getbydanhmucphantrang/` +
        category +
        "/" +
        page;

      Axios.get(apiUrl, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        }
      }).then((response) => {
        setBooks(response.data.listSach);
        setLoading(false);
        setTotalpage(response.data.tongSoTrang);
      });
    };
    fetchBooks();
  }, [category]);

  const handlePageClick = (event) => {
    setPage(+event.selected + 1);
    const apiUrl =
      `http://localhost:8080/api/sach/getbydanhmucphantrang/` +
      category +
      "/" +
      (+event.selected + 1);

    Axios.get(apiUrl, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    }).then((response) => {
      setBooks(response.data.listSach);
      setLoading(false);
      setTotalpage(response.data.tongSoTrang);
    });
  };

  const locSanPham = () => {
    const res = Axios.get(
      `http://localhost:8080/api/sach/loctheogia/${price.at(0)}-${price.at(
        1
      )}/${category}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    }
    )
      .then((res) => {
        setBooks(res.data);
      })
      .catch((error) => {
        console.log("Error fetching data", error);
      });
  };

  return (
    <div className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* <h2 className="text-3xl font-extrabold text-gray-900 mb-6">
          {category}
        </h2> */}
        <div className="grid  md:grid-cols-3 lg:grid-cols-5 gap-6">
          <div className="col-span-4 md:col-span-2 lg:col-span-1">
            <div className="rounded-lg pb-4 bg-gray-200 bg-opacity-50">
              <h3 className="text-lg text-gray-500 font-semibold mb-4 p-4 border-b">
                Lọc sản phẩm
              </h3>

              <h3 className="text-lg font-semibold mb-4 pl-4">Giá</h3>
              <div className="px-4">
                <div className="text-slate-900 text-md font-medium mb-2">
                  <ProductPrice price={price[0]} /> -{" "}
                  <ProductPrice price={price[1]} />
                </div>
                <Slider
                  range
                  min={MIN}
                  max={MAX}
                  value={price}
                  onChange={setPrice}
                />
                <button onClick={locSanPham}>Lọc</button>
              </div>
            </div>
          </div>
          <div className="col-span-4">
            {/* gap-6 */}
            {loading ? (
              <p>Loading...</p>
            ) : (
              <>
                <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2">
                  {books.map((book) => (
                    <div
                      key={book.id}
                      className="hover:-top-4 hover:-left-4 hover:p-8 hover:w-[calc(100%+32px)] hover:z-10 hover:-mb-[33px]  p-4 border border-collapse bg-white hover:shadow-md overflow-hidden relative "
                    >
                      {/* <div className="hover:p-16 hover:absolute hover:-top-8 hover:-left-8 hover:w-[128px]"> */}
                      {/* <div className="hover:p-4 hover:-top-4 hover:w-[100%+2rem]"> */}

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
                        <div className="absolute inset-0 items-center justify-center transition-opacity hidden group-hover:block duration-300 ">
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
                            {/* <span className="text-gray-500 line-through mr-2">
                            {book.discountPrice}đ
                          </span> */}
                            <span className="text-blue-500 font-bold">
                              <ProductPrice price={book.gia} />
                            </span>
                          </div>
                          {/* <span className="inline-block bg-blue-500 text-white rounded-full px-3 py-1 text-xs font-semibold">
                          {book.discount}%
                        </span> */}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>


                <div className="flex justify-center mt-8">
                  {totalpage > 1 && (
                    <ReactPaginate
                      nextLabel=">"
                      onPageChange={handlePageClick}
                      pageRangeDisplayed={3}
                      marginPagesDisplayed={2}
                      pageCount={totalpage}
                      previousLabel="<"
                      pageClassName="page-item"
                      pageLinkClassName="page-link"
                      previousClassName="page-item"
                      previousLinkClassName="page-link"
                      nextClassName="page-item"
                      nextLinkClassName="page-link"
                      breakLabel="..."
                      breakClassName="page-item"
                      breakLinkClassName="page-link"
                      containerClassName="pagination"
                      activeClassName="active"
                      renderOnZeroPageCount={null}
                    />
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BooksByCategoryPage;
