import React from "react";
import { Link } from "react-router-dom";
import logo from '../../assets/images/logo.png'

import Nav from "../Nav";

const Header = () => {
  return (
    <header className="header">
      <Nav />
      <Link to="/">
        <img className="header-logo" src={logo} alt="logo" />
      </Link>
    </header>
  );
};

export default Header;
