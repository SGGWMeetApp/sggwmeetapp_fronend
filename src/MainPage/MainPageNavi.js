import React from "react";
import style from "./MainPageNavi.module.css";
import { NavLink } from "react-router-dom";
import { Icon } from "@iconify/react";
import UserAvatar from "../Assets/User-avatar.svg";
import ProfileMenu from "./ProfileMenu.js";
import axios from "axios";
import Settings from "./ModalWindows/UserSettings";
import ModalWindow from "./ModalWindows/Modal";
import UserProfile from "./ModalWindows/UserProfile.js";
class Navigation extends React.Component {
  constructor() {
    let user = JSON.parse(localStorage.getItem("user"));

    super();
    this.state = {
      openModal: false,
      openSetting: false,
      visible: false,
      user: user,
      userInfo: {},
      userToken: user.token,
    };
  }

  handleVisible = () => {
    this.setState({ visible: !this.state.visible });
  };

  handleVisibleCl = () => {
    this.setState({ visible: false });
  };

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    await axios
      .get(`http://3.68.195.28/api/users/${this.state.user.userData.id}`, {
        headers: {
          Authorization: `Bearer ${this.state.user.token}`,
        },
      })
      .then((response) => this.setState({ userInfo: response.data.userData }));
  };

  OpenModal = (id) => {
    if (id === "filter") {
      this.setState({
        openFilter: !this.state.openFilter,
      });
    } else if (id === "settings") {
      this.setState({
        openSetting: !this.state.openSetting,
      });
    } else {
      this.setState({
        openModal: !this.state.openModal,
      });
    }
  };

  CloseModal = (id) => {
    if (id === "filter") {
      this.setState({
        openFilter: false,
      });
    } else if (id === "settings") {
      this.setState({
        openSetting: false,
      });
    } else {
      this.setState({
        openModal: false,
      });
    }
  };
  render() {
    const userInfo = this.state.userInfo;
    if (!userInfo) {
      return <div className={style.NaviBar}>Loading...</div>;
    }
    let fotoUrl = null;
    if (userInfo.avatarFoto) {
      fotoUrl = userInfo.avatarFoto;
    } else {
      fotoUrl = UserAvatar;
    }
    return (
      <nav className={style.NaviBar}>
        <div className={style.Logo}>
          <NavLink className={style.LogoLink} to="/">
            Brand <Icon icon="bxs:book-reader" color="#85c9b9" />
          </NavLink>
        </div>

        <div className={style.NavContainer}>
          <NavLink className={style.MapContainer} to="/profile">
            Mapa
            <Icon
              icon="akar-icons:map"
              color="#85c9b9"
              width="20"
              height="18"
            />
          </NavLink>
          <NavLink className={style.EventsContainer} to="/profile/events">
            Wydarzenia
            <Icon
              icon="ic:baseline-event"
              color="#122c34"
              width="18"
              height="20"
            />
          </NavLink>
          <NavLink className={style.GroupContainer} to="/profile/groups">
            Grupy
            <Icon icon="bx:group" color="#122c34" width="20" height="20" />
          </NavLink>

          <button
            className={style.UserContainer}
            onClick={this.handleVisible.bind(this, "filter")}
          >
            {userInfo.firstName} {userInfo.lastName}{" "}
            <img src={fotoUrl} alt="User Foto" />
          </button>
          {this.state.visible && (
            <ProfileMenu
              visible={this.handleVisibleCl}
              OpenModal={this.OpenModal}
              user={userInfo}
              GetData={this.getData}
            />
          )}
        </div>
        <ModalWindow
          openModal={this.state.openModal}
          onClose={!this.state.openModal}
        >
          <UserProfile
            CloseModal={this.CloseModal}
            user={this.state.userInfo}
            token={this.state.userToken}
            id={this.state.user.userData.id}
            getData={this.getData}
          />
        </ModalWindow>
        <ModalWindow
          openModal={this.state.openSetting}
          onClose={!this.state.openSetting}
        >
          <Settings
            CloseModal={this.CloseModal}
            id={this.state.user.userData.id}
            token={this.state.userToken}
          />
        </ModalWindow>
      </nav>
    );
  }
}

export default Navigation;
