import React, { useEffect } from "react";
import { Icon } from "@iconify/react";
import style from "./Modal.module.css";
import Slider from "@mui/material/Slider";
import { useState } from "react";
const Filter = (props) => {
  const [ready, setReady] = useState(null);
  const [value1, setValue1] = useState([1, 5]);
  const [value2, setValue2] = useState(null);
  const categories = props.categories;
  var checkCategory = [];
  const [change, setChange] = useState(false);
  const [allObject, setAllObject] = useState(false);
  const [PlacesFilter, setPlacesFilter] = useState(
    categories.map((cat) => [cat, ""])
  );
  const handleChange = (e, newValue) => {
    setValue1(newValue);
  };
  const handleChangeDst = (e) => {
    setValue2(e.target.value);
  };


  const onChange = (e) => {
    if (e.target.name === "all") {
      setAllObject(!allObject);
      if (allObject !== true) {
        setPlacesFilter(categories.map((cat) => [cat, true]));
      }
    } else {
      setChange(!change);
      PlacesFilter[e.target.id][1] = !PlacesFilter[e.target.id][1];
      setPlacesFilter(PlacesFilter);
      if (PlacesFilter[e.target.id][1] === false) {
        setAllObject(false);
      }
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();
    for (var i = 0; i < PlacesFilter.length; i++) {
      if (PlacesFilter[i][1] === true) {
        checkCategory.push(PlacesFilter[i][0]);
      }
    }
    sessionStorage.setItem("objFilter", JSON.stringify(checkCategory));
    sessionStorage.setItem("objDistance", JSON.stringify(value2));
    props.getMap();
    props.CloseModal("filter");
  };

  function ResetFilter() {
    setPlacesFilter(categories.map((cat) => [cat, false]));
    setValue2(30000000);
    sessionStorage.setItem("objFilter", JSON.stringify(checkCategory));
    sessionStorage.setItem("objDistance", JSON.stringify(30000000));
    props.getMap()
  }

  function GetItemStorage(key) {
    setReady("ss");
    const sessionS = sessionStorage.getItem(key);
    if (sessionS && sessionS !== []) {
      for (var i = 0; i < PlacesFilter.length; i++) {
        if (sessionS.includes(PlacesFilter[i][0])) {
          PlacesFilter[i][1] = true;
        } else {
          PlacesFilter[i][1] = false;
        }
      }
    } else {
      setPlacesFilter(categories.map((cat) => [cat, false]));
    }
  }

  useEffect(() => {
    if(JSON.parse(sessionStorage.getItem("objDistance")) &&JSON.parse(sessionStorage.getItem("objDistance"))!==[]){
      setValue2(JSON.parse(sessionStorage.getItem("objDistance")))
    }
    else{
      setValue2(30000000);
    }
    GetItemStorage("objFilter");
  }, []);

  return ready === "ss" ? (
    <div className={style.FilterContainer}>
      <div className={style.FilterHeader}>
        <p className={style.FilterHeaderText}>Opcje filtrowania</p>
        <button
          onClick={() => props.CloseModal("filter")}
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
      <form className={style.FilterForm} onSubmit={onSubmit}>
        <div className={style.FormSection}>
          <div className={style.ObjectType}>
            <p className={style.FilterObjectType}>Typy obiektów</p>
            <div className={style.ObjectTypeContainer}>
              <input
                type="radio"
                id="all1"
                name="objectType"
                value="wszystkie"
              />
              <label htmlFor="all1">Wszytskie</label>
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
                name="all"
                value="wszystkie"
                checked={allObject}
                onChange={(e) => onChange(e)}
              />
              <label htmlFor="all">Wszytskie</label>
            </div>
            {categories.map((category, ind) => (
              <div className={style.PlacesContainer} key={ind}>
                <input
                  type="checkbox"
                  id={ind}
                  name={category}
                  onChange={(e) => onChange(e)}
                  checked={PlacesFilter[ind][1]}
                />
                <label htmlFor={category}>
                  {category.charAt(0) + category.slice(1).toLowerCase()}
                </label>
              </div>
            ))}
          </div>
          <div className={style.DistanceContainer}>
            <p className={style.DistanceText}>Odległość</p>
            <Slider
              aria-label="Custom marks"
              step={10}
              max={6000}
              min={10}
              valueLabelDisplay="on"
              value={value2}
              onChange={(e)=>handleChangeDst(e)}
            />
          </div>
        </div>
        <div className={style.FilterBtn}>
          <button type="submit" className={style.SendFilterBtn}>
            Filtruj
          </button>
          <button
            type="button"
            className={style.ClearFilterBtn}
            onClick={() => ResetFilter()}
          >
            Wyczyść filtry
          </button>
          <button
            onClick={() => props.CloseModal("filter")}
            className={style.BackBtn}
          >
            Anuluj
          </button>
        </div>
      </form>
    </div>
  ) : (
    <div>Loading...</div>
  );
};
export default Filter;
