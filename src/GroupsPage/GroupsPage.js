import React from "react";
import style from "./GroupsPage.module.css";
import MainPageNavi from "../MainPage/MainPageNavi.js";
import { Icon } from "@iconify/react";
import TableRow from "./TableRow";
import { NavLink } from "react-router-dom";
class GroupsPage extends React.Component {
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
                Dodaj grupę
              </button>
            </div>
          </div>
          <div>
            <table className={style.GroupsTable}>
              <thead>
                <tr>
                  <th>Nazwa</th>
                  <th>Ilość Członków</th>
                  <th>Założyciel</th>
                  <th>Przyszłe Wydarzenia</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <input type="checkbox" /> <NavLink to="/profile/groups/id/members" className={style.NavGroup}>Lorem Ipsum</NavLink> 
                  </td>
                  <td>5</td>
                  <td>Jan Kowalski</td>
                  <td>2</td>
                  <TableRow id="groups" />
                </tr>
                <tr>
                  <td>
                    <input type="checkbox" /> <NavLink to="/profile/groups/id/members" className={style.NavGroup}>Lorem Ipsum</NavLink> 
                  </td>
                  <td>5</td>
                  <td>Jan Kowalski</td>
                  <td>2</td>
                  <TableRow id="groups" />
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}
export default GroupsPage;
