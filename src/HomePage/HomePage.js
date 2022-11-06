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
          <div style={{ width: "480px" }}>
            <img className="Foto" src={Foto} alt="" />
          </div>
          <div>
            <ul style={style} className="PointsList">
              <li style={style} className="PointsListElement">
                Znajdź swoją przestrzeń
                <p style={style} className="ItemDescription">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Fringilla massa lorem lorem maecenas sed elit quis ornare.
                  Enim, et nec pharetra dolor libero.
                </p>
              </li>
              <li style={style} className="PointsListElement">
                Kiedy On-line nie wystarcza
                <p style={style} className="ItemDescription">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Fringilla massa lorem lorem maecenas sed elit quis ornare.
                  Enim, et nec pharetra dolor libero.
                </p>
              </li>
              <li style={style} className="PointsListElement">
                Good food=good talk
                <p style={style} className="ItemDescription">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Fringilla massa lorem lorem maecenas sed elit quis ornare.
                  Enim, et nec pharetra dolor libero.
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div style={style} className="MapContainer">
        <div style={style} className="Gradient"></div>
        <div style={style} className="MapInformaton">
          <h1 style={style} className="MapInformatonHeader">
            Wszystkie miejsca w jednej aplikacji
          </h1>
          <div style={style} className="PinInteresContainer">
            <div style={style} className="PinInteres">
              <Icon
                icon="game-icons:three-friends"
                color="#122c34"
                width="40"
                height="40"
              />
            </div>
            <p style={style} className="DescribePin">
              Ciekawe miejsca spotkań
            </p>
          </div>
          <div style={style} className="PinFriendsContainer">
            <div style={style} className="PinFriends">
              <Icon icon="bxs:user" color="#122c34" width="50" height="50" />
            </div>
            <p style={style} className="DescribePin">
              Twoi znajomi
            </p>
          </div>
          <div style={style} className="PinLibContainer">
            <div style={style} className="PinLib">
              <Icon
                icon="bx:book-reader"
                color="#122c34"
                width="40"
                height="40"
              />
            </div>
            <p style={style} className="DescribePin">
              Biblioteki
            </p>
          </div>
          <div style={style} className="PinRestaurantContainer">
            <div style={style} className="PinRestaurant">
              <Icon
                icon="bx:restaurant"
                color="#122c34"
                width="40"
                height="40"
              />
            </div>
            <p style={style} className="DescribePin">
              Restauracje
            </p>
          </div>
        </div>
      </div>
      <div style={style} className="OpinionContainer">
        <div style={style} className="OpinionSection">
          <button style={style} className="Previous">
            <Icon
              icon="ant-design:arrow-left-outlined"
              color="#f5edf0"
              width="34"
              height="34"
            />
          </button>
          <h2 style={style} className="OpinionText">
            Quisque orci erat rhoncus, cras adipiscing. Arcu gravida sed cras
            urna. Purus scelerisque faucibus dolor curabitur cras volutpat nisi,
            facilisis
          </h2>
          <p style={style} className="OpinionAuth">
            Jan Kowalski
          </p>
          <button style={style} className="Next">
            <Icon
              icon="ant-design:arrow-right-outlined"
              color="#f5edf0"
              width="34"
              height="34"
            />
          </button>
        </div>
      </div>
      <div style={style} className="InformationContainer">
        <div style={style} className="InformationSection">
          <div style={style} className={"Logo2"}>
            Brand{" "}
            <Icon
              icon="bxs:book-reader"
              color="#ffffff"
              width="40"
              height="38"
            />
          </div>
          <table style={style} className="InfoTable">
            <thead>
              <tr>
                <th>Info</th>
                <th>Mapa</th>
                <th>Użytkownicy</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>O nas</td>
                <td>Obiekty</td>
                <td>Zaloguj</td>
              </tr>
              <tr>
                <td>Kontakt</td>
                <td>Eventy</td>
                <td>Zarejestruj</td>
              </tr>
              <tr>
                <td>Regulamin</td>
              </tr>
            </tbody>
          </table>
          <div style={style} className="Social">
            <Icon
              icon="cib:facebook-f"
              color="#857e7b"
              width="24"
              height="24"
            />
            <Icon
              icon="ant-design:instagram-filled"
              color="#857e7b"
              width="24"
              height="24"
            />
            <Icon
              icon="ant-design:twitter-outlined"
              color="#857e7b"
              width="24"
              height="24"
            />
            <Icon
              icon="ant-design:youtube-filled"
              color="#857e7b"
              width="24"
              height="24"
            />
          </div>
        </div>
        <div style={style} className="AuthInfo">
          <p style={style} className="AuthInfoParagraph">
            © WZiM MGR R1S2
          </p>
          <p style={style} className="AuthInfoParagraph">
            Powered by SGGW
          </p>
        </div>
      </div>
    </div>
  );
};
export default MainPage;
