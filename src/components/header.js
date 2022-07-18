import React from "react";
import Weather from "./weather";
import Datetime from "./datetime";
import "../styles/header.css";

function Header() {
  return (
    <header className="header">
      <Datetime />
      <h1 className="title">News Now</h1>
      <Weather />
    </header>
  );
}

export default Header;
