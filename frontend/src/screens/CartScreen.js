import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart } from '../actions/cartActions';
import MessageBox from '../components/MessageBox';

export default function CartScreen(props) {
  const productId = props.match.params.id;
  const qty = props.location.search
    ? Number(props.location.search.split('=')[1])
    : 1;

  const cart = useSelector(state => state.cart);
  const { cartItems } = cart;
  const dispatch = useDispatch();
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = (id) => {
    //delete action
  }

  const checkoutHandler = () =>{
    props.history.push(`/signin?redirect=shipping`)
  }

  function declOfNum(number, titles) {
    let cases = [2, 0, 1, 1, 1, 2];
    return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
  }

  return (
    <div className='row top'>
      <div className='col-2'>
        <h1>Корзина</h1>
        {cartItems === 0 ? <MessageBox>
          В корзине ничего нет. <Link to="/">Выбрать товары</Link>
        </MessageBox> :
          (
            <ul>
              {cartItems.map((item) => (
                <li key={item.product}>
                  <div className='row'>
                    <div>
                      <img src={item.image}
                        alt={item.name}
                        className='small'>
                      </img>
                    </div>
                    <div className='min-30'>
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </div>
                    <div>
                      <select value={item.qty} onChange={e => dispatch
                        (addToCart(item.product, Number(e.target.value)))}>{[...Array(item.countInStock).keys()].map(x => (
                            <option key={x + 1} value={x + 1}>{x + 1}</option>
                          )
                          )}</select>
                    </div>
                    <div>{item.price * item.qty} Руб.</div>
                    <div>
                      <button type='button' onClick={() => removeFromCartHandler(item.product)}>Удалить</button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )
        }
      </div>
      <div className='col-1>'>
        <div className='card card-body'>
          <ul>
            <li>
              <h2>Итого ({cartItems.reduce((a, c) => a + c.qty, 0)} {declOfNum(cartItems.reduce((a, c) => a + c.qty, 0), ['товар', 'товара', 'товаров'])}): {cartItems.reduce((a, c) => a + c.price * c.qty, 0)} руб.</h2>
            </li>
            <li>
              <button type='button' onClick={checkoutHandler} className='primary block' disabled={cartItems.length === 0}>К оплате</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}