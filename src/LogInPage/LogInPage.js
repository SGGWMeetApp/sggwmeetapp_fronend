import React from "react";
import style from "./LogInPage.module.css";
import styleHome from "../HomePage/HomePage.module.css";
import { Icon } from "@iconify/react";
import { NavLink } from "react-router-dom";
import Navigation from "./Navigatio";
class LogInPage extends React.Component {
  render() {
    return (
      <div className={style.LogInContainer}>
        <div className={style.LogInBack}>
        <Navigation/>
          <div className={style.LogInWindow}>
            <div className={styleHome.Logo}>
              Brand <Icon icon="bxs:book-reader" color="#85c9b9" />
            </div>
            <h2 className={style.Header}>Zaloguj się do serwisu</h2>
            <form>
              <div className={style.LabelGroup}>
                <label className={style.TextInputLabel}>Email</label>
                <input className={style.TextInput} type="email"></input>
              </div>
              <div className={style.LabelGroup}>
                <label className={style.TextInputLabel}>Hasło </label>
                <input className={style.TextInput} type="password"></input>
              </div>
              <label className={style.CheckInputLabel}>
                <input className={style.CheckInput} type="checkbox"></input>
                Nie wylogowywuj mnie na tym urządzeniu
              </label>
              <div className={style.Register}>
                <p className={style.RegisterParagraph}>
                  Nie masz jeszcze konta -{" "}
                  <NavLink to="/register" className={style.RegisterLink}>zarejestruj</NavLink>{" "}
                </p>
              </div>
              <button className={style.FormLogInButton}><NavLink className={style.LogInBtn} to="/profile">Zaloguj</NavLink></button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
export default LogInPage;
