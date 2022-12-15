import React from "react";
import style from "./GroupsAdd.module.css";
import { Icon } from "@iconify/react";
import { NavLink } from "react-router-dom";

const CREATE_URL = 'http://3.68.195.28/api/groups';

class GroupsAdd extends React.Component {


    constructor(props) {
        let user = JSON.parse(localStorage.getItem("user"));

        super(props);
        this.state = {
            name: '',
            userToken: user.token,
            error: null,
        };
    }

    async handleSubmit(e) {
        e.preventDefault();

        const response = await fetch(CREATE_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${this.state.userToken}`, },
            body: JSON.stringify({
                name: this.state.name,
            }),
        });

        const json = await response.json();
        if (response.ok) {
            window.history.go("/profile/groups")
        }
        if (!response.ok) {
            this.setState({
                error: json.message,
            });
        }
    }

    getFormData(e) {
        this.setState({
            [e.target.name]: e.target.value,
            error: null,
        });
    }

    render() {
        return (
            <div className={style.GroupContainer}>
                <div className={style.GroupsSection}>
                    <div className={style.GroupsHeader}>
                        <h2 className={style.Header}>Dodaj grupę</h2>
                        <div className={style.BtnContainer}>
                            <button className={style.BackMapBtn}>
                                <NavLink className={style.NavLinkBtn} to="/profile/groups">
                                    <Icon
                                        icon="akar-icons:arrow-left"
                                        color="#122c34"
                                        width="20"
                                        height="20"
                                    />
                                    Wróć do grup
                                </NavLink>
                            </button>
                        </div>
                    </div>
                    <div>
                        <form onSubmit={(e) => this.handleSubmit(e)}>
                            <div className={style.LabelGroup}>
                                <label className={style.TextInputLabel}>Nazwa grupy</label>
                                <input
                                    className={style.TextInput}
                                    value={this.state.name}
                                    type="text"
                                    name="name"
                                    onChange={(e) => this.getFormData(e)}
                                ></input>
                            </div>
                            <button className={style.FormSubmitButton}>Utwórz</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
export default GroupsAdd;
