import React from "react";
import { Icon } from "@iconify/react";
import style from "./Components.module.css";

const Events = (props) => {
  const events = props.events;
  console.log(events)
  return (
    <div className={style.EventsContainer}>
      <div className={style.EventsHeader}>
        <h1 className={style.EventHead}>{events.length} wydzrzeń w najbiższym czasie</h1>

      </div>
      {events.length!==0?(
        events.map((event)=><div className={style.EventsSection}>
        <div key={event.id} className={style.Event}>
          <div className={style.EventHeader}>
            <div className={style.FirstSection}>
              <p className={style.EventName}>{event.name}</p>
              <p className={style.EventAuth}>Utowrzył(a) {event.author.firstName+" "+event.author.lastName}</p>
            </div>
            <div className={style.SecondSection}>
              <p className={style.EventDate}>{event.startDate.slice(0,10)+" godz:"+event.startDate.slice(11,16)}</p>
              <Icon
                icon="ri:information-line"
                width="24"
                height="24"
                color="#122c34"
              />
            </div>
          </div>{event.description?(<p className={style.EventDescribe}>
            {event.description}
          </p>):(<p>Brak opisu</p>)}
        </div>
      </div>)
      ):(<div className={style.SecondSection}>Aktualnie brak nadchodzących wydarzeń dla tego miejsca</div>)}
    </div>
  );
};

export default Events;
