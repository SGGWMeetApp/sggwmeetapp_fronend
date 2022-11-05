import React from "react";
import style from "./MainPage.css";
import { Icon } from "@iconify/react";
import Icon2 from "../Assets/hero_icon.svg";
import Foto from "../Assets/section2_photo.jpg";

const MainPage = () => {
  return (
    <div style={style} className={"MainContainer"}>
      <div style={style} className={"HelloContainer"}>
        <div style={style} className={"HeroSection"}>
          <nav style={style} className={"NaviBar"}>
            <div style={style} className={"Logo"}>
              Brand <Icon icon="bxs:book-reader" color="#85c9b9" />
            </div>
            <ul style={style} className={"NavList"}>
              <li style={style} className={"NavListElement"}>
                Home
              </li>
              <li style={style} className={"NavListElement"}>
                Miejsca
              </li>
              <li style={style} className={"NavListElement"}>
                Wydarzenia
              </li>
              <li style={style} className={"NavListElement"}>
                Log In
              </li>
            </ul>
            <button style={style} className={"SignButton"}>
              Sign Up
            </button>
          </nav>
          <h1 style={style} className="HelloBanner">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </h1>
          <h2 style={style} className="HelloBanner2">
            {" "}
            Lorem ipsum consectetur adipiscing elit.
          </h2>
          <p style={style} className="HelloPara">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla fusce
            maecenas lacus enim parturient nulla. Ac leo augue fames aliquam.
          </p>
          <table style={style} className="StatisticTable">
            <thead>
              <tr>
                <th style={{ width: "100px", textAlign: "left" }}>400+</th>
                <th style={{ width: "120px" }}>170+</th>
                <th style={{ width: "100px" }}>2100+</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ textAlign: "left" }}>Hosted events</td>
                <td style={{ width: "100px" }}>Meeting places</td>
                <td style={{ width: "100px" }}>Active users</td>
              </tr>
            </tbody>
          </table>
          <button style={style} className={"SignButton2"}>
            Sign Up
          </button>
          <img className="VectorIcons" src={Icon2} alt="" />
        </div>
      </div>
      <div style={style} className="PointsContainer">
        <div style={style} className="PointsSection">
          <div>
            <img className="Foto" src={Foto} alt="" />
          </div>

          <ul style={style} className="PointsList">
            <li style={style} className="PointsListElement">
              Znajdź swoją przestrzeń
            </li>
            <li style={style} className="PointsListElement">
              Kiedy On-line nie wystarcza
            </li>
            <li style={style} className="PointsListElement">
              Good food=good talk
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
export default MainPage;
