import { Icon } from "@iconify/react";
import React from "react";
import style from "./MainPage.module.css";
import Foto from "../Assets/Brak_zdjecia.png";
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
      places: null,
      userToken: user.token,
      userId: user.userData.id,
      categories: [],
      objFilter: null,
      objects: null,
      objects2:null,
      dist:null,
    };
  }
  componentDidMount() {
    this.getPlaces();
    this.showMyLocation();
  }

  getPlaces = async () => {
    var localisation = [];
    var objects = [];
    const obj = JSON.parse(sessionStorage.getItem("objFilter"));

    var objFilter = "";

    if (obj && obj.length > 0) {
      for (var i = 0; i < obj.length; i++) {
        if (i === 0) {
          objFilter = objFilter.concat("categoryCodes[]=" + obj[0].toString());
        } else {
          objFilter = objFilter.concat("&categoryCodes[]=" + obj[i]);
        }
      }
    }

    const response = await axios.get(
      `http://3.68.195.28/api/places/?${objFilter}`,
      {
        headers: {
          Authorization: `Bearer ${this.state.userToken}`,
        },
      }
    );

    localisation = response.data.places.map((elem) => [
      elem.geolocation,
      elem.name,
      elem.locationCategoryCodes,
      elem.id
    ]);

    objects = response.data.places.map((obj) => {
      if (obj["photoPath"] === null) {
        obj["photoPath"] = Foto;
        return obj;
      } else if (obj.reviewSummary["positivePercent"] === null) {
        obj.reviewSummary["positivePercent"] = 0;
        return obj;
      } else if (obj.reviewSummary["reviewsCount"] === null) {
        obj.reviewSummary["reviewsCount"] = 0;
        return obj;
      } else {
        return obj;
      }
    });
    this.setState({ objects: objects });
    this.setState({ localisation: localisation });
    this.setState({ objFilter: obj });
    this.getCategory();
  };

  getCategory = async () => {
    var places = [];
    const res = await axios.get(`http://3.68.195.28/api/places/?`, {
      headers: {
        Authorization: `Bearer ${this.state.userToken}`,
      },
    });
    places = res.data.places.map((elem) => [elem.locationCategoryCodes]);
    this.setState({ places: places });
    const category = places.map((elem) => [].concat(elem[0])).flat(1);
    const catFilter = category.filter(
      (item, index) => category.indexOf(item) === index
    );
    this.setState({ categories: catFilter });
  };

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

  getDistFilter = (value,dist) =>{
    if(value && dist){
    this.setState({objects2:value, dist:dist})}
    else if(value && !dist){
      this.setState({objects2:value, dist:30000000})
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

  render(
  ) {
    return (this.state.localisation && this.state.objects) ? (
      <div className={style.MainPage}>
        <div className={style.PlacesContainer}>
          <div className={style.SectionHeader}>
            <p className={style.ObjectNumber}>{ (!this.state.objects2)? (this.state.objects.length):(this.state.objects2.length)} miejsc w okolicy </p>
            {this.state.categories.length!==0 ?<button
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
            </button>:<p>...</p>}
          </div>
          <div className={style.ObjectListContainer}>
            <ul className={style.ObjectList}>
              { (!this.state.objects2)? this.state.objects.map((obj, index) => (
                <li key={index}>
                  <NavLink to={`/profile/object/${obj.id}/details`} className={style.ObjecLink}>
                    <div className={style.ListElemnet}>
                      <img src={obj.photoPath} alt="" />
                      <div className={style.ObjectDescribe}>
                        <p className={style.ObjectName}>{obj.name}</p>
                        <p className={style.ObjectOpinions}>
                          <Icon
                            icon="majesticons:percent"
                            color="#857E7B"
                            width="16"
                            height="16"
                          />
                          {obj.reviewSummary.positivePercent} [{obj.reviewSummary.reviewsCount}]
                        </p>
                        <p className={style.ObjecAddress}>{obj.textLocation}</p>

                        <p className={style.ObjectType}>{obj.locationCategoryCodes.map((item)=> `${item} ${'\n'}`)}</p>
                      </div>
                    </div>
                  </NavLink>
                </li>
              )):this.state.objects2.map((obj, index) => (
                <li key={index}>
                  <NavLink to={`/profile/object/${obj.id}/details`}  className={style.ObjecLink}>
                    <div className={style.ListElemnet}>
                      <img src={obj.photoPath} alt="" />
                      <div className={style.ObjectDescribe}>
                        <p className={style.ObjectName}>{obj.name}</p>
                        <p className={style.ObjectOpinions}>
                          <Icon
                            icon="majesticons:percent"
                            color="#857E7B"
                            width="16"
                            height="16"
                          />
                          {obj.reviewSummary.positivePercent} [{obj.reviewSummary.reviewsCount}]
                        </p>
                        
                        <p className={style.ObjecAddress}>{obj.textLocation}</p>
                        
                        <p className={style.ObjectType}>{obj.locationCategoryCodes.map((item)=> `${item} ${'\n'}`)}</p>
                        <p className={style.ObjecDist}>{this.state.dist[index]}</p>
                      </div>
                    </div>
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className={style.MapContainer}>
          <SimpleMap

            mylocalisation={this.state.currentLoc}
            distance={JSON.parse(sessionStorage.getItem("objDistance"))}
            range={JSON.parse(sessionStorage.getItem("objRange"))}
            objects = {this.state.objects}
            getDist={this.getDistFilter}
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
