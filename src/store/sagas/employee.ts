
import { put } from 'redux-saga/effects';
import axios from 'axios';
import { addNewEmployeeStart, addNewEmployeeSuccess, 
    deleteEmployeeStart, deleteEmployeeSuccess, editEmployeeStart, editEmployeeSuccess, fetchEmployeesStart, 
    fetchEmployeesSucess } from '../actions/employee';
const environment = process.env.REACT_APP_API_PATH;

export function* employeesSaga ({payload: {limit, skip}}: any) {
    yield put(fetchEmployeesStart());
    
    try {
      const {data: {success, data}} = yield axios.get(`${environment}/api/v1/employee/?limit=${limit}&skip=${skip}`, {withCredentials: true});    
      if (success) {
          yield put(fetchEmployeesSucess(data));
      }
    } catch (error) {
        console.error('error:', error)
    }

}

export function* addEmployeeSaga ({payload}: any) {
    yield put(addNewEmployeeStart());

    try {
        const {data: {success, data}} = yield axios.post(`${environment}/api/v1/employee`, payload ,{withCredentials: true});    
        if (success) {
            yield put(addNewEmployeeSuccess(data));
        }
      } catch (error) {
          console.error('error:', error)
      }

}

export function* editEmployeeSaga ({payload: {employee}}: any) {
    yield put(editEmployeeStart());

    try {
        const {data: {success, data}} = yield axios.patch(`${environment}/api/v1/employee/${employee.employeeCode}`, employee ,{withCredentials: true});    
        if (success) {
            yield put(editEmployeeSuccess(data));
        }
      } catch (error) {
          console.error('error:', error)
      }

}

export function* delteEmployeeSaga ({payload: {employee}}: any) {
    yield put(deleteEmployeeStart());

    try {
        const {data: {success, data}} = yield axios.delete(`${environment}/api/v1/employee/${employee._id}`, {withCredentials: true});    
        if (success) {
            yield put(deleteEmployeeSuccess(data));
        }
      } catch (error) {
          console.error('error:', error)
      }

}
