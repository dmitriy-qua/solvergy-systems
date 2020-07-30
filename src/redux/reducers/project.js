import {
    ADD_NEW_CONSUMER, ADD_NEW_NETWORK,
    ADD_NEW_PRODUCER,
    ADD_NEW_SUPPLIER,
    CREATE_NEW_PROJECT,
    SET_INITIAL_STATE, SET_PRODUCERS
} from "../constants/project";

// let initialState = {
//     project: null,
// };

let initialState = {
    project: {
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
        objects: {
            consumers: [],
            suppliers: [],
            networks: [],
            producers: [{name: "Main", id: "prod1"}, {name: "NotMain", id: "prod2"}]
        },
        templates: {
            networks: [{name: "template 1", properties: null}]
        }
    }
}

const project = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_NEW_PROJECT:
            return {
                ...state,
                project: action.data
            }
        case ADD_NEW_CONSUMER:
            return {
                ...state,
                project: {
                    ...state.project,
                    objects: {
                        ...state.project.objects,
                        consumers: [
                            ...state.project.objects.consumers,
                            action.data
                        ]
                    }
                }
            }
        case ADD_NEW_SUPPLIER:
            return {
                ...state,
                project: {
                    ...state.project,
                    objects: {
                        ...state.project.objects,
                        suppliers: [
                            ...state.project.objects.suppliers,
                            action.data
                        ]
                    }
                }
            }
        case ADD_NEW_NETWORK:
            return {
                ...state,
                project: {
                    ...state.project,
                    objects: {
                        ...state.project.objects,
                        networks: [
                            ...state.project.objects.networks,
                            action.data
                        ]
                    }
                }
            }
        case ADD_NEW_PRODUCER:
            return {
                ...state,
                project: {
                    ...state.project,
                    objects: {
                        ...state.project.objects,
                        producers: [
                            ...state.project.objects.producers,
                            action.data
                        ]
                    }
                }
            }
        case SET_PRODUCERS:
            return {
                ...state,
                project: {
                    ...state.project,
                    objects: {
                        ...state.project.objects,
                        producers: action.data
                    }
                }
            }
        case SET_INITIAL_STATE:
            return initialState
        default:
            return state;
    }
}

export default project;
