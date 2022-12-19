import React, { useEffect, useState } from "react";
import style from "../GroupsPage/GroupsPage.module.css";
import { Icon } from "@iconify/react";
import TableRow from "../GroupsPage/TableRow";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment";

// 16. Dodaj wydarzenie publiczne
// POST student-meeting-service:8080/api/events

// REQUEST HEADER:
// "User-Token": "" //String, token autoryzacyjny użytkownika

// RQUEST BODY:
// {
//     "name": "", //String
//     "locationId": "", //String
//     "description": "", //String, opcjonalne
//     "startDate": "2012-04-23T18:25:43.511Z" //Date
// }

function getEvents(token) {
  return  axios
      .get('http://3.68.195.28/api/events', {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
}

const EventsPage = () => {

  const navigate = useNavigate();
  const [events, setEvents] = useState([])

  useEffect(()=> {
    let user = JSON.parse(localStorage.getItem("user"));

    getEvents(user.token)
        .then(response => setEvents(response.data.events))

    console.log(events);

  }, [])

  const renderEvents = events.map((event) =>
      <tr key={event.id}>
        <td>
          <input type="checkbox" /> {event.name}
        </td>
        <td>{moment(event.startDate).format('ll') }</td>
        <td>{event.locationData.name}</td>
        <td>{event.description}</td>
        <td>
          <input type="checkbox" />
        </td>
        <TableRow id="events" />
      </tr>
  )


  return (
      <div className={style.GroupContainer}>
        <div className={style.GroupsSection}>
          <div className={style.GroupsHeader}>
            <h2 className={style.Header}>Twoje grupy</h2>
            <div className={style.BtnContainer}>
              <button className={style.BackMapBtn}>
                <NavLink className={style.NavLinkBtn} to="/profile">
                  <Icon
                      icon="akar-icons:arrow-left"
                      color="#122c34"
                      width="20"
                      height="20"
                  />
                  Wróć do mapy
                </NavLink>
              </button>
              <button onClick={() => navigate('add')} className={style.CreateGroupBtn}>
                <Icon
                    icon="ant-design:plus-outlined"
                    color="white"
                    width="20"
                    height="20"
                />
                Dodaj wydarzenie
              </button>
            </div>
          </div>
          <div>
            { renderEvents.length ?
                <table className={style.GroupsTable}>
                  <thead>
                  <tr>
                    <th>Nazwa</th>
                    <th>Data</th>
                    <th>Miejsce</th>
                    <th>Opis wydarzneia</th>
                    <th>Powiadomienie 24h przed</th>
                    <th></th>
                  </tr>
                  </thead>
                  <tbody>
                  {renderEvents.length ? renderEvents : "Sorry, no data"}
                  </tbody>
                </table> : "Loading"
            }
          </div>
        </div>
      </div>
  );
}
export default EventsPage;
