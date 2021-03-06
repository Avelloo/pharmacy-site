import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createOrder } from "../actions/orderActions";
import CheckoutSteps from "../components/CheckoutSteps";
import { ORDER_CREATE_RESET } from "../constants/orderConstants";
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function PlaceOrderScreen(props) {
  const cart = useSelector((state) => state.cart);
  if (!cart.paymentMethod) {
    props.history("/payment");
  }

  const orderCreate = useSelector((state) => state.orderCreate);
  const { loading, success, error, order } = orderCreate;
  const toPrice = (num) => Number(num.toFixed(2)); // 5.123 => "5.12" => 5.12
  cart.itemsPrice = toPrice(
    cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0)
  );
  cart.shippingPrice = cart.itemsPrice > 600 ? toPrice(0) : toPrice(150);
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice;
  const dispatch = useDispatch();
  const placeOrderHandler = () => {
    dispatch(createOrder({ ...cart, orderItems: cart.cartItems }));
  };
  useEffect(() => {
    if (success) {
      props.history.push(`/order/${order._id}`);
      dispatch({ type: ORDER_CREATE_RESET });
    }
  }, [dispatch, order, props.history, success]);
  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
      <div className="row top center">
        <div className="col-2">
          <ul>
            <li>
              <div className="card card-body">
                <h2>Доставка</h2>
                <p>
                  <strong>ФИО:</strong>
                  <br /> {cart.shippingAdress.fullName} <br />
                  <strong>Адрес:</strong>
                  <br /> {cart.shippingAdress.adress},<br />
                  {cart.shippingAdress.city},<br />{" "}
                  {cart.shippingAdress.postalCode}
                  <br />
                  <strong>Номер телефона:</strong>
                  <br /> +{cart.shippingAdress.phoneNumber}
                </p>
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>Метод оплаты</h2>
                <p>
                  <strong>Метод:</strong>
                  {cart.paymentMethod}
                </p>
              </div>
            </li>
          </ul>
        </div>
        <div className="col-1">
          <div className="card card-body card-payment">
            <h2 className="h2block">Корзина:</h2>
            <ul>
              {cart.cartItems.map((item) => (
                <li key={item.product}>
                  <div className="row row-left">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="small"
                    ></img>

                    <div className="min-30">
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </div>
                    <div>
                      {item.qty} x {item.price} = {item.qty * item.price} Руб.
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="col-1">
          <div className="card card-body">
            <ul>
              <li>
                <h2>Сумма:</h2>
              </li>
              <li>
                <div className="row">
                  <div>Товары</div>
                  <div>{cart.itemsPrice} Руб.</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Доставка</div>
                  <div>{cart.shippingPrice} Руб.</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>
                    <strong>Итого:</strong>
                  </div>
                  <div>
                    <strong>{cart.totalPrice} Руб.</strong>
                  </div>
                </div>
              </li>
              <li>
                <button
                  type="button"
                  onClick={placeOrderHandler}
                  disabled={cart.cartItems.length === 0}
                >
                  Оплатить заказ
                </button>
              </li>
              {loading && <LoadingBox></LoadingBox>}
              {error && <MessageBox variant='danger'>{error}</MessageBox>}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
