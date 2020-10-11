import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Dashboard from "./containers/dashboard/dashboard";
import Layout from "./hoc/layout/layout";
import Auth from "./containers/auth/auth";
import { RootState } from "./models/rootState.model";
import { connect } from 'react-redux';
import styles from './App.module.css';

const App = ({isAuthenticated}: {isAuthenticated: boolean}) => {

  const routeGuard = (Component: any): any => {
    return isAuthenticated ? <Component /> : <Redirect to="/auth" />;
  };
  
  return (
    <BrowserRouter>
      <Layout className={styles.app}>
        <Switch>
          <Route path="/" exact render={() => routeGuard(Dashboard)} />
          <Route path="/auth" component={Auth}/>
        </Switch>
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
