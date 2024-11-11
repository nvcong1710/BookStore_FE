import React, { useState, useEffect, useContext } from "react";
// import DataTable from "../../components/DataTable";
import { UserContext } from "../../../../website_ban_sach_fe/src/context/UserContext";

function Order() {
  const { user } = useContext(UserContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function fetchOrders() {
      fetch(`http://localhost:8080/api/donhang/getalldonhang/${user.id}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        }
      }
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setOrders(data);
        });
    }
    fetchOrders();
  }, []);

  return (
    <div className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl sm:px-2 lg:px-8">
        <div className="mx-auto max-w-2xl space-y-8 sm:px-4 lg:max-w-4xl lg:px-0">
          <h1
            className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl"
            data-sider-select-id="f781e22a-b8c1-4ac4-9bf6-6b268629b620"
          >
            Đơn hàng đã đặt
          </h1>
          {orders.map((order) => (<div key={order.id} className="border-t border-b border-slate-200 bg-white shadow-sm sm:rounded-lg sm:border">
            <div
              className="flex items-center border-b border-slate-200 p-4 sm:grid sm:grid-cols-4 sm:gap-x-6 sm:p-6"
            >
              <dl className="grid flex-1 grid-cols-2 gap-x-6 text-sm sm:col-span-3 sm:grid-cols-4 lg:col-span-2">
                <div>
                  <dt className="font-medium text-slate-900">Mã hoá đơn</dt>
                  <dd className="mt-1 text-slate-500">{order.id}</dd>
                </div>
                <div className="hidden sm:block sm:col-span-2">
                  <dt className="font-medium text-slate-900">Ngày đặt</dt>
                  <dd className="mt-1 text-slate-500">
                    <time dateTime="2024-05-26">{order.ngayDat}</time>
                  </dd>
                </div>
                <div>
                  <dt className="font-medium text-slate-900">Tổng tiền</dt>
                  <dd className="mt-1 font-medium text-slate-900">
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(order.tongTien)}</dd>
                </div>
              </dl>

              <div className="relative flex justify-end lg:hidden">
                <div className="relative">

                  <div>
                    <div className="rounded-md ring-1 ring-slate-900/10 py-1 bg-white">
                      <a
                        className="block px-4 py-2 text-sm leading-5 text-slate-700 hover:bg-slate-100 focus:outline-none focus:bg-slate-100"
                        href={`/don-hang/${order.id}`}
                      >
                        Xem
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="hidden lg:col-span-2 lg:flex lg:items-center lg:justify-end lg:space-x-4">
                <a
                  href={`/don-hang/${order.id}`}
                  className="btn btn-outline-primary"
                >
                  <span>
                    Xem chi tiết
                  </span>
                </a>
              </div>
            </div>
          </div>))}
        </div>
      </div>
    </div>
  );
}

export default Order;
