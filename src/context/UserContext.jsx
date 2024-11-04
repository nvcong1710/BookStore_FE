import React from "react";
const UserContext = React.createContext({ id: "", userName: "", auth: false, token: "", type: "" });

// @function  UserProvider
// Create function to provide UserContext
const UserProvider = ({ children }) => {
  const [user, setUser] = React.useState(
    sessionStorage.getItem("user")
      ? JSON.parse(sessionStorage.getItem("user"))
      : { id: "", userName: "", email: "", auth: false, token: "", type: "" }
  );

  const login = (user) => {
    setUser({
      id: user.id,
      userName: user.username,
      email: user.email,
      token: user.token,
      type: user.type,
      auth: true,
    });
    sessionStorage.setItem("user", JSON.stringify({
      id: user.id,
      userName: user.username,
      email: user.email,
      token: user.token,
      type: user.type,
      auth: true
    }));
  };

  const logout = () => {
    sessionStorage.removeItem("user");
    setUser(() => ({
      id: "",
      userName: "",
      email: "",
      token: "",
      type: "",
      auth: false,
    }));
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
