import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { detailsProvider, updateProvider } from "../actions/productActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { PRODUCT_FORMRELEASE_UPDATE_RESET } from "../constants/productConstants";


export default function ProviderEditScreen(props) {
  const providerId = props.match.params.id;
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const providerDetails = useSelector((state) => state.productProviderDetails);
  const { loading, error, provider } = providerDetails;
  const providerUpdate = useSelector((state) => state.productProviderUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = providerUpdate;

  const dispatch = useDispatch();
  useEffect(() => {
    if (successUpdate) {
      props.history.push("/providers/");
      window.location.reload(false);
    }
    if (!provider || provider._id !== providerId || successUpdate) {
      dispatch({ type: PRODUCT_FORMRELEASE_UPDATE_RESET });
      dispatch(detailsProvider(providerId));
    } else {
      setName(provider.name);
      setPhoneNumber(provider.phoneNumber);
    }
  }, [provider, dispatch, providerId, successUpdate, props.history]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProvider({
        _id: providerId,
        name,
        phoneNumber,
      })
    );


  };

  const closeHandler = () =>{
    props.history.push("/providers/");
      window.location.reload(false);
  }

  

  return (
    <div className="shadow" style={{Width:'100vh', margin:'auto'}}>
    <form className="form" onSubmit={submitHandler}>
      <div>
        <h1>Редактирование поставщика {providerId}</h1>
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
            <label htmlFor="name">Наименование поставщика</label>
            <input
              id="name"
              type="text"
              placeholder="Введите наименование"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></input>
          </div>
          <div>
            <label htmlFor="name">Номер телефона поставщика</label>
            <input
              id="name"
              type="text"
              placeholder="Введите номер телефона"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
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