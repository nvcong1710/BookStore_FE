import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../../context/UserContext";

import { useParams } from "react-router-dom";
import { ProductSlider } from "../../component/Slider";
import axios from "axios";

const DetailBranchPage = () => {
  const { branchId } = useParams();
  const [branch, setBranch] = useState();
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState();
  const { user } = useContext(UserContext);
  useEffect(() => {
    const fetchBranchs = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/tacgia/getTacGia/${branchId}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`
          }
        }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch branchs");
        }
        const data = await response.json();
        setBranch(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching branchs:", error);
      }
    };

    fetchBranchs();
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/sach/getsachbytacgia/${branchId}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        }
      })
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-4 mt-16">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div key={branch.id} className="flex flex-col items-center px-4">
          <div className="flex gap-8 lg:flex-row flex-col items-center">
            <div className="">
              <img
                // inline-block
                className="flex items-center h-64 w-64 lg:h-80 lg:w-80 rounded-full ring-2 ring-white object-cover"
                src={
                  branch.image
                    ? branch.image.includes("/")
                      ? branch.image
                      : `http://localhost:8080/tg_image/${branch.image}`
                    : "https://bizweb.dktcdn.net/100/363/455/articles/blank-author-33728236-0ca7-4f4e-a265-ddcd14036f53.jpg?v=1705287921247"
                }
                alt={branch.tenTacGia}
              />
            </div>
            <div className="flex-1">
              <h2 className="pb-4 mt-2 text-2xl font-medium text-gray-900">
                {branch.tenTacGia}
              </h2>
              <p className="text-xl">
                Là một trong những nhà báo nổi tiếng, ông đã viết ra rất nhiều
                những bài phóng sự nổi tiếng. Phóng sự đầu tay được ông viết ra
                năm 1933 mang tên Cạm bẫy người được đăng trên tờ Nhật Tân dưới
                bút danh Thiên Hư. Bài phóng sự này của ông đã gây ra một làn
                sóng dư luận đương thời. Năm 1934, với phóng sự mang nhan đề Kỹ
                nghệ lấy Tây được đăng trên báo Nhật Tân và một số những tác
                phẩm phóng sự khác đã làm lên tên tuổi của nhà văn.
              </p>
            </div>
          </div>
        </div>
      )}
      {products && (
        <div className="py-12 mt-16 px-4 sm:px-6 lg:py-16 lg:px-8">
          <h3 className="text-xl font-medium tracking-tight text-gray-900 sm:text-3xl mb-10">
            Sách cùng tác giả
          </h3>
          <ProductSlider products={products} />
        </div>
      )}
    </div>
  );
};

export default DetailBranchPage;
