import { ADD_NEW_EMPLOYEE_SUCCESS, DELETE_EMPLOYEE_SUCCESS, EDIT_EMPLOYEE_SUCCESS, FETCH_EMPLOYEES_SUCCESS } from '../actions/actionTypes';
import reducer, { initialState } from './employee';

const employees = [
    {
        _id: "5f8344c9934d302ce8ae068f",
        fullName: "anurag arwalkar",
        projectAssigned: "sveltejs",
        technologyStack: "javascript node.js",
    } 
]

describe('Employee Reducer', () => {
    it('Should return initial state', () => {
        expect(reducer(undefined, {} as any)).toEqual(initialState);
    });


    it('Should set all the employees', () => {
        const payload = { employees, loading: false, totalPages: 1, currentPage: 1  };
        const newState = { ...initialState };
        newState.employees = payload.employees;
        newState.loading = payload.loading;
        newState.totalPages = payload.totalPages;
        newState.currentPage = payload.currentPage;

        expect(reducer(initialState, { type: FETCH_EMPLOYEES_SUCCESS, payload } as any)).toEqual(newState)
    });

    it('Should append new employees', () => {
        const payload = { employee: employees, loading: false  };
        const newState = { ...initialState };
        newState.employees = payload.employee;
        newState.loading = payload.loading;

        expect(reducer(initialState, { type: ADD_NEW_EMPLOYEE_SUCCESS, payload } as any)).toEqual(newState)
    });

    it('Should append delete the given employee', () => {
        const [employee] = employees;
        const payload = { employee: { _id: employee._id}, loading: false  };
        const modifiedInitialState = { ...initialState };
        modifiedInitialState.employees = employees;
        const newState = { ...initialState };

        expect(reducer(modifiedInitialState, { type: DELETE_EMPLOYEE_SUCCESS, payload } as any)).toEqual(newState)
    });

    it('Should append edit the given employee', () => {
        const [employee] = employees;
        const payload = { employee: { _id: employee._id, fullName: 'anurag r arwalkar', projectAssigned: 'deno', technologyStack: 'javascript' }, loading: false  };
        const modifiedInitialState = { ...initialState };
        modifiedInitialState.employees = employees;
        const newState = { ...initialState };
        newState.employees = [...employees];
        newState.employees[0].fullName = payload.employee.fullName;
        newState.employees[0].projectAssigned = payload.employee.projectAssigned;
        newState.employees[0].technologyStack = payload.employee.technologyStack;

        expect(reducer(modifiedInitialState, { type: EDIT_EMPLOYEE_SUCCESS, payload } as any)).toEqual(newState)
    });
})