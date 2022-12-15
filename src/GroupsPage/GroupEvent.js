import React from "react";
import style from "./GroupsPage.module.css";
import { Icon } from "@iconify/react";
import TableRow from "./TableRow";
import { NavLink } from "react-router-dom";
import axios from "axios";
class GroupEvents extends React.Component {

  constructor(props) {
    let user = JSON.parse(localStorage.getItem("user"));

    super(props);
    this.state = {
      name: undefined,
      id: undefined,
      openModal: false,
      userToken: user.token,
      events: []
    };
  }



  componentDidMount() {
    this.setState({ id: +window.location.pathname.split("/")[3] })
    this.getEvents(+window.location.pathname.split("/")[3]);
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

  getEvents = async (id) => {
    const response = await axios.get(`http://3.68.195.28/api/groups/${id}/events`, {
      headers: {
        Authorization: `Bearer ${this.state.userToken}`,
      },
    });
    if (response.data.events.length > 0) {
      this.setState({ events: response.data.events, name: response.data.name });
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
                  <TableRow id="events" />
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
export default GroupEvents;
