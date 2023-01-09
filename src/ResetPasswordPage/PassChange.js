import React from "react";
import style from "../LogInPage/LogInPage.module.css";
import styleRegister from "./ResetPasswordPage.module.css";
import { Icon } from "@iconify/react";
import { Navigate, NavLink } from "react-router-dom";
import styleHome from "../HomePage/HomePage.module.css";
import { SmallDualRingLoader } from "../Loaders/Loaders";

const REGISTER_URL = window.location.href;

class PassChange extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      passwordOld: "",
      password1: "",
      password2: "",
      error: null,
      checked: false,
      loading: false,
      redirect: false,
      message: "",
    };
  }

  getFormData(e) {
    this.setState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
      error: null,
    }));
  }

  getUserData(e) {
    this.setState((prevState) => ({
      userData: {
        ...prevState.userData,
        [e.target.name]: e.target.value,
      },
      error: null,
    }));
  }

  async handleSubmit(e) {
    e.preventDefault();
    if (
      !this.state.passwordOld ||
      !this.state.password1 ||
      !this.state.password2
    ) {
      this.setState({ error: "Uzupełnij wszystkie pola" });
    } else if (this.state.password1 !== this.state.password2) {
      this.setState({ error: "Pola nowe hasło i powtórz nowe hasło różnią się od siebie" });
    } else {
      this.setState({ message: "Hasło zostało zmienione" });
      this.handleRegister();
    }
  }

  async handleRegister() {
    this.setState({ loading: true });

    const response = await fetch(REGISTER_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        password: this.state.passwordOld,
        first: this.state.password1,
        second: this.state.password2
      }),
    });

    const json = await response.json();
    if (response.ok) {
      this.setState({ loading: false, redirect: true });
      localStorage.setItem("user", JSON.stringify(json));
    }
    if (!response.ok) {
      this.setState({
        error: json.message,
        loading: false,
      });
    }
  }

  render() {
    return (
      <div
        className={style.LogInContainer}
        id={styleRegister.RegisterContainer}
      >
        {console.log(window.location.href)}
        <div className={style.LogInBack} id={styleRegister.RegisterInBack}>
          <div className={style.LogInWindow} id={styleRegister.RegisterWindow}>
            <div className={styleHome.Logo}>
              SGGW MeetApp <Icon icon="bxs:book-reader" color="#85c9b9" />
            </div>
            <h2 className={style.Header}>Zresetuj hasło</h2>
            <div className={styleRegister.ErrorContainer}>
              {this.state.error && (
                <p className={styleRegister.ErrorMessage}>{this.state.error}</p>
              )}
              {this.state.message && (
                <p className={styleRegister.Message}>{this.state.message}</p>
              )}
            </div>
            <form onSubmit={(e) => this.handleSubmit(e)}>
              <div className={style.LabelGroup}>
                <label className={style.TextInputLabel}>Stare hasło</label>
                <input
                  className={style.TextInput}
                  type="password"
                  name="passwordOld"
                  value={this.state.passwordOld}
                  onChange={(e) => this.getFormData(e)}
                ></input>
              </div>
              <div className={style.LabelGroup}>
                <label className={style.TextInputLabel}>Nowe hasło</label>
                <input
                  className={style.TextInput}
                  type="password"
                  name="password1"
                  value={this.state.password1}
                  onChange={(e) => this.getFormData(e)}
                ></input>
              </div>
              <div className={style.LabelGroup}>
                <label className={style.TextInputLabel}>
                  Powtórz nowe hasło
                </label>
                <input
                  className={style.TextInput}
                  type="password"
                  name="password2"
                  value={this.state.password2}
                  onChange={(e) => this.getFormData(e)}
                ></input>
              </div>
              <button className={style.FormLogInButton}>
                {(this.state.loading && <SmallDualRingLoader />) ||
                  "Resetuj hasło"}
              </button>
              <NavLink to="/login" style={{border:"none", textDecoration:"none"}}>
              <button
                type="button"
                className={style.FormLogInButton}
                id={style.Back}
              >
                Anuluj
              </button>
              </NavLink>
            </form>
          </div>
        </div>
        {this.state.redirect && <Navigate to="/login" replace={true} />}
      </div>
    );
  }
}
export default PassChange;
