import React from "react";
import style from "./Components.module.css";

const Menu = (props) => {
  return (
    <div className={style.MenuContainer}>
      <div className={style.MenuHeader}>
        <h1>Zupy</h1>
      </div>
      <div className={style.MenuSection}>
        <div className={style.MenuDish}>
          <div className={style.MenuDishHeader}>
            <div className={style.FirstContainer}>
              <p className={style.DishName}>Pomidorowa z makaronem</p>
              <p className={style.DishAmount}>350ml</p>
            </div>
            <div className={style.SecondContainer}>
              <p className={style.DishPrice}>22zł</p>
            </div>
          </div>
          <div className={style.MenuSectionDescribe}>
            <p className={style.DishDescribe}>
              Dolor dignissim lobortis at arcu consequat. Sapien ut morbi amet
              sed vitae nibh est nulla risus.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
