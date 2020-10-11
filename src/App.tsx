import React, { lazy, Suspense } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Layout from "./hoc/layout/layout";
import { RootState } from "./models/rootState.model";
import { connect } from 'react-redux';
import styles from './App.module.css';
import { CircularProgress } from "@material-ui/core";

const Spinner = () => <div className={styles.absoluteCenter}><CircularProgress size={100} /></div> 

// Lazy Imports
const Auth = lazy(() => import('./containers/auth/auth'));
const Dashboard = lazy(() => import('./containers/dashboard/dashboard'));

const App = ({isAuthenticated}: {isAuthenticated: boolean}) => {

  const routeGuard = (Component: any): any => {
    return isAuthenticated ? <Component /> : <Redirect to="/auth" />;
  };
  
  return (
    <BrowserRouter>
      <Layout className={styles.app}>
        <Suspense fallback={<Spinner />}>
        <Switch>
          <Route path="/" exact render={() => routeGuard(Dashboard)} />
          <Route path="/auth" component={Auth}/>
        </Switch>
        </Suspense>
      </Layout>
    </BrowserRouter>
  );
}

const mapStateToProps = (state: RootState) => {
  const { token } = state.auth;

  return {
    isAuthenticated: token !== ''
  }
}

export default connect(mapStateToProps)(App);
