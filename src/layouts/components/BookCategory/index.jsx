import Axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../../../../src/context/UserContext";

function BookCategory() {
  const [categories, setCategories] = useState([]);
  const user = useContext(UserContext);
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

  return (
    <div className="">
      <div className="hidden md:block absolute bg-white z-50 shadow-lg border rounded top-16 transform -translate-x-1/2">
        <ul className="">
          {categories.map((category, id) => (
            <li key={id} className="hover:bg-slate-200 cursor-pointer">
              <a
                href={"/" + category.id}
                className="block p-3"
                title={category.tenDanhMuc}
              >
                {category.tenDanhMuc}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default BookCategory;
