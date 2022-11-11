import React from "react";
import { Icon } from "@iconify/react";
import style from "./Modal.module.css";
import Slider from "@mui/material/Slider";
import { useState } from "react";
const Filter = (props) => {
  const [value1, setValue1] = useState([1, 5]);
  const [value2, setValue2] = useState([10, 3000]);
  const handleChange = (e, newValue) => {
    setValue1(newValue);
  };
  const handleChangeDst = (e, newValue) => {
    setValue2(newValue);
  };
  return (
    <div className={style.FilterContainer}>
      <div className={style.FilterHeader}>
        <p className={style.FilterHeaderText}>Opcje filtrowania</p>
        <button onClick={()=>props.CloseModal("filter")}  className={style.CloseBtn}>
          <Icon
            icon="ci:close-small"
            color="rgba(0, 0, 0, 0.54)"
            width="26"
            height="26"
          />
        </button>
      </div>
      <form className={style.FilterForm}>
        <div className={style.FormSection}>
          <div className={style.ObjectType}>
            <p className={style.FilterObjectType}>Typy obiektów</p>
            <div className={style.ObjectTypeContainer}>
              <input
                type="radio"
                id="all"
                name="objectType"
                value="wszystkie"
              />
              <label htmlFor="all">Wszytskie</label>
            </div>
            <div className={style.ObjectTypeContainer}>
              <input
                type="radio"
                id="places"
                name="objectType"
                value="miejsca"
              />
              <label htmlFor="places">Miejsca</label>
            </div>
            <div className={style.ObjectTypeContainer}>
              <input
                type="radio"
                id="events"
                name="objectType"
                value="wydarzenia"
              />
              <label htmlFor="events">Wydarzenia</label>
            </div>
          </div>
          <div className={style.GradContainer}>
            <p className={style.GraduateText}>Ocena</p>
            <Slider
              min={1}
              max={5}
              valueLabelDisplay="on"
              step={0.5}
              mindistance={0.5}
              disableSwap
              className={style.Slider}
              value={value1}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className={style.FormSection}>
          <div className={style.PlacesType}>
            <p className={style.FilterPlaceType}>Typy miejsc</p>
            <div className={style.PlacesContainer}>
              <input
                type="checkbox"
                id="all"
                name="placeType"
                value="wszystkie"
              />
              <label htmlFor="all">Wszytskie</label>
            </div>
            <div className={style.PlacesContainer}>
              <input
                type="checkbox"
                id="restaurant"
                name="placetType"
                value="miejsca"
              />
              <label htmlFor="restaurant">Miejsca</label>
            </div>
            <div className={style.PlacesContainer}>
              <input
                type="checkbox"
                id="library"
                name="placeType"
                value="wydarzenia"
              />
              <label htmlFor="library">Wydarzenia</label>
            </div>
          </div>
          <div className={style.DistanceContainer}>
            <p className={style.DistanceText }>Odległość</p>
            <Slider
              min={10}
              max={3000}
              step={10}
              disableSwap
              className={style.Slider}
              value={value2}
              onChange={handleChangeDst}
              valueLabelDisplay="on"
            />
          </div>
        </div>
        <div className={style.FilterBtn}>
          <button className={style.SendFilterBtn}>Filtruj</button>
          <button className={style.ClearFilterBtn}>Wyczyść filtry</button>
          <button onClick={()=>props.CloseModal("filter")}  className={style.BackBtn}>Anuluj</button>
        </div>
      </form>
    </div>
  );
};
export default Filter;
