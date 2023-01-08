import React from "react";
import { Icon } from "@iconify/react";
import style from "./ObjectMainPage.module.css";
import styleGroup from "../GroupsPage/GroupsPage.module.css";
import Describe from "./Components/Describe";
import Opinions from "./Components/Opinion";
import Events from "./Components/Events";
import Menu from "./Components/Menu";
import TabContent from "./Components/TabContent";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { DualRingLoader } from "../Loaders/Loaders";
class ObjectPage extends React.Component {
  constructor(props) {
    let user = JSON.parse(localStorage.getItem("user"));

    super(props);
    this.state = {
      acttiveTab: "describe",
      id: undefined,
      userToken: user.token,
      describe: undefined,
      name: undefined,
      photo: undefined,
      rating: undefined,
      reviews: undefined,
      location: undefined,
      events: [],
      loading: true,
      menu_url: null,
    };
  }
  handleActive(type) {
    this.setState({
      acttiveTab: type,
    });
  }
  componentDidMount() {
    this.setState({ id: +window.location.pathname.split("/")[3] });
    this.getDetails();
    this.getEvents(+window.location.pathname.split("/")[3]);
  }
  getDetails = async () => {
    const id= +window.location.pathname.split("/")[3]
    const response = await axios.get(`http://3.68.195.28/api/places/${id}/`, {
      headers: {
        Authorization: `Bearer ${this.state.userToken}`,
      },
    });
    this.setState({
      name: response.data.name,
      location: response.data.textLocation,
      describe: response.data.description,
      rating: response.data.rating,
      loading: false,
      reviews: response.data.rating.reviews,
      menu_url: response.data.menuPath,
    });
    if (response.data.photoPath) {
      this.setState({ photo: response.data.photoPath });
    }
  };
  getEvents = async (id) => {
    const response = await axios.get(
      `http://3.68.195.28/api/places/${id}/events`,
      {
        headers: {
          Authorization: `Bearer ${this.state.userToken}`,
        },
      }
    );
    if (response.data.events.length > 0) {
      this.setState({ events: response.data.events });
    }
  };
  render() {
    return (
      <div className={style.MainContainer}>
        <div className={style.ObjectContainer}>
          {this.state.loading ? (
            <DualRingLoader />
          ) : (
            <div className={style.MainBar}>
              <h1>{this.state.name}</h1>
              <button className={styleGroup.BackMapBtn}>
                <NavLink className={styleGroup.NavLinkBtn} to="/profile">
                  <Icon
                    icon="akar-icons:arrow-left"
                    color="#122c34"
                    width="20"
                    height="20"
                  />
                  Wróć do mapy
                </NavLink>
              </button>
            </div>
          )}
          <div className={style.SecondBar}>
            {this.state.rating ? (
              this.state.rating.positivePercent ? (
                <div className={style.AVGNote}>
                  {this.state.rating.positivePercent}% poleca miejsce
                </div>
              ) : (
                <p style={{ width: "0" }}></p>
              )
            ) : (
              <p></p>
            )}
            {this.state.reviews ? (
              <div className={style.Opinions}>
                {this.state.reviews.length} opini ogółem
              </div>
            ) : (
              <p></p>
            )}
          </div>

          <img
            className={style.Fotos}
            src={this.state.photo}
            alt="Brak zdjęć dla tego miejsca"
          />

          <div className={style.NaviComponents}>
            <ul className={style.NaviList}>
              <li
                onClick={this.handleActive.bind(this, "describe")}
                className={
                  this.state.acttiveTab === "describe" ? `${style.active}` : ``
                }
              >
                Opis
              </li>
              <li
                onClick={this.handleActive.bind(this, "opinions")}
                className={
                  this.state.acttiveTab === "opinions" ? `${style.active}` : ``
                }
              >
                Opinie
              </li>
              <li
                onClick={this.handleActive.bind(this, "events")}
                className={
                  this.state.acttiveTab === "events" ? `${style.active}` : ``
                }
              >
                Wydarzenia
              </li>
              <li
                onClick={this.handleActive.bind(this, "menu")}
                className={
                  this.state.acttiveTab === "menu" ? `${style.active}` : ``
                }
              >
                Menu
              </li>
            </ul>
          </div>
          <div style={{ width: "100%" }}>
            <TabContent id="describe" activeTab={this.state.acttiveTab}>
              <Describe describe={this.state.describe} />
            </TabContent>
            <TabContent id="opinions" activeTab={this.state.acttiveTab}>
              <Opinions rating={this.state.rating} objId={this.state.id} getDetails={this.getDetails}/>
            </TabContent>
            <TabContent id="events" activeTab={this.state.acttiveTab}>
              <Events events={this.state.events} />
            </TabContent>
            <TabContent id="menu" activeTab={this.state.acttiveTab}>
              <Menu menu_url={this.state.menu_url} />
            </TabContent>
          </div>
        </div>
      </div>
    );
  }
}
export default ObjectPage;
