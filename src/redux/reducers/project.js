import {
    ADD_NEW_CONSUMER,
    ADD_NEW_NETWORK,
    ADD_NEW_NETWORK_TEMPLATE,
    ADD_NEW_PRODUCER,
    ADD_NEW_SUPPLIER,
    ADD_NEW_SUPPLIER_TEMPLATE,
    CREATE_NEW_PROJECT, SET_CANVAS_STATE,
    SET_INITIAL_STATE,
    SET_MARKET_MODEL_SETTINGS,
    SET_NETWORKS_TEMPLATES, SET_NODES,
    SET_OBJECTS,
    SET_PRODUCERS, SET_PROJECT,
    SET_PROJECT_RESULTS,
    SET_SUPPLIERS_TEMPLATES,
} from "../constants/project";
import {Icon} from "@blueprintjs/core";
import {getObjectIcon} from "../../components/pages/Topology/components/Canvas/helpers/tree-helper";

//let initialState = null

let initialState = {
    id: "test",
    info: {
        location: "Kyiv, Ukraine",
        coordinates: {
            latitude: 50.383139,
            longitude: 30.696004,
        },
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
    results: null,
    canvas: {
        version: "3.6.3",
        objects: []
    },
    nodes: [
        {
            id: "objects",
            hasCaret: true,
            isExpanded: false,
            //secondaryLabel: getObjectIcon("objects"),
            label: "System objects",
            childNodes: [
                {
                    id: "consumer",
                    hasCaret: true,
                    isExpanded: false,
                    disabled: true,
                    //secondaryLabel: getObjectIcon("consumer"),
                    label: "Consumers",
                    childNodes: [],
                },
                {
                    id: "supplier",
                    hasCaret: true,
                    isExpanded: false,
                    disabled: true,
                    ///secondaryLabel: getObjectIcon("supplier"),
                    label: "Suppliers",
                    childNodes: [],
                },
                {
                    id: "network",
                    hasCaret: true,
                    isExpanded: false,
                    disabled: true,
                    //secondaryLabel: getObjectIcon("network"),
                    label: "Networks",
                    childNodes: [],
                },
            ],
        },
    ],
    objects: {
        consumers: [],
        suppliers: [],
        networks: [],
        producers: [{name: "Main producer", id: "main_producer"}]
    },
    templates: {
        networks: [{
            properties: {
                name: "mumu",
                diameter: 77,
                insulationThickness: 77,
                insulationType: null,
                pipeLayingType: null
            },
            id: "network_template_1597316964426"
        }],
        suppliers: [],
    }
}

const project = (state = initialState, action) => {
    switch (action.type) {
        case SET_PROJECT:
            return action.data
        case SET_OBJECTS:
            return {
                ...state,
                objects: {
                    ...state.objects,
                    [action.data.objectType]: action.data.newObjects
                }
            }
        case SET_NODES:
            return {
                ...state,
                nodes: action.data
            }
        case SET_CANVAS_STATE:
            return {
                ...state,
                canvas: action.data
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
        case SET_PROJECT_RESULTS:
            return {
                ...state,
                results: action.data
            }
        case SET_INITIAL_STATE:
            return initialState
        default:
            return state;
    }
}

export default project;
