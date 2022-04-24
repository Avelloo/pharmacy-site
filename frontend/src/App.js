import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Link, Route } from 'react-router-dom';
import CartScreen from "./screens/CartScreen";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";



function App() {

  const cart = useSelector(state => state.cart);
  const { cartItems } = cart;

  return (
    <BrowserRouter forceRefresh>
      <div className="grid-container">
        <header className="row">
          <div>
            <Link to="/" className="brand">web-аптека</Link>
          </div>
          <div>
            <Link to="/cart">Корзина
            {
              cartItems.length > 0 && (
                <span className="badge">{cartItems.length}</span>
              )
            }
            </Link>
            <Link to="/signin">Войти в аккаунт</Link>
          </div>
        </header>
        <main>

          <Route path="/product/:id" component={ProductScreen} key={2}></Route>
          <Route path="/cart/:id?" component={CartScreen} key={3}></Route>
          <Route path="/" component={HomeScreen} exact key={1}></Route>



        </main>
        <footer className="row center">
          Все права защищены
        </footer>

      </div>
    </BrowserRouter>
  );
}

export default App;
