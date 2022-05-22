import React, { useEffect, useRef, useState } from "react";
import {
  YMaps,
  Map,
  ZoomControl,
  FullscreenControl,
  SearchControl,
  GeolocationControl,
  Placemark,
} from "react-yandex-maps";

import { USER_ADDRESS_MAP_CONFIRM } from "../constants/userConstants";
import { useDispatch } from "react-redux";
import Axios from "axios";
import LoadingBox from "../components/LoadingBox";

var newCoords = [];

export default function MapScreen(props) {
  const map = useRef(null);
  const [ymaps, setYmaps] = useState(null);
  const [coords, setCoords] = useState([]);
  var key;
  const dispatch = useDispatch();
  
  useEffect(() => {
    const fetch = async () => {
      const {data} = await Axios('/api/config/yandex');
      key = data;
    };
    fetch();
  }, []);


  function clickHandler() {
      
    var location1 = newCoords[0];
    var location2 = newCoords[1];
    if(location1){
        dispatch({
            type: USER_ADDRESS_MAP_CONFIRM,
            payload: {
              lat: location1,
              lng: location2,
            },
          });
          alert("Местоположение успешно сохранено.\n" + location1 + ' ' + location2);
          console.log((location2 ? location2 : 'нет инфы лок2') + '  ' + (location1 ? location1 : 'нет инфы лок1'));
          props.history.push("/shipping");
    }else{
        alert("Выберите точку!");
    } 
    
    
  }
  return key !== '' ? (
    <div style={{ width: "100%", height: "300px" }}>
      <YMaps query={{ apikey: '0d6a5158-ba82-480c-84e8-c30771d0ae5b'}} style={{ width: "100%", height: "300px" }}>
        <Map
          style={{ width: "100%", height: "300px" }}
          instanceRef={map}
          modules={[
            "geoQuery",
            "Placemark",
            "geocode",
            "geoObject.addon.balloon",
          ]}
          state={{
            center: [55.796127, 49.106414],
            zoom: 12,
          }}
          onLoad={(ymapsInstance) => {
            setYmaps(ymapsInstance);
          }}
          options={{ searchControlProvider: "yandex#search" }}
        >
          <Placemark
            geometry={[55.796127, 49.106414]}
            options={{ draggable: true }}
            // Событие change связано с св-вом geometry инстанса метки,
            // поэтому onChange работать не будет, придется использовать instanceRef
            instanceRef={(ref) => {
              if (ref) {
                // По аналогии добавляем обработчик
                ref.geometry.events.add("change", function (e) {
                  newCoords = e.get("newCoordinates");
                  console.log(newCoords);
                  // Используя ссылку на инстанс Линии меняем ее геометрию
                });
              }
            }}
          />

          <ZoomControl />
          <FullscreenControl />
          <SearchControl />
          <GeolocationControl />
        </Map>
      </YMaps>

      <button
        className=""
        style={{ display: "flex", margin: "10px auto" }}
        onClick={clickHandler}
      >
        Подтвердить
      </button>
    </div>
  ): (
    <LoadingBox></LoadingBox>
  );
}
