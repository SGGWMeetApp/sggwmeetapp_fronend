import React from "react";
import { Icon } from "@iconify/react";
import style from "./LogInPage.module.css";
import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <nav className={style.NaviBar}>
      <div className={style.Logo}>
        Brand <Icon icon="bxs:book-reader" color="#85c9b9" />
      </div>
      <ul className={style.NavList}>
        <li className={style.NavListElement}>
          <NavLink className={style.NavLink} to="/">
            Home
          </NavLink>
        </li>
        <li className={style.NavListElement}>
          <NavLink className={style.NavLink}>Miejsca</NavLink>
        </li>
        <li className={style.NavListElement}>
          <NavLink className={style.NavLink}>Wydarzenia</NavLink>
        </li>
        <li className={style.NavListElement}>
          <NavLink className={style.NavLink} to="/login">Log In</NavLink>
        </li>
      </ul>
      <button className={style.SignButton}>
        <NavLink className={style.NavLinkButt} to="/register">Sign Up</NavLink>
      </button>
    </nav>
  );
};
export default Navigation;
