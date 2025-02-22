import { axiosInstance } from "../../utils/axiosInstance";

export const PROD_STORE_REQUEST = "PROD_STORE_REQUEST";
export const PROD_STORE_SUCCESS = "PROD_STORE_SUCCESS";
export const PROD_STORE_FAILURE = "PROD_STORE_FAILURE";

// GetAllprod_store
export const GetAllprod_store = (query) => {
  return async (dispatch) => {
    dispatch({ type: PROD_STORE_REQUEST });
    try {
      const response = await axiosInstance.get("/stores", {
        params: query,
      });
      // console.log(response);
      if (response.status === 200) {
        dispatch({ type: PROD_STORE_SUCCESS, payload: response?.data });
      } else {
        dispatch({ type: PROD_STORE_FAILURE, payload: response?.data });
      }
    } catch (error) {
      dispatch({ type: PROD_STORE_FAILURE, payload: error?.message });
    }
  };
};

// GetSingleprod_store
export const GetSingleprod_store = (id) => {
  return async (dispatch) => {
    dispatch({ type: PROD_STORE_REQUEST });

    try {
      const response = await axiosInstance.get(`/stores/${id}`, {});
      if (response.status === 200) {
        dispatch({ type: PROD_STORE_SUCCESS, payload: response?.data });
      } else {
        dispatch({ type: PROD_STORE_FAILURE, payload: response?.data });
      }
    } catch (error) {
      dispatch({ type: PROD_STORE_FAILURE, payload: error?.message });
    }
  };
};

// Addprod_store
export const Addprod_store = (data) => {
  return async (dispatch) => {
    dispatch({ type: PROD_STORE_REQUEST });
    try {
      const response = await axiosInstance.post("/stores", data, {});
      if (response.status === 201) {
        dispatch(GetAllprod_store());
        // dispatch({ type: PROD_STORE_SUCCESS, payload: response?.data });
      } else {
        dispatch({ type: PROD_STORE_FAILURE, payload: response?.data });
      }
    } catch (error) {
      dispatch({ type: PROD_STORE_FAILURE, payload: error?.message });
    }
  };
};

// Updateprod_store
export const Updateprod_store = (id, data) => {
  return async (dispatch) => {
    dispatch({ type: PROD_STORE_REQUEST });
    try {
      const response = await axiosInstance.put(`/stores/${id}`, data, {});
      if (response.status === 200) {
        dispatch(GetAllprod_store());
        // dispatch({ type: PROD_STORE_SUCCESS, payload: response?.data });
      } else {
        dispatch({ type: PROD_STORE_FAILURE, payload: response?.data });
      }
    } catch (error) {
      dispatch({ type: PROD_STORE_FAILURE, payload: error?.message });
    }
  };
};

// Deleteprod_store
export const Deleteprod_store = (id) => {
  return async (dispatch) => {
    dispatch({ type: PROD_STORE_REQUEST });
    try {
      const response = await axiosInstance.delete(`/stores/${id}`, {});
      if (response.status === 200) {
        dispatch(GetAllprod_store());
        // dispatch({ type: PROD_STORE_SUCCESS, payload: response?.data });
      } else {
        dispatch({ type: PROD_STORE_FAILURE, payload: response?.data });
      }
    } catch (error) {
      dispatch({ type: PROD_STORE_FAILURE, payload: error?.message });
    }
  };
};
