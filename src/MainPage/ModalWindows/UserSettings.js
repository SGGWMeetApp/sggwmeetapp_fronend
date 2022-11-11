import React from "react";
import { Icon } from "@iconify/react";
import style from "./Modal.module.css";
const Settings = (props) => {
  return (
    <div className={style.SettingContainer}>
      <div className={style.SettingHeader}>
        <p className={style.SettingHeaderText}>Opcje użytkownika</p>
        <button
          onClick={() => props.CloseModal("settings")}
          className={style.CloseBtn}
        >
          <Icon
            icon="ci:close-small"
            color="rgba(0, 0, 0, 0.54)"
            width="26"
            height="26"
          />
        </button>
      </div>
      <form className={style.SettingForm}>
        <div className={style.SettingSection}>
          <div className={style.Visibility}>
            <p className={style.VisibilityType}>Widoczność na mapie</p>
            <div className={style.VisibilityContainer}>
              <input type="radio" id="all" name="visible" value="wszyscy" />
              <label htmlFor="all">Wszyscy</label>
            </div>
            <div className={style.VisibilityContainer}>
              <input type="radio" id="nobody" name="visible" value="nikt" />
              <label htmlFor="nobody">Nikt</label>
            </div>
            <div className={style.VisibilityContainer}>
              <input
                type="radio"
                id="allBut"
                name="visible"
                value="PrawieWszyscy"
              />
              <label htmlFor="allBut">
                Wszyscy oprócz:{" "}
                <input
                  className={style.ExceptionInput}
                  placeholder="Wyszukaj..."
                  type="text"
                ></input>
                <Icon
                  className={style.SearchIcon}
                  icon="ic:baseline-search"
                  color="#122c34"
                  width="24"
                  height="24"
                />
              </label>
            </div>
            <div className={style.VisibilityContainer}>
              <input
                type="radio"
                id="nobodyBut"
                name="visible"
                value="PrawieNikt"
              />
              <label htmlFor="nobodyBut">
                Nikt oprócz:
                <input
                  className={style.ExceptionInput}
                  placeholder="Wyszukaj..."
                  type="text"
                ></input>
                <Icon
                  className={style.SearchIcon}
                  icon="ic:baseline-search"
                  color="#122c34"
                  width="24"
                  height="24"
                />
              </label>
            </div>
          </div>
        </div>
        <div className={style.SettingSection}>
          <div className={style.Notify}>
            <p className={style.NotifyType}>Powiadomienia</p>
            <div className={style.NotifyContainer}>
              <input
                type="checkbox"
                id="allNotify"
                name="allNotify"
                value="wszystkie"
              />

              <label htmlFor="allNotify">Wszytskie</label>
            </div>
            <div className={style.NotifyContainer}>
              <input
                type="checkbox"
                id="newEvents"
                name="newEvents"
                value="nowe"
              />
              <label htmlFor="newEvents">Nowe wydarzenia</label>
            </div>
            <div className={style.NotifyContainer}>
              <input type="checkbox" id="add" name="add" value="dodanie" />

              <label htmlFor="add">Dodanie do grupy</label>
            </div>
            <div className={style.NotifyContainer}>
              <input
                type="checkbox"
                id="delete"
                name="delete"
                value="wyrzucenie"
              />
              <label htmlFor="delete">Wyrzucenie z grupy</label>
            </div>
          </div>
        </div>
        <div className={style.FilterBtn}>
          <button className={style.SendSettingsBtn}>Zastosuj</button>
          <button
            onClick={() => props.CloseModal("settings")}
            className={style.BackBtn}
          >
            Anuluj
          </button>
        </div>
      </form>
    </div>
  );
};
export default Settings;
