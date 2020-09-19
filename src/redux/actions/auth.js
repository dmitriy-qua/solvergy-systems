import {
    FAILURE_LOGIN,
    FAILURE_SIGNUP, LOADED_PROJECT,
    LOGOUT, PROJECT_IS_CALCULATING, PROJECT_IS_LOADING,
    REQUEST_LOGIN,
    REQUEST_SIGNUP,
    SUCCESS_LOGIN,
    SUCCESS_SIGNUP
} from "../constants/auth";
import {AuthAPI} from "../../api/auth"

function requestLogin(login) { return { type: REQUEST_LOGIN, login } }
export function successLogin(user) { return { type: SUCCESS_LOGIN, user } }
function failureLogin(error) { return { type: FAILURE_LOGIN, error } }

function requestSignUp(login) { return { type: REQUEST_SIGNUP, login } }
function successSignUp(user) { return { type: SUCCESS_SIGNUP, user } }
function failureSignUp(error) { return { type: FAILURE_SIGNUP, error } }

export function signIn({login, password}) {
    return dispatch => {
        dispatch(requestLogin(login));

        AuthAPI.signIn(login, password)
            .then(
                user => {
                    dispatch(successLogin(user))
                },
                error => {
                    dispatch(failureLogin(error))
                }
            );
    };
}

export function signUp({login, password}) {
    return dispatch => {
        dispatch(requestSignUp(login));

        AuthAPI.signUp(login, password)
            .then(
                user => {
                    dispatch(successSignUp(user))
                },
                error => {
                    dispatch(failureSignUp(error));
                }
            );
    };
}

export function signInGoogle({login}) {
    return dispatch => {
        dispatch(requestSignUp(login));

        AuthAPI.signInGoogle(login)
            .then(
                user => {
                    dispatch(successSignUp(user))
                },
                error => {
                    dispatch(failureSignUp(error));
                }
            );
    };
}

export function logout() {
    return dispatch => {
        AuthAPI.logout();
        dispatch(signout())
    }
}

export const signout = () => ({
    type: LOGOUT,
})

export const setLoadedProjectId = (data) => ({
    type: LOADED_PROJECT,
    data
})

export const setProjectIsLoading = (data) => ({
    type: PROJECT_IS_LOADING,
    data
})

export const setProjectIsCalculating = (data) => ({
    type: PROJECT_IS_CALCULATING,
    data
})

