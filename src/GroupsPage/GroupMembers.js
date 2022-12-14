import React from "react";
import style from "./GroupsPage.module.css";
import { Icon } from "@iconify/react";
import TableRow from "./TableRow";
import { NavLink } from "react-router-dom";
import ModalWindow from "../MainPage/ModalWindows/Modal";
import User from "../MainPage/ModalWindows/UserProfile";
class GroupMemebers extends React.Component {
  state = {
    openModal: false,
  };
  OpenModal = () => {
    this.setState({
      openModal: !this.state.openModal,
    });
  };
  CloseModal = () => {
    this.setState({
      openModal: false,
    });
  };
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
                Dodaj członka
              </button>
            </div>
          </div>
          <div>
            <table className={style.GroupsTable}>
              <thead>
                <tr>
                  <th>Imię i nazwisko</th>
                  <th>Data dołączenia</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <input type="checkbox" /> Jan Nowak
                  </td>
                  <td>26.10.2020</td>
                  <TableRow id="members" OpenModal={this.OpenModal} />
                </tr>
                <tr>
                  <td>
                    <input type="checkbox" /> Paweł Kowalski
                  </td>
                  <td>20.12.2019</td>
                  <TableRow id="members" OpenModal={this.OpenModal} />
                </tr>
              </tbody>
            </table>
            <ModalWindow
              openModal={this.state.openModal}
              onClose={!this.state.openModal}
            >
              <User CloseModal={this.CloseModal} />
            </ModalWindow>
          </div>
        </div>
      </div>
    );
  }
}
export default GroupMemebers;
