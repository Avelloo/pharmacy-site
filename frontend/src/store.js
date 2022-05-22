import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { cartReducer } from './reducers/cartReducers';
import {
  orderCreateReducer,
  orderDeleteReducer,
  orderDeliverReducer,
  orderDetailsReducer,
  orderListReducer,
  orderMineListReducer,
  orderPayReducer,
} from './reducers/orderReducers';
import {
  productCategoryCreateReducer,
  productCategoryDeleteReducer,
  productCategoryDetailsReducer,
  productCategoryListReducer,
  productCategoryUpdateReducer,
  productCreateReducer,
  productDeleteReducer,
  productDetailsReducer,
  productFormReleaseCreateReducer,
  productFormReleaseDeleteReducer,
  productFormReleaseDetailsReducer,
  productFormReleaseListReducer,
  productFormReleaseUpdateReducer,
  productListReducer,
  productProviderCreateReducer,
  productProviderDeleteReducer,
  productProviderDetailsReducer,
  productProviderListReducer,
  productProviderUpdateReducer,
  productReviewCreateReducer,
  productUpdateReducer,
} from './reducers/productReducers';
import {
  userDetailsReducer,
  userRegisterReducer,
  userSigninReducer,
  userTopSellerListReducer,
  userUpdateProfileReducer,
  userListReducer,
  userDeleteReducer,
  userUpdateReducer,
  userAddressMapReducer,
  workerRegisterReducer,
} from './reducers/userReducer';

const initialState = {
  userSignin: {
    userInfo: localStorage.getItem('userInfo')
      ? JSON.parse(localStorage.getItem('userInfo'))
      : null,
  },
  cart: {
    cartItems: localStorage.getItem('cartItems')
      ? JSON.parse(localStorage.getItem('cartItems'))
      : [],
    shippingAdress: localStorage.getItem('shippingAdress')
      ? JSON.parse(localStorage.getItem('shippingAdress'))
      : {},
    paymentMethod: 'PayPal',
  },
};
const reducer = combineReducers({

  productList: productListReducer,
  productDetails: productDetailsReducer,

  cart: cartReducer,

  userSignin: userSigninReducer,
  userRegister: userRegisterReducer,

  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderMineList: orderMineListReducer,

  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userUpdate: userUpdateReducer,

  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  productDelete: productDeleteReducer,

  orderList: orderListReducer,
  orderDelete: orderDeleteReducer,
  orderDeliver: orderDeliverReducer,

  userList: userListReducer,
  userDelete: userDeleteReducer,

  userTopSellersList: userTopSellerListReducer,

  productReviewCreate: productReviewCreateReducer,


  productFormReleaseList: productFormReleaseListReducer,
  productProviderList: productProviderListReducer,
  productCategoryList: productCategoryListReducer,
  
  productFormReleaseCreate: productFormReleaseCreateReducer,
  productProviderCreate: productProviderCreateReducer,
  productCategoryCreate: productCategoryCreateReducer,

  productFormReleaseDelete: productFormReleaseDeleteReducer,
  productProviderDelete: productProviderDeleteReducer,
  productCategoryDelete: productCategoryDeleteReducer,

  productFormReleaseUpdate: productFormReleaseUpdateReducer,
  productProviderUpdate: productProviderUpdateReducer,
  productCategoryUpdate: productCategoryUpdateReducer,

  productFormReleaseDetails: productFormReleaseDetailsReducer,
  productProviderDetails: productProviderDetailsReducer,
  productCategoryDetails: productCategoryDetailsReducer,

  userAddressMap: userAddressMapReducer,
  workerRegister: workerRegisterReducer,
});
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;