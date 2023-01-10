import React from "react";
import style from "./GroupsPage.module.css";
import { Icon } from "@iconify/react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import moment from 'moment';
import EventsTableRow from "../EventsPage/components/EventsTableRow2";
import DeleteGroupEventModal from "./components/DeleteGroupEventModal";
import AddNewGroupEvent from "./components/AddNewGroupEvent";

class GroupEvents extends React.Component {

  constructor(props) {
    let user = JSON.parse(localStorage.getItem("user"));

    super(props);
    this.state = {
      name: undefined,
      id: undefined,
      openModal: false,
      userToken: user.token,
      events: [],
      displayNewEventMenu: false,
      displayDeleteModal: false
    };
  }

  async componentDidMount() {
    this.setState({ id: +window.location.pathname.split("/")[3] })
    await this.getEvents(+window.location.pathname.split("/")[3]);
  }

  setDisplayDeleteModal = (value) => {
    this.setState({
      displayDeleteModal: value
    });
    this.getEvents(+window.location.pathname.split("/")[3]);
  };

  setDisplayEventMenu = (value) => {
    this.setState({
      displayNewEventMenu: value
    });
    this.getEvents(+window.location.pathname.split("/")[3]);
  }

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
                <button
                    className={style.CreateGroupBtn}
                    onClick={ e => {this.setDisplayEventMenu(true)} }>
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
                {this.state.events.map(event => {
                  return(
                      <tr key={event.id}>
                        <td>
                          <input type="checkbox" /> {event.name}
                        </td>
                        <td>{moment(event.startDate).format('D.M.YYYY H:mm')}</td>
                        <td>{event.locationData.name}</td>
                        <td>
                          <input type="checkbox" />
                        </td>
                        <EventsTableRow
                            eventId={event.id}
                            eventData={event}
                            setDisplayDeleteModal={this.setDisplayDeleteModal}
                        />
                      </tr>
                  )
                })}
                </tbody>
              </table>
            </div>
          </div>
          {this.state.displayNewEventMenu && (
              <AddNewGroupEvent
                  showMenu={this.state.displayNewEventMenu}
                  setShowMenu={this.setDisplayEventMenu}
                  groupId={this.state.id}/>
          )}
          {this.state.displayDeleteModal && (
              <DeleteGroupEventModal
                  setDisplayDeleteModal={this.setDisplayDeleteModal}
                  groupId={this.state.id}/>
          )}
        </div>
    );
  }
}
export default GroupEvents;
