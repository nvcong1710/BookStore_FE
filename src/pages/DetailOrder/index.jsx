import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../../../../website_ban_sach_fe/src/context/UserContext";

import axios from "axios";
import { useParams } from "react-router-dom";

const DetailOrder = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState({});
  const [orderItems, setOrderItems] = useState([]);
  const user = useContext(UserContext);
  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        const [orderItemsResponse, orderResponse] = await Promise.all([
          axios.get(
            `http://localhost:8080/api/chitietdonhang/getall/${orderId}`, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${user.token}`
            }
          }
          ),
          axios.get(
            `http://localhost:8080/api/donhang/getthongtindonhang/${orderId}`, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${user.token}`
            }
          }
          ),
        ]);

        setOrderItems(orderItemsResponse.data);
        setOrder(orderResponse.data);
      } catch (error) {
        console.error("Error fetching order data:", error);
      }
    };

    fetchOrderData();
  }, [orderId]);

  if (!orderItems) {
    return <div>Loading...</div>;
  }

  // const total_price_vnd = new Intl.NumberFormat("vi-VN", {
  //   style: "currency",
  //   currency: "VND",
  // }).format();

  return (
    <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24 sm:pb-60 lg:px-8">
      <div className="max-w-3xl">
        <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Đơn hàng đã đặt
        </h1>
        <dl className="mt-12 grid flex-1 grid-cols-2 gap-6 text-sm sm:col-span-4 sm:grid-cols-4 lg:col-span-2">
          <div>
            <dt className="font-medium text-slate-900">
              Mã đơn hàng
            </dt>
            <dd className="mt-1 font-medium text-sky-600">{order.id}</dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="font-medium text-slate-900">
              Ngày đặt
            </dt>
            <dd className="mt-1 font-medium text-sky-600">
              {order.ngayDat}
            </dd>
          </div>
          <div>
            <dt className="font-medium text-slate-900">
              Trạng thái thanh toán
            </dt>
            <dd className="mt-1 font-medium text-sky-600">
              {order.daThanhToan ? "Đã thanh toán" : "Chưa thanh toán"}
            </dd>
          </div>
        </dl>
      </div>

      <div className="mt-10 border-t border-slate-200 ">
        <ul
          role="list"
          className="divide-y divide-slate-200 border-b border-slate-200 "
        >
          {orderItems.map((item) => (
            <li key={item.id} className="py-4 sm:py-6">
              <div className="flex items-center sm:items-stretch">
                <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border border-slate-200  sm:h-40 sm:w-40">
                  <img
                    alt={item.sach.tieuDe}
                    className="h-full w-full object-cover object-center"
                    src={
                      item.sach.photoURL
                        ? item.sach.photoURL.includes("/")
                          ? item.sach.photoURL
                          : `http://localhost:8080/sach_image/${item.sach.photoURL}`
                        : "https://bookstoreromanceday.org/wp-content/uploads/2020/08/book-cover-placeholder.png"
                    }
                  />
                </div>
                <div className="ml-6 flex flex-col flex-1 justify-between text-sm">
                  <div>
                    <div className="font-medium text-slate-900 text-lg sm:flex sm:justify-between gap-4 items-start">
                      <a>
                        {item.soLuong} x {item.sach.tieuDe}
                      </a>
                      <p>
                        {new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(item.sach.gia)}
                      </p>
                    </div>
                  </div>
                  <div>
                    <a href={`/sach/${item.sach.id}`} className="font-medium text-sky-600">Xem sản phẩm</a>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <div className="sm:ml-40 sm:pl-6">
          <dl className="grid grid-cols-1 gap-x-6 py-8 text-sm">
            <div>
              <dt className="font-medium text-slate-900">
                Thông tin giao hàng
              </dt>
              <dd className="mt-2 text-slate-700/80">
                <address className="not-italic">
                  {order.tenNguoiNhan}
                  <br />
                  {order.soDienThoai}
                  <br />
                  {order.diaChi}
                  <br />
                  {/* {orderDetails.order_notes} */}
                  <br />
                </address>
              </dd>
            </div>
          </dl>

          <dl className="grid grid-cols-1 gap-x-6 border-t border-slate-200  py-8 text-sm">
            <div>
              <dt className="font-medium text-slate-900">
                Phương thức thanh toán
              </dt>
              <dd className="mt-2 text-slate-700/80">
                <p>Thanh toán khi nhận hàng</p>
              </dd>
            </div>
          </dl>

          <dl className="space-y-6 border-t border-slate-200  pt-8 text-sm">
            <div className="flex justify-between">
              <dt className="font-medium text-slate-900">
                Giá trị đơn hàng
              </dt>
              <dd className="text-slate-700/80">
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(order.tongTien)}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="font-medium text-slate-900">
                Phí vận chuyển
              </dt>
              <dd className="text-slate-700/80">0</dd>
            </div>
            <div className="flex justify-between">
              <dt className="font-medium text-slate-900">
                Thuế
              </dt>
              <dd className="text-slate-700/80">0</dd>
            </div>
            <div className="flex justify-between">
              <dt className="font-medium text-slate-900">
                Tổng thanh toán
              </dt>
              <dd className="text-slate-900">
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(order.tongTien)}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </main>
  );
};

export default DetailOrder;
