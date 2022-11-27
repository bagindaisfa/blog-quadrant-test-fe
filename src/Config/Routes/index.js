import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
// import { Redirect } from 'react-router';
import { Login } from "../../Page";
import Blog from "../../Page/Blog";
import Home from "../../Page/Home";
const PrivateRoute = ({ component: Component, ...rest }) => {
  const accessToken = localStorage.getItem("quadrant");

  return (
    <Route
      {...rest}
      render={(props) =>
        accessToken ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
};

const RouteBefore = ({ component: Component, ...rest }) => {
  const accessToken = localStorage.getItem("quadrant");

  return (
    <Route
      {...rest}
      render={(props) =>
        !accessToken ? <Component {...props} /> : <Redirect to="/home" />
      }
    />
  );
};

function Routes() {
  return (
    // <Router>
    <Switch>
      <RouteBefore exact path="/" component={Login} />
      <PrivateRoute exact path="/home" component={Home} />
      <PrivateRoute exact path="/blog/:id" component={Blog} />
    </Switch>
  );
}

export default Routes;
