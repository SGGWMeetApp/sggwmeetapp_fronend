import React from "react";
import { Icon } from "@iconify/react";
import Foto from "../../Assets/section2_photo.jpg";
import style from "./Modal.module.css";

const User = (props) => {
  return (
    <div className={style.UserContainer}>
      <div className={style.UserHeader}>
        <p className={style.HeaderText}>Profil Użytkownika</p>
        <button onClick={()=>props.CloseModal()} className={style.CloseBtn}>
          <Icon
            icon="ci:close-small"
            color="rgba(0, 0, 0, 0.54)"
            width="26"
            height="26"
          />
        </button>
      </div>
      <div className={style.UserContainerBody}>
        <img src={Foto} alt="User foto"></img>
        <div className={style.UserInformation}>
          <div className={style.UserInformationHeader}>
            <p className={style.UserName}>Andrzej Wajda</p>
            <button className={style.EditBtn}>
              <Icon
                className={style.EditIcon}
                icon="material-symbols:edit"
                color="#1976d2"
                width="22"
                height="22"
              />
            </button>
          </div>
          <div className={style.UserContact}>
            <p className={style.Mail}>Email: andrej164@onet.pl</p>
            <p className={style.PhoneNumber}>Telefon: +48 369 258 147</p>
          </div>
          <div className={style.UserDescription}>
            <p className={style.UserDescriptionText}>
              Turpis iaculis elementum lacus, a, at eget tellus. Gravida amet
              consectetur ipsum et, morbi non urna. Morbi dolor odio dui, tempor
              rhoncus sit magna.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default User;
