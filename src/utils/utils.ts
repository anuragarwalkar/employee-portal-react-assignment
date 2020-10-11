import AuthState from "../models/authState.model";
import EmployeeState, { Employee } from "../models/employee.model";

export const convertFormToArray = (form: any, condition = '') => {
    const formElements: any = [];

    for (const key in form) {
        if(key !== condition) {
            formElements.push({
               ...form[key]
            });
        }
    }

    return formElements;
}

export const cloneState = (state: EmployeeState | AuthState) => {
    return JSON.parse(JSON.stringify(state))
}

export const updateObject = (state: EmployeeState | AuthState, updateObject: any) => {
    return {
        ...cloneState(state),
        ...updateObject
    }
}

export const updateEmployeesByAction = (state: EmployeeState, updateType: 'edit' | 'delete', updateObject: Employee) => {

    const newEmployeesState: EmployeeState = cloneState(state);

    for (let i = 0; i < newEmployeesState.employees.length; i++) {
        const { _id } = newEmployeesState.employees[i];

        if(_id === updateObject._id) {

            if(updateType === 'edit') {
                newEmployeesState.employees[i] = updateObject;
            }

            if(updateType === 'delete') {
                newEmployeesState.employees.splice(i, 1);
            }

            break;
        }
    }

    newEmployeesState.loading = false;

    return newEmployeesState;
}

export const updateControls = (type: string, value: string) => (oldState: any) => {
    const newState = {
      ...oldState,
      [type]: {
        ...oldState[type],
        value
      }
    }

    return newState
}

export const initialPagintaion = {skip: 1, limit: 5};