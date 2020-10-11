import AuthState from "./authState.model";
import EmployeeState from "./employee.model";

export interface RootState {
    auth: AuthState;
    employee: EmployeeState
 }