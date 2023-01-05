import React from "react";
import style from "./ContextMenu.module.css";
import { Icon } from "@iconify/react";
const Menu = (props) => {
  return (
    <div className={style.MenuContainer}>
      <div className={style.MenuHeader}>
        <button onClick={props.handleShow} className={style.CloseBtn}>
          <Icon
            icon="ci:close-small"
            color="rgba(0, 0, 0, 0.54)"
            width="20"
            height="20"
          />
        </button>
      </div>
      <ul className={style.MenuList}>
        <li>
          <button className={style.ActBtn} onClick={()=>props.DeleteGroup()}>
            <Icon
              icon="carbon:close-filled"
              color="rgba(0, 0, 0, 0.54)"
              width="20"
              height="20"
            />
            <p>Usuń grupę</p>
          </button>
        </li>
        <li>
          <button className={style.ActBtn}>
            <Icon
              icon="carbon:task-add"
              color="rgba(0, 0, 0, 0.54)"
              width="20"
              height="20"
            />
            <p>Dodaj wydarzenie</p>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Menu;
