const {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_RESET,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_RESET,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_RESET,
  PRODUCT_CATEGORY_LIST_REQUEST,
  PRODUCT_CATEGORY_LIST_SUCCESS,
  PRODUCT_CATEGORY_LIST_FAIL,
  PRODUCT_REVIEW_CREATE_REQUEST,
  PRODUCT_REVIEW_CREATE_SUCCESS,
  PRODUCT_REVIEW_CREATE_FAIL,
  PRODUCT_REVIEW_CREATE_RESET,
  PRODUCT_FORMRELEASE_LIST_REQUEST,
  PRODUCT_FORMRELEASE_LIST_SUCCESS,
  PRODUCT_FORMRELEASE_LIST_FAIL,
  PRODUCT_PROVIDER_LIST_REQUEST,
  PRODUCT_PROVIDER_LIST_SUCCESS,
  PRODUCT_PROVIDER_LIST_FAIL,
  PRODUCT_CATEGORY_DELETE_REQUEST,
  PRODUCT_CATEGORY_DELETE_SUCCESS,
  PRODUCT_CATEGORY_DELETE_FAIL,
  PRODUCT_CATEGORY_DELETE_RESET,
  PRODUCT_CATEGORY_UPDATE_REQUEST,
  PRODUCT_CATEGORY_UPDATE_SUCCESS,
  PRODUCT_CATEGORY_UPDATE_FAIL,
  PRODUCT_CATEGORY_UPDATE_RESET,
  PRODUCT_PROVIDER_UPDATE_REQUEST,
  PRODUCT_PROVIDER_UPDATE_SUCCESS,
  PRODUCT_PROVIDER_UPDATE_FAIL,
  PRODUCT_PROVIDER_UPDATE_RESET,
  PRODUCT_PROVIDER_DELETE_REQUEST,
  PRODUCT_PROVIDER_DELETE_SUCCESS,
  PRODUCT_PROVIDER_DELETE_FAIL,
  PRODUCT_PROVIDER_DELETE_RESET,
  PRODUCT_FORMRELEASE_UPDATE_REQUEST,
  PRODUCT_FORMRELEASE_UPDATE_SUCCESS,
  PRODUCT_FORMRELEASE_UPDATE_FAIL,
  PRODUCT_FORMRELEASE_UPDATE_RESET,
  PRODUCT_FORMRELEASE_DELETE_REQUEST,
  PRODUCT_FORMRELEASE_DELETE_SUCCESS,
  PRODUCT_FORMRELEASE_DELETE_FAIL,
  PRODUCT_FORMRELEASE_DELETE_RESET,
  PRODUCT_CATEGORY_DETAILS_REQUEST,
  PRODUCT_CATEGORY_DETAILS_SUCCESS,
  PRODUCT_CATEGORY_DETAILS_FAIL,
  PRODUCT_PROVIDER_DETAILS_REQUEST,
  PRODUCT_PROVIDER_DETAILS_SUCCESS,
  PRODUCT_PROVIDER_DETAILS_FAIL,
  PRODUCT_FORMRELEASE_DETAILS_REQUEST,
  PRODUCT_FORMRELEASE_DETAILS_SUCCESS,
  PRODUCT_FORMRELEASE_DETAILS_FAIL,
  PRODUCT_CATEGORY_CREATE_REQUEST,
  PRODUCT_CATEGORY_CREATE_SUCCESS,
  PRODUCT_CATEGORY_CREATE_FAIL,
  PRODUCT_CATEGORY_CREATE_RESET,
  PRODUCT_PROVIDER_CREATE_REQUEST,
  PRODUCT_PROVIDER_CREATE_SUCCESS,
  PRODUCT_PROVIDER_CREATE_FAIL,
  PRODUCT_PROVIDER_CREATE_RESET,
  PRODUCT_FORMRELEASE_CREATE_REQUEST,
  PRODUCT_FORMRELEASE_CREATE_SUCCESS,
  PRODUCT_FORMRELEASE_CREATE_FAIL,
  PRODUCT_FORMRELEASE_CREATE_RESET,
} = require('../constants/productConstants');

export const productListReducer = (
  state = { loading: true, products: [] },
  action
) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true };
    case PRODUCT_LIST_SUCCESS:
      return { loading: false, products: action.payload };
    case PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productDetailsReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return { loading: true };
    case PRODUCT_DETAILS_SUCCESS:
      return { loading: false, product: action.payload };
    case PRODUCT_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_CREATE_REQUEST:
      return { loading: true };
    case PRODUCT_CREATE_SUCCESS:
      return { loading: false, success: true, product: action.payload };
    case PRODUCT_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const productUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_UPDATE_REQUEST:
      return { loading: true };
    case PRODUCT_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case PRODUCT_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};

export const productDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_DELETE_REQUEST:
      return { loading: true };
    case PRODUCT_DELETE_SUCCESS:
      return { loading: false, success: true };
    case PRODUCT_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_DELETE_RESET:
      return {};
    default:
      return state;
  }
};

export const productCategoryListReducer = (
  state = { loading: true, categories: [] },
  action
) => {
  switch (action.type) {
    case PRODUCT_CATEGORY_LIST_REQUEST:
      return { loading: true };
    case PRODUCT_CATEGORY_LIST_SUCCESS:
      return { loading: false, categories: action.payload };
    case PRODUCT_CATEGORY_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const productCategoryDetailsReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case PRODUCT_CATEGORY_DETAILS_REQUEST:
      return { loading: true };
    case PRODUCT_CATEGORY_DETAILS_SUCCESS:
      return { loading: false, category: action.payload };
    case PRODUCT_CATEGORY_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const productCategoryUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_CATEGORY_UPDATE_REQUEST:
      return { loading: true };
    case PRODUCT_CATEGORY_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case PRODUCT_CATEGORY_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_CATEGORY_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};
export const productCategoryCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_CATEGORY_CREATE_REQUEST:
      return { loading: true };
    case PRODUCT_CATEGORY_CREATE_SUCCESS:
      return { loading: false, success: true, category: action.payload };
    case PRODUCT_CATEGORY_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_CATEGORY_CREATE_RESET:
      return {};
    default:
      return state;
  }
};
export const productCategoryDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_CATEGORY_DELETE_REQUEST:
      return { loading: true };
    case PRODUCT_CATEGORY_DELETE_SUCCESS:
      return { loading: false, success: true };
    case PRODUCT_CATEGORY_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_CATEGORY_DELETE_RESET:
      return {};
    default:
      return state;
  }
};
export const productProviderListReducer = (
  state = { loading: true, providers: [] },
  action
) => {
  switch (action.type) {
    case PRODUCT_PROVIDER_LIST_REQUEST:
      return { loading: true };
    case PRODUCT_PROVIDER_LIST_SUCCESS:
      return { loading: false, providers: action.payload };
    case PRODUCT_PROVIDER_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const productProviderCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_PROVIDER_CREATE_REQUEST:
      return { loading: true };
    case PRODUCT_PROVIDER_CREATE_SUCCESS:
      return { loading: false,success:true, provider: action.payload };
    case PRODUCT_PROVIDER_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_PROVIDER_CREATE_RESET:
      return {};
    default:
      return state;
  }
};
export const productProviderDetailsReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case PRODUCT_PROVIDER_DETAILS_REQUEST:
      return { loading: true };
    case PRODUCT_PROVIDER_DETAILS_SUCCESS:
      return { loading: false, provider: action.payload };
    case PRODUCT_PROVIDER_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const productProviderUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_PROVIDER_UPDATE_REQUEST:
      return { loading: true };
    case PRODUCT_PROVIDER_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case PRODUCT_PROVIDER_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_PROVIDER_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};
export const productProviderDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_PROVIDER_DELETE_REQUEST:
      return { loading: true };
    case PRODUCT_PROVIDER_DELETE_SUCCESS:
      return { loading: false, success: true };
    case PRODUCT_PROVIDER_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_PROVIDER_DELETE_RESET:
      return {};
    default:
      return state;
  }
};
export const productFormReleaseListReducer = (
  state = { loading: true, formReleases: [] },
  action
) => {
  switch (action.type) {
    case PRODUCT_FORMRELEASE_LIST_REQUEST:
      return { loading: true };
    case PRODUCT_FORMRELEASE_LIST_SUCCESS:
      return { loading: false, formReleases: action.payload };
    case PRODUCT_FORMRELEASE_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const productFormReleaseCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_FORMRELEASE_CREATE_REQUEST:
      return { loading: true };
    case PRODUCT_FORMRELEASE_CREATE_SUCCESS:
      return { loading: false, success: true, formRelease: action.payload };
    case PRODUCT_FORMRELEASE_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_FORMRELEASE_CREATE_RESET:
      return {};
    default:
      return state;
  }
};
export const productFormReleaseDetailsReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case PRODUCT_FORMRELEASE_DETAILS_REQUEST:
      return { loading: true };
    case PRODUCT_FORMRELEASE_DETAILS_SUCCESS:
      return { loading: false, formRelease: action.payload };
    case PRODUCT_FORMRELEASE_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const productFormReleaseUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_FORMRELEASE_UPDATE_REQUEST:
      return { loading: true };
    case PRODUCT_FORMRELEASE_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case PRODUCT_FORMRELEASE_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_FORMRELEASE_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};
export const productFormReleaseDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_FORMRELEASE_DELETE_REQUEST:
      return { loading: true };
    case PRODUCT_FORMRELEASE_DELETE_SUCCESS:
      return { loading: false, success: true };
    case PRODUCT_FORMRELEASE_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_FORMRELEASE_DELETE_RESET:
      return {};
    default:
      return state;
  }
};

export const productReviewCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_REVIEW_CREATE_REQUEST:
      return { loading: true };
    case PRODUCT_REVIEW_CREATE_SUCCESS:
      return { loading: false, success: true, review: action.payload };
    case PRODUCT_REVIEW_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_REVIEW_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

