import React from "react";
import style from "../LogInPage/LogInPage.module.css";
import styleRegister from "./RegisterPage.module.css";
import { Icon } from "@iconify/react";
import { NavLink } from "react-router-dom";
import styleHome from "../HomePage/HomePage.module.css";
import Navigation from "../LogInPage/Navigatio";

class RegisterPage extends React.Component {
  render() {
    return (
      <div className={style.LogInContainer}>
        <div className={style.LogInBack}>
          <Navigation />
          <div className={style.LogInWindow} id={styleRegister.RegisterWindow}>
            <div className={styleHome.Logo}>
              Brand <Icon icon="bxs:book-reader" color="#85c9b9" />
            </div>
            <h2 className={style.Header}>Zarejestruj się w serwisie</h2>
            <form>
              <div className={style.LabelGroup}>
                <label className={style.TextInputLabel}>Email</label>
                <input className={style.TextInput} type="email"></input>
              </div>
              <div className={style.LabelGroup}>
                <label className={style.TextInputLabel}>Hasło </label>
                <input className={style.TextInput} type="password"></input>
              </div>
              <div className={style.LabelGroup}>
                <label
                  className={style.TextInputLabel}
                  id={styleRegister.Password}
                >
                  Powtórz hasło{" "}
                </label>
                <input className={style.TextInput} type="password"></input>
              </div>
              <label className={style.CheckInputLabel}>
                <input className={style.CheckInput} type="checkbox"></input>
                <p style={{ margin: "0px" }}>
                  Akceptuje{" "}
                  <NavLink className={style.RegisterLink}>
                    {" "}
                    warunki korzystania{" "}
                  </NavLink>
                  z serwisu
                </p>
              </label>
              <div className={style.Register}>
                <p className={style.RegisterParagraph}>
                  Mam już konto -{" "}
                  <NavLink to="/login" className={style.RegisterLink}>
                    zaloguj
                  </NavLink>{" "}
                </p>
              </div>
              <button className={style.FormLogInButton}>Zarejestruj</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
export default RegisterPage;
