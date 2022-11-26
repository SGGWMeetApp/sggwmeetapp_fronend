import React from "react";
import icon from "../Assets/pin2.svg";
import MapStyle from "./Mapstyle.js";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import style from "./Map.module.css";

const SimpleMap = (props) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });
  if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    console.log(props.localisation);
  }
  const elements = props.localisation;
  const point=({x:28,y:48})
  return (
    <GoogleMap
      zoom={15}
      center={{ lat: 52.16351, lng: 21.04665 }}
      mapContainerClassName={style.map_container}
      options={{ styles: MapStyle }}
    >
      {elements.map((marker, index) => (
        <Marker
          key={index}
          position={{ lat: marker[0].latitude, lng: marker[0].longitude }}
          icon={{url:icon, labelOrigin:point }}
          label={{text:marker[1] }}
        ></Marker>
      ))}
    </GoogleMap>
  );
};
export default SimpleMap;
