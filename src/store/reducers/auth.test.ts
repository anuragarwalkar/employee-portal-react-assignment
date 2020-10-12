import reducer, { initialState } from './auth';
import { AUTH_LOGOUT, AUTH_SUCCESS } from '../actions/actionTypes';


describe('Auth Reducer', () => {
    it('Should return initial state', () => {
        expect(reducer(undefined, {} as any)).toEqual(initialState);
    });


    it('Should store the token on user login', () => {
        const payload = { token: 'cjcc', user: { fullName: 'anurag' } };
        const newState = { ...initialState };
        newState.fullName = payload.user.fullName;
        newState.token = payload.token;

        expect(reducer(initialState, { type: AUTH_SUCCESS, payload } as any)).toEqual(newState)
    });

    it('Should store clear the token on user logout', () => {
        expect(reducer(initialState, { type: AUTH_LOGOUT } as any)).toEqual(initialState)
    });
})