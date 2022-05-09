import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { detailsOrder } from "../actions/orderActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

export default function OrderScreen(props) {
  const orderId = props.match.params.id;
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(detailsOrder(orderId));
  }, [dispatch, orderId]);
  return loading ? (
    <LoadingBox></LoadingBox>
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div>
      <h1>Заказ {order._id}</h1>
      <div className="row top center">
        <div className="col-2">
          <ul>
            <li>
              <div className="card card-body">
                <h2>Доставка</h2>
                <p>
                  <strong>ФИО:</strong>
                  <br /> {order.shippingAdress.fullName} <br />
                  <strong>Адрес:</strong>
                  <br /> {order.shippingAdress.adress},<br />
                  {order.shippingAdress.city},<br />{" "}
                  {order.shippingAdress.postalCode}
                  <br />
                  <strong>Номер телефона:</strong>
                  <br /> +{order.shippingAdress.phoneNumber}
                </p>
                <strong>Статус доставки:</strong>
                {order.isDelivered ? (
                  <MessageBox variant="success">
                    Доставлено {order.deliveredAt}
                  </MessageBox>
                ) : (
                  <MessageBox variant="danger">Ещё не доставлено</MessageBox>
                )}
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>Метод оплаты</h2>
                <p>
                  <strong>Метод:</strong>
                  {order.paymentMethod}
                </p>
                <strong>Статус оплаты:</strong>
                {order.isPaid ? (
                  <MessageBox variant="success">
                    Оплачено {order.paidAt}
                  </MessageBox>
                ) : (
                  <MessageBox variant="danger">Ещё не оплачено</MessageBox>
                )}
              </div>
            </li>
          </ul>
        </div>
        <div className="col-1">
          <div className="card card-body card-payment">
            <h2 className="h2block">Корзина:</h2>
            <ul>
              {order.orderItems.map((item) => (
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
                  <div>{order.itemsPrice} Руб.</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Доставка</div>
                  <div>{order.shippingPrice} Руб.</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>
                    <strong>Итого:</strong>
                  </div>
                  <div>
                    <strong>{order.totalPrice} Руб.</strong>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
