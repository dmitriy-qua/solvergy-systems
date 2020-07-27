import {ADD_NEW_CONSUMER, ADD_NEW_SUPPLIER, CREATE_NEW_PROJECT, SET_INITIAL_STATE} from "../constants/project";

export const setInitialState = () => ({
    type: SET_INITIAL_STATE,
})

export const createNewProject = (data) => ({
    type: CREATE_NEW_PROJECT,
    data
})

export const addNewConsumer = (data) => ({
    type: ADD_NEW_CONSUMER,
    data
})

export const addNewSupplier = (data) => ({
    type: ADD_NEW_SUPPLIER,
    data
})