import {
  PRODUCTS_FAILURE,
  PRODUCTS_REQUEST,
  PRODUCTS_SUCCESS,
} from "./product.action";

const initialProducts = {
  isProductsLoading: false,
  isProductsError: null,
  AllProducts: [],
};

export const reducer = (state = initialProducts, { type, payload }) => {
  switch (type) {
    case PRODUCTS_REQUEST:
      return {
        ...state,
        isProductsLoading: true,
        isProductsError: null,
      };
    case PRODUCTS_SUCCESS:
      return {
        ...state,
        isProductsLoading: false,
        isProductsError: null,
        AllProducts: payload,
      };
    case PRODUCTS_FAILURE:
      return {
        ...state,
        isProductsLoading: false,
        isProductsError: payload,
      };
    default:
      return state;
  }
};
