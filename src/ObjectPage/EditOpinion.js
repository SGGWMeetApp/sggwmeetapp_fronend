import React from "react";
import { Icon } from "@iconify/react";
import style from "./../MainPage/ModalWindows/Modal.module.css";
import { useState } from "react";
import axios from "axios";
import styleLogIn from "../LogInPage/LogInPage.module.css";
import { DualRingLoader } from "./../Loaders/Loaders.js";

const EditOpinion = (props) => {
  let userData = JSON.parse(localStorage.getItem("user"));
  const id = props.objectId;
  const reviewId=props.reviewId;
  const [opinion, setOpinion] = useState(props.comment);
  const [isPositive, setIsPositive] = useState(props.isPositive);

  const SetValue = (e) => {
    setOpinion(e.target.value);
  };
  const onSubmit = async () => {
    const comment = opinion;
    const possitive = isPositive;

    await axios
      .put(
        `http://3.68.195.28/api/places/${id}/reviews/${reviewId}`,
        {
          comment: comment,
          isPositive: possitive,
        },
        {
          headers: { Authorization: `Bearer ${userData.token}` },
        }
      )
      .then(props.getDetails, props.CloseModal());
  };
  return userData ? (
    <div className={style.UserContainer}>
      <div className={style.UserHeader}>
        <p className={style.HeaderText}>Edytuj swoją opinię</p>
        <button onClick={() => props.CloseModal()} className={style.CloseBtn}>
          <Icon
            icon="ci:close-small"
            color="rgba(0, 0, 0, 0.54)"
            width="26"
            height="26"
          />
        </button>
      </div>
      <form onSubmit={() => onSubmit()}>
        <div className={styleLogIn.LabelGroup}>
          <label className={style.EditTextLabel}>Treść </label>
          <textarea
            className={styleLogIn.TextInput}
            value={opinion}
            name="opinion"
            onChange={(e) => SetValue(e)}
          ></textarea>
        </div>
        <div className={style.PositiveContainer}>
          <legend className={style.FilterPlaceType}>
            Polecasz tom miejsce?{" "}
          </legend>
          <input
            id="nr1"
            type="radio"
            value={true}
            name="isPositive"
            checked={isPositive}
            onChange={() => setIsPositive(true)}
            className={style.isPositive}
          ></input>
          <label htmlFor="nr1">Tak</label>

          <input
            id="nr2"
            type="radio"
            value={false}
            name="isPositive"
            checked={!isPositive}
            onChange={() => setIsPositive(false)}
            className={style.isPositive}
          ></input>
          <label htmlFor="nr2">Nie</label>
        </div>
        <button className={styleLogIn.FormLogInButton} id={style.SaveChange}>
          Dodaj opinie
        </button>
      </form>
      <div className={style.UserContainerBody}></div>
    </div>
  ) : (
    <DualRingLoader />
  );
};
export default EditOpinion;
