import React from "react";
import { BrowserRouter, Route } from 'react-router-dom';
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";



function App() {
  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="row">
          <div>
            <a href="/" className="brand">web-аптека</a>
          </div>
          <div>
            <a href="/cart">Корзина</a>
            <a href="/signin">Войти в аккаунт</a>
          </div>
        </header>
        <main>
          <Route path="/product/:id" component={ProductScreen}></Route>
          <Route path="/" component={HomeScreen} exact></Route>
          
        </main>
        <footer className="row center">
          Все права защищены
        </footer>

      </div>
    </BrowserRouter>
  );
}

export default App;
