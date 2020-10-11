import { takeEvery } from "redux-saga/effects";
import { ADD_NEW_EMPLOYEE, AUTH_INITIATE_LOGOUT, AUTH_USER, DELETE_EMPLOYEE, EDIT_EMPLOYEE, FETCH_EMPLOYEES } from "../actions/actionTypes";
import { authUserSaga, logoutSaga } from "./auth";
import { addEmployeeSaga, delteEmployeeSaga, editEmployeeSaga, employeesSaga } from "./employee";

export function* watchAuth () {
    yield takeEvery(AUTH_USER as any, authUserSaga);
    yield takeEvery(AUTH_INITIATE_LOGOUT, logoutSaga);
}

export function* watchEmployee() {
    yield takeEvery(FETCH_EMPLOYEES, employeesSaga);
    yield takeEvery(ADD_NEW_EMPLOYEE, addEmployeeSaga);
    yield takeEvery(EDIT_EMPLOYEE, editEmployeeSaga);
    yield takeEvery(DELETE_EMPLOYEE, delteEmployeeSaga);
}