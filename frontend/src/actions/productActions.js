import Axios from "axios";
import {
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_CATEGORY_LIST_SUCCESS,
  PRODUCT_CATEGORY_LIST_REQUEST,
  PRODUCT_CATEGORY_LIST_FAIL,
  PRODUCT_REVIEW_CREATE_REQUEST,
  PRODUCT_REVIEW_CREATE_SUCCESS,
  PRODUCT_REVIEW_CREATE_FAIL,
  PRODUCT_FORMRELEASE_LIST_REQUEST,
  PRODUCT_FORMRELEASE_LIST_SUCCESS,
  PRODUCT_FORMRELEASE_LIST_FAIL,
  PRODUCT_PROVIDER_LIST_REQUEST,
  PRODUCT_PROVIDER_LIST_SUCCESS,
  PRODUCT_PROVIDER_LIST_FAIL,
  PRODUCT_PROVIDER_DELETE_REQUEST,
  PRODUCT_PROVIDER_DELETE_FAIL,
  PRODUCT_PROVIDER_DELETE_SUCCESS,
  PRODUCT_FORMRELEASE_DELETE_REQUEST,
  PRODUCT_FORMRELEASE_DELETE_SUCCESS,
  PRODUCT_FORMRELEASE_DELETE_FAIL,
  PRODUCT_CATEGORY_DELETE_REQUEST,
  PRODUCT_CATEGORY_DELETE_SUCCESS,
  PRODUCT_CATEGORY_DELETE_FAIL,
  PRODUCT_PROVIDER_UPDATE_REQUEST,
  PRODUCT_PROVIDER_UPDATE_SUCCESS,
  PRODUCT_PROVIDER_UPDATE_FAIL,
  PRODUCT_FORMRELEASE_UPDATE_REQUEST,
  PRODUCT_FORMRELEASE_UPDATE_SUCCESS,
  PRODUCT_FORMRELEASE_UPDATE_FAIL,
  PRODUCT_CATEGORY_UPDATE_REQUEST,
  PRODUCT_CATEGORY_UPDATE_SUCCESS,
  PRODUCT_CATEGORY_UPDATE_FAIL,
  PRODUCT_PROVIDER_DETAILS_REQUEST,
  PRODUCT_PROVIDER_DETAILS_SUCCESS,
  PRODUCT_PROVIDER_DETAILS_FAIL,
  PRODUCT_FORMRELEASE_DETAILS_REQUEST,
  PRODUCT_FORMRELEASE_DETAILS_SUCCESS,
  PRODUCT_FORMRELEASE_DETAILS_FAIL,
  PRODUCT_CATEGORY_DETAILS_REQUEST,
  PRODUCT_CATEGORY_DETAILS_SUCCESS,
  PRODUCT_CATEGORY_DETAILS_FAIL,
  PRODUCT_PROVIDER_CREATE_REQUEST,
  PRODUCT_PROVIDER_CREATE_SUCCESS,
  PRODUCT_PROVIDER_CREATE_FAIL,
  PRODUCT_FORMRELEASE_CREATE_REQUEST,
  PRODUCT_FORMRELEASE_CREATE_SUCCESS,
  PRODUCT_FORMRELEASE_CREATE_FAIL,
  PRODUCT_CATEGORY_CREATE_REQUEST,
  PRODUCT_CATEGORY_CREATE_SUCCESS,
  PRODUCT_CATEGORY_CREATE_FAIL,
} from "../constants/productConstants";

export const listProducts = ({
  seller = '',
  name = '',
  category = '',
  order = '',
  min = 0,
  max = 0,
  rating = 0,
}) => async (dispatch) => {
    dispatch({
      type: PRODUCT_LIST_REQUEST,
    });
    try {
      const { data } = await Axios.get(
        `/api/products?seller=${seller}&name=${name}&category=${category}&min=${min}&max=${max}&rating=${rating}&order=${order}`
      );
      dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: PRODUCT_LIST_FAIL, payload: error.message });
    }
  };

  export const listProductCategories = () => async (dispatch) => {
    dispatch({
      type: PRODUCT_CATEGORY_LIST_REQUEST,
    });
    try {
      const { data } = await Axios.get(`/api/category`);
      console.log(data);
      dispatch({ type: PRODUCT_CATEGORY_LIST_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: PRODUCT_CATEGORY_LIST_FAIL, payload: error.message });
    }
  };
  export const listProductFormRelease = () => async (dispatch) => {
    dispatch({
      type: PRODUCT_FORMRELEASE_LIST_REQUEST,
    });
    try {
      const { data } = await Axios.get(`/api/formRelease`);
      console.log(data);
      dispatch({ type: PRODUCT_FORMRELEASE_LIST_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: PRODUCT_FORMRELEASE_LIST_FAIL, payload: error.message });
    }
  };
  export const listProductProviders = () => async (dispatch) => {
    dispatch({
      type: PRODUCT_PROVIDER_LIST_REQUEST,
    });
    try {
      const { data } = await Axios.get(`/api/provider`);
      console.log(data);
      dispatch({ type: PRODUCT_PROVIDER_LIST_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: PRODUCT_PROVIDER_LIST_FAIL, payload: error.message });
    }
  };
  
  

export const detailsProducts = (productId) => async (dispatch) => {
  dispatch({ type: PRODUCT_DETAILS_REQUEST, payload: productId });
  try {
    const { data } = await Axios.get(`/api/products/${productId}`);
    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createProduct = () => async (dispatch, getState) => {
  dispatch({ type: PRODUCT_CREATE_REQUEST });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.post(
      "/api/products",
      {},
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }
    );
    dispatch({
      type: PRODUCT_CREATE_SUCCESS,
      payload: data.product,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: PRODUCT_CREATE_FAIL, payload: message });
  }
};

export const updateProduct = (product) => async (dispatch, getState) => {
  dispatch({ type: PRODUCT_UPDATE_REQUEST, payload: product });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.put(`/api/products/${product._id}`, product, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: PRODUCT_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: PRODUCT_UPDATE_FAIL, error: message });
  }
};

export const deleteProduct = (productId) => async (dispatch, getState) => {
  dispatch({ type: PRODUCT_DELETE_REQUEST, payload: productId });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = Axios.delete(`/api/products/${productId}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: PRODUCT_DELETE_SUCCESS });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: PRODUCT_DELETE_FAIL, payload: message });
  }
};

export const deleteProvider = (providerId) => async (dispatch, getState) => {
  dispatch({ type: PRODUCT_PROVIDER_DELETE_REQUEST, payload: providerId });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = Axios.delete(`/api/provider/${providerId}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: PRODUCT_PROVIDER_DELETE_SUCCESS });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: PRODUCT_PROVIDER_DELETE_FAIL, payload: message });
  }
};
export const createProvider = () => async (dispatch, getState) => {
  dispatch({ type: PRODUCT_PROVIDER_CREATE_REQUEST});
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.post(
      "/api/provider",
      {},
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }
    );
    dispatch({
      type: PRODUCT_PROVIDER_CREATE_SUCCESS,
      payload: data.provider,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: PRODUCT_PROVIDER_CREATE_FAIL, payload: message });
  }
};
export const updateProvider = (provider) => async (dispatch, getState) => {
  dispatch({ type: PRODUCT_PROVIDER_UPDATE_REQUEST, payload: provider });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.put(`/api/provider/${provider._id}`, provider, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: PRODUCT_PROVIDER_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: PRODUCT_PROVIDER_UPDATE_FAIL, error: message });
  }
};

export const detailsProvider = (providerId) => async (dispatch) => {
  dispatch({ type: PRODUCT_PROVIDER_DETAILS_REQUEST, payload: providerId });
  try {
    const { data } = await Axios.get(`/api/provider/${providerId}`);
    dispatch({ type: PRODUCT_PROVIDER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_PROVIDER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteFormRelease = (formReleaseId) => async (dispatch, getState) => {
  dispatch({ type: PRODUCT_FORMRELEASE_DELETE_REQUEST, payload: formReleaseId });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = Axios.delete(`/api/formRelease/${formReleaseId}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: PRODUCT_FORMRELEASE_DELETE_SUCCESS });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: PRODUCT_FORMRELEASE_DELETE_FAIL, payload: message });
  }
};
export const createFormRelease = () => async (dispatch, getState) => {
  dispatch({ type: PRODUCT_FORMRELEASE_CREATE_REQUEST});
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.post(
      "/api/formRelease",
      {},
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }
    );
    dispatch({
      type: PRODUCT_FORMRELEASE_CREATE_SUCCESS,
      payload: data.formRelease,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: PRODUCT_FORMRELEASE_CREATE_FAIL, payload: message });
  }
};
export const detailsFormRelease = (formReleaseId) => async (dispatch) => {
  dispatch({ type: PRODUCT_FORMRELEASE_DETAILS_REQUEST, payload: formReleaseId });
  try {
    const { data } = await Axios.get(`/api/formRelease/${formReleaseId}`);
    dispatch({ type: PRODUCT_FORMRELEASE_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_FORMRELEASE_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateFormRelease = (formRelease) => async (dispatch, getState) => {
  dispatch({ type: PRODUCT_FORMRELEASE_UPDATE_REQUEST, payload: formRelease });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.put(`/api/formRelease/${formRelease._id}`, formRelease, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: PRODUCT_FORMRELEASE_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: PRODUCT_FORMRELEASE_UPDATE_FAIL, error: message });
  }
};

export const deleteCategory = (categoryId) => async (dispatch, getState) => {
  dispatch({ type: PRODUCT_CATEGORY_DELETE_REQUEST, payload: categoryId });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = Axios.delete(`/api/category/${categoryId}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: PRODUCT_CATEGORY_DELETE_SUCCESS });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: PRODUCT_CATEGORY_DELETE_FAIL, payload: message });
  }
};

export const createCategory = () => async (dispatch, getState) => {
  dispatch({ type: PRODUCT_CATEGORY_CREATE_REQUEST});
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.post(
      "/api/category",
      {},
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }
    );
    dispatch({
      type: PRODUCT_CATEGORY_CREATE_SUCCESS,
      payload: data.category,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: PRODUCT_CATEGORY_CREATE_FAIL, payload: message });
  }
};

export const detailsCategory = (categoryId) => async (dispatch) => {
  dispatch({ type: PRODUCT_CATEGORY_DETAILS_REQUEST, payload: categoryId });
  try {
    const { data } = await Axios.get(`/api/category/${categoryId}`);
    dispatch({ type: PRODUCT_CATEGORY_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_CATEGORY_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateCategory = (category) => async (dispatch, getState) => {
  dispatch({ type: PRODUCT_CATEGORY_UPDATE_REQUEST, payload: category });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.put(`/api/category/${category._id}`, category, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: PRODUCT_CATEGORY_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: PRODUCT_CATEGORY_UPDATE_FAIL, error: message });
  }
};

export const createReview = (productId, review) => async (
  dispatch,
  getState
) => {
  dispatch({ type: PRODUCT_REVIEW_CREATE_REQUEST });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.post(
      `/api/products/${productId}/reviews`,
      review,
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }
    );
    dispatch({
      type: PRODUCT_REVIEW_CREATE_SUCCESS,
      payload: data.review,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: PRODUCT_REVIEW_CREATE_FAIL, payload: message });
  }
};
