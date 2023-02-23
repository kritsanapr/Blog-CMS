import React, { useEffect } from "react";
import { Link } from "react-router-dom";

export default function Header() {
  useEffect(() => {
    const response = fetch("http://localhost:3333/api/profile", {
      credentials: "include",
    });
  }, []);

  return (
    <header>
      <Link to="/" className="logo">
        My Blog
      </Link>
      <nav>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </nav>
    </header>
  );
}
