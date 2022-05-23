import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  listProductCategories,
  deleteCategory,
  createCategory,
} from "../actions/productActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import {

  PRODUCT_FORMRELEASE_CREATE_RESET,
  PRODUCT_FORMRELEASE_DELETE_RESET,

} from "../constants/productConstants";

export default function CategoryScreen(props) {
  const categoryList = useSelector((state) => state.productCategoryList);
  const { loading, error, categories } = categoryList;

  const categoryDelete = useSelector(
    (state) => state.productCategoryDelete
  );
  const categoryCreate = useSelector(
    (state) => state.productCategoryCreate
  );
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    category: createdCategory,
  } = categoryCreate;
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = categoryDelete;

  const dispatch = useDispatch();
  useEffect(() => {
    if (successCreate) {
      dispatch({ type: PRODUCT_FORMRELEASE_CREATE_RESET });
      props.history.push(`/category/${createdCategory._id}/edit`);
      window.location.reload(false);
    }
    if (successDelete) {
      dispatch({ type: PRODUCT_FORMRELEASE_DELETE_RESET });
      window.location.reload(false);
    }
    dispatch(listProductCategories());
  }, [
    createdCategory,
    dispatch,
    props.history,
    successCreate,
    successDelete,
  ]);

  const clickHandler = () => {
    dispatch(createCategory());
  };
  const deleteHandler = (category) => {
    if (window.confirm("Вы уверены?")) {
      dispatch(deleteCategory(category._id));
    }
  };

  return (
    <div className="tableDiv">
    <h1 className="row center">Управление категориями</h1>
      
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
              <th>Наименование категории</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category._id}>
                <td>{category._id}</td>
                <td>{category.name}</td>
                <td>
                  <button
                    type="button"
                    className="small"
                    onClick={() =>
                      props.history.push(`/category/${category._id}/edit`)
                    }
                  >
                    Редактировать
                  </button>
                  <button
                    type="button"
                    className="small"
                    onClick={() => deleteHandler(category)}
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
        Добавить новую категорию
      </button>
    </div>
  );
}
