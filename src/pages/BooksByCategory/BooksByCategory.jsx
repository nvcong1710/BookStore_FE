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
    <div className="bg-white py-8">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
        <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4">
          {/* Bộ lọc sản phẩm */}
          <div className="col-span-4 md:col-span-2 lg:col-span-1">
            <div className="rounded-lg pb-2 bg-gray-200 bg-opacity-50">
              <h3 className="text-md text-gray-500 font-semibold mb-2 p-3 border-b">
                Lọc sản phẩm
              </h3>
              <h3 className="text-md font-semibold mb-2 pl-3">Giá</h3>
              <div className="px-3">
                <div className="text-slate-900 text-sm font-medium mb-2">
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
                <button
                  onClick={locSanPham}
                  className="mt-3 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Lọc
                </button>
              </div>
            </div>
          </div>

          {/* Danh sách sách */}
          <div className="col-span-4">
            {loading ? (
              <p>Loading...</p>
            ) : books.length === 0 ? (
              <p>No books found.</p>
            ) : (
              <>
                <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-2">
                  {books.map((book) => (
                    <div
                      key={book.id}
                      className="p-2 border bg-white shadow-sm transition-transform transform hover:scale-105 hover:shadow-md"
                    >
                      {/* Ảnh sách */}
                      <a href={`/sach/${book.id}`} className="block mb-2">
                        <img
                          src={
                            book.photoURL
                              ? book.photoURL.includes("/")
                                ? book.photoURL
                                : `http://localhost:8080/sach_image/${book.photoURL}`
                              : "https://bookstoreromanceday.org/wp-content/uploads/2020/08/book-cover-placeholder.png"
                          }
                          alt={book.tieuDe}
                          className="w-full h-48 object-cover rounded"
                        />
                      </a>

                      {/* Thông tin sách */}
                      <div>
                        <a
                          href={`/sach/${book.id}`}
                          className="block text-sm font-semibold mb-1 line-clamp-2"
                        >
                          {book.tieuDe}
                        </a>
                        <span className="text-blue-500 font-bold text-sm">
                          <ProductPrice price={book.gia} />
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Phân trang */}
                <div className="flex justify-center mt-6">
                  {totalpage > 1 && (
                    <ReactPaginate
                      nextLabel=">"
                      onPageChange={handlePageClick}
                      pageRangeDisplayed={3}
                      marginPagesDisplayed={2}
                      pageCount={totalpage}
                      previousLabel="<"
                      containerClassName="pagination flex space-x-2"
                      pageLinkClassName="px-2 py-1 border rounded hover:bg-gray-100"
                      activeClassName="text-blue-500 font-bold"
                      previousLinkClassName="px-2 py-1 border rounded hover:bg-gray-100"
                      nextLinkClassName="px-2 py-1 border rounded hover:bg-gray-100"
                      breakLinkClassName="px-2 py-1"
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
