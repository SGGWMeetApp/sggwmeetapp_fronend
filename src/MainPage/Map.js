import React, { useState } from "react";
import icon from "../Assets/pin2.svg";
import user from "../Assets/user.svg";
import MapStyle from "./Mapstyle.js";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import style from "./Map.module.css";
import { useEffect } from "react";

const SimpleMap = (props) => {
  const [libraries, setLib] = useState(["geometry"]);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const google = window.google;
  let elements = props.localisation;
  const dist = props.distance;
  const center = { lat: 52.16351, lng: 21.04665 };
  const point = { x: 28, y: 48 };
  let myPosition = props.mylocalisation;
  if (myPosition) {
    center.lat = myPosition.lat;
    center.lng = myPosition.lng;
  }
  const [nelements, setN] = useState(elements);
  function distance() {
    if (myPosition) {
      if (dist !== []) {
        setN(
          elements.filter(
            (element) =>
              dist >=
              google.maps.geometry.spherical.computeDistanceBetween(
                myPosition,
                {
                  lat: element[0].latitude,
                  lng: element[0].longitude,
                }
              )
          )
        );
      }
      else {
        setN(elements);
      }
    } else {
      setN(elements);
    }
  
  }
  useEffect(() => {
    if(isLoaded){
      distance();
    }
  }, [myPosition, elements, dist]);
  if (!isLoaded) {
    return <div>Loading...</div>;
  }
  return (nelements?
    <GoogleMap
      zoom={15}
      center={{ lat: center.lat, lng: center.lng }}
      mapContainerClassName={style.map_container}
      options={{ styles: MapStyle }}
      onLoad={distance}
    >
      {nelements.map((marker, index) => (
        <Marker
          key={index}
          position={{ lat: marker[0].latitude, lng: marker[0].longitude }}
          icon={{ url: icon, labelOrigin: point }}
          label={{ text: marker[1] }}
        ></Marker>
      ))}
      {myPosition && (
        <Marker
          position={{ lat: myPosition.lat, lng: myPosition.lng }}
          icon={{ url: user, labelOrigin: point }}
          label="Moja  lokalizacja"
        ></Marker>
      )}
    </GoogleMap>:<div>Loading...2</div>
  );
};

export default SimpleMap;
