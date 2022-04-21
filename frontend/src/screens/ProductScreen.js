import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { detailsProducts } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Rating from '../components/Rating';

export default function ProductScreen(props) {
  const dispatch = useDispatch();
  const productId = props.match.params.id;
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  useEffect(() => {
    dispatch(detailsProducts(productId));
  }, [dispatch, productId]);

  return (
    <div>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div>
          <a href='/' onClick={() => { window.location.href = "/" }}>На главную</a>
          <div className='row top'>
            <div className='col-2'>
              <img className='large' src={product.image} alt={product.name}></img>
            </div>

            <div className='col-1'>
              <ul>
                <li>
                  <h1>{product.name}</h1>
                </li>
                <li>
                  <Rating rating={product.rating} numReviews={product.numReviews}></Rating>
                </li>
                <li>
                  Цена: {product.price} Руб.
                </li>
                <li>
                  Описание: <p>{product.description}</p>
                </li>
              </ul>
            </div>

            <div className='col-1'>
              <div className='card card-body'>
                <ul>
                  <li>
                    <div className='row'>
                      <div>Цена:</div>
                      <div className='price'>{product.price} Руб.</div>
                    </div>
                  </li>
                  <li>
                    <div className='row'>
                      <div>Статус:</div>
                      <div>{product.countInStock > 0 ? <span className='success'>Есть в наличии</span> :
                        <span className='danger'>Товар отсутствует</span>}</div>
                    </div>
                  </li>
                  <li>
                    <button className='primary block'>В корзину</button>
                  </li>

                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>

  )
}
