import React from "react";
import style from "./GroupsPage.module.css";
import { Icon } from "@iconify/react";
import TableRow from "./TableRow";
import { NavLink } from "react-router-dom";
import axios from "axios";
import DeleteGroup from "./DeleteGroupMenu";
class GroupsPage extends React.Component {
  constructor(props) {
    let user = JSON.parse(localStorage.getItem("user"));

    super(props);
    this.state = {
      groups: [],
      userToken: user.token,
      error: null,
      id: user.userData.id,
      groupId:undefined,
      show:false,
    };
  }

  componentDidMount() {
    this.getGroups();
  }
  SetGroupId = (id) => {
    this.setState({ groupId: id });
  };
  OpenModal =()=>{
    this.setState({show:!this.state.show})
  }
  getGroups = async () => {
    const response = await axios.get(
      `http://3.68.195.28/api/users/${this.state.id}/groups`,
      {
        headers: {
          Authorization: `Bearer ${this.state.userToken}`,
        },
      }
    );
    if (response.data.groups.length > 0) {
      this.setState({ groups: response.data.groups });

    }
  };
  deleteGroup = async () => {
    await axios.delete(
      `http://3.68.195.28/api/groups/${this.state.groupId}`,
      {
        headers: {
          Authorization: `Bearer ${this.state.userToken}`,
        },
      }
    );
    this.getGroups();
  };
  render() {
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
              <button className={style.CreateGroupBtn}>
                <NavLink
                  className={style.NavLinkBtn + " " + style.NavLinkBtnGroupAdd}
                  to="/profile/groups/add"
                >
                  <Icon
                    icon="ant-design:plus-outlined"
                    color="white"
                    width="20"
                    height="20"
                  />
                  Dodaj grupę
                </NavLink>
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
                {this.state.groups.length > 0
                  ? this.state.groups.map((group) => (
                      <tr key={group.id}>
                        <td>
                          <input type="checkbox" />{" "}
                          <NavLink
                            to={`/profile/groups/${group.id}/members`}
                            className={style.NavGroup}
                          >
                            {group.name}
                          </NavLink>
                        </td>
                        <td>{group.memberCount}</td>
                        <td>
                          {group.adminData.firstName +
                            " " +
                            group.adminData.lastName}
                        </td>
                        <td>{group.incomingEventsCount}</td>

                        <td>
                          {group.adminData.isUserAdmin === true ? (
                            <div onClick={() => this.SetGroupId(group.id)}>
                              <TableRow
                                id="groups"
                                OpenModal={this.OpenModal}
                                groupId={this.state.groupId}
                                visible={this.state.visible}
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
          </div>
        </div>{this.state.show&&
        <DeleteGroup getGroups={this.getGroups} OpenModal={this.OpenModal} groupId={this.state.groupId}/>}
      </div>
    );
  }
}
export default GroupsPage;
