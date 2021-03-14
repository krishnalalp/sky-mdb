import React from "react";
import { useHistory } from "react-router-dom";
import { Search } from "../Searchbar/Searchbar";
import logo from "../../assets/img/sky_logo.png";
import "./Navbar.scss";

export function Navbar() {
  const history = useHistory();

  const handleClick = () => {
    history.push("/");
  };

  return (
    <div className="navbar">
      <div
        className="logo"
        role="button"
        tabIndex={0}
        onClick={() => handleClick()}
        onKeyDown={() => handleClick()}
      >
        <img alt="sky_logo" src={logo} />
      </div>
      <Search />
    </div>
  );
}
