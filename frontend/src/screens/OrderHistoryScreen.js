import Moment from "moment";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import "moment/locale/ru";
import { listOrderMine } from "../actions/orderActions";

export default function OrderHistoryScreen(props) {
  const orderMineList = useSelector((state) => state.orderMineList);
  const { loading, error, orders } = orderMineList;
  const moment = Moment;
  moment.locale("ru");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listOrderMine());
  }, [dispatch]);
  return (
    <div>
      <h1 className="row center">История заказов</h1>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID заказа</th>
              <th>Дата создания</th>
              <th>Итого</th>
              <th>Статус оплаты</th>
              <th>Статус доставки</th>
              <th>Действия</th>
            </tr>
            
          </thead>
          <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{moment(order.createdAt).format("lll")}</td>
                  <td>{order.totalPrice} Руб.</td>
                  <td>
                    {order.isPaid ? moment(order.paidAt).format("lll") : "Нет"}
                  </td>
                  <td>
                    {order.idDelivered
                      ? moment(order.deliveredAt).format("lll")
                      : "Нет"}
                  </td>
                  <td>
                  <button
                    type="button"
                    className="small"
                    onClick={() => {
                      props.history.push(`/order/${order._id}`);
                    }}
                  >
                    Детали заказа
                  </button>
                  </td>
                </tr>
              ))}
            </tbody>
        </table>
      )}
    </div>
  );
}
