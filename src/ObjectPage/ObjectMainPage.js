import React from "react";
import { Icon } from "@iconify/react";
import style from "./ObjectMainPage.module.css";
import styleGroup from "../GroupsPage/GroupsPage.module.css";
import Navigation from "../MainPage/MainPageNavi";
import Describe from "./Describe";
import Opinions from "./Opinion";
class ObjectPage extends React.Component {
  render() {
    return (
      <div className={style.MainContainer}>
        <Navigation />
        <div className={style.ObjectContainer}>
          <div className={style.MainBar}>
            <h1>Lorem Ipsum</h1>
            <button className={styleGroup.BackMapBtn}>
              <Icon
                icon="akar-icons:arrow-left"
                color="#122c34"
                width="20"
                height="20"
              />
              Wróć do mapy
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
          <div className={style.NaviComponents}></div>
          <div>  
            <Describe/>
            <Opinions/>
          </div>
        </div>
      </div>
    );
  }
}
export default ObjectPage;
