import React from "react";
import style from "./GroupsPage.module.css";
import { Icon } from "@iconify/react";
import Menu from "./ContextMenu.js";
class TableRow extends React.Component {
  state = {
    visible: false,
  };
  handleShow = () => {
    this.setState({ visible: !this.state.visible });
  };
  render() {
    return (
        <td>
          {!this.state.visible && (
            <button onClick={this.handleShow} className={style.MoreBtn}>
              <Icon
                icon="akar-icons:more-vertical"
                color="rgba(0, 0, 0, 0.54)"
                width="20"
                height="20"
              />
            </button>
          )}
          {this.state.visible && (
            <Menu visible={this.state.visible} handleShow={this.handleShow} />
          )}
        </td>
    );
  }
}
export default TableRow;
