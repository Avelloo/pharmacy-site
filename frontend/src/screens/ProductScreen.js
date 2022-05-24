import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createReview, detailsProducts } from "../actions/productActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import Rating from "../components/Rating";
import { PRODUCT_REVIEW_CREATE_RESET } from "../constants/productConstants";


export default function ProductScreen(props) {
  const dispatch = useDispatch();
  const productId = props.match.params.id;
  const [qty, setQty] = useState(1);
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const {
    loading: loadingReviewCreate,
    error: errorReviewCreate,
    success: successReviewCreate,
  } = productReviewCreate;

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [userPrescript, setUserPrescript] = useState("");

  useEffect(() => {
    if (successReviewCreate) {
      window.alert("Отзыв опубликован");
      setRating("");
      setComment("");
      dispatch({ type: PRODUCT_REVIEW_CREATE_RESET });
    }
    dispatch(detailsProducts(productId));
  }, [dispatch, productId, successReviewCreate]);

  const addToCartHandler = () => {
    if(product.isPrescripted){
      if(userPrescript == product.prescript){
        props.history.push(`/cart/${productId}?qty=${qty}`);
      }else{
        if(userPrescript == ''){
          alert("Введите хеш рецепта!");
        }else{
          alert("Хеш рецепта не подходит!");
        }
       
      }
    }else{
      props.history.push(`/cart/${productId}?qty=${qty}`);
    }

  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (comment && rating) {
      dispatch(
        createReview(productId, { rating, comment, name: userInfo.name })
      );
    } else {
      alert("Пожалуйста введите отзыв и поставьте рейтинг.");
    }
  };


  return (
    <>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : (
        <div className="productHeader">
          <h1 className="productTitle">{product.name}</h1>
          <div className="">
            <Rating
              rating={product.rating}
              numReviews={product.numReviews}
            ></Rating>
          </div>
        </div>
      )}
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          <div className="row-top-product">
            <div className="productBlock">
              <img
                className="img-product"
                src={product.image}
                alt={product.name}
              ></img>
              <div className="card-product card-body">
                <div>
                  Поставщик
                  <h2>
                    <Link to={`/provider/${product.provider._id}`}>
                    {product.provider}
                    </Link>
                  </h2>
                </div>
                <div>
                  <div className="row">
                    <div>Цена:</div>
                    <div className="price">{product.price} Руб.</div>
                  </div>
                </div>
                <div>
                  <div className="row" style={{margin:'1rem 0'}}>
                    <div>Статус:</div>
                    <div>
                      {product.countInStock > 0 ? (
                        <span className="success" style={{marginLeft: '1rem'}}>Есть в наличии</span>
                      ) : (
                        <span className="danger"  style={{marginLeft: '1rem'}} >Товар отсутствует</span>
                      )}
                    </div>
                  </div>
                </div>
                <div>
                  <div className="row" style={{margin:'1rem 0'}}>
                    <div>Рецепт:</div>
                    <div>
                      {product.isPrescripted? (
                        <span className="danger"  style={{marginLeft: '1rem'}} >Требуется рецепт</span>
                      ) : (
                        <span className="success" style={{marginLeft: '1rem'}}>Рецепт не нужен</span>
                      )}
                    </div>
                  </div>
                </div>
                {product.isPrescripted? (
                  <div className="" style={{margin:'2rem 0', borderRadius:'1rem'}}>
                   <p style={{margin:'2rem 0', padding:'0,5rem'}}>Это рецептурный препарат. Перед добавлением его в корзину введите хеш рецепта ниже:</p>
                   <input onChange={e => setUserPrescript(e.target.value)} className="shadow" style={{width:'210px', backgroundColor:'#b5ccff', borderRadius:'0 0 1rem 1rem'}}></input>
                 </div>
                ) : (
                 ''
                )}
                 
                {product.countInStock > 0 && (
                  <>
                    <div className="qtySelector">
                      <div>Кол-во:</div>
                      <select
                        value={qty}
                        onChange={(e) => setQty(e.target.value)}
                      >
                        {[...Array(product.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </select>
                    </div>

                    <button
                      style={{ margin: "o auto" }}
                      onClick={addToCartHandler}
                      className="primary block"
                    >
                      В корзину
                    </button>
                  </>
                )}
              </div>
            </div>

            <div className="description_list_container">
              <div className="description_list">
                <div>
                  <div
                    className="product-description"
                    dangerouslySetInnerHTML={{
                      __html: product.description,
                    }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="reviewsSection">
              {loading ? (
                <LoadingBox></LoadingBox>
              ) : error ? (
                <MessageBox variant="danger">{error}</MessageBox>
              ) : (
                <div className=" reviewsBlock shadow" style={{height:'100%'}}>
                  <h2 id="reviews">Отзывы</h2>
                  {product.reviews.length === 0 && (
                    <MessageBox>
                      Ещё никто не оставил отзыв. Будьте первыми!
                    </MessageBox>
                  )}
                  <ul>
                    {product.reviews.map((review) => (
                      <li key={review._id} className='' style={{padding:'1rem', margon:'1rem 0', backgroundColor:'rgba(69, 123, 157, 0.06)', borderRadius:'1rem'}}>
                        <strong>{review.name}</strong>
                        <Rating rating={review.rating} caption=" "></Rating>
                        <p>{review.createdAt.substring(0, 10)}</p>
                        <p>{review.comment}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className=" leaveReview shadow">
                {userInfo ? (
                  <form className="form" onSubmit={submitHandler}>
                    <div>
                      <h2>Оставить отзыв:</h2>
                    </div>
                    <div>
                      <label htmlFor="rating">Рейтинг</label>
                      <select
                        id="rating"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                      >
                        <option value="">Выберите...</option>
                        <option value="1">1- Ужасно</option>
                        <option value="2">2- Плохо</option>
                        <option value="3">3- Хорошо</option>
                        <option value="4">4- Очень хорошо</option>
                        <option value="5">5- Отлично</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="comment">Отзыв</label>
                      <textarea
                        id="comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      ></textarea>
                    </div>
                    <div>
                      <label />
                      <button
                        className="primary"
                        type="submit"
                        style={{ width: "100%" }}
                      >
                        Отправить
                      </button>
                    </div>
                    <div>
                      {loadingReviewCreate && <LoadingBox></LoadingBox>}
                      {errorReviewCreate && (
                        <MessageBox variant="danger">
                          {errorReviewCreate}
                        </MessageBox>
                      )}
                    </div>
                  </form>
                ) : (
                  <MessageBox>
                    Пожалуйста <Link to="/signin">войдите в аккаунт</Link>,
                    чтобы оставить отзыв.
                  </MessageBox>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
