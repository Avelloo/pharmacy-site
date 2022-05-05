import React, { useState } from "react";
import CheckoutSteps from "../components/CheckoutSteps";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAdress } from "../actions/cartActions";

export default function ShippingAdressScreen(props) {
    const userSignin = useSelector((state) => state.userSignin);
    const {userInfo} = userSignin;
    const cart = useSelector(state => state.cart);
    const {shippingAdress} = cart;
    if(!userInfo){
        props.history.push('/signin');
    }
  const [fullName, setFullName] = useState(shippingAdress.fullName);
  const [adress, setAdress] = useState(shippingAdress.adress);
  const [city, setCity] = useState(shippingAdress.city);
  const [postalCode, setPostalCode] = useState(shippingAdress.postalCode);
  const [phoneNumber, setPhoneNumber] = useState(shippingAdress.phoneNumber);

  const dispatch = useDispatch();

  const subminHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveShippingAdress({ fullName, adress, city, postalCode, phoneNumber })
    );
    props.history.push('/payment');
  };

  return (
    <div>
      <CheckoutSteps step1 step2></CheckoutSteps>
      <form className="form" onSubmit={subminHandler}>
        <div>
          <h2>Доставка</h2>
        </div>
        <div>
          <label htmlFor="fullName">ФИО</label>
          <input
            type="text"
            id="fullName"
            placeholder="Введите ФИО"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label htmlFor="phoneNumber">Номер телефона</label>
          <input
            type="tel"
            id="phoneNumber"
            placeholder="+7 (900) 123-45-67"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label htmlFor="adress">Адрес</label>
          <input
            type="text"
            id="adress"
            placeholder="Введите адрес"
            value={adress}
            onChange={(e) => setAdress(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label htmlFor="city">Город</label>
          <input
            type="text"
            id="city"
            placeholder="Введите город"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label htmlFor="postalCode">Индекс</label>
          <input
            type="text"
            id="postalCode"
            placeholder="Введите индекс"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label />
          <button className="primary" type="submit">
            Продолжить
          </button>
        </div>
      </form>
    </div>
  );
}
