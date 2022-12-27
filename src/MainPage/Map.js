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
  const elements = props.objects;
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
    let objects = null;
    let distArray = null;
    if (myPosition) {
      if (dist !== []) {
        objects=(
          elements.filter(
            (element) =>
              dist >=
              google.maps.geometry.spherical.computeDistanceBetween(
                myPosition,
                {
                  lat: element.geolocation.latitude,
                  lng: element.geolocation.longitude,
                }
              )
          )
        );
        setN(objects);
      } else {
        setN(elements);
        objects=elements;
      }
       distArray = objects.map((item) => {
        if (
          google.maps.geometry.spherical.computeDistanceBetween(myPosition, {
            lat: item.geolocation.latitude,
            lng: item.geolocation.longitude,
          }) > 6000
        ) {
          return(
            google.maps.geometry.spherical.computeDistanceBetween(myPosition, {
              lat: item.geolocation.latitude,
              lng: item.geolocation.longitude,
            }) / 1000
          ).toFixed(2)+" km";
        } else {
          return (item, google.maps.geometry.spherical
            .computeDistanceBetween(myPosition, {
              lat: item.geolocation.latitude,
              lng: item.geolocation.longitude,
            })
            .toFixed(1)+" m");
        }
      });
      
    } else {
      setN(elements);
    }
    console.log(objects);
    props.getDist(objects,distArray);
  }
  useEffect(() => {
    if (isLoaded) {
      distance();
    }
      
  }, [dist, elements, myPosition]);
  if (!isLoaded) {
    return <div>Loading...</div>;
  }
  return nelements ? (
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
          position={{ lat: marker.geolocation.latitude, lng: marker.geolocation.longitude }}
          icon={{ url: icon, labelOrigin: point }}
          label={{ text: marker.name }}
        ></Marker>
      ))}
      {myPosition && (
        <Marker
          position={{ lat: myPosition.lat, lng: myPosition.lng }}
          icon={{ url: user, labelOrigin: point }}
          label="Moja  lokalizacja"
        ></Marker>
      )}
    </GoogleMap>
  ) : (
    <div>Loading map...</div>
  );
};

export default SimpleMap;
