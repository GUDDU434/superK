import {
  PROD_STORE_FAILURE,
  PROD_STORE_REQUEST,
  PROD_STORE_SUCCESS,
} from "./product_store.action";

const initialProd_store = {
  isProd_storeLoading: false,
  isProd_storeError: null,
  AllProd_store: [],
};

export const reducer = (state = initialProd_store, { type, payload }) => {
  switch (type) {
    case PROD_STORE_REQUEST:
      return {
        ...state,
        isProd_storeLoading: true,
        isProd_storeError: null,
      };
    case PROD_STORE_SUCCESS:
      return {
        ...state,
        isProd_storeLoading: false,
        isProd_storeError: null,
        AllProd_store: payload,
      };
    case PROD_STORE_FAILURE:
      return {
        ...state,
        isProd_storeLoading: false,
        isProd_storeError: payload,
      };
    default:
      return state;
  }
};
