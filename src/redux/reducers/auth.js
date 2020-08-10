import {
    APP_IS_LOADED,
    FAILURE_LOGIN, FAILURE_SIGNUP, LOADED_PROJECT,
    LOGOUT,
    REQUEST_LOGIN,
    REQUEST_SIGNUP, SET_VERSION,
    SUCCESS_LOGIN, SUCCESS_SIGNUP
} from "../constants/auth";

const initialState = {
    isAuth: false,
    appIsLoaded: false,
    error: false,
    user: null,
    version: null,
    loadedProject: null
}

const auth = (state = initialState, action) => {
    switch (action.type) {
        case REQUEST_LOGIN:
            return {
                ...state,
                isAuth: false,
                user: action.login,
                error: false
            }
        case SUCCESS_LOGIN:
            return {
                ...state,
                isAuth: true,
                user: action.user,
                error: false
            }
        case FAILURE_LOGIN:
            return {
                ...state,
                isAuth: false,
                user: null,
                error: true
            };
        case REQUEST_SIGNUP:
            return {
                ...state,
                isAuth: false,
                user: action.login,
                error: false
            }
        case SUCCESS_SIGNUP:
            return {
                ...state,
                isAuth: true,
                user: action.user,
                error: false
            }
        case FAILURE_SIGNUP:
            return {
                ...state,
                isAuth: false,
                user: null,
                error: true
            };
        case LOGOUT:
            return {
                ...state,
                isAuth: false,
                user: null,
                error: false
            }
        case APP_IS_LOADED:
            return {
                ...state,
                appIsLoaded: true
            }
        case LOADED_PROJECT:
            return {
                ...state,
                loadedProject: action.data
            }
        case SET_VERSION:
            return {
                ...state,
                version: action.version
            }
        default:
            return state;
    }
}

export default auth;
