import {GET_USER_PROJECT, SET_INITIAL_STATE} from "../constants/project";

const setUserProject = (data) => ({
    type: GET_USER_PROJECT,
    data
})

export const setInitialState = () => ({
    type: SET_INITIAL_STATE,
})
