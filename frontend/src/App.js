import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Route } from "react-router-dom";
import { signout } from "./actions/userActions";
import CartScreen from "./screens/CartScreen";
import HomeScreen from "./screens/HomeScreen";
import PaymentMethodScreen from "./screens/PaymentMethodScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import ProductScreen from "./screens/ProductScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ShippingAdressScreen from "./screens/ShippingAdressScreen";
import SigninScreen from "./screens/SigninScreen";



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
                  <Link to="#signout" onClick={signoutHandler}>
                    Выйти
                  </Link>
                </ul>
              </div>
            ) : (
              <Link to="/signin">Войти в аккаунт</Link>
            )}
          </div>
        </header>
        <main>
          <Route path="/product/:id" component={ProductScreen} key={2}></Route>
          <Route path="/cart/:id?" component={CartScreen} key={3}></Route>
          <Route path="/signin" component={SigninScreen}></Route>
          <Route path="/register" component={RegisterScreen}></Route>
          <Route path="/shipping" component={ShippingAdressScreen}></Route>
          <Route path="/payment" component={PaymentMethodScreen}></Route>
          <Route path="/placeorder" component={PlaceOrderScreen}></Route>
          <Route path="/" component={HomeScreen} exact key={1}></Route>
        </main>
        <footer className="row center">Все права защищены</footer>
      </div>
  );
}

export default App;
