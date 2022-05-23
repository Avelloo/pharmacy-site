import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  listProductFormRelease,
  deleteFormRelease,
  createFormRelease,
} from "../actions/productActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import {

  PRODUCT_FORMRELEASE_CREATE_RESET,
  PRODUCT_FORMRELEASE_DELETE_RESET,

} from "../constants/productConstants";

export default function FormReleaseScreen(props) {
  const formReleaseList = useSelector((state) => state.productFormReleaseList);
  const { loading, error, formReleases } = formReleaseList;

  const formReleaseDelete = useSelector(
    (state) => state.productFormReleaseDelete
  );
  const formReleaseCreate = useSelector(
    (state) => state.productFormReleaseCreate
  );
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    formRelease: createdFormRelease,
  } = formReleaseCreate;
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = formReleaseDelete;

  const dispatch = useDispatch();
  useEffect(() => {
    if (successCreate) {
      dispatch({ type: PRODUCT_FORMRELEASE_CREATE_RESET });
      props.history.push(`/formRelease/${createdFormRelease._id}/edit`);
      window.location.reload(false);
    }
    if (successDelete) {
      dispatch({ type: PRODUCT_FORMRELEASE_DELETE_RESET });
      window.location.reload(false);
    }
    dispatch(listProductFormRelease());
  }, [
    createdFormRelease,
    dispatch,
    props.history,
    successCreate,
    successDelete,
  ]);

  const clickHandler = () => {
    dispatch(createFormRelease());
  };
  const deleteHandler = (formRelease) => {
    if (window.confirm("Вы уверены?")) {
      dispatch(deleteFormRelease(formRelease._id));
    }
  };

  return (
    <div className="tableDiv">
      <h1 className="row center">Управление формами выпуска</h1>
      
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
              <th>Наименование формы выпуска</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {formReleases.map((formRelease) => (
              <tr key={formRelease._id}>
                <td>{formRelease._id}</td>
                <td>{formRelease.name}</td>
                <td>
                  <button
                    type="button"
                    className="small"
                    onClick={() =>
                      props.history.push(`/formRelease/${formRelease._id}/edit`)
                    }
                  >
                    Редактировать
                  </button>
                  <button
                    type="button"
                    className="small"
                    onClick={() => deleteHandler(formRelease)}
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
        Добавить новую форму выпуска
      </button>
    </div>
  );
}
