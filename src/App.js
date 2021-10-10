import  React, { Fragment, Suspense } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import "./App.css";
import Loader from "./components/UI/Loader";
import Layout from "./layout/Layout";

const Details = React.lazy(() => import('./Pages/Details'));
const Home = React.lazy(() => import('./Pages/Home'));

function App() {
  return (
    <Fragment>
      <Layout />
      <Suspense fallback={<Loader />}>
        <Switch>
          <Route path="/" exact>
            <Redirect to="/home" />
          </Route>
          <Route path="/home" exact>
            <Home />
          </Route>
          <Route path="/home/:movieId">
            <Details />
          </Route>
        </Switch>
      </Suspense>
    </Fragment>
  );
}
export default App;
