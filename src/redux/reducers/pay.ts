import { ADD_PAY, RESET_PAY } from '../actions/actionstype';

const payReducer = (state = {
  totalAmount: ''
}, action) => {
  switch (action.type) {
    case ADD_PAY:
      return {
        ...state,
        totalAmount: action.payload.totalAmount
      };
    case RESET_PAY:
      return {
        ...state,
        totalAmount: ''
      };
    default:
      return state;
  }
};

export default payReducer;
