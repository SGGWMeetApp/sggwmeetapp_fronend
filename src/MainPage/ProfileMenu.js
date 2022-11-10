import React from "react";
import style from "./ProfileMenu.module.css";
import { Icon } from "@iconify/react";
const ProfileMenu = (props) => {
  return (
    <div className={style.MenuContainer}>
      <div className={style.MenuHeader}>
        <p className={style.UserName}>Andrzej Wajda</p>
        <p className={style.Usermail}>andrju164@inet.pl</p>
      </div>
      <ul className={style.MenuList}>
        <li>
          <button className={style.SettingBtn}>
            <Icon
              icon="ci:settings-filled"
              color="rgba(0, 0, 0, 0.54)"
              width="20"
              height="20"
            />
            <p>Ustawienia</p>
          </button>
        </li>
        <li>
          <button className={style.ProfilBtn}>
            <Icon
              icon="carbon:user-avatar-filled"
              color="rgba(0, 0, 0, 0.54)"
              width="20"
              height="20"
            />
            <p>Profil</p>
          </button>
        </li>
      </ul>
      <button className={style.LogOutBtn}>Wyloguj się</button>
    </div>
  );
};

export default ProfileMenu;
