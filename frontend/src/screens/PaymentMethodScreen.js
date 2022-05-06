import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { savePaymentMethod } from "../actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";

export default function PaymentMethodScreen(props) {

  const cart = useSelector(state => state.cart);
  const {shippingAdress} = cart;
  if(!shippingAdress.adress){
      props.history.push('/shipping');
  }

  const [paymentMethod, setPaymentMethod] = useState("robokassa");

  const dispatch = useDispatch(props);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    props.history.push("/placeorder");
  };

  return (
    <div>
      <CheckoutSteps step1 step2 step3></CheckoutSteps>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h2>Метод оплаты</h2>
        </div>
        <div>
          <div>
            <input
              type="radio"
              id="robokassa"
              value="Robokassa"
              name="paymentMethod"
              required
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></input>
            <label htmlFor="robokassa">Robokassa</label>
          </div>
          <div>
            <input
              type="radio"
              id="bypass"
              value="bypass"
              name="paymentMethod"
              required
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></input>
            <label htmlFor="bypass">Эмулятор успешной покупки</label>
          </div>
          <div>
            <button className="primary" type="submit">
              Продолжить
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
