import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { detailsCategory, updateCategory } from "../actions/productActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { PRODUCT_FORMRELEASE_UPDATE_RESET } from "../constants/productConstants";


export default function CategoryEditScreen(props) {
  const categoryId = props.match.params.id;
  const [name, setName] = useState("");

  const categoryDetails = useSelector((state) => state.productCategoryDetails);
  const { loading, error, category } = categoryDetails;
  const categoryUpdate = useSelector((state) => state.productCategoryUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = categoryUpdate;

  const dispatch = useDispatch();
  useEffect(() => {
    if (successUpdate) {
      props.history.push("/category/");
      window.location.reload(false);
    }
    if (!category || category._id !== categoryId || successUpdate) {
      dispatch({ type: PRODUCT_FORMRELEASE_UPDATE_RESET });
      dispatch(detailsCategory(categoryId));
    } else {
      setName(category.name);
    }
  }, [category, dispatch, categoryId, successUpdate, props.history]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateCategory({
        _id: categoryId,
        name,
      })
    );


  };

  const closeHandler = () =>{
    props.history.push("/category/");
      window.location.reload(false);
  }

  

  return (
    <div className="shadow" style={{Width:'100vh', margin:'auto'}}>
    <form className="form" onSubmit={submitHandler}>
      <div>
        <h1>Редактирование категории {categoryId}</h1>
      </div>
      {loadingUpdate && <LoadingBox></LoadingBox>}
      {errorUpdate && <MessageBox variant="danger">{errorUpdate}</MessageBox>}
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          <div>
            <label htmlFor="name">Наименование категории</label>
            <input
              id="name"
              type="text"
              placeholder="Введите наименование"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></input>
          </div>
          <div>
            <label></label>
            <button className="primary" type="submit">
              Обновить
            </button>
          </div>
          <div>
            <label></label>
            <button className="shadow" style={{width:'16%', margin:'0 auto 2rem auto'}} onClick={closeHandler}>
              Отменить
            </button>
          </div>
        </>
      )}
    </form>
  </div>
);
}