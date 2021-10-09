import { Fragment } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import "./App.css";
import Layout from "./layout/Layout";
import Details from "./Pages/Details";
import Home from "./Pages/Home";

function App() {
  return (
    <Fragment>
      <Layout />
      <Switch>
        <Route path="/" exact>
          <Redirect to="/home" />
        </Route>
        <Route path="/home" exact>
          <Home />
        </Route>
        <Route path='/home/:movieId'>
          <Details />
        </Route>
      </Switch>
    </Fragment>
  );
}
export default App;
