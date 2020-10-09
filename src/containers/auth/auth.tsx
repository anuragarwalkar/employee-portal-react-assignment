import React, { useState } from "react";
import LogInRegisterForm from "../../components/auth/login-register-form/loginRegisterForm";
import { RootState } from "../../models/rootState.model";
import { connect } from "react-redux";
import { auth } from "../../store/actions/auth";

const Auth = (props: any) => {
  const [showSignIn, setShowSignIn] = useState(true);

  const switchPage = () => {
    setShowSignIn((currentState) => !currentState);
  };

  const onLogInSignUp = (email: string, password: string, fullName: string, method: string) => {
    props.onAuth(email, password, fullName, method);
  }

  return <LogInRegisterForm isSignIn={showSignIn} auth={onLogInSignUp} togglePage={switchPage} />;
};

const mapStateToProps = (state: RootState) => {
  const { loading, error, token } = state.auth;

  return {
    loading,
    error,
    token,
  };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        onAuth: (email: string, password: string, fullName: string,method: "sign-in" | "sign-up") =>
          dispatch(auth(email, password, fullName, method)),
      };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
