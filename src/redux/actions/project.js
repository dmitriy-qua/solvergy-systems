import {
    ADD_NEW_CONSUMER,
    ADD_NEW_NETWORK, ADD_NEW_NETWORK_TEMPLATE,
    ADD_NEW_PRODUCER,
    ADD_NEW_SUPPLIER, ADD_NEW_SUPPLIER_TEMPLATE,
    CREATE_NEW_PROJECT,
    SET_INITIAL_STATE, SET_MARKET_MODEL_SETTINGS,
    SET_NETWORKS_TEMPLATES,
    SET_OBJECTS,
    SET_PRODUCERS, SET_SUPPLIERS_TEMPLATES,
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
    type: ADD_NEW_NETWORK_TEMPLATE,
    data
})

export const setNetworkTemplates = (data) => ({
    type: SET_NETWORKS_TEMPLATES,
    data
})

export const addNewSupplierTemplate = (data) => ({
    type: ADD_NEW_SUPPLIER_TEMPLATE,
    data
})

export const setSuppliersTemplates = (data) => ({
    type: SET_SUPPLIERS_TEMPLATES,
    data
})

export const setMarketModelSettings = (data) => ({
    type: SET_MARKET_MODEL_SETTINGS,
    data
})