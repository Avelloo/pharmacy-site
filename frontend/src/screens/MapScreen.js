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
//import Axios from "axios";
import LoadingBox from "../components/LoadingBox";

var newCoords = [];

export default function MapScreen(props) {
  const map = useRef(null);
  const [ymaps, setYmaps] = useState(null);

  const [adress, setAdress] = useState("");
  var key;
  const dispatch = useDispatch();
 
  useEffect(() => {
    const fetch = async () => {
      //const {data} = await Axios('/api/config/yandex');
      //key = data;
    };
    fetch();
  }, []);

  const adressHandler = (adress) => {
    setAdress(adress);

  }
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

  function getAddress(coords, myPlacemark) {
    myPlacemark.properties.set('iconCaption', 'поиск...');
    ymaps.geocode(coords).then(function (res) {
        var firstGeoObject = res.geoObjects.get(0);
       
        myPlacemark.properties
            .set({
                // Формируем строку с данными об объекте.
                iconCaption: [
                    // Название населенного пункта или вышестоящее административно-территориальное образование.
                    firstGeoObject.getLocalities().length ? firstGeoObject.getLocalities() : firstGeoObject.getAdministrativeAreas(),
                    // Получаем путь до топонима, если метод вернул null, запрашиваем наименование здания.
                    firstGeoObject.getAddressLine(),

                ].filter(Boolean).join(', '),
                // В качестве контента балуна задаем строку с адресом объекта.
                
            });
            setAdress(firstGeoObject.getAddressLine())
    });
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
          defaultState={{
            center: [55.796127, 49.106414],
            zoom: 12,
          }}
          onLoad={(ymapsInstance) => {
            setYmaps(ymapsInstance);
          }}
          options={{ searchControlProvider: "yandex#search" }}
        >
          <Placemark
          defaultGeometry={[55.796127, 49.106414]}
            options={{ draggable: true }}
            onDragEnd={e => console.log(e.get('target').geometry.getCoordinates())}
            // Событие change связано с св-вом geometry инстанса метки,
            // поэтому onChange работать не будет, придется использовать instanceRef
            instanceRef={(ref) => {
              if (ref) {
                // По аналогии добавляем обработчик
                ref.geometry.events.add("change", function (e) {
                  newCoords = e.get("newCoordinates");
                  
                  
                });
                ref.events.add('dragend', function (e) {
                  getAddress(ref.geometry.getCoordinates(), ref);
                  ref.geometry.setCoordinates(newCoords)
                  adressHandler((ref.geometry.getCoordinates(), ref).properties._data.balloonContent);
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
      <div style={{ width:'100%', display: "flex",justifyContent: 'center', margin: "10px auto",  }}>Двигайте метку, чтобы выбрать адрес.</div>
      <div style={{ width:'100%', display: "flex",justifyContent: 'center', margin: "10px auto",  }}>Ваш адрес: {adress}</div>
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
