import React from 'react'
import Rating from '../components/Rating';
import data from '../data'


export default function ProductScreen(props) {

  const product = data.product.find(x => x._id === props.match.params.id);
  if (!product) {
    return <div>Товар не найден!</div>;
  }

  return (
    <div>
      <a href='/' onClick={() => {window.location.href="/"}}>На главную</a>
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
                  <div>Цена</div>
                  <div className='price'>{product.price} Руб.</div>
                </div>
              </li>
              <li>
                <div className='row'>
                  <div>Статус</div>
                  <div>{product.countInStock > 0 ? <span className='success'>Есть в наличии</span> :
                    <span className='error'>Товар отсутствует</span>}</div>
                </div>
              </li>
              <li>
                <button className='primary block'>Добавить в корзину</button>
              </li>

            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
