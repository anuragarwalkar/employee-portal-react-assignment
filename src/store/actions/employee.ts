import { Employee } from "../../models/employee.model"
import { ADD_NEW_EMPLOYEE, ADD_NEW_EMPLOYEE_INIT, ADD_NEW_EMPLOYEE_SUCCESS, DELETE_EMPLOYEE, DELETE_EMPLOYEE_INIT, DELETE_EMPLOYEE_SUCCESS, EDIT_EMPLOYEE, EDIT_EMPLOYEE_INIT, EDIT_EMPLOYEE_SUCCESS, FETCH_EMPLOYEES, FETCH_EMPLOYEES_INIT, FETCH_EMPLOYEES_SUCCESS } from "./actionTypes"


export const fetchEmployeesStart = () => {
    return {
        type: FETCH_EMPLOYEES_INIT 
    }
}

type fetchedEmployees = { employees: Employee[], currentPage: number, totalPages: number}

export const fetchEmployeesSucess = ({employees, currentPage, totalPages }: fetchedEmployees) => {
    return {
        type: FETCH_EMPLOYEES_SUCCESS,
        payload: {
            employees,
            currentPage,
            totalPages
        }
    }
}

export const addNewEmployee = (data: any) => {
    return {
        type: ADD_NEW_EMPLOYEE,
        payload: data
    }

}

export const addNewEmployeeStart = () => {
    return {
        type: ADD_NEW_EMPLOYEE_INIT
    }
}

export const addNewEmployeeSuccess = (employee: Employee) => {
    return {
        type: ADD_NEW_EMPLOYEE_SUCCESS,
        payload: {
            employee
        }
    }
}

export const fetchEmployees = (limit: number, skip: number) => {
    return {
        type: FETCH_EMPLOYEES,
        payload: {
            limit,
            skip
        }
    }
}

export const deleteEmployee = (employeeId: string) => {
    return {
        type: DELETE_EMPLOYEE,
        payload: {
            employee: {
                _id: employeeId
            }
        }
    }
}

export const deleteEmployeeStart = () => {
    return {
        type: DELETE_EMPLOYEE_INIT
    }
}

export const deleteEmployeeSuccess = (employee: Employee) => {
    return {
        type: DELETE_EMPLOYEE_SUCCESS,
        payload: {
            employee
        }
    }
}

export const editEmployee = (employee: Employee) => {
    return {
        type: EDIT_EMPLOYEE,
        payload: {
            employee
        }
    }
}

export const editEmployeeStart = () => {
    return {
        type: EDIT_EMPLOYEE_INIT
    }
}

export const editEmployeeSuccess = (employee: Employee) => {
    debugger
    return {
        type: EDIT_EMPLOYEE_SUCCESS,
        payload: {
            employee
        }
    }
}