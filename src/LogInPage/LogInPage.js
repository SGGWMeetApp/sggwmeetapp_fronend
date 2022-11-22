import React, { useState } from "react";
import style from "./LogInPage.module.css";
import styleHome from "../HomePage/HomePage.module.css";
import { Icon } from "@iconify/react";
import { NavLink } from "react-router-dom";
import Navigation from "./Navigatio";
import AuthService from "../Services/AuthService";

const LogInPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    AuthService.validateLogin(email, password);
  };

  const handleEmailChange = (newEmail) => {
    setEmail(newEmail);
  };

  const handlePasswordChange = (newPassword) => {
    setPassword(newPassword);
  };

  return (
    <div className={style.LogInContainer}>
      <div className={style.LogInBack}>
      <Navigation/>
        <div className={style.LogInWindow}>
          <div className={styleHome.Logo}>
            Brand <Icon icon="bxs:book-reader" color="#85c9b9" />
          </div>
          <h2 className={style.Header}>Zaloguj się do serwisu</h2>
          <form onSubmit={handleSubmit}>
            <div className={style.LabelGroup}>
              <label className={style.TextInputLabel}>Email</label>
              <input className={style.TextInput} type="email" value={email} onChange={(e) => handleEmailChange(e.target.value)}></input>
            </div>
            <div className={style.LabelGroup}>
              <label className={style.TextInputLabel}>Hasło </label>
              <input className={style.TextInput} type="password" value={password} onChange={(e) => handlePasswordChange(e.target.value)}></input>
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
            <button className={style.FormLogInButton} type="submit">Test</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LogInPage;

