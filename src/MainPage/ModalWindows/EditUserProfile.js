import React from "react";
import styleRegister from "../../RegisterPage/RegisterPage.module.css";
import styleLogIn from "../../LogInPage/LogInPage.module.css";
import style from "./Modal.module.css";
import { Icon } from "@iconify/react";
class EditUser extends React.Component {
    state={
        firstName:this.props.user.firstName,
        lastName:this.props.user.lastName,
        prefix:this.props.user.phoneNumberPrefix,
        phoneNumber:this.props.user.phoneNumber,
        description:this.props.user.description,
        file:this.props.user.avatarUrl

    }
    fileSelectedHandler =e =>{
        this.setState({
            file:e.target.files[0]
        });
        console.log(e.target.files[0])
    }
    fileUploadHandler=()=>{

    }
  render() {
    return (
      <div className={style.EditWindow}>
        <div className={style.FormContainer}>
          <div className={style.FormContainerHeader}>
            <h2 className={styleLogIn.Header}>Edytuj dane</h2>
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
          <form /*onSubmit={(e) => this.handleSubmit(e)}*/>
          <div className={style.FileGroup} >
              <label id={style.FileUploadLabel}>Dodaj/edytuj zdjęcie profilowe</label>
              
              <input
                className={styleLogIn.FileUpload}
                type="file"
                name="avatar"
                accept="image/png, image/jpg"
                onChange={this.fileSelectedHandler}
              ></input>
            </div>
            <div className={styleLogIn.LabelGroup}>
              <label className={style.EditTextLabel}>Imię </label>
              <input
                className={styleLogIn.TextInput}
                value={this.state.firstName}
                type="text"
                name="firstName"
                onChange={(e) => this.getUserData(e)}
              ></input>
            </div>
            <div className={styleLogIn.LabelGroup}>
              <label className={style.EditTextLabel}>Nazwisko</label>
              <input
                className={styleLogIn.TextInput}
                value={this.state.lastName}
                type="text"
                name="lastName"
                onChange={(e) => this.getUserData(e)}
              ></input>
            </div>
            <div className={styleRegister.LabelGroupNumber}>
              <label className={style.EditTextLabel}>Prefix </label>
              <input
                className={styleRegister.InputPrefix}
                value={this.state.prefix}
                type="tel"
                name="phoneNumberPrefix"
                onChange={(e) => this.getUserData(e)}
              ></input>
              <label
                className={styleRegister.NumberInputLabel}
                id={style.EditNumber}
              >
                Numer telefonu
              </label>
              <input
                className={styleRegister.InputNumber}
                value={this.state.phoneNumber}
                type="tel"
                name="phoneNumber"
                onChange={(e) => this.getUserData(e)}
              ></input>
            </div>
            <div className={styleLogIn.LabelGroup}>
              <label className={style.EditTextLabel}>
                Dodatkowe informacje{" "}
              </label>
              <input
                className={styleLogIn.TextInput}
                value={this.state.description}

                name="description"
                onChange={(e) => this.getUserData(e)}
              ></input>
            </div>
            <div className={style.FormContainerButtons}>
              <button
                className={styleLogIn.FormLogInButton}
                id={style.SaveChange}
              >
                Zapisz zmiany
              </button>
              <button
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
export default EditUser;
