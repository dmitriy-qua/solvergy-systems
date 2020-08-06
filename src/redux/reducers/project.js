import {
    ADD_NEW_CONSUMER, ADD_NEW_NETWORK, ADD_NEW_NETWORK_TEMPLATE,
    ADD_NEW_PRODUCER,
    ADD_NEW_SUPPLIER, ADD_NEW_SUPPLIER_TEMPLATE, ADD_NEW_TEMPLATE,
    CREATE_NEW_PROJECT, SET_CONSUMERS,
    SET_INITIAL_STATE, SET_NETWORKS_TEMPLATES, SET_OBJECTS, SET_PRODUCERS, SET_SUPPLIERS_TEMPLATES, SET_TEMPLATES
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
}

const project = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_NEW_PROJECT:
            return {
                ...state,
                project: action.data
            }
        case SET_OBJECTS:
            return {
                ...state,
                project: {
                    ...state.project,
                    objects: {
                        ...state.project.objects,
                        [action.data.objectType]: action.data.newObjects
                    }
                }
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
        case ADD_NEW_NETWORK_TEMPLATE:
            return {
                ...state,
                project: {
                    ...state.project,
                    templates: {
                        ...state.project.templates,
                        networks: [
                            ...state.project.templates.networks,
                            action.data
                        ]
                    }
                }
            }
        case SET_NETWORKS_TEMPLATES:
            return {
                ...state,
                project: {
                    ...state.project,
                    templates: {
                        ...state.project.templates,
                        networks: action.data
                    }
                }
            }
        case ADD_NEW_SUPPLIER_TEMPLATE:
            return {
                ...state,
                project: {
                    ...state.project,
                    templates: {
                        ...state.project.templates,
                        suppliers: [
                            ...state.project.templates.suppliers,
                            action.data
                        ]
                    }
                }
            }
        case SET_SUPPLIERS_TEMPLATES:
            return {
                ...state,
                project: {
                    ...state.project,
                    templates: {
                        ...state.project.templates,
                        suppliers: action.data
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
