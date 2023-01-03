import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import style from "./Modal.module.css";
import axios from "axios";
import {DualRingLoader} from "../../Loaders/Loaders.js"
const Settings = (props) => {
  const id = props.id;
  const url = "http://3.68.195.28/api/";
  const [notifications, setNotifications] = useState(null);
  const [eventNotification, setEventNot] = useState();
  const [groupAddNotification, setGroupAddNot] = useState();
  const [groupRemoveNotification, setGroupRemoveNot] = useState();
  const [allNotification, setAllNot] = useState();

  const Get_notification_set = async () => {
    try {
      const response = await axios.get(
        url + `users/${id}/notification_settings`,
        {
          headers: {
            Authorization: `Bearer ${props.token}`,
          },
        }
      );
      setNotifications(response.data);
      setEventNot(response.data.event_notification);
      setGroupAddNot(response.data.group_add_notification);
      setGroupRemoveNot(response.data.group_remove_notification);
      if (
        response.data.event_notification &&
        response.data.group_add_notification &&
        response.data.group_remove_notification
      ) {
        setAllNot(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const Edit_notification_set = async () => {
    try {
      await axios
        .patch(
          url + `users/${id}/notification_settings`,
          {
            eventNotification: eventNotification,
            groupAddNotification: groupAddNotification,
            groupRemoveNotification: groupRemoveNotification,
          },
          {
            headers: {
              Authorization: `Bearer ${props.token}`,
            },
          }
        )
        .then(Get_notification_set(), props.CloseModal("settings"));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    Get_notification_set();
  }, []);

  const onChange = (e) => {
    switch (e.target.name) {
      case "eventNotification":
        all(!eventNotification, groupAddNotification, groupRemoveNotification);
        return setEventNot(!eventNotification);

      case "groupAddNotification":
        all(eventNotification, !groupAddNotification, groupRemoveNotification);
        return setGroupAddNot(!groupAddNotification);

      case "groupRemoveNotification":
        all(eventNotification, groupAddNotification, !groupRemoveNotification);
        return setGroupRemoveNot(!groupRemoveNotification);

      case "allNotification":
        if (!allNotification === true) {
          setGroupRemoveNot(true);
          setGroupAddNot(true);
          setEventNot(true);
        } else {
          setGroupRemoveNot(false);
          setGroupAddNot(false);
          setEventNot(false);
        }
        return setAllNot(!allNotification);

      default:
        console.log(e.target.name);
    }
  };
  const all = (p1, p2, p3) => {
    if (p1 && p2 && p3) {
      setAllNot(true);
    } else {
      setAllNot(false);
    }
  };
  return notifications ? (
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
      <form
        className={style.SettingForm}
        onSubmit={() => Edit_notification_set()}
      >
        <div className={style.SettingSection}>
          <div className={style.Visibility} style={{visibility:"hidden"}}>
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
                id="allNotification"
                name="allNotification"
                onChange={(e) => onChange(e)}
                checked={allNotification}
              />

              <label htmlFor="allNotification">Wszytskie</label>
            </div>
            <div className={style.NotifyContainer}>
              <input
                type="checkbox"
                id="eventNotification"
                name="eventNotification"
                onChange={(e) => onChange(e)}
                checked={eventNotification}
              />
              <label htmlFor="eventNotification">Nowe wydarzenia</label>
            </div>
            <div className={style.NotifyContainer}>
              <input
                type="checkbox"
                id="groupAddNotification"
                name="groupAddNotification"
                onChange={(e) => onChange(e)}
                checked={groupAddNotification}
              />

              <label htmlFor="groupAddNotification">Dodanie do grupy</label>
            </div>
            <div className={style.NotifyContainer}>
              <input
                type="checkbox"
                id="groupRemoveNotification"
                name="groupRemoveNotification"
                onChange={(e) => onChange(e)}
                checked={groupRemoveNotification}
              />
              <label htmlFor="groupRemoveNotification">
                Wyrzucenie z grupy
              </label>
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
  ) : (
    <DualRingLoader/>
  );
};
export default Settings;
