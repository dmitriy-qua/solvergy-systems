import {
    ADD_NEW_CONSUMER,
    ADD_NEW_NETWORK,
    ADD_NEW_PRODUCER,
    ADD_NEW_SUPPLIER, ADD_NEW_TEMPLATE,
    CREATE_NEW_PROJECT, SET_CONSUMERS,
    SET_INITIAL_STATE, SET_NETWORKS, SET_OBJECTS,
    SET_PRODUCERS, SET_SUPPLIERS, SET_TEMPLATES
} from "../constants/project";

export const setInitialState = () => ({
    type: SET_INITIAL_STATE,
})

export const setObjects = (data) => ({
    type: SET_OBJECTS,
    data
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

export const setProducers = (data) => ({
    type: SET_PRODUCERS,
    data
})

export const addNewNetwork = (data) => ({
    type: ADD_NEW_NETWORK,
    data
})

export const addNewNetworkTemplate = (data) => ({
    type: ADD_NEW_TEMPLATE,
    data
})

export const setNetworkTemplates = (data) => ({
    type: SET_TEMPLATES,
    data
})