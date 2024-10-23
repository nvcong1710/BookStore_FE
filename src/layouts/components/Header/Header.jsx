import React, { useState, useEffect, useContext } from "react";
import BookCategory from "../BookCategory";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import Axios from "axios";
// import Breadcrumb from "../../../component/Breadcrumb";
import { UserContext } from "../../../context/UserContext";
import { Link } from "react-router-dom";
function Header() {
  const { user, logout } = useContext(UserContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showBookCategory, setShowBookCategory] = useState(false);
  const [showMobileCategory, setShowMobileCategory] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:8080/api/danhmuc/getalldanhmuc", {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })
      .then((res) => {
        setCategories(res.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  return (
    <div>
      <div
        className={`relative z-40 lg:hidden ${isMobileMenuOpen ? "" : "hidden"
          }`}
        role="dialog"
        aria-modal="true"
      >
        <div className={`fixed inset-0 bg-black bg-opacity-25`}></div>

        <div className="fixed inset-0 z-40 flex">
          <div
            className={`relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl ${isMobileMenuOpen
              ? "transition ease-in-out duration-300 transform translate-x-0"
              : "-translate-x-full"
              }`}
            onClick={(e) => e.target === e.currentTarget && toggleMobileMenu()}
          >
            <div className="flex px-4 pt-5 pb-2">
              <button
                type="button"
                className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-slate-400"
                onClick={toggleMobileMenu}
              >
                <svg
                  aria-hidden="true"
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="space-y-6 px-4 pt-10 pb-6">
              <div className="grid grid-cols-1 items-start gap-y-6 gap-x-6">
                <div className="flow-root">
                  <Link
                    to="/"
                    className="-m-2 block p-2 font-medium text-slate-900 hover:bg-slate-100 rounded-md"
                  >
                    Trang chủ
                  </Link>
                </div>
                <div>
                  <button
                    className="-m-2 w-full text-left block p-2 font-medium text-slate-900 hover:bg-slate-100 rounded-md"
                    onClick={() => setShowMobileCategory(!showMobileCategory)}
                  >
                    Danh mục
                  </button>
                  {showMobileCategory && (
                    <ul
                      role="list"
                      aria-labelledby="mobile-collection-heading"
                      className="ml-3 mt-3"
                    >
                      {categories.map((category, index) => (
                        <li key={index}>
                          <Link
                            to={category.id}
                            className="block p-3 hover:bg-slate-100 rounded-md"
                          >
                            {category.tenDanhMuc}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <div className="flow-root">
                  <Link
                    to="/tac-gia"
                    className="-m-2 block p-2 font-medium text-slate-900 hover:bg-slate-100 rounded-md"
                  >
                    Tác giả
                  </Link>
                </div>
                <div className="flow-root">
                  <Link
                    to="/lien-he"
                    className="-m-2 block p-2 font-medium text-slate-900 hover:bg-slate-100 rounded-md"
                  >
                    Liên hệ
                  </Link>
                </div>
              </div>
            </div>

            <div className="space-y-6 border-t border-slate-200 py-6 px-4">
              <div className="flow-root">
                <Link
                  to="/login"
                  className="-m-2 block p-2 font-medium text-slate-900 hover:bg-slate-100 rounded-md"
                >
                  Đăng nhập
                </Link>
              </div>
              <div className="flow-root">
                <Link
                  to="/register"
                  className="-m-2 block p-2 font-medium text-slate-900 hover:bg-slate-100 rounded-md"
                >
                  Tạo tài khoản
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <header>
        <div className="border-b border-slate-200">
          <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex flex-1 lg:hidden">
                <button
                  type="button"
                  className="bg-white -ml-2 p-2 text-slate-400"
                  onClick={() => {
                    // Handle mobile menu open
                    toggleMobileMenu();
                  }}
                >
                  <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10zm0 5.25a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75a.75.75 0 01-.75-.75z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
              <Link to="/">
                <img
                  src="/book-store1.png"
                  alt="Sách mới"
                  className="h-8 w-auto"
                  height="32"
                  width="32"
                />
              </Link>
              <div className="hidden lg:ml-8 lg:block lg:self-stretch">
                {/* <div> */}
                <div>{/* Dropdown menu component */}</div>
                <ul className="flex h-full justify-center space-x-8">
                  <li className="flex items-center">
                    <Link
                      to="/"
                      className="flex items-center text-sm font-medium text-slate-700 hover:text-slate-800"
                    >
                      Trang chủ
                    </Link>
                  </li>
                  <li
                    className="flex items-center"
                    onMouseLeave={() => setShowBookCategory(false)} // Handle mouse leaving to hide the category
                  >
                    <Link
                      // to="/"
                      onClick={() => { }}
                      className="flex items-center text-sm font-medium text-slate-700 hover:text-slate-800"
                      onMouseEnter={() => setShowBookCategory(true)} // Use a function to set the state
                    >
                      Danh mục
                      {showBookCategory ? (
                        <FontAwesomeIcon
                          icon={faChevronUp}
                          className="h-3 w-3 ml-1"
                        />
                      ) : (
                        <FontAwesomeIcon
                          icon={faChevronDown}
                          className="h-3 w-3 ml-1"
                        />
                      )}
                    </Link>
                    {showBookCategory && <BookCategory />}
                  </li>
                  <li className="flex items-center">
                    <Link
                      to="/tat-ca-sach"
                      className="flex items-center text-sm font-medium text-slate-700 hover:text-slate-800"
                    >
                      Tất cả sách
                    </Link>
                  </li>
                  <li className="flex items-center">
                    <Link
                      to="/tac-gia"
                      className="flex items-center text-sm font-medium text-slate-700 hover:text-slate-800"
                    >
                      Tác giả
                    </Link>
                  </li>
                  <li className="flex items-center">
                    <Link
                      to="/lien-he"
                      className="flex items-center text-sm font-medium text-slate-700 hover:text-slate-800"
                    >
                      Liên hệ
                    </Link>
                  </li>
                </ul>
                {/* </div> */}
              </div>
              <div className="flex flex-1 items-center justify-end lg:ml-auto">
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                  {!user.auth ? (
                    <>
                      <Link
                        to="/login"
                        className="text-sm font-medium text-slate-700 hover:text-slate-800"
                      >
                        Đăng nhập
                      </Link>
                      <span
                        className="h-6 w-px bg-slate-200"
                        aria-hidden="true"
                      ></span>
                      <Link
                        to="/register"
                        className="text-sm font-medium text-slate-700 hover:text-slate-800"
                      >
                        Tạo tài khoản
                      </Link>
                    </>
                  ) : (
                    <>
                      <div className="relative">
                        <button
                          onClick={() => setDropdownOpen(!dropdownOpen)}
                          className="text-sm font-medium text-slate-700 hover:text-slate-800 flex items-center gap-2"
                        >
                          <span>{user.userName}</span>
                          <svg
                            className="hidden fill-current sm:block"
                            width="12"
                            height="8"
                            viewBox="0 0 12 8"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M0.410765 0.910734C0.736202 0.585297 1.26384 0.585297 1.58928 0.910734L6.00002 5.32148L10.4108 0.910734C10.7362 0.585297 11.2638 0.585297 11.5893 0.910734C11.9147 1.23617 11.9147 1.76381 11.5893 2.08924L6.58928 7.08924C6.26384 7.41468 5.7362 7.41468 5.41077 7.08924L0.410765 2.08924C0.0853277 1.76381 0.0853277 1.23617 0.410765 0.910734Z"
                              fill=""
                            ></path>
                          </svg>
                        </button>

                        <div
                          onMouseLeave={() => setDropdownOpen(false)}
                          className={`absolute right-0 mt-2 w-36 flex flex-col rounded-sm border border-stroke bg-white shadow-sm ${dropdownOpen ? "block" : "hidden"
                            }`}
                        >
                          <Link
                            to="/don-hang"
                            className="px-4 py-2 text-sm font-medium text-slate-700 hover:text-blue-600"
                          >
                            Xem đơn hàng
                          </Link>
                          <button
                            className="px-4 py-2 text-sm font-medium text-slate-700 hover:text-blue-600"
                            onClick={logout}
                          >
                            Đăng xuất
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
                <div className="flex lg:ml-6">
                  <button
                    type="button"
                    className="p-2 text-slate-400 hover:text-slate-500"
                    onClick={() => {
                      // Handle search open
                    }}
                  >
                    <svg
                      className="h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                      />
                    </svg>
                  </button>
                </div>
                <div className="ml-4 flow-root lg:ml-6">
                  <Link
                    to="/gio-hang"
                    className="group -m-2 flex items-center p-2"
                  >
                    <svg
                      className="h-6 w-6 flex-shrink-0 text-slate-400 group-hover:text-slate-500"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                      />
                    </svg>
                    {/* <span className="ml-2 text-sm font-medium text-slate-700 group-hover:text-slate-800">
                      0
                    </span> */}
                  </Link>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </header>
    </div>
  );
}

export default Header;
