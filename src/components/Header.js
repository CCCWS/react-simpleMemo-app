import React from "react";

function Header({ text, left, right }) {
  return (
    <header className="Header">
      <div className="header_left">{left}</div>
      <div className="header_text">{text}</div>
      <div className="header_right">{right}</div>
    </header>
  );
}

export default Header;
