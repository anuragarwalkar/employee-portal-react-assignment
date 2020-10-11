export interface Employee {
    fullName: string,
    technologyStack: string,
    projectAssigned: string,
    _id: string
}

export interface EmployeePayload { 
    employees: Employee[]
    employee: Employee;
    currentPage: number;
    totalPages: number;
}

export default interface EmployeeState {
    employees: Employee[],
    loading: boolean,
    currentPage: number,
    totalPages: number
}