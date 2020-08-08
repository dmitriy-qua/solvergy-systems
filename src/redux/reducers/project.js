import {
    ADD_NEW_CONSUMER,
    ADD_NEW_NETWORK,
    ADD_NEW_NETWORK_TEMPLATE,
    ADD_NEW_PRODUCER,
    ADD_NEW_SUPPLIER,
    ADD_NEW_SUPPLIER_TEMPLATE,
    ADD_NEW_TEMPLATE,
    CREATE_NEW_PROJECT,
    SET_CONSUMERS,
    SET_INITIAL_STATE,
    SET_MARKET_MODEL_SETTINGS,
    SET_NETWORKS_TEMPLATES,
    SET_OBJECTS,
    SET_PRODUCERS,
    SET_SUPPLIERS_TEMPLATES,
    SET_TEMPLATES
} from "../constants/project";

// let initialState = {
//     project: null,
// };

let initialState = {
    info: {
        location: "Kyiv, Ukraine",
        name: "New Project"
    },
    type: {
        modelType: "System",
        energySystemType: ["Heating"]
    },
    map: {
        mapImageUri: "C:/Users/User/Desktop",
        mapDistance: 1024
    },
    settings: null,
    objects: {
        consumers: [],
        suppliers: [],
        networks: [],
        producers: [{name: "Main", id: "prod1"}, {name: "NotMain", id: "prod2"}]
    },
    templates: {
        networks: [{
            id: "networks_template",
            properties: {
                name: "first",
                diameter: 100,
                insulationThickness: 20,
                insulationType: {
                    name: "Polyethilen",
                    thermalConductivityCoefficient: 0.04
                },
                pipeLayingType: {
                    name: "Elevated",
                    type: "elevated"
                }
            }
        }],
        suppliers: [{
            id: "supplier_template",
            properties: {
                name: "sup"
            }
        }],
    }
}

const project = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_NEW_PROJECT:
            return action.data
        case SET_OBJECTS:
            return {
                ...state,
                objects: {
                    ...state.objects,
                    [action.data.objectType]: action.data.newObjects
                }
            }
        case ADD_NEW_CONSUMER:
            return {
                ...state,
                objects: {
                    ...state.objects,
                    consumers: [
                        ...state.objects.consumers,
                        action.data
                    ]
                }
            }
        case ADD_NEW_SUPPLIER:
            return {
                ...state,
                objects: {
                    ...state.objects,
                    suppliers: [
                        ...state.objects.suppliers,
                        action.data
                    ]
                }
            }
        case ADD_NEW_NETWORK:
            return {
                ...state,
                objects: {
                    ...state.objects,
                    networks: [
                        ...state.objects.networks,
                        action.data
                    ]
                }
            }
        case ADD_NEW_PRODUCER:
            return {
                ...state,
                objects: {
                    ...state.objects,
                    producers: [
                        ...state.objects.producers,
                        action.data
                    ]
                }
            }
        case SET_PRODUCERS:
            return {
                ...state,
                objects: {
                    ...state.objects,
                    producers: action.data
                }
            }
        case ADD_NEW_NETWORK_TEMPLATE:
            return {
                ...state,
                templates: {
                    ...state.templates,
                    networks: [
                        ...state.templates.networks,
                        action.data
                    ]
                }
            }
        case SET_NETWORKS_TEMPLATES:
            return {
                ...state,
                templates: {
                    ...state.templates,
                    networks: action.data
                }
            }
        case ADD_NEW_SUPPLIER_TEMPLATE:
            return {
                ...state,
                templates: {
                    ...state.templates,
                    suppliers: [
                        ...state.templates.suppliers,
                        action.data
                    ]
                }
            }
        case SET_SUPPLIERS_TEMPLATES:
            return {
                ...state,
                templates: {
                    ...state.templates,
                    suppliers: action.data
                }
            }
        case SET_MARKET_MODEL_SETTINGS:
            return {
                ...state,
                settings: action.data
            }
        case SET_INITIAL_STATE:
            return initialState
        default:
            return state;
    }
}

export default project;
