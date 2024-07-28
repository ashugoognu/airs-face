import React from "react";
import logo from "../../assets/hiringgo.png";


export const Header = () => {
  return (
    <section className="header">
      <div className="container">
        <img src={logo} alt="hiringgo logo" />
      </div>
    </section>
  );
};
