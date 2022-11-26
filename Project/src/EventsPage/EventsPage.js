import React from "react";
import style from "../GroupsPage/GroupsPage.module.css";
import MainPageNavi from "../MainPage/MainPageNavi.js";
import { Icon } from "@iconify/react";
import TableRow from "../GroupsPage/TableRow";
import { NavLink } from "react-router-dom";
class EventsPage extends React.Component {
  render() {
    return (
      <div className={style.GroupContainer}>
        <MainPageNavi />
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
              <button className={style.CreateGroupBtn}>
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
                <tr>
                  <td>
                    <input type="checkbox" /> Lorem Ipsum
                  </td>
                  <td>10.11.2022 19:00</td>
                  <td>Pizzeri Da Grasso</td>
                  <td>Lorem Ipsum</td>
                  <td>
                    <input type="checkbox" />
                  </td>
                  <TableRow id="events" />
                </tr>
                <tr>
                  <td>
                    <input type="checkbox" /> Lorem Ipsum
                  </td>
                  <td>11.11.2022 19:30</td>
                  <td>Kino Helios</td>
                  <td>Lorem Ipsum</td>
                  <td>
                    <input type="checkbox" />
                  </td>
                  <TableRow id="events" />
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}
export default EventsPage;
