import React from "react";
import style from "../LogInPage/LogInPage.module.css";
import styleRegister from "./ResetPasswordPage.module.css";
import { Icon } from "@iconify/react";
import styleHome from "../HomePage/HomePage.module.css";
import Navigation from "../LogInPage/Navigatio";
import { SmallDualRingLoader } from "../Loaders/Loaders";

const REGISTER_URL = "http://3.68.195.28/reset_password";

class ResetPasswordPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      error: null,
      checked: false,
      loading: false,
      redirect: false,
      message:""
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
    if (!this.state.email) {
      this.setState({ error: "Uzupełnij wszystkie pola" });
    } else {
      this.setState({message:"Na Twoją skrzynkę mailową został wysłany link do zmiany hasła"})
      this.handleRegister();
    }
  }

  async handleRegister() {
    this.setState({ loading: true });

    const response = await fetch(REGISTER_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: this.state.email,
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
        <div className={style.LogInBack} id={styleRegister.RegisterInBack}>
          <Navigation />
          <div className={style.LogInWindow} id={styleRegister.RegisterWindow}>
            <div className={styleHome.Logo}>
              SGGW MeetApp <Icon icon="bxs:book-reader" color="#85c9b9" />
            </div>
            <h2 className={style.Header}>Zresetuj hasło</h2>
            <h3 className={style.Header}>
              Podaj adres email, na który zostanie wysłany formularz resetowania
              hasła.
            </h3>
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
                <label className={style.TextInputLabel}>Email</label>
                <input
                  className={style.TextInput}
                  type="email"
                  name="email"
                  value={this.state.email}
                  onChange={(e) => this.getFormData(e)}
                ></input>
              </div>
              <button className={style.FormLogInButton}>
                {(this.state.loading && <SmallDualRingLoader />) ||
                  "Resetuj hasło"}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
export default ResetPasswordPage;
