import React from "react";
import style from "./Components.module.css"
const Describe = (props) => {
  return (
    <div className={style.DescribeContainer}>
      {props.describe}
      
    </div>
  );
};
export default Describe;
