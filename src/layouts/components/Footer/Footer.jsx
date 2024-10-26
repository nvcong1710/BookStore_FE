import React from "react";

const Footer = () => {
  return (
    <footer className="bg-stone-100 pt-2 pb-4 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between">
        <div className="max-w-2xl w-full flex justify-between items-end">
          <div className="flex flex-col">
            <div className="flex items-end -mx-2 mb-2">
              <img src="/public/book-store1.png" alt="" className="w-16 transform -scale-x-100" />
              <h3 className="font-semibold italic pb-2 text-sky-700">Mỗi cuốn sách là một thế giới</h3>
            </div>
            <a>
              <i className="fa-solid fa-location-dot w-5"></i>&nbsp;Khu phố 6,
              phường Linh Trung, thành phố Hồ Chí Minh
            </a>
            <a>
              <i className="fa-solid fa-envelope w-5"></i>
              &nbsp;somebody@gmail.com
            </a>
            <a>
              <i className="fa-solid fa-phone w-5"></i>&nbsp;111-222-333-4
            </a>
            <a>
              <i className="fa-solid fa-mobile w-5"></i>&nbsp;011-122-233-4
            </a>
          </div>

          <div className="flex flex-col gap-1">
            <h3 className="font-medium">Điều hướng</h3>
            <div className="grid">
              <a href="/">Trang chủ</a>
              <a href="">Giỏ hàng</a>
              <a href="">Đơn hàng</a>
            </div>
          </div>
        </div>
        {/* </div> */}
      </div>
    </footer>
  );
};

export default Footer;
