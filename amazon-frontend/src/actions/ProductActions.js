import axios from "../Axios";
import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
} from "../constants/ProductConstants";
import { updateObject } from "./Utility";

export const listProducts = () => async (dispatch) => {
  dispatch({
    type: PRODUCT_LIST_REQUEST,
  });

  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/api/products`
    );
    // const count = data.length;
    dispatch({
      type: PRODUCT_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload: error.message,
    });
  }
};

export const detailsProduct = (productID) => async (dispatch) => {
  dispatch({
    type: PRODUCT_DETAILS_REQUEST,
    payload: productID,
  });

  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/api/products/${productID}`
    );

    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.mesaage
          ? error.response.data.message
          : error.message,
    });
  }
};

const updateArticleFailed = (state, action) => {
  return updateObject(state, {
    type: PRODUCT_UPDATE_FAIL,
    error: action.error,
    loading: false,
  });
};

export const updateArticle =
  (formData, setUploadPercentage, urlendpoint) =>
  async (dispatch, getState) => {
    // export const updateArticle = (formData, setUploadPercentage, urlendpoint) => {
    // return (dispatch) => {
    const {
      userSignin: { userInfo },
    } = getState();
    if (userInfo.isAdmin) {
      // console.log(userInfo);
      axios
        .put(urlendpoint, formData, {
          headers: { Authorization: `Bearer ${userInfo?.token}` },
          onUploadProgress: (progressEvent) => {
            setUploadPercentage(
              parseInt(
                Math.round((progressEvent.loaded * 100) / progressEvent.total)
              )
            );
          },
        })
        .then(
          dispatch({
            type: PRODUCT_UPDATE_SUCCESS,
            success: true,
          })
        )
        .catch((err) => dispatch(updateArticleFailed(err.response.data)));
    } else {
      dispatch({
        type: PRODUCT_UPDATE_FAIL,
        success: false,
        message: "Invalid admin token",
      });
    }
  };
// };
