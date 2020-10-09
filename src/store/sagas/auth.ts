
import { put } from 'redux-saga/effects';
import { authFailed, authStart, authSuccess, logoutSucceed } from '../actions/auth';
import axios from 'axios';
const environment = process.env.REACT_APP_API_PATH;

export function* authUserSaga ({payload: {email, password, fullName, method}}: {payload: {email: string, password: string, method: string,fullName: string}}) {
    yield put(authStart());
    
    try {
      const {data: {success, data}} = yield axios.post(`${environment}/api/auth/${method}`, {email, password, fullName});    
      if (success) {
          yield put(authSuccess(data));
      }
    } catch (error) {
       yield put(authFailed(error.response.data.error)); 
    }

}

export function* logoutSaga() {
    yield put(logoutSucceed()); 
}