// import { ADD_CAR, RESET_CAR } from "../actions/actionstype";
import * as Actions from "../actions/car";

const initState = {
  status: "loading"
};

const carReducer = (state = initState, action) => {
  switch (action.type) {
    case Actions.FETCH_CAR_START:
      return {
        ...state,
        status: "loading"
      };
    case Actions.FETCH_CAR_SUCCESS:
      return {
        ...state,
        status: "success",
        ...action.payload
      };
    case Actions.FETCH_CAR_FAILURE:
      return {
        ...state,
        status: "failure",
        ...action.payload
      };
    default: {
      return state;
    }
  }
};
export default carReducer;

// const carReducer = (
//   state = {
//     plateNum: [],
//     phone: "",
//     plateRegion: "川",
//     plateRegionIndex: 22,
//     discount: ""
//   },
//   action
// ) => {
//   switch (action.type) {
//     case ADD_CAR:
//       return {
//         plateRegion: action.payload.plateRegion,
//         plateNum: action.payload.plateNum,
//         phone: action.payload.phone,
//         plateRegionIndex: action.payload.plateRegionIndex,
//         discount: action.payload.discount
//       };
//     case RESET_CAR:
//       return {
//         plateRegion: "川",
//         plateNum: [],
//         phone: "",
//         plateRegionIndex: 22,
//         discount: ""
//       };
//     default:
//       return state;
//   }
// };
// export default carReducer;
