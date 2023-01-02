import React from "react";
import styleRegister from "../../RegisterPage/RegisterPage.module.css";
import styleLogIn from "../../LogInPage/LogInPage.module.css";
import style from "./Modal.module.css";
import { Icon } from "@iconify/react";
import axios from "axios";
import UserAvatar from "../../Assets/User-avatar.svg";
class EditUserAvatar extends React.Component {
  state = {
    id: this.props.id,
    avatarUrl: UserAvatar,
    avatarShow: null,
  };
  update = (e) => {
    this.setState({
      avatarUrl: e.target.files[0],
    });

    var file = e.target.files[0];
    const objectURL = URL.createObjectURL(file);
    this.setState({ avatarShow: objectURL });
  };
  onSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("base64file", this.state.avatarUrl);
    if (data !== {}) {
      await axios
        .post(`http://3.68.195.28/api/user/${this.state.id}/avatar`, data, {
          headers: { Authorization: `Bearer ${this.props.token}` },
          "Content-Type": "multipart/form-data",
        })
        .then(this.props.getData, this.props.CloseModalEditAvatar(),);
    }
  };
  componentDidMount() {
    if (this.props.avatar) {
      this.setState({ avatarShow: this.props.avatar});
    } else {
      this.setState({ avatarShow: UserAvatar });
    }
  }
  render() {
    return (
      <div className={style.EditWindow}>
        <div className={style.FormContainer}>
          <div className={style.FormContainerHeader}>
            <h2 className={styleLogIn.Header}>Edytuj zdjęcie avatara</h2>
            <button
              onClick={() => this.props.CloseModalEditAvatar()}
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
          <form onSubmit={this.onSubmit}>
            <div className={styleRegister.LabelGroupNumber}>
              <img
                className={style.preview}
                src={this.state.avatarShow}
                alt="User foto"
              ></img>
              <input
                className={style.InputNumber}
                type="file"
                onChange={this.update}
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
                type="button"
                className={styleLogIn.FormLogInButton}
                id={style.Back}
                onClick={() => this.props.CloseModalEditAvatar()}
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
export default EditUserAvatar;
