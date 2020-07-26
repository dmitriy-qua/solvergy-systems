import {CREATE_NEW_PROJECT, SET_INITIAL_STATE} from "../constants/project";

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
            producers: []
        },
    }
}

const project = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_NEW_PROJECT:
            return {
                ...state,
                project: action.data
            }
        case SET_INITIAL_STATE:
            return initialState
        default:
            return state;
    }
}

export default project;
