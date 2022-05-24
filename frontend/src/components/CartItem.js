import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart, removeFromCart } from "../actions/cartActions";

export default function CartItem(props) {
  const dispatch = useDispatch();
  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };
  const { cartItem } = props;
  return (
    <div>
      <div key={cartItem.product} className="card">
        <Link to={`/product/${cartItem.product}`}>
          <img
            className="img-medium"
            src={cartItem.image}
            alt={cartItem.name}
          />
        </Link>
        <div className="card-body">
          <Link to={`/product/${cartItem.product}`}>
            <h2>{cartItem.name}</h2>
          </Link>
          <div className="row">
            <div className="small">
              {cartItem.price} x {cartItem.qty} ={" "}
              {cartItem.price * cartItem.qty} Руб
            </div>
          </div>
          <div className="row" style={{alignItems:'normal',
            display:'flex'}}>
            <select
              value={cartItem.qty}
              onChange={(e) =>
                dispatch(addToCart(cartItem.product, Number(e.target.value)))
              }
            >
              {[...Array(cartItem.countInStock).keys()].map((x) => (
                <option key={x + 1} value={x + 1}>
                  {x + 1}
                </option>
              ))}
            </select>
            <button 
              type="button"
              className="small"
              style={{margin:'0 1rem', alignSelf:'flex-end'}}
              onClick={() => removeFromCartHandler(cartItem.product)}
            >
              Удалить
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
