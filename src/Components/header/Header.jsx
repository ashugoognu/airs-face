import React from "react";
import logo from "../../assets/hiringgo.png";
import cart from "../../assets/jdcart.png";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <section className="header">
      <div className="container">
        <Link to="/">
          <img src={logo} alt="hiringgo logo" />
        </Link>
        <Link to="/cart">
          <img src={cart} className="jd-cart" alt="jd cart" />
        </Link>
      </div>
    </section>
  );
};
