import { Icon } from "@iconify/react";
import React from "react";
import style from "./MainPage.module.css";
import Navigation from "./MainPageNavi.js";
import Foto from "../Assets/section2_photo.jpg";
import { NavLink } from "react-router-dom";
import UserProfile from "./ModalWindows/UserProfile.js";
import Filter from "./ModalWindows/Filter";
import Settings from "./ModalWindows/UserSettings";
import ModalWindow from "./ModalWindows/Modal";
import SimpleMap from "./Map";
import axios from "axios";

class MainPage extends React.Component {
  constructor(){
    let user = JSON.parse(localStorage.getItem('user'));
    super();
    this.state = {
      openModal: false,
      openFilter: false,
      openSetting: false,
      localisation:[],
      user:user,
    };
  }


  componentDidMount() {
    this.getPlaces();
    this.showMyLocation()
  
  }
  getPlaces = async () => {
    var localisation=[];
    const response = await axios.get("http://3.68.195.28/api/places", {
      headers: {
        Authorization: `Bearer ${this.state.user.token}`,
      },
    });
    for(var i=0; i<response.data.places.length;i++){
      localisation[i]=[response.data.places[i].geolocation,response.data.places[i].name]
      
    }
    this.setState({localisation:localisation})
  };
  showMyLocation=()=>{
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(
        position =>
        this.setState(prevState=>({
          currentLoc:{
            ...prevState.currentLoc,
            lat: position.coords.latitude,
            lng: position.coords.longitude
          },
        }))
      )
    }
  }
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
    return (
      <div className={style.MainPage}>
        <Navigation OpenModal={this.OpenModal} />
        <div className={style.PlacesContainer}>
          <div className={style.SectionHeader}>
            <p className={style.ObjectNumber}>68 miejsc w okolicy </p>
            <button
              className={style.FilterButton}
              onClick={this.OpenModal.bind(this, "filter")}
            >
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
          <SimpleMap localisation={this.state.localisation} mylocalisation={this.state.currentLoc}/>
          <ModalWindow
            openModal={this.state.openModal}
            onClose={!this.state.openModal}
          >
            <UserProfile CloseModal={this.CloseModal} />
          </ModalWindow>
          <ModalWindow
            openModal={this.state.openFilter}
            onClose={!this.state.openFilter}
          >
            <Filter CloseModal={this.CloseModal} />
          </ModalWindow>
          <ModalWindow
            openModal={this.state.openSetting}
            onClose={!this.state.openSetting}
          >
            <Settings CloseModal={this.CloseModal} />
          </ModalWindow>
        </div>
      </div>
    );
  }
}

export default MainPage;
