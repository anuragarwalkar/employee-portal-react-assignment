import AuthState from "../../models/authState.model";
import { updateObject } from "../../utils/utils";
import { AUTH_FAILED, AUTH_INIT, AUTH_LOGOUT, AUTH_SUCCESS } from "../actions/actionTypes";

export const initialState: AuthState = {
    loading: false,
    token: '',
    fullName: '',
    userId: '',
    error: ''
};

type actionType = { type: string, payload: { error: any, token: '', user: any } };

const authStart = (state: AuthState) => {
    return updateObject(state, { error: '', loading: true })
}

const authSuccess = (state: AuthState, action: actionType) => {
    const { token, user } = action.payload
    return updateObject(state, { token, fullName: user.fullName, error: '', loading: false });
}

const authLogout = (state: AuthState) => {
    return updateObject(state, { token: '', userId: '', userName: ''});
}

const authFailed = (state: AuthState, action: actionType) => {
    const { error } = action.payload;
    return updateObject(state, { error: error.error, loading: false });
}

const reducer = (state = initialState, action: actionType ) => {
    switch (action.type) {
        case AUTH_INIT:
            return authStart(state);

        case AUTH_SUCCESS:
            return authSuccess(state, action);

        case AUTH_FAILED:
            return authFailed(state, action);

        case AUTH_LOGOUT: 
            return authLogout(state);     
    }
    
    return state;
}

export default reducer;

