import { AUTH_FAILED, AUTH_INIT, AUTH_INITIATE_LOGOUT, AUTH_LOGOUT, AUTH_SUCCESS, AUTH_USER } from "./actionTypes"

export const authStart = () => {
    return { type: AUTH_INIT }
}

export const authFailed = (error: any) => {
    return { type: AUTH_FAILED, payload: { error } }
}

export const authSuccess = (authData: any) => {
    return { type: AUTH_SUCCESS, payload: authData }
}

export const logout = () => {
    return { type: AUTH_INITIATE_LOGOUT }
}

export const logoutSucceed = () => {
    return { type: AUTH_LOGOUT }
}

export const auth = (email: string, password: string, fullName: string, method: "sign-in" | "sign-up") => {
    console.log('email:', email)
    return { type: AUTH_USER, payload: { email, password, fullName, method} }
}