import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deliverOrder, detailsOrder, payOrder } from '../actions/orderActions';
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { PayPalButton } from "react-paypal-button-v2";
import {
  ORDER_DELIVER_RESET,
  ORDER_PAY_RESET,
} from '../constants/orderConstants';
import Moment from 'moment';
import 'moment/locale/ru';

export default function OrderScreen(props) {
  const orderId = props.match.params.id;
  const [sdkReady, setSdkReady] = useState(false);
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const moment = Moment;
  moment.locale("ru");
  const orderPay = useSelector((state) => state.orderPay);
  const {
    loading: loadingPay,
    error: errorPay,
    success: successPay,
  } = orderPay;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const {
    loading: loadingDeliver,
    error: errorDeliver,
    success: successDeliver,
  } = orderDeliver;

  const toPrice = (num) => Number(num.toFixed(2)); // 5.123 => "5.12" => 5.12

  const dispatch = useDispatch();
  useEffect(() => {
    const addPayPalScript = async () => {
      const { data } = await Axios.get("/api/config/paypal");
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };
    if (
      !order ||
      successPay ||
      successDeliver ||
      (order && order._id !== orderId)
    ) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch(detailsOrder(orderId));
    } else {
      if (!order.isPaid) {
        if (!window.paypal) {
          addPayPalScript();
        } else {
          setSdkReady(true);
        }
      }
    }
  }, [dispatch, order, orderId, sdkReady, successPay, successDeliver]);


  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(order, paymentResult));
  };

  const deliverHandler = () => {
    dispatch(deliverOrder(order._id));
  };

  return loading ? (
    <LoadingBox></LoadingBox>
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div>
      <h1>?????????? {order._id}</h1>
      <div className="rowPay top center">
        <div className="col-2">
          <ul>
            <li>
              <div className="card card-body">
                <h2>????????????????</h2>
                <p>
                  <strong>??????:</strong>
                  <br /> {order.shippingAdress.fullName} <br />
                  <strong>??????????:</strong>
                  <br /> {order.shippingAdress.adress},<br />
                  {order.shippingAdress.city},<br />{" "}
                  {order.shippingAdress.postalCode}
                  <br />
                  <strong>?????????? ????????????????:</strong>
                  <br /> +{order.shippingAdress.phoneNumber}
                </p>
                <strong>???????????? ????????????????:</strong>
                {order.isDelivered ? (
                  <MessageBox variant="success">
                    ???????????????????? {moment(order.deliveredAt).format('lll')}
                  </MessageBox>
                ) : (
                  <MessageBox variant="danger">?????? ???? ????????????????????</MessageBox>
                )}
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>?????????? ????????????</h2>
                <p>
                  <strong>??????????:</strong>
                  {order.paymentMethod}
                </p>
                <strong>???????????? ????????????:</strong>
                {order.isPaid ? (
                  <MessageBox variant="success">
                    ???????????????? {moment(order.paidAt).format('lll')}
                  </MessageBox>
                ) : (
                  <MessageBox variant="danger">?????? ???? ????????????????</MessageBox>
                )}
              </div>
            </li>
          </ul>
        </div>
       
          <div className="card card-body card-payment">
            <h2 className="h2block">??????????????:</h2>
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
                      {item.qty} x {item.price} = {item.qty * item.price} ??????.
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        
        
          <div className="card card-body">
            <ul>
              <li>
                <h2>??????????:</h2>
              </li>
              <li>
                <div className="row">
                  <div>????????????</div>
                  <div>{order.itemsPrice} ??????.</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>????????????????</div>
                  <div>{order.shippingPrice} ??????.</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>
                    <strong>??????????:</strong>
                  </div>
                  <div>
                    <strong>{order.totalPrice} ??????.</strong>
                  </div>
                </div>
              </li>
              {!order.isPaid && (
                <li>
                  {!sdkReady ? (
                    <LoadingBox></LoadingBox>
                  ) : (
                    <>
                      {errorPay && (
                        <MessageBox variant="danger">{errorPay}</MessageBox>
                      )}
                      {loadingPay && <LoadingBox></LoadingBox>}
                      <PayPalButton
                        amount={order.totalPrice}
                        onSuccess={successPaymentHandler}
                      ></PayPalButton>
                    </>
                  )}
                </li>
              )}
              {(userInfo.isAdmin || userInfo.isWorker) && order.isPaid && !order.isDelivered && (
                <li>
                  {loadingDeliver && <LoadingBox></LoadingBox>}
                  {errorDeliver && (
                    <MessageBox variant="danger">{errorDeliver}</MessageBox>
                  )}
                  <button
                    type="button"
                    className="medium"
                    onClick={deliverHandler}
                  >
                    ???????????????? ?????????? ????????????????????????
                  </button>
                </li>
              )}
            </ul>
          </div>
        
      </div>
    </div>
  );
}
