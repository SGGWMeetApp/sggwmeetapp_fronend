import React from "react";
import style from "./MainPage.module.css";
import Navigation from "./MainPageNavi.js";
class MainPage extends React.Component {
  render() {
    return (
      <div className={style.MainPage}>
        <Navigation/>
        <div className={style.MapContainer}></div>
        <div className={style.PlacesContainer}></div>
      </div>
    );
  }
}

export default MainPage;