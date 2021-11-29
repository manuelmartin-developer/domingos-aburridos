import React, { useContext } from "react";
import { Link } from "react-router-dom";
import logo from '../../assets/images/logo.png';

import Nav from "../Nav";
import { titleContext } from "../../Contexts/titleContext";

const Header = () => {
  const { title } = useContext(titleContext);
  return (
    <>
      <Nav />
    <header className="header">
      <div className="header-title">
        <h3>{title}</h3>
      </div>
      <Link to="/">
        <img className="header-logo" src={logo} alt="logo" />
      </Link>
    </header>
    </>
  );
};

export default Header;
