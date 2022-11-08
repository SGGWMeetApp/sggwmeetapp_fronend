import { Icon } from "@iconify/react";
import React from "react";
import style from "./MainPage.module.css";
import Navigation from "./MainPageNavi.js";
class MainPage extends React.Component {
  render() {
    return (
      <div className={style.MainPage}>
        <Navigation />
        <div className={style.PlacesContainer}>
          <button className={style.FilterButton}>
            <Icon icon="bx:filter-alt" color="#122c34" width="14" height="14" />
            Filtruj
          </button>
        </div>
      </div>
    );
  }
}

export default MainPage;
