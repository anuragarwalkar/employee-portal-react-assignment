import React, { useState } from "react";
import LogInRegister from "./components/auth/Login/login-register";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Dashboard from "./containers/dashboard/dashboard";
// import styles from './App.module.css';

const App = () => {

  const [isAuth, setIsAuth] = useState(true);

  const routeGuard = (Component: any): any => {
    return isAuth ? <Component /> : <Redirect to="/auth" />;
  };
  
  return (
    <BrowserRouter>
      <div
        style={{
          width: "50%",
          margin: "auto",
        }}
      >
        <Switch>
          <Route path="/" exact render={() => routeGuard(Dashboard)} />
          <Route path="/auth" component={LogInRegister}/>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
