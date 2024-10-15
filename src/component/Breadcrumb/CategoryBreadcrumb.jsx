import Axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { useLocation, Link, useParams } from "react-router-dom";
import { UserContext } from "../../../../website_ban_sach_fe/src/context/UserContext";

const CategoryBreadcrumb = () => {
  const categoryId = useParams();
  const { user } = useContext(UserContext);
  const [breadcrumbs, setBreadCrumbs] = useState([]);
  useEffect(() => {
    Axios.get("http://localhost:8080/api/danhmuc/getalldanhmuc", {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })
      .then((res) => {
        setBreadCrumbs(res.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <nav aria-label="Breadcrumb" className=" border-b">
      <ol className="breadcrumb max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-10 flex items-center">
        <li className="breadcrumb-item">
          <Link to="/" className="text-gray-700">
            Trang chủ
          </Link>
        </li>
        {breadcrumbs.map((breadcrumb, index) =>
        (
          index + 1 == categoryId.category ? (<li key={index} className="breadcrumb-item">
            <span className="text-gray-500 mx-1"></span>
            <Link to={breadcrumb.id} className="text-gray-700">
              {breadcrumb.tenDanhMuc}
            </Link>
          </li>) : null
        ))}
      </ol>
    </nav>
  );
};

export default CategoryBreadcrumb;
