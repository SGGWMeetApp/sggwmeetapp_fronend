import React from "react";
import style from "./MainPageNavi.module.css";
import { NavLink } from "react-router-dom";
import { Icon } from "@iconify/react";
const Navigation = () => {
  return (
    <nav className={style.NaviBar}>
      <div className={style.Logo}>
        Brand <Icon icon="bxs:book-reader" color="#85c9b9" />
      </div>
      <div className={style.InputContainer}>
        <input className={style.SearchInput} placeholder="Wyszukaj..." />
        <Icon
          className={style.SearchIcon}
          icon="bx:search"
          width="24px"
          height="24px"
          color="122C34"
        />
      </div>
      <div className={style.NavContainer}>
        <div className={style.MapContainer}>
          Mapa
          <Icon icon="akar-icons:map" color="#85c9b9" width="20" height="18" />
        </div>
        <div className={style.EventsContainer}>
          Wydarzenia{" "}
          <Icon
            icon="ic:baseline-event"
            color="#122c34"
            width="18"
            height="20"
          />
        </div>
        <div className={style.GroupContainer}>
          Grupy <Icon icon="bx:group" color="#122c34" width="18" height="20" />
        </div>
        <div className={style.UserName}></div>
      </div>
    </nav>
  );
};

export default Navigation;
