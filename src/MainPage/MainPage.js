import { Icon } from "@iconify/react";
import React from "react";
import style from "./MainPage.module.css";
import Navigation from "./MainPageNavi.js";
import Foto from "../Assets/section2_photo.jpg";
import { NavLink } from "react-router-dom";
import UserProfile from "./ModalWindows/UserProfile.js";
import ModalWindow from "./ModalWindows/Modal";
class MainPage extends React.Component {
  state = {
    openModal: false,
  };
  OpenModal = () => {
    this.setState({
      openModal: true,
    });
  };
  CloseModal = () => {
    this.setState({
      openModal: false,
    });
  };
  render() {
    return (
      <div className={style.MainPage}>
        <Navigation OpenModal={this.OpenModal} />
        <div className={style.PlacesContainer}>
          <div className={style.SectionHeader}>
            <p className={style.ObjectNumber}>68 miejsc w okolicy</p>
            <button className={style.FilterButton}>
              <Icon
                icon="bx:filter-alt"
                color="#122c34"
                width="14"
                height="14"
              />
              Filtruj
            </button>
          </div>
          <div className={style.ObjectListContainer}>
            <ul className={style.ObjectList}>
              <li>
                <NavLink to="/profile/object">
                  <div className={style.ListElemnet}>
                    <img src={Foto} alt="" />
                    <div className={style.ObjectDescribe}>
                      <p className={style.ObjectName}>Restauracja Nova</p>
                      <p className={style.ObjectOpinions}>
                        <Icon
                          icon="majesticons:percent"
                          color="#857E7B"
                          width="16"
                          height="16"
                        />
                        78 [6]
                      </p>
                      <p className={style.ObjecAddress}>450m Potocka 7a</p>
                      <p className={style.ObjectType}>Restauracja</p>
                    </div>
                  </div>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
        <div className={style.MapContainer}>
          <ModalWindow
            openModal={this.state.openModal}
            onClose={!this.state.openModal}
          >
            <UserProfile CloseModal={this.CloseModal} />
          </ModalWindow>
        </div>
      </div>
    );
  }
}

export default MainPage;
