import { useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../../context/UserContext";
import { Link } from "react-router-dom";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [message, setMessage] = useState("");

  const { login, user } = useContext(UserContext);

  if (user.auth) window.location.href = "/";

  const toggleShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (username && password) {
      console.log("Login with: ", username, password);
      try {
        const response = await axios.post(
          "http://localhost:8080/auth/login",
          {
            username: username,
            password: password,
          }
        );

        if (response.status === 200) {
          const user = response.data;
          login(user);
          setMessage("Đăng nhập thành công");
        } else {
          setMessage("Tên người dùng hoặc mật khẩu không hợp lệ");
        }
      } catch (error) {
        console.error("Error:", error);
        alert(error);
        setMessage("Có lỗi xảy ra trong quá trình đăng nhập");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 p-6 ">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Đăng nhập tài khoản
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm space-y-1">
            <div>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Tên người dùng"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <input
                id="password"
                name="password"
                type={isShowPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button className="hidden" type="button" onClick={toggleShowPassword}>
                {isShowPassword ? "Hide" : "Show"}{" "}
              </button>
            </div>
          </div>
          {message && <p>{message}</p>}
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Đăng nhập
            </button>
          </div>
        </form>
        <div className="text-sm text-center">
          <Link
            to="/register"
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            Chưa có tài khoản? Đăng ký
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
