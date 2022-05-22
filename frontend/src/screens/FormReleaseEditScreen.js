import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { detailsFormRelease, updateFormRelease } from "../actions/productActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { PRODUCT_FORMRELEASE_UPDATE_RESET } from "../constants/productConstants";


export default function FormReleaseEditScreen(props) {
  const formReleaseId = props.match.params.id;
  const [name, setName] = useState("");

  const formReleaseDetails = useSelector((state) => state.productFormReleaseDetails);
  const { loading, error, formRelease } = formReleaseDetails;
  const formReleaseUpdate = useSelector((state) => state.productFormReleaseUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = formReleaseUpdate;

  const dispatch = useDispatch();
  useEffect(() => {
    if (successUpdate) {
      props.history.push("/formRelease/");
      window.location.reload(false);
    }
    if (!formRelease || formRelease._id !== formReleaseId || successUpdate) {
      dispatch({ type: PRODUCT_FORMRELEASE_UPDATE_RESET });
      dispatch(detailsFormRelease(formReleaseId));
    } else {
      setName(formRelease.name);
    }
  }, [formRelease, dispatch, formReleaseId, successUpdate, props.history]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateFormRelease({
        _id: formReleaseId,
        name,
      })
    );


  };

  const closeHandler = () =>{
    props.history.push("/formRelease/");
      window.location.reload(false);
  }

  

  return (
    <div className="shadow" style={{Width:'100vh', margin:'auto'}}>
    <form className="form" onSubmit={submitHandler}>
      <div>
        <h1>Редактирование формы выпуска {formReleaseId}</h1>
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
            <label htmlFor="name">Наименование формы выпуска</label>
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