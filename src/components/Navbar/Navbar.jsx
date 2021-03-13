import React from "react";
import { useHistory } from "react-router-dom";
import { Search } from "../Searchbar/Searchbar";
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
        <img alt="sky_logo" src="sky_logo.png" />
      </div>
      <Search />
    </div>
  );
}