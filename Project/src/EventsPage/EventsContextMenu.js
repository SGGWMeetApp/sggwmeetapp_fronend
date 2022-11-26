import React from "react";
import style from "../GroupsPage/ContextMenu.module.css";
import { Icon } from "@iconify/react";
const MenuEvents = (props) => {
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
            <p>Opuść wydarznie</p>
          </button>
        </li>
        <li>
          <button className={style.ActBtn}>
            <Icon
              icon="material-symbols:edit-document-outline"
              color="rgba(0, 0, 0, 0.54)"
              width="20"
              height="20"
            />
            <p>Edytuj wydarzenie</p>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default MenuEvents;
