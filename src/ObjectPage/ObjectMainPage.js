import React from "react";
import { Icon } from "@iconify/react";
import style from "./ObjectMainPage.module.css";
import styleGroup from "../GroupsPage/GroupsPage.module.css";
import Navigation from "../MainPage/MainPageNavi";
import Describe from "./Components/Describe";
import Opinions from "./Components/Opinion";
import Events from "./Components/Events";
import Menu from "./Components/Menu";
import TabContent from "./Components/TabContent";
import { NavLink } from "react-router-dom";
class ObjectPage extends React.Component {
  state = {
    acttiveTab: "describe",
  };
  handleActive(type) {
    this.setState({
      acttiveTab: type,
    });
  }
  render() {
    return (
      <div className={style.MainContainer}>
        <Navigation />
        <div className={style.ObjectContainer}>
          <div className={style.MainBar}>
            <h1>Lorem Ipsum</h1>
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
          <div className={style.SecondBar}>
            <div className={style.Icon}>
              <Icon icon="bx:star" />
            </div>
            <div className={style.AVGNote}>4.8</div>
            <div className={style.Opinions}>6 opinii</div>
            <div className={style.Address}>Potocka 7a</div>
          </div>
          <div className={style.Fotos}></div>
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
          <div>
            <TabContent id="describe" activeTab={this.state.acttiveTab}>
              <Describe />
            </TabContent>
            <TabContent id="opinions" activeTab={this.state.acttiveTab}>
              <Opinions />
            </TabContent>
            <TabContent id="events" activeTab={this.state.acttiveTab}>
              <Events />
            </TabContent>
            <TabContent id="menu" activeTab={this.state.acttiveTab}>
              <Menu />
            </TabContent>
          </div>
        </div>
      </div>
    );
  }
}
export default ObjectPage;
