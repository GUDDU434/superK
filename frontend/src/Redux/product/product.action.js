import { axiosInstance } from "../../utils/axiosInstance";

export const PRODUCTS_REQUEST = "PRODUCTS_REQUEST";
export const PRODUCTS_SUCCESS = "PRODUCTS_SUCCESS";
export const PRODUCTS_FAILURE = "PRODUCTS_FAILURE";

export const GetAllProducts = (query, storeId) => {
  return async (dispatch) => {
    dispatch({ type: PRODUCTS_REQUEST });
    const token = localStorage.getItem("accessToken");
    try {
      const response = await axiosInstance.get(`/products/${storeId}`, {
        params: query,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log(response);
      if (response.status === 200) {
        dispatch({ type: PRODUCTS_SUCCESS, payload: response?.data });
      } else {
        dispatch({ type: PRODUCTS_FAILURE, payload: response?.data });
      }
    } catch (error) {
      dispatch({ type: PRODUCTS_FAILURE, payload: error?.message });
    }
  };
};

export const GetSingleProducts = (id) => {
  return async (dispatch) => {
    dispatch({ type: PRODUCTS_REQUEST });
    const token = localStorage.getItem("accessToken");
    try {
      const response = await axiosInstance.get(`/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        dispatch({ type: PRODUCTS_SUCCESS, payload: response?.data });
      } else {
        dispatch({ type: PRODUCTS_FAILURE, payload: response?.data });
      }
    } catch (error) {
      dispatch({ type: PRODUCTS_FAILURE, payload: error?.message });
    }
  };
};

export const AddProducts = (storeId, data) => {
  return async (dispatch) => {
    dispatch({ type: PRODUCTS_REQUEST });
    const token = localStorage.getItem("accessToken");
    try {
      const response = await axiosInstance.post(`/products/${storeId}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 201) {
        dispatch(GetAllProducts({}, storeId));
        // dispatch({ type: PRODUCTS_SUCCESS, payload: response?.data });
      } else {
        dispatch({ type: PRODUCTS_FAILURE, payload: response?.data });
      }
    } catch (error) {
      dispatch({ type: PRODUCTS_FAILURE, payload: error?.message });
    }
  };
};

export const UpdateProducts = (storeId, id, data) => {
  return async (dispatch) => {
    dispatch({ type: PRODUCTS_REQUEST });
    const token = localStorage.getItem("accessToken");
    try {
      const response = await axiosInstance.put(`/products/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        dispatch(GetAllProducts({}, storeId));
        // dispatch({ type: PRODUCTS_SUCCESS, payload: response?.data });
      } else {
        dispatch({ type: PRODUCTS_FAILURE, payload: response?.data });
      }
    } catch (error) {
      dispatch({ type: PRODUCTS_FAILURE, payload: error?.message });
    }
  };
};

export const DeleteProducts = (id) => {
  return async (dispatch) => {
    dispatch({ type: PRODUCTS_REQUEST });
    const token = localStorage.getItem("accessToken");
    try {
      const response = await axiosInstance.delete(`/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        dispatch(GetAllProducts());
        // dispatch({ type: PRODUCTS_SUCCESS, payload: response?.data });
      } else {
        dispatch({ type: PRODUCTS_FAILURE, payload: response?.data });
      }
    } catch (error) {
      dispatch({ type: PRODUCTS_FAILURE, payload: error?.message });
    }
  };
};
