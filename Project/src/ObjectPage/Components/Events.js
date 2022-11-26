import React from "react";
import { Icon } from "@iconify/react";
import style from "./Components.module.css";

const Events = (props) => {
  return (
    <div className={style.EventsContainer}>
      <div className={style.EventsHeader}>
        <h1 className={style.EventHead}>10 wydzrzeń w najbiższym czasie</h1>
        <button className={style.AddEventBtn}>
          <Icon
            icon="ant-design:plus-outlined"
            color="white"
            width="20"
            height="20"
          />
          Dodaj wydarzenie
        </button>
      </div>
      <div className={style.EventsSection}>
        <div className={style.Event}>
          <div className={style.EventHeader}>
            <div className={style.FirstSection}>
              <p className={style.EventName}>Wieczór gier planszowych</p>
              <p className={style.EventAuth}>Utowrzył Maciej Roch</p>
            </div>
            <div className={style.SecondSection}>
              <p className={style.EventDate}>22.11.2022</p>
              <Icon
                icon="ri:information-line"
                width="24"
                height="24"
                color="#122c34"
              />
            </div>
          </div>
          <p className={style.EventDescribe}>
            Dolor dignissim lobortis at arcu consequat. Sapien ut morbi amet sed
            vitae nibh est nulla risus
          </p>
        </div>
      </div>
    </div>
  );
};

export default Events;
