import {
    ADD_NEW_CONSUMER,
    ADD_NEW_NETWORK, ADD_NEW_PRODUCER,
    ADD_NEW_SUPPLIER,
    CREATE_NEW_PROJECT,
    SET_INITIAL_STATE
} from "../constants/project";

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

export const addNewProducer = (data) => ({
    type: ADD_NEW_PRODUCER,
    data
})

export const addNewNetwork = (data) => ({
    type: ADD_NEW_NETWORK,
    data
})