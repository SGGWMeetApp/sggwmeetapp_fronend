import React from "react";
import style from "./GroupsPage.module.css";
import { Icon } from "@iconify/react";
import TableRow from "./TableRow";
import { NavLink, Route, Routes } from "react-router-dom";
import ModalWindow from "../MainPage/ModalWindows/Modal";
import User from "./UserInfo.js";
import axios from "axios";
import GroupsPage from "./GroupsPage.js";

class GroupMemebers extends React.Component {
  constructor(props) {
    let user = JSON.parse(localStorage.getItem("user"));

    super(props);
    this.state = {
      name: undefined,
      id: undefined,
      openModal: false,
      userToken: user.token,
      members: [],
      memberId: undefined,
      admin: undefined,
      myId: user.userData.id,
    };
  }

  componentDidMount() {
    this.setState({ id: +window.location.pathname.split("/")[3] });
    this.getMembers(+window.location.pathname.split("/")[3]);
  }

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
  SetMemberId = (id) => {
    this.setState({ memberId: id });
    return id;
  };
  getMembers = async (id) => {
    const response = await axios.get(
      `http://3.68.195.28/api/groups/${id}/users`,
      {
        headers: {
          Authorization: `Bearer ${this.state.userToken}`,
        },
      }
    );
    if (response.data.users.length > 0) {
      const data = response.data.users;
      const admin = data.filter((user) => user.isAdmin === true);
      this.setState({
        members: response.data.users,
        name: response.data.name,
        admin: admin,
      });
    }
  };
  deleteUser = async () => {
    if (this.state.admin[0].id === this.state.myId) {
      await axios.delete(
        `http://3.68.195.28/api/groups/${this.state.id}/users/${this.state.memberId}`,
        {
          headers: {
            Authorization: `Bearer ${this.state.userToken}`,
          },
        }
      );
      this.getMembers(this.state.id);
    } else {
      await axios.delete(
        `http://3.68.195.28/api/groups/${this.state.id}/users`,
        {
          headers: {
            Authorization: `Bearer ${this.state.userToken}`,
          },
        }
      )

        window.location.replace("");

    }
  };
  render() {
    return (
      <div className={style.GroupContainer}>
        <div className={style.GroupsSection}>
          <div className={style.GroupsHeader}>
            <h2 className={style.Header}>{this.state.name}</h2>
            <div>
              <NavLink
                className={({ isActive }) =>
                  isActive ? `${style.active}` : `${style.inactive}`
                }
                to={`/profile/groups/${this.state.id}/members`}
              >
                Członkowie
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive ? `${style.active}` : `${style.inactive}`
                }
                to={`/profile/groups/${this.state.id}/events`}
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
                <NavLink
                  className={style.NavLinkBtn + " " + style.UserAddLinkBtn}
                  to={`/profile/groups/${this.state.id}/members/add`}
                >
                  <Icon
                    icon="ant-design:plus-outlined"
                    color="white"
                    width="20"
                    height="20"
                  />
                  Dodaj członka
                </NavLink>
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
                {this.state.members.length > 0
                  ? this.state.members.map((member) => (
                      <tr key={member.id}>
                        <td>
                          <input type="checkbox" />{" "}
                          {member.firstName + " " + member.lastName}
                        </td>
                        <td>{member.registrationDate.slice(0, 10)}</td>
                        <td>
                          {(this.state.admin[0].id === this.state.myId &&
                            this.state.admin[0].id !== member.id) ||
                          (this.state.admin[0].id !== this.state.myId &&
                            this.state.myId === member.id) ? (
                            <div onClick={() => this.SetMemberId(member.id)}>
                              <TableRow
                                id="members"
                                OpenModal={this.OpenModal}
                                DeleteUser={this.deleteUser}
                              ></TableRow>
                            </div>
                          ) : (
                            <p></p>
                          )}
                        </td>
                      </tr>
                    ))
                  : null}
              </tbody>
            </table>
            <ModalWindow
              openModal={this.state.openModal}
              onClose={!this.state.openModal}
            >
              <User CloseModal={this.CloseModal} id={this.state.memberId} />
            </ModalWindow>
          </div>
        </div>
      </div>
    );
  }
}
export default GroupMemebers;
