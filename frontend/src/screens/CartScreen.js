import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart } from "../actions/cartActions";
import CartItem from "../components/CartItem";
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
    <h1 className="row center">Корзина</h1>
      {cartItems.length === 0 ? (
        <MessageBox>
          В корзине ничего нет.
          <Link to="/">
            <h2>Выбрать товары?</h2>
          </Link>
        </MessageBox>
      ) : (
        <div className="card card-body center">
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
      )}
      <div className="row centerCart">
        {cartItems.length === 0 ? (
          <MessageBox>
            В корзине ничего нет.
            <Link to="/">
              <h2>Выбрать товары?</h2>
            </Link>
          </MessageBox>
        ) : (
          <>
            {cartItems.map((cartItem) => (
              <CartItem key={cartItem._id} cartItem={cartItem}></CartItem>
            ))}
          </>
        )}
      </div>
    </>
  );
}
