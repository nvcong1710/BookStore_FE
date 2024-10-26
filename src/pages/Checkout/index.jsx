import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import axios from "axios";

const Checkout = () => {
  const { user } = useContext(UserContext);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/cart/getgiohang/${user.id}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        }
      })
      .then((res) => {
        if (res.data.length === 0) {
          alert("Giỏ hàng trống");
          window.location.href = "/";
        }
        setCartItems(res.data);
        let total_price = 0;
        for (const product of res.data) {
          total_price += product.sach.gia * product.soLuong;
        }
        setTotalPrice(total_price);
      })
      .catch((error) => {
        console.log("Error fetching data", error);
      });
  }, []);

  const [formData, setFormData] = useState({
    email: "",
    name: "",
    phone: "",
    address: "",
    city: "",
    district: "",
    ward: "",
    notes: "",
    total_price: 0,
    orderItems: [],
  });

  useEffect(() => {
    setFormData({
      ...formData,
      email: user.email,
      name: "",
      phone: "",
      orderItems: cartItems,
    });

    axios
      .get(
        "https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json"
      )
      .then((response) => {
        setCities(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the cities!", error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "city") {
      const selectedCity = cities.find((city) => city.Id === value);
      setDistricts(selectedCity ? selectedCity.Districts : []);
      setWards([]);
      setFormData({ ...formData, city: value, district: "", ward: "" });
    }

    if (name === "district") {
      const selectedDistrict = districts.find(
        (district) => district.Id === value
      );
      setWards(selectedDistrict ? selectedDistrict.Wards : []);
      setFormData({ ...formData, district: value, ward: "" });
    }

    if (name === "ward") {
      setFormData({ ...formData, ward: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const selectedCity = cities.find((city) => city.Id === formData.city)?.Name || "";
    const selectedDistrict = districts.find((district) => district.Id === formData.district)?.Name || "";
    const selectedWard = wards.find((ward) => ward.Id === formData.ward)?.Name || "";
    const fullAddress = `${formData.address}, ${selectedWard}, ${selectedDistrict}, ${selectedCity}`;

    const orderData = {
      taiKhoanId: user.id,
      diaChi: fullAddress,
      tenNguoiNhan: formData.name,
      soDienThoai: formData.phone,
    };

    try {
      axios
        .post("http://localhost:8080/api/donhang/createdonhang", orderData, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`
          }
        })
        .then((response) => {
          console.log("Đặt hàng thành công:", response.data);
          alert("Đặt hàng thành công");
          window.location.href = "/";
        })
    } catch (error) {
      console.error("Có lỗi xảy ra trong quá trình đặt hàng: ", error);
    }
  }

  return (
    <main className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 sm:pt-14 sm:pb-64 lg:max-w-7xl lg:px-8">
      <h1 className="text-center text-3xl font-bold tracking-tight text-slate-900">
        Đặt hàng
      </h1>

      <form
        onSubmit={handleSubmit}
        className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16 mt-8"
      >
        <div>
          <div className="mb-10 border-b border-slate-200">
            <h2 className="text-lg font-medium text-slate-900">
              Thông tin giao hàng
            </h2>
            <div className="mt-4">
              <label
                className="block text-sm font-medium text-slate-700"
                htmlFor="contact-email"
              >
                Email
              </label>
              <div className="mt-1">
                <input
                  required
                  className="p-2 block w-full appearance-none rounded-md border border-slate-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:opacity-50"
                  type="email"
                  id="contact-email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled
                  placeholder="VD: abc123@gmail.com"
                />
              </div>
            </div>
          </div>

          <div>
            <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-3 sm:gap-x-4">
              <div className="sm:col-span-3">
                <label
                  className="block text-sm font-medium text-slate-700"
                  htmlFor="shipping-name"
                >
                  Họ tên
                </label>
                <div className="mt-1">
                  <input
                    required
                    className="p-2 block w-full appearance-none rounded-md border border-slate-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:opacity-50"
                    type="text"
                    id="shipping-name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="VD: Nguyễn Văn A"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  className="block text-sm font-medium text-slate-700"
                  htmlFor="shipping-phone"
                >
                  Số điện thoại
                </label>
                <div className="mt-1">
                  <input
                    required
                    className="p-2 block w-full appearance-none rounded-md border border-slate-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:opacity-50"
                    type="tel"
                    pattern="[0-0]{1}[0-9]{3}[0-9]{3}[0-9]{3}"
                    name="phone"
                    id="shipping-phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="VD: 0XXX-XXX-XXX"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  className="block text-sm font-medium text-slate-700"
                  htmlFor="shipping-address"
                >
                  Địa chỉ
                </label>
                <div className="mt-1">
                  <input
                    required
                    className="p-2 block w-full appearance-none rounded-md border border-slate-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:opacity-50"
                    type="text"
                    name="address"
                    id="shipping-address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="VD: Số 549/89/21 đường Xô Viết Nghệ Tĩnh"
                  />
                </div>
              </div>

              <div>
                <label
                  className="block text-sm font-medium text-slate-700"
                  htmlFor="shipping-city"
                >
                  Tỉnh thành
                </label>
                <div className="mt-1">
                  <select
                    required
                    className="p-2 block w-full rounded-md border-slate-300 shadow-sm focus:border-sky-500 focus:ring-sky-500"
                    id="shipping-city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                  >
                    <option value="" className="">
                      Chọn tỉnh thành
                    </option>

                    {cities.map((city) => (
                      <option key={city.Id} value={city.Id}>
                        {city.Name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label
                  className="block text-sm font-medium text-slate-700"
                  htmlFor="shipping-district"
                >
                  Quận huyện
                </label>
                <div className="mt-1">
                  <select
                    required
                    className="p-2 block w-full rounded-md border-slate-300 shadow-sm focus:border-sky-500 focus:ring-sky-500"
                    id="shipping-district"
                    name="district"
                    value={formData.district}
                    onChange={handleChange}
                  >
                    <option value="" className="">
                      Chọn quận huyện
                    </option>
                    {districts.map((district) => (
                      <option key={district.Id} value={district.Id}>
                        {district.Name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label
                  className="block text-sm font-medium text-slate-700"
                  htmlFor="shipping-ward"
                >
                  Phường xã
                </label>
                <div className="mt-1">
                  <select
                    required
                    className="p-2 block w-full rounded-md border-slate-300 shadow-sm focus:border-sky-500 focus:ring-sky-500"
                    id="shipping-ward"
                    name="ward"
                    value={formData.ward}
                    onChange={handleChange}
                  >
                    <option value="" className="">
                      Chọn phường xã
                    </option>{" "}
                    {wards.map((ward) => (
                      <option key={ward.Id} value={ward.Id}>
                        {ward.Name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  className="block text-sm font-medium text-slate-700"
                  htmlFor="notes"
                >
                  Ghi chú
                </label>
                <div className="mt-1">
                  <textarea
                    rows="4"
                    className="p-2 block w-full rounded-md border border-slate-300 shadow-sm focus:border-sky-500 focus:ring-sky-500"
                    name="notes"
                    id="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    placeholder="VD: Giao trong giờ hành chính"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 lg:mt-0">
          <h2 className="text-lg font-medium text-slate-900">
            Đơn hàng của bạn
          </h2>
          <div className="mt-4 rounded-lg border border-slate-200">
            <h3 className="sr-only">Items in your cart</h3>
            <ul role="list" className="divide-y divide-slate-200">
              {cartItems.map((product, index) => (
                <li key={index} className="flex px-4 py-6 sm:px-6">
                  <div className="flex-shrink-0">
                    <img
                      src={
                        product.sach.photoURL
                          ? product.sach.photoURL.includes("/")
                            ? product.sach.photoURL
                            : `http://localhost:8080/sach_image/${product.sach.photoURL}`
                          : "https://bookstoreromanceday.org/wp-content/uploads/2020/08/book-cover-placeholder.png"
                      }
                      alt={product.sach.tieuDe}
                      className="w-20 rounded-md"
                    />
                  </div>
                  <div className="ml-6 flex flex-1 flex-col">
                    <div className="flex">
                      <div className="min-w-0 flex-1">
                        <h4 className="text-sm">
                          <a href="#" className="font-medium text-slate-700">
                            {product.sach.tieuDe}
                          </a>
                        </h4>
                      </div>
                      <div className="ml-4 flex-shrink-0 flow-root">
                        <p className="text-sm font-medium text-slate-900">
                          {product.sach.gia.toLocaleString()} VND x{" "}
                          {product.soLuong}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-1 items-end justify-between pt-2">
                      <p className="mt-1 text-sm font-medium text-slate-900">
                        {(product.sach.gia * product.soLuong).toLocaleString()}{" "}
                        VND
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="border-t border-slate-200 px-4 py-6 sm:px-6">
              <div className="flex justify-between text-base font-medium text-slate-900">
                <p>Tổng đơn hàng</p>
                <p>{totalPrice.toLocaleString()} VND</p>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button type="submit" className="btn btn-primary btn-xl w-full">
              Đặt hàng
            </button>
          </div>
        </div>
      </form>
    </main>
  );
};

export default Checkout;
