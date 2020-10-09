import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import authForm from "./authForm";
import useStyles from "./useStyles";
import {convertFormToArray} from '../../../utils/utils';
import googleOauthImg from '../../../assets/btn_google_signin_dark_normal_web@2x.png';

const LogInRegister = ({ isSignIn = false, togglePage, auth }: {togglePage: () => void, isSignIn: boolean, auth: any}) => {
  const classes = useStyles();
  const [controls, setControls] = useState(authForm);

  const inputForm = (): any [] => {
    return convertFormToArray(controls, isSignIn ? 'fullName' : '');
  }

  const setInputControl = (event: any) => {
    event.persist();
    const value = event.target.value;
    const type = event.target.name;

    setControls((oldState: any) => {
      const newState = {
        ...oldState,
        [type]: {
          ...oldState[type],
          value
        }
      }

      return newState
    })
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

  
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
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
            <img style={{width: '180px'}} src={googleOauthImg} alt="Sign In With Google" />
         
            <div style={{display: 'flex', marginTop: '10px'}} >
              <Link style={{cursor: 'pointer'}} onClick={togglePage} variant="body2">
                {isSignIn
                  ? "Don't have an account? Sign Up"
                  : "Already have an account? Sign In"}
              </Link>
            </div>
        </form>
      </div>
    </Container>
  );
};

export default LogInRegister;
