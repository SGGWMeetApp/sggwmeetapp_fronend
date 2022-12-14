import React from "react";
import style from "./GroupsPage.module.css";
import { Icon } from "@iconify/react";
import TableRow from "./TableRow";
import { NavLink } from "react-router-dom";
class GroupEvents extends React.Component {
  render() {
    return (
      <div className={style.GroupContainer}>
        <div className={style.GroupsSection}>
          <div className={style.GroupsHeader}>
            <h2 className={style.Header}>Nazwa grupy </h2>
            <div>
              <NavLink
                className={({ isActive }) =>
                  isActive ? `${style.active}` : `${style.inactive}`
                }
                to="/profile/groups/id/members"
              >
                Członkowie
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive ? `${style.active}` : `${style.inactive}`
                }
                to="/profile/groups/id/events"
              >
                Wydarzenia
              </NavLink>
            </div>
            <div className={style.BtnContainer}>
              <button className={style.BackMapBtn}>
                <NavLink className={style.NavLinkBtn} to="/profile/groups">
                  <Icon
                    icon="akar-icons:arrow-left"
                    color="#122c34"
                    width="20"
                    height="20"
                  />
                  Wróć do grup
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
                  <th>Powiadomienie 24h przed</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <input type="checkbox" /> Spotkanie integracyjne
                  </td>
                  <td>16.12.2022 19:30</td>
                  <td>Restauracja NoVa</td>
                  <td>
                    <input type="checkbox" />
                  </td>
                  <TableRow id="events"/>
                </tr>
                <tr>
                  <td>
                    <input type="checkbox" /> Wyjście do Kina
                  </td>
                  <td>26.11.2022 18:45</td>
                  <td>Kino Helios</td>
                  <td>
                    <input type="checkbox" />
                  </td>
                  <TableRow id="events"/>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}
export default GroupEvents;
