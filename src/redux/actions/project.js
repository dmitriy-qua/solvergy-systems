import {CREATE_NEW_PROJECT, SET_INITIAL_STATE} from "../constants/project";

export const setInitialState = () => ({
    type: SET_INITIAL_STATE,
})

export const createNewProject = (data) => ({
    type: CREATE_NEW_PROJECT,
    data
})