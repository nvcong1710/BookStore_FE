import LoginPage from "../pages/LoginPage/LoginPage";
import HomePage from "../pages/HomePage/HomePage";
import BooksByCategoryPage from "../pages/BooksByCategory/BooksByCategory";
import Register from "../pages/Register";
import { Breadcrumb, CategoryBreadcrumb } from "../component/Breadcrumb";
import ProductPage from "../pages/Product";
import AuthorsPage from "../pages/Authors";
import DetailAuthorPage from "../pages/DetailAuthor";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import Order from "../pages/Order";
import DetailOrder from "../pages/DetailOrder";
import AllBooks from "../pages/AllBooks/AllBooks";

const publicRoutes = [
  {
    path: "/",
    component: HomePage,
    props: {
      heading: "Trang chủ",
    },
  },
  {
    path: "/home",
    component: HomePage,
    props: {
      heading: "Trang chủ",
    },
  },
  {
    path: "/tat-ca-sach",
    component: AllBooks,
  },
  {
    path: "/register",
    component: Register,
  },
  {
    path: "/login",
    component: LoginPage,
  },
  {
    path: "/tac-gia",
    component: AuthorsPage,
    breadcrumb: Breadcrumb,
    props: {
      heading: "Tác giả",
    },
  },
  {
    path: "/lien-he",
    component: LoginPage,
    breadcrumb: Breadcrumb,
    props: {
      heading: "Liên hệ",
    },
  },
  {
    path: "/gio-hang",
    component: Cart,
  },
  {
    path: "/don-hang",
    component: Order,
  },
  {
    path: "/don-hang/:orderId",
    component: DetailOrder,
  },
  {
    path: "/thanh-toan",
    component: Checkout,
  },
  {
    path: "/the-loai",
    component: LoginPage,
  },
  {
    path: "/:category",
    component: BooksByCategoryPage,
    breadcrumb: CategoryBreadcrumb,
  },
  {
    path: "/sach/:productId",
    component: ProductPage,
  },
  {
    path: "/tac-gia/:authorId",
    component: DetailAuthorPage,
  },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
