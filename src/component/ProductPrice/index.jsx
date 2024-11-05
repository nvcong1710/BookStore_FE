import React from "react";

const formatCurrency = (price) => {
  // Xử lý giá ở đây, ví dụ: thêm dấu chấm phân cách hàng nghìn và đổi đơn vị tiền tệ thành VND
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
};

const ProductPrice = ({ price }) => {
  const formattedPrice = formatCurrency(price);

  return <span>{formattedPrice}</span>;
};

export default ProductPrice;
