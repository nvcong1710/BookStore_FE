import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import ChatBot from "./components/ChatBot/ChatBot";
import { Outlet } from "react-router-dom";

function UserLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      {/* {children} */}
      <Outlet />
      <Footer />
      <ChatBot />
    </div>
  );
}

export default UserLayout;
