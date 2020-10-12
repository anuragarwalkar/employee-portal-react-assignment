import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import authForm from "./authForm";
import useStyles from "./useStyles";
import {convertFormToArray, updateControls} from '../../../utils/utils';
import googleOauthImg from '../../../assets/btn_google_signin_dark_normal_web@2x.png';
import CircularProgress from '@material-ui/core/CircularProgress';

const environment = process.env.REACT_APP_API_PATH;

export const LogInRegister = ({ isSignIn = false, togglePage, auth, loading, signInWithGoogle }: {togglePage: () => void, isSignIn: boolean, auth: any, loading: boolean, signInWithGoogle: () => void}) => {
  const classes = useStyles();
  
  const [controls, setControls] = useState(authForm);

  const inputForm = (): any [] => {
    return convertFormToArray(controls, isSignIn ? 'fullName' : '');
  }

  const setInputControl = (event: any) => {
    event.persist();
    const value = event.target.value;
    const type = event.target.name;

    setControls(updateControls(type, value));
  }

  const onSubmit = (event: any) => {
     event.preventDefault();

     const {
      email: { value: email },
      password: { value: password },
      fullName: {value: fullName}
    } = controls;

    auth(email, password, fullName, isSignIn ? "sign-in" : "sign-up");
  }

  let content = null;

  if (!loading) {
    content = <div className={classes.paper}>
    <Typography component="h1" variant="h5">
      {isSignIn ? "Sign in" : "Sign up"}
    </Typography>
    <form className={classes.form} onSubmit={onSubmit} noValidate>
      {inputForm().map((form) => (
        <TextField {...form} onChange={setInputControl} />
      ))}
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit} >
         {isSignIn ? "SIGN IN" : "SIGN UP"}
      </Button>
       <a href={`${environment}/api/auth/google`} onClick={signInWithGoogle} target="_self"><img style={{width: '180px'}} src={googleOauthImg} alt="Sign In With Google" /></a>
     
        <div style={{display: 'flex', marginTop: '10px'}} >
          <Link style={{cursor: 'pointer'}} onClick={togglePage} variant="body2">
            {isSignIn
              ? "Don't have an account? Sign Up"
              : "Already have an account? Sign In"}
          </Link>
        </div>
    </form>
  </div>
  } else {
    content = <div className={classes.paper}>
      <CircularProgress size={100} />
    </div>
  }

  
  return (
    <Container component="main" maxWidth="xs">
      {content}
    </Container>
  );
};

export default LogInRegister;
