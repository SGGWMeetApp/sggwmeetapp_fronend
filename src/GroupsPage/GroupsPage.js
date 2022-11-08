import React from "react";
import style from "./GroupsPage.module.css";
import MainPageNavi from "../MainPage/MainPageNavi.js";
import { Icon } from "@iconify/react";
class GroupsPage extends React.Component {
  render() {
    return (
      <div className={style.GroupContainer}>
        <MainPageNavi />
        <div className={style.GroupsSection}>
          <div className={style.GroupsHeader}>
            <h2 className={style.Header}>Twoje grupy</h2>
            <div className={style.BtnContainer}>
              <button className={style.BackMapBtn}>
                <Icon
                  icon="akar-icons:arrow-left"
                  color="#122c34"
                  width="20"
                  height="20"
                />
                Wróć do mapy
              </button>
              <button className={style.CreateGroupBtn}>
                <Icon
                  icon="ant-design:plus-outlined"
                  color="white"
                  width="20"
                  height="20"
                />
                Dodaj grupę
              </button>
            </div>
          </div>
          <div>
            <table>
              <thead>
                <tr>
                  <th>Nazwa</th>
                  <th>Ilość Członków</th>
                  <th>Założyciel</th>
                  <th>Przyszłe Wydarzenia</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <input type="checkbox" /> Lorem Ipsum
                  </td>
                  <td>5</td>
                  <td>Jan Kowalski</td>
                  <td>2</td>
                  <td>
                    <button className={style.MoreBtn}>
                      <Icon
                        icon="akar-icons:more-vertical"
                        color="rgba(0, 0, 0, 0.54)"
                        width="20"
                        height="20"
                      />
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>
                    <input type="checkbox" /> Lorem Ipsum
                  </td>
                  <td>5</td>
                  <td>Jan Kowalski</td>
                  <td>2</td>
                  <td>
                    <button className={style.MoreBtn}>
                      <Icon
                        icon="akar-icons:more-vertical"
                        color="rgba(0, 0, 0, 0.54)"
                        width="20"
                        height="20"
                      />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}
export default GroupsPage;
