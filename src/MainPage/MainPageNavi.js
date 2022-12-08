import React from "react";
import style from "./MainPageNavi.module.css";
import { NavLink } from "react-router-dom";
import { Icon } from "@iconify/react";
import UserAvatar from "../Assets/User-avatar.svg";
import ProfileMenu from "./ProfileMenu.js";
class Navigation extends React.Component {
  state = {
    visible: false,
    OpenModal: this.props.OpenModal,
    user:JSON.parse(localStorage.getItem('user')),

  };

  handleVisible = () => {
    this.setState({ visible: !this.state.visible });
  };
  handleVisibleCl = () => {
    this.setState({ visible: false });
  };


  render() {
    const user = this.state.user
    let fotoUrl=null;
    if (user.userData.avatarFoto){
      fotoUrl=user.userData.avatarFoto;
    }
    else{
      fotoUrl=UserAvatar;
    }
    return (
      <nav className={style.NaviBar}>
        <div className={style.Logo}>
          <NavLink className={style.LogoLink} to="/">
            Brand <Icon icon="bxs:book-reader" color="#85c9b9" />
          </NavLink>
        </div>
        <div className={style.InputContainer}>
          <input className={style.SearchInput} placeholder="Wyszukaj..." />
          <Icon
            className={style.SearchIcon}
            icon="bx:search"
            width="24px"
            height="24px"
            color="122C34"
          />
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
            {user.userData.firstName} {user.userData.lastName} <img src={fotoUrl} alt="User Foto" />
          </button>
            {this.state.visible && (
              <ProfileMenu visible={this.handleVisibleCl} OpenModal={this.state.OpenModal} user={user.userData} />
            )}
        </div>
      </nav>
    );
  }
}

export default Navigation;
