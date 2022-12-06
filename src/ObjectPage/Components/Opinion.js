import React from "react";
import style from "./Components.module.css";
import { Icon } from "@iconify/react";
import Foto from "../../Assets/section2_photo.jpg"
const Opinions = (props) => {
  return (
    <div className={style.OpinionContainer}>
      <div className={style.OpinionsHeader}>
        <p>
          <Icon
            icon="majesticons:percent"
            color="rgba(0, 0, 0, 0.87)"
            width="24"
            height="24"
          />
          66 z 3 opini
        </p>
        <button className={style.AddOpinion}>
          <Icon
            icon="ant-design:plus-outlined"
            color="white"
            width="20"
            height="20"
          />
          Dodaj opinie
        </button>
      </div>
      <div className={style.Opinions}>
        <div className={style.Opinion}>
          <div className={style.OpinionHeader}>
            <img className={style.Avatar} src={Foto} alt="Person" />
            <div className={style.UserInfo}>
              <p className={style.UserName}>Jan Nowak</p>
              <p className={style.Date}>Czerwiec 2022</p>
            </div>
            <div className={style.OpinionRate}>
              <Icon icon="ant-design:like-filled" color="#85c9b9" width="30" />
            </div>
            <div className={style.ReviewRating}>
              <div className={style.Positive}>
                <Icon
                  icon="ant-design:like-filled"
                  color="rgba(18, 44, 52, 0.5)"
                  width="20"
                  height="20"
                />
                <p className={style.PositiveNumber}>2</p>
              </div>
              <div className={style.Negative}>
                <Icon
                  icon="ant-design:dislike-filled"
                  color="rgba(18, 44, 52, 0.5)"
                  width="20"
                  height="20"
                />
                <p className={style.NegativeNumber}>1</p>
              </div>
            </div>
          </div>
          <p className={style.OpinionText}>
            Aliquam at mattis nisl, ac fermentum magna. Mauris nec dignissim
            justo. Ut id eleifend neque. Pellentesque eleifend ante non auctor
            euismod.
          </p>
        </div>
      </div>
    </div>
  );
};
export default Opinions;
