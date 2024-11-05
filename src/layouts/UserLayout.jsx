import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { Outlet } from "react-router-dom";

function UserLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      {/* {children} */}
      <Outlet />
      <Footer />
    </div>
  );
}

export default UserLayout;
