import { Icon } from "@iconify/react";
import React from "react";
import style from "./MainPage.module.css";
import Foto from "../Assets/section2_photo.jpg";
import { NavLink } from "react-router-dom";
import Filter from "./ModalWindows/Filter";
import ModalWindow from "./ModalWindows/Modal";
import SimpleMap from "./Map";
import axios from "axios";
class MainPage extends React.Component {
  constructor() {
    let user = JSON.parse(localStorage.getItem("user"));
    super();
    this.state = {
      openFilter: false,
      localisation: null,
      places:null,
      userToken: user.token,
      userId: user.userData.id,
      categories:[],
      objFilter:null,
    };
  }
  componentDidMount() {
    this.getPlaces();
    this.showMyLocation();
  }

  getPlaces = async () => {
    var localisation = [];
    const obj =JSON.parse(sessionStorage.getItem("objFilter"));
    var objFilter ="";
    if(obj&&obj.length>0){
      for(var i=0;i<obj.length;i++){
        if(i===0){
          objFilter= objFilter.concat("categoryCodes[]="+ (obj[0]).toString())
        }
        else{
         objFilter= objFilter.concat("&categoryCodes[]="+obj[i])
        }
      }
    }
    const response = await axios.get(`http://3.68.195.28/api/places/?${objFilter}`, {
      headers: {
        Authorization: `Bearer ${this.state.userToken}`,
      },
    });
    localisation = response.data.places.map((elem) => [
      elem.geolocation,
      elem.name,
      elem.locationCategoryCodes,
    ]);
    this.setState({ localisation: localisation });
    this.setState({objFilter:obj});
    this.getCategory();
  };
  
  getCategory =async()=>{
    var places=[];
    const res = await axios.get(`http://3.68.195.28/api/places/?`, {
      headers: {
        Authorization: `Bearer ${this.state.userToken}`,
      },
    });
    places = res.data.places.map((elem) => [
      elem.locationCategoryCodes,
    ]);
    this.setState({ places: places });
    const category = places.map((elem) => [].concat(elem[0])).flat(1);
    const catFilter = category.filter(
      (item, index) => category.indexOf(item) === index
    );
   this.setState({categories:catFilter})
  }
  showMyLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) =>
        this.setState((prevState) => ({
          currentLoc: {
            ...prevState.currentLoc,
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          },
        }))
      );
    }
  };

  OpenModal = (id) => {
    if (id === "filter") {
      this.setState({
        openFilter: !this.state.openFilter,
      });
    }
  };

  CloseModal = (id) => {
    if (id === "filter") {
      this.setState({
        openFilter: false,
      });
    }
  };

  render() {
    return this.state.localisation ? (
      <div className={style.MainPage}>
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
          <SimpleMap
            localisation={this.state.localisation}
            mylocalisation={this.state.currentLoc}
            distance={JSON.parse(sessionStorage.getItem("objDistance"))}
          />
          <ModalWindow
            openModal={this.state.openFilter}
            onClose={!this.state.openFilter}
          >
            <Filter
              CloseModal={this.CloseModal}
              localisation={this.state.localisation}
              categories={this.state.categories}
              getMap={this.getPlaces}
            />
          </ModalWindow>
        </div>
      </div>
    ) : (
      <div>Loading...</div>
    );
  }
}
export default MainPage;
