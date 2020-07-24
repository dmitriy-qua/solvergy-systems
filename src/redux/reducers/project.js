import {GET_USER_PROJECT, SET_INITIAL_STATE} from "../constants/project";

let initialState = {
    project: null,
};

const project = (state = initialState, action) => {
    switch (action.type) {
        case GET_USER_PROJECT:
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
