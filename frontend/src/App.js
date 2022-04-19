import React from "react";
import data from './data';


function App() {
  return (
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
        <ul>
          <div className="row center">
          {
            data.products.map(products =>(
              <div key={products._id} className="card">
              <a href={`/product/${products._id}`}>
                <img className="medium" src={products.image} alt={products.name} />
              </a>
              <div className="card-body">
              <a href={`/product/${products._id}`}>
                  <h2>{products.name}</h2>
                </a>
                <div className="rating">
                  <span> <i className="fa fa-star"></i> </span>
                  <span> <i className="fa fa-star"></i> </span>
                  <span> <i className="fa fa-star"></i> </span>
                  <span> <i className="fa fa-star"></i> </span>
                  <span> <i className="fa fa-star"></i> </span>
                </div>
                <div className="price">
                  {products.price} Руб.
                </div>
              </div>
            </div> 
            ))
          }
               
          </div>
        </ul>
      </main>
      <footer className="row center">
        Все права защищены
      </footer>

    </div>
  );
}

export default App;
