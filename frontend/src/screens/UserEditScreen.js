import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { detailsUser, updateUser } from "../actions/userActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { USER_UPDATE_RESET } from "../constants/userConstants";

export default function UserEditScreen(props) {
  const userId = props.match.params.id;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSeller, setIsSeller] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [canManageProducts, setCanManageProducts] = useState(false);
  const [canManageOrders, setCanManageOrders] = useState(false);
  const [canManageCategories, setCanManageCategories] = useState(false);
  const [canManageFormReleases, setCanManageFormReleases] = useState(false);
  const [canManageProviders, setCanManageProviders] = useState(false);
  const [canManageSupport, setCanManageSupport] = useState(false);
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userUpdate = useSelector((state) => state.userUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate;

  const dispatch = useDispatch();
  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET });
      if (user.isWorker) {
        props.history.push("/workers");
      } else {
        props.history.push("/userlist");
      }
    }
    if (!user) {
      dispatch(detailsUser(userId));
    } else {
      setName(user.name);
      setEmail(user.email);
      setCanManageProducts(user.canManageProducts);
      setCanManageFormReleases(user.canManageFormReleases);
      setCanManageProviders(user.canManageProviders);
      setCanManageSupport(user.canManageSupport);
      setCanManageOrders(user.canManageOrders);
      setCanManageCategories(user.canManageCategories);
    }
  }, [dispatch, props.history, successUpdate, user, userId]);

  const canManageProductsHandler = () => {
    console.log("Было:" + canManageProducts);
    setCanManageProducts(!canManageProducts);
  };
  const canManageFormReleasesHandler = () => {
    console.log("Было:" + canManageFormReleases);
    setCanManageFormReleases(!canManageFormReleases);
  };
  const canManageOrdersHandler = () => {
    console.log("Было:" + canManageOrders);
    setCanManageOrders(!canManageOrders);
  };
  const canManageCategoriesHandler = () => {
    console.log("Было:" + canManageCategories);
    setCanManageCategories(!canManageCategories);
  };
  const canManageSupportHandler = () => {
    console.log("Было:" + canManageSupport);
    setCanManageSupport(!canManageSupport);
  };
  const canManageProvidersHandler = () => {
    console.log("Было:" + canManageProviders);
    setCanManageProviders(!canManageProviders);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    // dispatch update user
    dispatch(
      updateUser({
        _id: userId,
        name,
        email,
        isSeller,
        isAdmin,
        canManageFormReleases,
        canManageProducts,
        canManageProviders,
        canManageSupport,
        canManageCategories,
        canManageOrders,
      })
    );
  };
  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Редактирование пользователя "{name}"</h1>
          {loadingUpdate && <LoadingBox></LoadingBox>}
          {errorUpdate && (
            <MessageBox variant="danger">{errorUpdate}</MessageBox>
          )}
        </div>
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>
            <div>
              <label htmlFor="name">Имя</label>
              <input
                id="name"
                type="text"
                placeholder="Введите имя"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                placeholder="Введите email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></input>
            </div>
            {user.isWorker ? (
              <div>
                <label className="center">
                  Настройка прав доступа для сотрудников
                </label>
                <div style={{display:'contents', margin:'0 auto'}}>
                  <label>
                    <input
                      type="checkbox"
                      checked={canManageProducts}
                      onChange={canManageProductsHandler}
                    />
                    Может управлять товарами?
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      checked={canManageOrders}
                      onChange={canManageOrdersHandler}
                    />
                    Может управлять заказами?
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      checked={canManageCategories}
                      onChange={canManageCategoriesHandler}
                    />
                    Может управлять категориями?
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      checked={canManageFormReleases}
                      onChange={canManageFormReleasesHandler}
                    />
                    Может управлять формами выпуска?
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      checked={canManageProviders}
                      onChange={canManageProvidersHandler}
                    />
                    Может управлять поставщиками?
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      checked={canManageSupport}
                      onChange={canManageSupportHandler}
                    />
                    Может использовать обратную связь с клиентами?
                  </label>
                </div>
              </div>
            ) : (
              ""
            )}
            <div>
              <button type="submit" className="primary">
                Обновить
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}
