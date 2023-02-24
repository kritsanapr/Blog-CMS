import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/userContext";

export default function Header() {
  const { userInfo, setUserInfo } = useContext(UserContext);
  useEffect(() => {
    fetch("http://localhost:3333/api/profile", {
      credentials: "include",
    }).then((res) =>
      res.json().then((user) => {
        setUserInfo(user);
      })
    );
  }, []);

  const logout = () => {
    fetch("http://localhost:3333/api/logout", {
      credentials: "include",
      method: "POST",
    });

    setUserInfo(null);
  };

  const username = userInfo?.username;

  return (
    <header>
      <Link to="/" className="logo">
        My Blog
      </Link>
      <nav>
        {username && (
          <>
            <Link to="/">Create New Post</Link>
            <a href="/" onCLick={logout}>
              Logout
            </a>
          </>
        )}
        {!username && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
}
