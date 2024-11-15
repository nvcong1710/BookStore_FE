import { useState, useEffect, useContext } from "react";
import axios from "axios";
import ProductPrice from "../../component/ProductPrice";
import { UserContext } from "../../context/UserContext";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/cart/getgiohang/${user.id}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        }
      })
      .then((res) => {
        setCartItems(res.data);
      })
      .catch((error) => {
        console.log("Error fetching data", error);
      });
  }, []);

  const handleQuantityChange = (id, e) => {
    const newQuantity = Number(e.target.value);

    const index = cartItems.findIndex((item) => item.id === id);
    if (index === -1) {
      console.error("Item not found in cart");
      return;
    }

    const updatedCartItems = [...cartItems];
    updatedCartItems[index].soLuong = newQuantity;

    axios
      .put(`http://localhost:8080/api/cart/update/${id}`, {
        taiKhoanId: updatedCartItems[index].taiKhoanId,
        sachId: updatedCartItems[index].sach.id,
        soLuong: newQuantity,
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        }
      })
      .then((res) => {
        console.log("Quantity updated successfully");
        setCartItems(updatedCartItems);
      })
      .catch((error) => {
        console.error("Error updating quantity:", error);
      });
  };

  const handleDelete = (id) => {
    console.log(id);
    axios
      .post(`http://localhost:8080/api/cart/delete/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        }
      })
      .then((res) => {
        axios
          .get(`http://localhost:8080/api/cart/getgiohang/${user.id}`, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${user.token}`
            }
          })
          .then((res) => {
            setCartItems(res.data);
          });
      })
      .catch((error) => {
        console.log("Error deleting item", error);
      });
  };
  return (
    <div className="">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:px-0">
        {!cartItems || cartItems.length === 0 ? (
          <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:px-0">
            <div className="mb-6 mx-auto text-center">
              <svg
                className="mx-auto h-24 w-24 text-slate-400"
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
                ></path>
              </svg>
              <h3 className="mt-2 text-lg font-medium text-slate-900">
                Hiện không có sản phẩm nào trong giỏ hàng
              </h3>
              <p className="mt-1 text-sm text-slate-500"></p>
              <div className="mt-6">
                <a
                  href="/"
                  className="btn btn-primary hover:opacity-80 !border-none"
                >
                  Tiếp tục mua sắm
                </a>
              </div>
            </div>
          </div>
        ) : (
          <>
            <h1 className="text-center text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Giỏ hàng của bạn
            </h1>
            <div className="mt-12">
              <section aria-labelledby="cart-heading">
                <ul
                  role="list"
                  className="divide-y divide-slate-200 border-b border-t border-slate-200"
                >
                  {cartItems.map((item) => (
                    <li key={item.id} className="flex py-6">
                      <div className="flex-shrink-0 rounded-md">
                        <img
                          alt="Apple iPhone 11"
                          className="h-24 w-24 rounded-md object-contain object-center sm:h-32 sm:w-32"
                          src={
                            item.sach.photoURL
                              ? item.sach.photoURL.includes("/")
                                ? item.sach.photoURL
                                : `http://localhost:8080/sach_image/${item.sach.photoURL}`
                              : "https://bookstoreromanceday.org/wp-content/uploads/2020/08/book-cover-placeholder.png"
                          }
                        />
                      </div>
                      <div className="ml-4 flex flex-1 flex-col sm:ml-6">
                        <div>
                          <div className="flex justify-between">
                            <h4 className="text-sm">
                              <a
                                href={`/sach/${item.sach.id}`}
                                className="font-medium text-slate-700 hover:text-slate-800"
                              >
                                {item.sach.tieuDe}
                              </a>
                            </h4>
                            <p className="ml-4 text-sm font-medium text-slate-900">
                              <ProductPrice price={item.sach.gia} />
                            </p>
                          </div>
                          <p className="mt-1 space-x-2 divide-x divide-slate-200 text-sm text-slate-500">
                            {item.sach.moTa}
                          </p>
                        </div>
                        <div className="mt-4 flex flex-1 items-end justify-between">
                          <div>
                            <input
                              className="appearance-none border border-slate-300 rounded-md shadow-sm checked:bg-sky-500 checked:text-sky-500 disabled:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed focus:border-sky-500 focus:ring-sky-500 w-16 no-spinners text-center sm:text-sm"
                              type="number"
                              name="quantity"
                              value={item.soLuong}
                              onChange={(e) => handleQuantityChange(item.id, e)}
                              id="quantity"
                              min="1"
                            />
                          </div>

                          <div className="ml-4">
                            <button
                              type="button"
                              className="btn btn-link"
                              onClick={() => handleDelete(item.id)}
                            >
                              <span className="text-sm text-red-500">Xoá</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </section>
              <section
                aria-labelledby="summary-heading"
                className="mt-10 flex flex-col items-end"
              >
                <div>
                  <dl className="space-y-4">
                    <div className="flex items-center justify-between">
                      <dt className="text-base font-medium text-slate-900">
                        Tổng cộng
                      </dt>
                      <dd className="ml-4 text-base font-medium text-slate-900">
                        {" "}
                        <ProductPrice
                          price={cartItems.reduce(
                            (total, item) =>
                              total + item.sach.gia * item.soLuong,
                            0
                          )}
                        />
                      </dd>
                    </div>
                  </dl>
                </div>
                <div className="mt-10">
                  <a
                    href="/thanh-toan"
                    className="btn btn-primary btn-xl w-full"
                  >
                    Thanh toán
                  </a>
                </div>
              </section>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Cart;
