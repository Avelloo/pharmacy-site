import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart, removeFromCart } from "../actions/cartActions";
import MessageBox from "../components/MessageBox";

export default function CartScreen(props) {
  const productId = props.match.params.id;
  const qty = props.location.search
    ? Number(props.location.search.split("=")[1])
    : 1;

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const dispatch = useDispatch();
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    props.history.push(`/signin?redirect=shipping`);
  };

  function declOfNum(number, titles) {
    let cases = [2, 0, 1, 1, 1, 2];
    return titles[
      number % 100 > 4 && number % 100 < 20
        ? 2
        : cases[number % 10 < 5 ? number % 10 : 5]
    ];
  }

  return (
    <>
    
      <div className="row-top-product">
        <div className="col-2-cart">
          <h1 style={{ margin: "0 2rem 0 0", padding: "0", fontSize:'2rem' }}>Корзина</h1>
          {cartItems.length === 0 ? (
            <MessageBox>
              В корзине ничего нет.
              <Link to="/">
                <h2>Выбрать товары?</h2>
              </Link>
            </MessageBox>
          ) : (
            <ul>
              {cartItems.map((item) => (
                <li key={item.product}>
                  <div className="row">
                    <div>
                      <img
                        src={item.image}
                        alt={item.name}
                        className="img-medium shadow"
                      ></img>
                    </div>
                      <div className="min-50">
                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                      </div>
                      <div>
                        <select
                          value={item.qty}
                          onChange={(e) =>
                            dispatch(
                              addToCart(item.product, Number(e.target.value))
                            )
                          }
                        >
                          {[...Array(item.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>{item.price * item.qty} Руб.</div>
                      <div>
                        <button
                          type="button"
                          onClick={() => removeFromCartHandler(item.product)}
                        >
                          Удалить
                        </button>
                      </div>
                    </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="col-1>">
          <div className="card card-body">
            <ul>
              <li>
                <h2>
                  Итого ({cartItems.reduce((a, c) => a + c.qty, 0)}{" "}
                  {declOfNum(
                    cartItems.reduce((a, c) => a + c.qty, 0),
                    ["товар", "товара", "товаров"]
                  )}
                  ): {cartItems.reduce((a, c) => a + c.price * c.qty, 0)} руб.
                </h2>
              </li>
              <li>
                <button
                  type="button"
                  onClick={checkoutHandler}
                  className="primary block"
                  disabled={cartItems.length === 0}
                >
                  К оплате
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
