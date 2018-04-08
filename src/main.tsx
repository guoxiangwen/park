import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Switch, withRouter } from "react-router-dom";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import store from "./redux/store/";
import PlateInfo from "./containers/plate-info";
import Pay from "./containers/pay";
import ScrollToTop from "./containers/scroll-to-top";
import PayResult from "./containers/pay-result";
import NoMatch from "./containers/nomatch";
import { init } from "./utils/init";
import "./assets/less/animation.less";

const Fade = ({ children }) => (
  <ReactCSSTransitionGroup
    transitionName="slide-in"
    transitionEnterTimeout={300}
    transitionLeaveTimeout={300}
  >
    {children}
  </ReactCSSTransitionGroup>
);
init(store);
const Routes = withRouter(({ history }) => (
  <Fade>
    <Switch key={history.location.pathname} location={history.location}>
      <Route exact path="/result" component={PayResult} />
      <Route exact path="/pay" component={Pay} />
      <Route exact path="/" component={PlateInfo} />
      <Route component={NoMatch} />
    </Switch>
  </Fade>
));
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter basename="/phone">
      <ScrollToTop>
        <Switch>
          <Routes />
        </Switch>
      </ScrollToTop>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root") as HTMLElement
);
