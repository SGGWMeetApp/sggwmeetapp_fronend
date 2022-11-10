import React from "react";
import style from "./MainPageNavi.module.css";
import { NavLink } from "react-router-dom";
import { Icon } from "@iconify/react";
import Foto from "../Assets/section2_photo.jpg";
import ProfileMenu from "./ProfileMenu.js"
class Navigation extends React.Component {
  state={
    visible:false,
  }
  handleVisible =()=>{
    this.setState({ visible: !this.state.visible });
  }
  render(){
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
          <Icon icon="akar-icons:map" color="#85c9b9" width="20" height="18" />
        </NavLink>
        <NavLink className={style.EventsContainer}>
          Wydarzenia
          <Icon
            icon="ic:baseline-event"
            color="#122c34"
            width="18"
            height="20"
          />
        </NavLink>
        <NavLink className={style.GroupContainer} to="/profile/groups">
          Grupy <Icon icon="bx:group" color="#122c34" width="20" height="20" />
        </NavLink>
        <button className={style.UserContainer} onClick={this.handleVisible.bind(this)}>
          Andrzej Wajda <img src={Foto} alt="User Foto" />
        </button>
        {this.state.visible && <ProfileMenu/>}
      </div>
    </nav>
  );
  };
}

export default Navigation;
