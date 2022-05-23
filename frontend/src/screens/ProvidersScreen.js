import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  listProductProviders,
  deleteProvider,
  createProvider,
} from "../actions/productActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import {

  PRODUCT_PROVIDER_CREATE_RESET,
  PRODUCT_PROVIDER_DELETE_RESET,

} from "../constants/productConstants";

export default function ProvidersScreen(props) {
  const providerList = useSelector((state) => state.productProviderList);
  const { loading, error, providers } = providerList;

  const providerDelete = useSelector(
    (state) => state.productProviderDelete
  );
  const providerCreate = useSelector(
    (state) => state.productProviderCreate
  );
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    provider: createdProvider,
  } = providerCreate;
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = providerDelete;

  const dispatch = useDispatch();
  useEffect(() => {
    if (successCreate) {
      dispatch({ type: PRODUCT_PROVIDER_CREATE_RESET });
      props.history.push(`/provider/${createdProvider._id}/edit`);
      window.location.reload(false);
    }
    if (successDelete) {
      dispatch({ type: PRODUCT_PROVIDER_DELETE_RESET });
      window.location.reload(false);
    }
    dispatch(listProductProviders());
  }, [
    createdProvider,
    dispatch,
    props.history,
    successCreate,
    successDelete,
  ]);

  const clickHandler = () => {
    dispatch(createProvider());
  };
  const deleteHandler = (provider) => {
    if (window.confirm("Вы уверены?")) {
      dispatch(deleteProvider(provider._id));
    }
  };

  return (
    <div className="tableDiv">
    <h1 className="row center">Управление поставщиками</h1>
      
      {loadingDelete && <LoadingBox></LoadingBox>}
      {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}

      {loadingCreate && <LoadingBox></LoadingBox>}
      {errorCreate && <MessageBox variant="danger">{errorCreate}</MessageBox>}
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Наименование поставщика</th>
              <th>Номер телефона поставщика</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {providers.map((provider) => (
              <tr key={provider._id}>
                <td>{provider._id}</td>
                <td>{provider.name}</td>
                <td>{provider.phoneNumber}</td>
                <td>
                  <button
                    type="button"
                    className="small"
                    onClick={() =>
                      props.history.push(`/provider/${provider._id}/edit`)
                    }
                  >
                    Редактировать
                  </button>
                  <button
                    type="button"
                    className="small"
                    onClick={() => deleteHandler(provider)}
                  >
                    Удалить
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
      )}
      <button
        style={{ width: "20%",margin: "2rem 40%",  borderRadius: "0" }}
        type="button"
        className="shadow"
        onClick={clickHandler}
      >
        Добавить нового поставщика
      </button>
    </div>
  );
}
