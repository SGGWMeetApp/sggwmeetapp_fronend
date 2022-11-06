import React from "react";
import style from "./HomePage.module.css";
import { Icon } from "@iconify/react";
import Icon2 from "../Assets/hero_icon.svg";
import Foto from "../Assets/section2_photo.jpg";

class HomePage extends React.Component {
  render() {
    return (
      <div className={style.MainContainer}>
        <div className={style.HelloContainer}>
          <div className={style.HeroSection}>
            <nav className={style.NaviBar}>
              <div className={style.Logo}>
                Brand <Icon icon="bxs:book-reader" color="#85c9b9" />
              </div>
              <ul className={style.NavList}>
                <li className={style.NavListElement}>Home</li>
                <li className={style.NavListElement}>Miejsca</li>
                <li className={style.NavListElement}>Wydarzenia</li>
                <li className={style.NavListElement}>Log In</li>
              </ul>
              <button className={style.SignButton}>Sign Up</button>
            </nav>
            <h1 className={style.HelloBanner}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </h1>
            <h2 className={style.HelloBanner2}>
              Lorem ipsum consectetur adipiscing elit.
            </h2>
            <p className={style.HelloPara}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
              fusce maecenas lacus enim parturient nulla. Ac leo augue fames
              aliquam.
            </p>
            <table className={style.StatisticTable}>
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
            <button className={style.SignButton2}>Sign Up</button>
            <img className={style.VectorIcons} src={Icon2} alt="" />
          </div>
        </div>
        <div className={style.PointsContainer}>
          <div className={style.PointsSection}>
            <div style={{ width: "480px" }}>
              <img className={style.Foto} src={Foto} alt="" />
            </div>
            <div>
              <ul className={style.PointsList}>
                <li className={style.PointsListElement}>
                  Znajdź swoją przestrzeń
                  <p className={style.ItemDescription}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Fringilla massa lorem lorem maecenas sed elit quis ornare.
                    Enim, et nec pharetra dolor libero.
                  </p>
                </li>
                <li className={style.PointsListElement}>
                  Kiedy On-line nie wystarcza
                  <p className={style.ItemDescription}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Fringilla massa lorem lorem maecenas sed elit quis ornare.
                    Enim, et nec pharetra dolor libero.
                  </p>
                </li>
                <li className={style.PointsListElement}>
                  Good food=good talk
                  <p className={style.ItemDescription}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Fringilla massa lorem lorem maecenas sed elit quis ornare.
                    Enim, et nec pharetra dolor libero.
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className={style.MapContainer}>
          <div className={style.Gradient}></div>
          <div className={style.MapInformaton}>
            <h1 className={style.MapInformatonHeader}>
              Wszystkie miejsca w jednej aplikacji
            </h1>
            <div className={style.PinInteresContainer}>
              <div className={style.PinInteres}>
                <Icon
                  icon="game-icons:three-friends"
                  color="#122c34"
                  width="40"
                  height="40"
                />
              </div>
              <p className={style.DescribePin}>Ciekawe miejsca spotkań</p>
            </div>
            <div className={style.PinFriendsContainer}>
              <div className={style.PinFriends}>
                <Icon icon="bxs:user" color="#122c34" width="50" height="50" />
              </div>
              <p className={style.DescribePin}>Twoi znajomi</p>
            </div>
            <div className={style.PinLibContainer}>
              <div className={style.PinLib}>
                <Icon
                  icon="bx:book-reader"
                  color="#122c34"
                  width="40"
                  height="40"
                />
              </div>
              <p className={style.DescribePin}>Biblioteki</p>
            </div>
            <div className={style.PinRestaurantContainer}>
              <div className={style.PinRestaurant}>
                <Icon
                  icon="bx:restaurant"
                  color="#122c34"
                  width="40"
                  height="40"
                />
              </div>
              <p className={style.DescribePin}>Restauracje</p>
            </div>
          </div>
        </div>
        <div className={style.OpinionContainer}>
          <div className={style.OpinionSection}>
            <button className={style.Previous}>
              <Icon
                icon="ant-design:arrow-left-outlined"
                color="#f5edf0"
                width="34"
                height="34"
              />
            </button>
            <h2 className={style.OpinionText}>
              Quisque orci erat rhoncus, cras adipiscing. Arcu gravida sed cras
              urna. Purus scelerisque faucibus dolor curabitur cras volutpat
              nisi, facilisis
            </h2>
            <p className={style.OpinionAuth}>Jan Kowalski</p>
            <button className={style.Next}>
              <Icon
                icon="ant-design:arrow-right-outlined"
                color="#f5edf0"
                width="34"
                height="34"
              />
            </button>
          </div>
        </div>
        <div className={style.InformationContainer}>
          <div className={style.InformationSection}>
            <div className={style.Logo2}>
              Brand
              <Icon
                icon="bxs:book-reader"
                color="#ffffff"
                width="40"
                height="38"
              />
            </div>
            <table className={style.InfoTable}>
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
            <div className={style.Social}>
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
          <div className={style.AuthInfo}>
            <p className={style.AuthInfoParagraph}>© WZiM MGR R1S2</p>
            <p className={style.AuthInfoParagraph}>Powered by SGGW</p>
          </div>
        </div>
      </div>
    );
  }
}
export default HomePage;
