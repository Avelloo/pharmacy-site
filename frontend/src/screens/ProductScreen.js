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
    props.history.push(`/cart/${productId}?qty=${qty}`);
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
    <div>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          <div>
            <a
              href="/"
              onClick={() => {
                window.location.href = "/";
              }}
            >
              На главную
            </a>
            <div className="row-top-product">
              <div className="row-top-container">
                <div className="col-2">
                  <img
                    className="img-product shadow"
                    src={product.image}
                    alt={product.name}
                  ></img>
                </div>
                <div className="description_list_container">
                  <ul className="description_list">
                    <li>
                      <h1>{product.name}</h1>
                    </li>
                    <li>
                      <Rating
                        rating={product.rating}
                        numReviews={product.numReviews}
                      ></Rating>
                    </li>
                    <li>Цена: {product.price} Руб.</li>
                    <li>
                      <div
                        className="product-description"
                        dangerouslySetInnerHTML={{
                          __html: product.description,
                        }}
                      ></div>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="card-product card-body">
                <ul>
                  <li>
                    Поставщик{" "}
                    <h2>
                      <Link to={`/seller/${product.seller._id}`}>
                        {product.seller.seller.name}
                      </Link>
                    </h2>
                    <Rating
                      rating={product.seller.seller.rating}
                      numReviews={product.seller.seller.numReviews}
                    ></Rating>
                  </li>
                  <li>
                    <div className="row">
                      <div>Цена:</div>
                      <div className="price">{product.price} Руб.</div>
                    </div>
                  </li>
                  <li>
                    <div className="row">
                      <div>Статус:</div>
                      <div>
                        {product.countInStock > 0 ? (
                          <span className="success">Есть в наличии</span>
                        ) : (
                          <span className="danger">Товар отсутствует</span>
                        )}
                      </div>
                    </div>
                  </li>
                  {product.countInStock > 0 && (
                    <>
                      <li className="qtySelector">
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
                      </li>
                      <li>
                        <button
                          onClick={addToCartHandler}
                          className="primary block"
                        >
                          В корзину
                        </button>
                      </li>
                    </>
                  )}
                </ul>
              </div>
              <div
                className="shadow"
                style={{ padding: "1rem", margin: "1rem" }}
              >
                <h2 id="reviews">Отзывы</h2>
                {product.reviews.length === 0 && (
                  <MessageBox>
                    Ещё никто не оставил отзыв. Будьте первыми!
                  </MessageBox>
                )}
                <ul>
                  {product.reviews.map((review) => (
                    <li key={review._id}>
                      <strong>{review.name}</strong>
                      <Rating rating={review.rating} caption=" "></Rating>
                      <p>{review.createdAt.substring(0, 10)}</p>
                      <p>{review.comment}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="shadow" style={{ padding: "1rem", margin: "1rem" }}>
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
                    <button className="primary" type="submit">
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
                  Пожалуйста <Link to="/signin">войдите в аккаунт</Link>, чтобы
                  оставить отзыв.
                </MessageBox>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
