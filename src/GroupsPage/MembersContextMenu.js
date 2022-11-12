import React from "react";
import style from "../GroupsPage/ContextMenu.module.css";
import { Icon } from "@iconify/react";
const MenuMembers = (props) => {
  return (
    <div className={style.MenuContainer} id={style.event}>
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
          <button className={style.ActBtn}>
            <Icon
              icon="carbon:close-filled"
              color="rgba(0, 0, 0, 0.54)"
              width="20"
              height="20"
            />
            <p>Wyproś</p>
          </button>
        </li>
        <li>
          <button className={style.ActBtn} onClick={() => props.OpenModal()}>
            <Icon
              icon="carbon:user-avatar-filled"
              color="rgba(0, 0, 0, 0.54)"
              width="20"
              height="20"
            />
            <p>Informacje</p>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default MenuMembers;
