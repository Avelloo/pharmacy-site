import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Chart from 'react-google-charts';
import { summaryOrder } from '../actions/orderActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function DashboardScreen() {
  const orderSummary = useSelector((state) => state.orderSummary);
  const { loading, summary, error } = orderSummary;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(summaryOrder());
  }, [dispatch]);
  return (
    <div>
      <div className="row">
        <h1>Статистика</h1>
      </div>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          <ul className="row summary">
            <li>
              <div className="summary-title color1">
                <span>
                  <i className="fa fa-users" /> Клиентов
                </span>
              </div>
              <div className="summary-body">{summary.users[0].numUsers}</div>
            </li>
            <li>
              <div className="summary-title color2">
                <span>
                  <i className="fa fa-shopping-cart" /> Заказов
                </span>
              </div>
              <div className="summary-body">
                {summary.orders[0] ? summary.orders[0].numOrders : 0}
              </div>
            </li>
            <li>
              <div className="summary-title color3">
                <span>
                  <i className="fa fa-money" /> Выручка
                </span>
              </div>
              <div className="summary-body">
                
                {summary.orders[0]
                  ? summary.orders[0].totalSales.toFixed(2)
                  : 0} Руб
              </div>
            </li>
          </ul>
          <div>
            <div>
              <h2>График выручки</h2>
              {summary.dailyOrders.length === 0 ? (
                <MessageBox>Нет продаж</MessageBox>
              ) : (
                <Chart
                  width="100%"
                  height="400px"
                  chartType="AreaChart"
                  loader={<div>Загружаем график...</div>}
                  data={[
                    ['Дата', 'Продажи'],
                    ...summary.dailyOrders.map((x) => [x._id, x.sales]),
                  ]}
                ></Chart>
              )}
            </div>
          </div>
          <div>
            <h2>Категории</h2>
            {summary.productCategories.length === 0 ? (
              <MessageBox>Нет</MessageBox>
            ) : (
              <Chart
                width="100%"
                height="400px"
                chartType="PieChart"
                loader={<div>Загружаем график...</div>}
                data={[
                  ['Категории', 'Товары'],
                  ...summary.productCategories.map((x) => [x._id, x.count]),
                ]}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
}