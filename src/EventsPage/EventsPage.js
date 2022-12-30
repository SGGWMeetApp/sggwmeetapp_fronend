import { useState, useEffect } from "react";
import style from "../GroupsPage/GroupsPage.module.css";
import { Icon } from "@iconify/react";
import TableRow from "../GroupsPage/TableRow";
import { NavLink } from "react-router-dom";
import NewEventMenu from "./NewEventMenu";
import axios from "axios";

const EventsPage = () => {
  let user = JSON.parse(localStorage.getItem("user"));
  const userToken = user.token;
  const id =user.userData.id;
  const [displayEventMenu, setDisplayEventMenu] = useState(false);
  const [events, setEvents] = useState([]);
  useEffect(() => {
    getEvents();
  }, []);

  const getEvents = async () => {
    const response = await axios.get(`http://3.68.195.28/api/events`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    if (response.data.events.length > 0) {
      setEvents(response.data.events);
    }
  };

  return events !== [] ? (
    <div className={style.GroupContainer}>
      <div className={style.GroupsSection}>
        <div className={style.GroupsHeader}>
          <h2 className={style.Header}>Twoje Wydarzenia</h2>
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
            <button
              className={style.CreateGroupBtn}
              onClick={() => setDisplayEventMenu(true)}
            >
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
              {events.map((event) => 
                <tr key={event.id}>
                  <td>
                    <input type="checkbox" />{event.name}
                  </td>
                  <td>{event.startDate}</td>
                  <td>{event.locationData.name}</td>
                  <td>{event.description}</td>
                  <td>
                    <input type="checkbox" />
                  </td>
                  <TableRow id="events" />
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {displayEventMenu && (
        <NewEventMenu
          showMenu={displayEventMenu}
          setShowMenu={setDisplayEventMenu}
        />
      )}
    </div>
  ) : (
    <div>Proszę czekać...</div>
  );
};

export default EventsPage;
