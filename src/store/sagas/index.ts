import { takeEvery } from "redux-saga/effects";
import { AUTH_INITIATE_LOGOUT, AUTH_USER } from "../actions/actionTypes";
import { authUserSaga, logoutSaga } from "./auth";

export function* watchAuth () {
    yield takeEvery(AUTH_USER as any, authUserSaga);
    yield takeEvery(AUTH_INITIATE_LOGOUT, logoutSaga);
}