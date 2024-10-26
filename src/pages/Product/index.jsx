import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductPrice from "../../component/ProductPrice";
import { BookSlider } from "../../component/Slider";
import Breadcrumb from "../../component/Breadcrumb/Breadcrumb";
import { UserContext } from "../../context/UserContext";
import axios from "axios";
import FeedbackForm from "../../component/FeedbackForm";
import FeedbackList from "../../component/FeedbackForm/FeedbackList";

const ProductPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [activeTab, setActiveTab] = useState("description");
  const { user } = useContext(UserContext);
  const [quantity, setQuantity] = useState(1);
  const [randomBooks, setRandomBooks] = useState([[]]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const addToCart = async () => {
    if (!user || !user.id) {
      alert("Bạn hãy đăng nhập trước khi thêm sản phẩm vào giỏ hàng!");
      window.location.href = "/login";
      return;
    }
    const res = await axios.post("http://localhost:8080/api/cart/addtocart", {
      taiKhoanId: user.id,
      sachId: productId,
      soLuong: quantity
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    });
    if (res.status == 200) {
      alert("Thêm thành công sản phẩm vào giỏ hàng");
    } else {
      alert("có lỗi xảy ra");
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/sach/getsachbyid/${productId}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`
          }
        }
        );
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setProduct(data);
        } else {
          throw new Error("Failed to fetch product");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchProduct();
  }, [productId]);

  useEffect(() => {
    if (product) {
      document.title = `${product.tieuDe} - Sachmoi.vn`;
    }
  }, [product]);
  useEffect(() => {
    axios.get(`http://localhost:8080/api/sach/getallsach`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })
      .then((response) => {
        setRandomBooks(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Breadcrumb title={product.danhMuc.tenDanhMuc + "/" + product.tieuDe} />
      <div className="max-w-7xl mx-auto p-4 mt-4">
        <div className="relative lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
          <div className="h-[600px] flex justify-center">
            <img
              src={
                product.photoURL
                  ? product.photoURL.includes("/")
                    ? product.photoURL
                    : `http://localhost:8080/sach_image/${product.photoURL}`
                  : "https://bookstoreromanceday.org/wp-content/uploads/2020/08/book-cover-placeholder.png"
              }
              alt=""
              className="h-full"
            />
          </div>
          <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
              {product.tieuDe}
            </h1>
            <div className="mt-3 text-xl">
              Tác giả: &nbsp;
              <a href={`/tac-gia/${product.tacGiaDTO.id}`} className="font-medium text-slate-700">
                {product.tacGiaDTO.tenTacGia}
              </a>
            </div>
            <div className="mt-3">
              <div className="text-3xl font-semibold tracking-tight text-slate-900">
                <ProductPrice price={product.gia}></ProductPrice>
              </div>
            </div>
            <div className="flex items-center space-x-3 mt-8">
              <div>
                <input
                  className="border border-slate-300 rounded-md shadow-sm py-3 text-sm text-center sm:text-base show-spinners"
                  type="number"
                  id="productQuantity"
                  min="1"
                  max={`${product.soLuong}`}
                  value={quantity}
                  onChange={(event) => {
                    if (event.target.value < 1) {
                      setQuantity(1);
                    } else if (event.target.value > product.soLuong) {
                      setQuantity(product.soLuong);
                    } else {
                      setQuantity(event.target.value);
                    }
                  }}
                />
              </div>
              <div className="flex w-full">
                <button className="btn btn-primary btn-xl" onClick={addToCart}>
                  Thêm vào giỏ hàng
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-6">
              <button
                className={`${activeTab === "description"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                onClick={() => handleTabClick("description")}
              >
                Mô tả sản phẩm
              </button>
              <button
                className={`${activeTab === "reviews"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                onClick={() => handleTabClick("reviews")}
              >
                Đánh giá khách hàng
              </button>
            </nav>
          </div>
          {activeTab === "description" && (
            <div className="mt-6">
              <div className="bg-white overflow-hidden">
                <p className="text-gray-700 mb-4">{product.moTa}</p>
              </div>
            </div>
          )}
          {activeTab === "reviews" && (
            <div className="mt-6">
              <FeedbackList bookId={productId} />
              <FeedbackForm user={user} />
            </div>
          )}
        </div>
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-10">
            Có thể bạn thích
          </h2>
          <BookSlider books={randomBooks} />
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
