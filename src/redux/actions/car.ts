import { ADD_CAR, RESET_CAR } from "./actionstype";
import API from "../../api/";
import { Toast } from "antd-mobile";
export const addCar = (
  plateRegion,
  plateNum,
  phone,
  plateRegionIndex,
  discount
) => {
  localStorage.setItem("plateRegion", plateRegion);
  localStorage.setItem("plateNum", plateNum);
  localStorage.setItem("phone", phone);
  localStorage.setItem("plateRegionIndex", plateRegionIndex);
  localStorage.setItem("discount", discount);
  return {
    type: ADD_CAR,
    payload: { plateRegion, plateNum, phone, plateRegionIndex, discount }
  };
};

export const resetCar = () => {
  localStorage.removeItem("plateRegion");
  localStorage.removeItem("plateNum");
  localStorage.removeItem("phone");
  localStorage.removeItem("plateRegionIndex");
  localStorage.removeItem("discount");
  return { type: RESET_CAR };
};
/**
 * cars actions
 */
export const FETCH_CAR_START = "FETCH_CAR_START";
export const FETCH_CAR_SUCCESS = "FETCH_CAR_SUCCESS";
export const FETCH_CAR_FAILURE = "FETCH_CAR_FAILURE";

export const fetchCarStart = () => ({
  type: FETCH_CAR_START
});

export const fetchCarSuccess = result => ({
  type: FETCH_CAR_SUCCESS,
  payload: result
});

export const fetchCarFailure = error => ({
  type: FETCH_CAR_FAILURE,
  payload: error
});

export const fetchCar = gateNumber => {
  return dispatch => {
    dispatch(fetchCarStart());
    return API.getParkInfoWithGateNo({ gateNumber: gateNumber })
      .then((res: any) => {
        dispatch(fetchCarSuccess(res.data));
      })
      .catch((err: any) => {
        dispatch(fetchCarFailure(err));
        Toast.info("获取费用时出错,请重试！", 3, () => {}, true);
      });
  };
};
