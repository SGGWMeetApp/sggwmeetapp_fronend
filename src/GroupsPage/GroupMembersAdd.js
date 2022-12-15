import React from "react";
import style from "./GroupsPage.module.css";
import { Icon } from "@iconify/react";
import { NavLink } from "react-router-dom";
import axios from "axios";

const ADD_URL = 'http://3.68.195.28/api/groups';

class GroupMembersAdd extends React.Component {


    constructor(props) {
        let user = JSON.parse(localStorage.getItem("user"));

        super(props);
        this.state = {
            filter: "",
            id: undefined,
            userToken: user.token,
            error: null,
            users: [],
            timer: null,
        };
    }

    componentDidMount() {
        this.setState({ id: +window.location.pathname.split("/")[3] })
    }

    getFormData(e) {
        this.setState({
            [e.target.name]: e.target.value,
            error: null,
        });
        if (e.target.value.length > 0) {
            clearTimeout(this.state.timer);

            const newTimeout = setTimeout(() => {
                this.getMembers({ id: this.state.id, filter: this.state.filter });
            }, 500);

            this.setState({ timer: newTimeout });
        }
        else {
            this.setState({ users: [] });
        }
    }

    getMembers = async ({ id, filter }) => {
        const response = await axios.get(`http://3.68.195.28/api/groups/${id}/users/eligible${filter.length > 0 ? "?namePhrase=" + filter : ''}`, {
            headers: {
                Authorization: `Bearer ${this.state.userToken}`,
            },
        });
        if (response.data.users.length > 0) {
            this.setState({ users: response.data.users })
        }

    };

    handleClick = async (userId) => {
        const response = await fetch(`http://3.68.195.28/api/groups/${this.state.id}/users`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${this.state.userToken}`,
            },
            body: JSON.stringify({
                userId: userId,
            }),
        });
        if (response.data.firstName) {
            window.history.pushState(`/profile/groups/${this.state.id}/members`);
        }
    }

    render() {
        return (
            <div className={style.GroupContainer}>
                <div className={style.GroupsSection}>
                    <div className={style.GroupsHeader}>
                        <h2 className={style.Header}>Dodaj członka do grupy</h2>
                        <div className={style.BtnContainer}>
                            <button className={style.BackMapBtn}>
                                <NavLink className={style.NavLinkBtn} to={`/profile/groups/${this.state.id}/members`}>
                                    <Icon
                                        icon="akar-icons:arrow-left"
                                        color="#122c34"
                                        width="20"
                                        height="20"
                                    />
                                    Wróć do grupy
                                </NavLink>
                            </button>
                        </div>
                    </div>
                    <div>
                        <form onSubmit={(e) => e.preventDefault()}>
                            <div className={style.LabelGroup}>
                                <label className={style.TextInputLabel}>Szukaj</label>
                                <input
                                    className={style.TextInput}
                                    value={this.state.filter}
                                    type="text"
                                    name="filter"
                                    onChange={(e) => this.getFormData(e)}
                                ></input>
                            </div>
                        </form>
                    </div>
                    <div>
                        <table className={style.GroupsTable}>
                            <thead>
                                <tr>
                                    <th>Imię i nazwisko</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.users.length > 0 ? this.state.users.map(user =>
                                    <tr key={user.id}>
                                        <td>
                                            {user.firstName + " " + user.lastName}
                                        </td>
                                        <td className={style.AddButtonRow}>
                                            <button className={style.CreateGroupBtn} onClick={() => { this.handleClick(user.id) }}>
                                                <Icon
                                                    icon="ant-design:plus-outlined"
                                                    color="white"
                                                    width="20"
                                                    height="20"
                                                />
                                                Dodaj
                                            </button>
                                        </td>
                                    </tr>)
                                    : <tr className={style.EmptyRow}>
                                        Wyszukaj za pomocą pola powyżej!
                                    </tr>}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}
export default GroupMembersAdd;
