import React from "react";
import styleRegister from "../../RegisterPage/RegisterPage.module.css";
import styleLogIn from "../../LogInPage/LogInPage.module.css";
import style from "./Modal.module.css";
import { Icon } from "@iconify/react";
import axios from "axios";
const url = "http://3.68.195.28/api/users/";
class PassChange extends React.Component {
  state = {
    firstName: this.props.user.firstName,
    lastName: this.props.user.lastName,
    phoneNumberPrefix: this.props.user.phoneNumberPrefix,
    phoneNumber: this.props.user.phoneNumber,
    description: this.props.user.description,
    id: this.props.id,
  };
  update(e) {
    this.setState({
      [e.target.name]: e.target.value,
      error: null,
    });
  }
  onSubmit = async () => {
    const { firstName, lastName, phoneNumberPrefix, phoneNumber, description} =
      this.state;
    const userData={"firstName":firstName, "lastName":lastName,"phoneNumberPrefix": phoneNumberPrefix, "phoneNumber":phoneNumber, "description": description}
    const response = await axios.patch(url + this.state.id, {
      userData
    },{headers: {Authorization: `Bearer ${this.props.token}`}}).then(
      this.props.getData,
      this.props.CloseModal(),
    
    );
    
  };
  render() {
    return (
      <div className={style.EditWindow}>
        <div className={style.FormContainer}>
          <div className={style.FormContainerHeader}>
            <h2 className={styleLogIn.Header}>Zmień hasło</h2>
            <button
              onClick={() => this.props.CloseModal()}
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
          <form onSubmit={()=>this.onSubmit()}>
            <div className={styleLogIn.LabelGroup}>
              <label className={style.EditTextLabel}>Stare hasło</label>
              <input
                className={styleLogIn.TextInput}
                type="password"
                name="lastName"
                onChange={(e) => this.update(e)}
              ></input>
            </div>
            <div className={styleLogIn.LabelGroup}>
              <label className={style.EditTextLabel}>Nowe hasło</label>
              <input
                className={styleLogIn.TextInput}
                type="password"
                name="lastName"
                onChange={(e) => this.update(e)}
              ></input>
            </div>
            <div className={styleLogIn.LabelGroup}>
              <label className={style.EditTextLabel}>Powtórz nowe hasło</label>
              <input
                className={styleLogIn.TextInput}
                type="password"
                name="lastName"
                onChange={(e) => this.update(e)}
              ></input>
            </div>
            <div className={style.FormContainerButtons}>
              <button

                className={styleLogIn.FormLogInButton}
                id={style.SaveChange}

              >
                Zmień hasło
              </button>
              <button type="button"
                className={styleLogIn.FormLogInButton}
                id={style.Back}
                onClick={() => this.props.CloseModal()}
              >
                Anuluj
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
export default PassChange;
