import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const [roles, setRoles] = useState(
    JSON.parse(localStorage.getItem("roles")) || []
  );

  const fetchAccountDetails = async (id, token) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_DOMAIN}/account/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "k",
          },
        }
      );
      const accountData = response.data;

      setUser(accountData);
      setRoles(accountData.authorities.map((auth) => auth.authority));
      localStorage.setItem("user", JSON.stringify(accountData));
      localStorage.setItem(
        "roles",
        JSON.stringify(accountData.authorities.map((auth) => auth.authority))
      );
    } catch (error) {
      console.error("Failed to fetch account details: ", error);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_DOMAIN}/auth/login`,
        {
          email,
          password,
        }
      );

      const { token, id } = response.data;

      setToken(token);
      localStorage.setItem("token", token);

      await fetchAccountDetails(id, token);

      return response;
    } catch (error) {
      console.error("Login failed: ", error);
      return error;
    }
  };

  const loginGoogle = async (credentialResponse) => {
    const googleToken = credentialResponse.credential;
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_DOMAIN}/auth/google`,
        {
          tokenId: googleToken,
        },
        {
          headers: {
            "Content-Type": "application/json",
            // "ngrok-skip-browser-warning": "k",
          },
        }
      );

      const { token, id } = response.data;

      setToken(token);
      localStorage.setItem("token", token);

      await fetchAccountDetails(id, token);

      return { token };
    } catch (error) {
      console.error("Google login failed: ", error);
      return error;
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    setRoles([]);

    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("roles");
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedRoles = JSON.parse(localStorage.getItem("roles"));

    if (storedToken && storedUser && storedRoles) {
      setToken(storedToken);
      setUser(storedUser);
      setRoles(storedRoles);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ token, user, roles, login, logout, loginGoogle }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
