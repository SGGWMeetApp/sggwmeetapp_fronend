import React from "react";
import { Icon } from "@iconify/react";
import style from "./Components.module.css";
import TableStyle from "./../../GroupsPage/GroupsPage.module.css";

const Events = (props) => {
  const events = props.events;
  return (
    <div className={style.EventsContainer}>
      <div className={style.EventsHeader}>
        <h1 className={style.EventHead}>
          {events.length} wydzrzeń w najbiższym czasie
        </h1>
      </div>
      {events.length !== 0 ? (
        <div style={{ height: "300px", overflowY: "scroll" }}>
          <table className={TableStyle.GroupsTable}>
            <thead>
              <tr >
                <th>Nazwa</th>
                <th>Data</th>
                <th>Autor</th>
                <th>Opis wydarzneia</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr key={event.id} className={style.Event}>
                  <td style={{width:"300px"}}>{event.name}</td>
                  <td>
                    {event.startDate.slice(0, 10)+ " "+
                    event.startDate.slice(11, 16)}
                  </td>
                  <td>
                    {event.author.firstName + " " + event.author.lastName}
                  </td>

                  {event.description ? (
                    <td style={{textAlign:"initial"}}>{event.description}</td>
                  ) : (
                    <td style={{textAlign:"initial"}}>Brak opisu</td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className={style.SecondSection}>
          
        </div>
      )}
    </div>
  );
};

export default Events;
