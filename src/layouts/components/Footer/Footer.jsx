import React from "react";
const Footer = () => {
  return (
    <footer className="bg-stone-100 p-4 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between">
        {/* Thông tin cửa hàng */}
        <div>
          <div className="flex items-center mb-2">
            <img
              src="/book-store1.png"
              alt="Logo"
              style={{ width: "4rem", transform: "scaleX(-1)" }}
            />
            <h3 className="italic font-semibold text-sky-700 ml-2">
              Mỗi cuốn sách là một thế giới
            </h3>
          </div>
          <p>
            <i className="fa-solid fa-location-dot"></i> Khu phố 6, phường Linh Trung, thành phố Hồ Chí Minh
          </p>
          <p>
            <i className="fa-solid fa-envelope"></i> cong171002@gmail.com
          </p>
          <p>
            <i className="fa-solid fa-phone"></i> 111-222-333-4
          </p>
          <p>
            <i className="fa-solid fa-mobile"></i> 011-122-233-4
          </p>
        </div>

        {/* Điều hướng */}
        <div>
          <h3 className="font-medium">Điều hướng</h3>
          <a href="/" className="block">Trang chủ</a>
          <a href="/gio-hang" className="block">Giỏ hàng</a>
          <a href="/don-hang" className="block">Đơn hàng</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

