import thunk from "redux-thunk";
import { createLogger } from "redux-logger";
import reducers from "../reducers";
import { createStore, applyMiddleware, compose } from "redux";
declare global {
  interface Window {
    devToolsExtension: any;
  }
}
const middleware = [thunk];
if (process.env.NODE_ENV !== "production") {
  middleware.push(createLogger());
}

export default function storeConfig(preState) {
  return createStore(
    reducers,
    preState,
    compose(
      applyMiddleware(...middleware),
      window.devToolsExtension ? window.devToolsExtension() : f => f // 使用redux开发工具
    )
  );
}

// const store = window.__REDUX_DEVTOOLS_EXTENSION__
//   ? createStore(
//       reducers,
//       window.__REDUX_DEVTOOLS_EXTENSION__ &&
//         window.__REDUX_DEVTOOLS_EXTENSION__()
//     )
//   : createStore(reducers);

// export default store;

// import { createStore, applyMiddleware, compose } from "redux";
// import thunk from "redux-thunk";
// import { createLogger } from "redux-logger";

// // import reducer from "./reducer";
// const middleware = [thunk];
// if (process.env.NODE_ENV !== "production") {
//   middleware.push(createLogger());
// }
// export default function storeConfig(preState) {
//   return createStore(
//     reducer,
//     preState,
//     compose(
//       applyMiddleware(...middleware),
//       window.devToolsExtension ? window.devToolsExtension() : f => f // 使用redux开发工具
//     )
//   );
// }
