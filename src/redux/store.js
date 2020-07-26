import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware from "redux-thunk";
import project from "./reducers/project";
import auth from "./reducers/auth";

let reducers = combineReducers({
    project,
    auth
})

const store = createStore(reducers, applyMiddleware(thunkMiddleware));

window.store = store

export default store;
