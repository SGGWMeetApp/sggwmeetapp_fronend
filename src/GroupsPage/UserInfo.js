import React, { useEffect } from "react";
import { Icon } from "@iconify/react";
import UserAvatar from "../Assets/User-avatar.svg";
import style from "./../MainPage/ModalWindows/Modal.module.css";
import { useState } from "react";
import axios from "axios";
import { DualRingLoader } from "./../Loaders/Loaders.js";

const User = (props) => {
  let userData = JSON.parse(localStorage.getItem("user"));
  const [id] = useState(props.id);
  const [token] = useState(userData.token);
  const [user, setUser] = useState();
  const [avatarUrl, setAvatar] = useState(UserAvatar);

  const getData = async () => {
    const val = Date.now();
    const response = await axios.get(`http://3.68.195.28/api/users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setUser(response.data.userData);
    if (response.data.userData.avatarUrl) {
      setAvatar(response.data.userData.avatarUrl + "?" + val);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  return user ? (
    <div className={style.UserContainer}>
      <div className={style.UserHeader}>
        <p className={style.HeaderText}>Profil Użytkownika</p>
        <button onClick={() => props.CloseModal()} className={style.CloseBtn}>
          <Icon
            icon="ci:close-small"
            color="rgba(0, 0, 0, 0.54)"
            width="26"
            height="26"
          />
        </button>
      </div>
      <div className={style.UserContainerBody}>
        <img src={avatarUrl} alt="User foto"></img>
        <div className={style.UserInformation}>
          <div className={style.UserInformationHeader}>
            <p className={style.UserName}>
              {user.firstName} {user.lastName}
            </p>
            <div></div>
          </div>
          <div className={style.UserContact}>
            <p className={style.Mail}>Email: {user.email}</p>
            <p className={style.PhoneNumber}>
              Telefon: {user.phoneNumberPrefix} {user.phoneNumber}
            </p>
          </div>
          <div className={style.UserDescription}>
            <p className={style.UserDescriptionText}>{user.description}</p>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <DualRingLoader />
  );
};
export default User;
