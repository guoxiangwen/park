import { ADD_PAY, RESET_PAY } from './actionstype';

export const addPay = (totalAmount) => {
  return {
    type: ADD_PAY,
    payload: {
      totalAmount
    }
  };
};
export const resetPay = () => {
  return {
    type: RESET_PAY
  };
};

