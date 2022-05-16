import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Route } from "react-router-dom";
import { signout } from "./actions/userActions";
import CartScreen from "./screens/CartScreen";
import HomeScreen from "./screens/HomeScreen";
import OrderHistoryScreen from "./screens/OrderHistoryScreen";
import OrderScreen from "./screens/OrderScreen";
import PaymentMethodScreen from "./screens/PaymentMethodScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import ProductScreen from "./screens/ProductScreen";
import ProfileScreen from "./screens/ProfileScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ShippingAdressScreen from "./screens/ShippingAdressScreen";
import SigninScreen from "./screens/SigninScreen";
import PrivateRoute from "./components/PrivateRoute";
import AdminRoute from "./components/AdminRoute";
import ProductListScreen from "./screens/ProductListScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import OrderListScreen from "./screens/OrderListScreen";
import UserListScreen from "./screens/UserListScreen";
import UserEditScreen from './screens/UserEditScreen';

function App() {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
    window.forceUpdate();
  };

  return (
    <div className="grid-container">
      <header className="row">
        <div>
          <Link to="/" className="brand">
            web-аптека
          </Link>
        </div>
        <div>
          <Link to="/cart">
            Корзина
            {cartItems.length > 0 && (
              <span className="badge">{cartItems.length}</span>
            )}
          </Link>
          {userInfo ? (
            <div className="dropdown">
              <Link to="#">
                {userInfo.name} <i className="fa fa-caret-down"></i>
              </Link>
              <ul className="dropdown-content">
                <li>
                  <Link to="/profile">Профиль</Link>
                </li>
                <li>
                  <Link to="/orderhistory">История заказов</Link>
                </li>
                <li>
                  <Link to="#signout" onClick={signoutHandler}>
                    Выйти
                  </Link>
                </li>
              </ul>
            </div>
          ) : (
            <Link to="/signin">Войти в аккаунт</Link>
          )}
          {userInfo && userInfo.isAdmin && (
            <div className="dropdown">
              <Link to="#admin">
                Админ-панель <i className="fa fa-caret-down"></i>
              </Link>
              <ul className="dropdown-content">
                <li>
                  <Link to="/dashboard">Инструментарий</Link>
                </li>
                <li>
                  <Link to="/productlist">Продукты</Link>
                </li>
                <li>
                  <Link to="/orderlist">Заказы</Link>
                </li>
                <li>
                  <Link to="/userlist">Пользователи</Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      </header>
      <main>
        <Route path="/product/:id" component={ProductScreen} exact></Route>
        <Route
          path="/product/:id/edit"
          component={ProductEditScreen}
          exact
        ></Route>
        <Route path="/cart/:id?" component={CartScreen} key={3}></Route>
        <Route path="/signin" component={SigninScreen}></Route>
        <Route path="/register" component={RegisterScreen}></Route>
        <Route path="/shipping" component={ShippingAdressScreen}></Route>
        <Route path="/payment" component={PaymentMethodScreen}></Route>
        <Route path="/placeorder" component={PlaceOrderScreen}></Route>
        <Route path="/order/:id" component={OrderScreen}></Route>
        <Route path="/orderhistory" component={OrderHistoryScreen}></Route>
        <PrivateRoute path="/profile" component={ProfileScreen}></PrivateRoute>
        <AdminRoute
          path="/productlist"
          component={ProductListScreen}
        ></AdminRoute>
        <AdminRoute path="/orderlist" component={OrderListScreen}></AdminRoute>
        <AdminRoute path="/userlist" component={UserListScreen}></AdminRoute>
        <AdminRoute
        path="/user/:id/edit"
        component={UserEditScreen}
      ></AdminRoute>
        <Route path="/" component={HomeScreen} exact key={1}></Route>
      </main>
      <footer className="row center">Все права защищены</footer>
    </div>
  );
}

export default App;
