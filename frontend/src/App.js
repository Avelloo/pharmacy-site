import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Route } from "react-router-dom";
import { signout } from "./actions/userActions";
import CartScreen from "./screens/CartScreen";
import HomeScreen from "./screens/HomeScreen";
import OrderHistoryScreen from "./screens/OrderHistoryScreen";
import OrderScreen from "./screens/OrderScreen";
import PaymentMethodScreen from "./screens/PaymentMethodScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import ProductScreen from "./screens/ProductScreen";
import ProfileScreen from "./screens/ProfileScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ShippingAdressScreen from "./screens/ShippingAdressScreen";
import SigninScreen from "./screens/SigninScreen";
import PrivateRoute from "./components/PrivateRoute";
import AdminRoute from "./components/AdminRoute";
import ProductListScreen from "./screens/ProductListScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import OrderListScreen from "./screens/OrderListScreen";
import UserListScreen from "./screens/UserListScreen";
import UserEditScreen from "./screens/UserEditScreen";
import WorkerRoute from "./components/WorkerRoute";
import ProviderScreen from "./screens/ProviderScreen";
import SearchScreen from "./screens/SearchScreen";
import SearchBox from "./components/SearchBox";
import { listProductCategories } from "./actions/productActions";
import LoadingBox from "./components/LoadingBox";
import MessageBox from "./components/MessageBox";
import MapScreen from "./screens/MapScreen";
import WorkersScreen from "./screens/WorkersScreen";
import RegisterWorkerScreen from "./screens/RegisterWorkerScreen";
import FormReleaseScreen from "./screens/FormReleaseScreen";
import CategoryScreen from "./screens/CategoryScreen";
import ProvidersScreen from "./screens/ProvidersScreen";
import ProvidersEditScreen from "./screens/ProvidersEditScreen";
import FormReleaseEditScreen from "./screens/FormReleaseEditScreen";
import CategoryEditScreen from "./screens/CategoryEditScreen";
import DashboardScreen from "./screens/DashboardScreen";
import SupportScreen from './screens/SupportScreen';
import ChatBox from './components/ChatBox';

function App() {
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  };

  const productCategoryList = useSelector((state) => state.productCategoryList);
  const {
    loading: loadingCategories,
    error: errorCategories,
    categories,
  } = productCategoryList;
  useEffect(() => {
    dispatch(listProductCategories());
  }, [dispatch]);

  return (
    <div className="grid-container">
      <header className="row-top">
        <div>
          <button
            type="button"
            className="open-sidebar"
            onClick={() => setSidebarIsOpen(true)}
          >
            <i className="fa fa-bars"></i>
          </button>
          <Link to="/" className="brand">
            web-аптека
          </Link>
        </div>
        <div>
          <Route
            render={({ history }) => <SearchBox history={history}></SearchBox>}
          ></Route>
        </div>
        <div className="row center header">
          <Link to="/cart">
            Корзина
            {cartItems.length > 0 && (
              <span className="badge">{cartItems.length}</span>
            )}
          </Link>
          {userInfo ? (
            <div className="dropdown">
              <Link to="#">
                {userInfo.name} <i className="fa fa-caret-down"></i>
              </Link>
              <ul className="dropdown-content">
                <li>
                  <Link to="/profile">Профиль</Link>
                </li>
                <li>
                  <Link to="/orderhistory">История заказов</Link>
                </li>
                <li>
                  <Link to="#signout" onClick={signoutHandler}>
                    Выйти
                  </Link>
                </li>
              </ul>
            </div>
          ) : (
            <Link to="/signin">Войти в аккаунт</Link>
          )}
          {userInfo && userInfo.isWorker && (
            <div className="dropdown">
              <Link to="#admin">
                Панель сотрудника <i className="fa fa-caret-down"></i>
              </Link>
              <ul className="dropdown-content">
                <li>
                  <Link to="/productlist">Управление товарами</Link>
                </li>
                <li>
                  <Link to="/orderlist">Управление заказами</Link>
                </li>
                <li>
                  <Link to="/category">Управление категориями</Link>
                </li>
                <li>
                  <Link to="/formRelease">Управление формами выпуска</Link>
                </li>
                <li>
                  <Link to="/providers">Управление поставщиками</Link>
                </li>
              </ul>
            </div>
          )}
          {userInfo && userInfo.isAdmin && (
            <div className="dropdown">
              <Link to="#admin">
                Админ-панель <i className="fa fa-caret-down"></i>
              </Link>
              <ul className="dropdown-content">
                <li>
                  <Link to="/dashboard">Статистика</Link>
                </li>
                <li>
                  <Link to="/workers">Управление сотрудниками</Link>
                </li>

                <li>
                  <Link to="/userlist">Управление клиентами</Link>
                </li>
                <li>
                <Link to="/support">Обратная связь с клиентами</Link>
              </li>
              </ul>
            </div>
          )}
        </div>
      </header>
      <aside className={sidebarIsOpen ? "open" : ""}>
        <ul className="categories">
          <li>
            <strong>Категории</strong>
            <button
              onClick={() => setSidebarIsOpen(false)}
              className="close-sidebar"
              type="button"
            >
              <i className="fa fa-close"></i>
            </button>
          </li>
          {loadingCategories ? (
            <LoadingBox></LoadingBox>
          ) : errorCategories ? (
            <MessageBox variant="danger">{errorCategories}</MessageBox>
          ) : (
            categories.map((c) => (
              <li key={c.name}>
                <Link
                  to={`/search/category/${c.name}`}
                  onClick={() => setSidebarIsOpen(false)}
                >
                  {c.name}
                </Link>
              </li>
            ))
          )}
        </ul>
      </aside>
      <main>
        <Route path="/providerDetails/:id" component={ProviderScreen}></Route>
        <Route path="/product/:id" component={ProductScreen} exact></Route>
        <Route
          path="/product/:id/edit"
          component={ProductEditScreen}
          exact
        ></Route>
        <Route
          path="/provider/:id/edit"
          component={ProvidersEditScreen}
          exact
        ></Route>
        <Route
          path="/formRelease/:id/edit"
          component={FormReleaseEditScreen}
          exact
        ></Route>
        <Route
          path="/category/:id/edit"
          component={CategoryEditScreen}
          exact
        ></Route>
        <Route path="/cart/:id?" component={CartScreen} key={3}></Route>
        <Route path="/signin" component={SigninScreen}></Route>
        <Route path="/register" component={RegisterScreen}></Route>

        <Route path="/shipping" component={ShippingAdressScreen}></Route>
        <Route path="/payment" component={PaymentMethodScreen}></Route>
        <Route path="/placeorder" component={PlaceOrderScreen}></Route>

        <Route path="/order/:id" component={OrderScreen}></Route>
        <Route path="/orderhistory" component={OrderHistoryScreen}></Route>
        <PrivateRoute path="/profile" component={ProfileScreen}></PrivateRoute>
        <PrivateRoute path="/map" component={MapScreen}></PrivateRoute>
        <AdminRoute
          path="/registerWorker"
          component={RegisterWorkerScreen}
        ></AdminRoute>
        <AdminRoute path="/workers" component={WorkersScreen}></AdminRoute>
        <AdminRoute path="/dashboard" component={DashboardScreen}></AdminRoute>
        <AdminRoute
          path="/productlist"
          component={ProductListScreen}
          exact
        ></AdminRoute>
        <AdminRoute
          path="/orderlist"
          component={OrderListScreen}
          exact
        ></AdminRoute>
        <AdminRoute path="/userlist" component={UserListScreen}></AdminRoute>
        <AdminRoute path="/support" component={SupportScreen}></AdminRoute>
        <AdminRoute
          path="/user/:id/edit"
          component={UserEditScreen}
        ></AdminRoute>
        <WorkerRoute
          path="/formRelease"
          exact
          component={FormReleaseScreen}
        ></WorkerRoute>
        <WorkerRoute
          path="/category"
          exact
          component={CategoryScreen}
        ></WorkerRoute>
        <WorkerRoute
          path="/providers"
          component={ProvidersScreen}
        ></WorkerRoute>
        <Route
          path="/search/name/:name?"
          component={SearchScreen}
          exact
        ></Route>
        <Route
          path="/search/category/:category"
          component={SearchScreen}
          exact
        ></Route>
        <Route
          path="/search/category/:category/name/:name"
          component={SearchScreen}
          exact
        ></Route>
        <Route
          path="/search/category/:category/name/:name/min/:min/max/:max/rating/:rating/order/:order"
          component={SearchScreen}
          exact
        ></Route>
        <Route path="/" component={HomeScreen} exact key={1}></Route>
      </main>
      <footer className="row center">
      {userInfo && !userInfo.isAdmin && <ChatBox userInfo={userInfo} />}
      <div>Все права защищены</div>{' '}
    </footer>
    </div>
  );
}

export default App;
