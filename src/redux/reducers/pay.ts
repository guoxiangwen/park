/*
 * @Author: guoxiangwen
 * @Description: 支付页面reducer  
 * @Date: 2018-04-05 10:33:40 
 * @Last Modified by: guoxiangwen
 * @Last Modified time: 2018-04-05 10:36:27
 */
import { ADD_PAY, RESET_PAY } from "../actions/actionstype";

const initState = {
  totalAmount: "34"
};
const payReducer = (state = initState, action) => {
  switch (action.type) {
    case ADD_PAY:
      return {
        ...state,
        totalAmount: action.payload.totalAmount
      };
    case RESET_PAY:
      return {
        ...state,
        totalAmount: ""
      };
    default:
      return state;
  }
};

export default payReducer;
