import React, { Fragment, useCallback, useEffect, useState } from "react";
import LogInRegisterForm from "../../components/auth/login-register-form/loginRegisterForm";
import { RootState } from "../../models/rootState.model";
import { connect } from "react-redux";
import { auth, authStart, authSuccess } from "../../store/actions/auth";
import { Redirect, withRouter } from "react-router-dom";
import jwt_decode from "jwt-decode";
import queryString from 'query-string';

const Auth = (props: any) => {
  const { saveUser } = props;
  const [showSignIn, setShowSignIn] = useState(true);

  const getUserDetails = useCallback(() => {
    const { token } = queryString.parse(props.location.search);
    if (token) {
      const decoded: any = jwt_decode(token as string);
      if (decoded) {
        saveUser(token, decoded.user)
      }
    }
  }, [saveUser, props.location.search]);

  useEffect(() => getUserDetails() , [getUserDetails]);

  const switchPage = () => {
    setShowSignIn((currentState) => !currentState);
  };

  const onLogInSignUp = (email: string, password: string, fullName: string, method: string) => {
    props.onAuth(email, password, fullName, method);
  }

  return <Fragment>
    {props.isAuthenticated && <Redirect to="/" />}
    <LogInRegisterForm signInWithGoogle={props.signInWithGoogle} isSignIn={showSignIn} loading={props.loading} auth={onLogInSignUp} togglePage={switchPage} />;
  </Fragment>
};

const mapStateToProps = (state: RootState) => {
  const { loading, error, token } = state.auth;

  return {
    loading,
    error,
    isAuthenticated: token !== '',
  };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        onAuth: (email: string, password: string, fullName: string,method: "sign-in" | "sign-up") =>
          dispatch(auth(email, password, fullName, method)),
        saveUser: (token: string, user: {fullName: string}) => {
          dispatch(authSuccess({token, user}))
        },
        signInWithGoogle: () => {
          dispatch(authStart())
        }  
      };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Auth));
