import React from "react";
import Weather from "./weather";
import "../styles/header.css";

function Header() {
  return (
    <>
      <div className="header">
        <div className="heading">
          <h1>News Now</h1>
        </div>
        <Weather />
      </div>
    </>
  );
}

export default Header;
