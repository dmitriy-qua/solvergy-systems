import {SET_BUILDINGS_RESULTS, TOGGLE_IS_LOADING} from "../constants/buildings";

const initialState = {
    results: [],
    isLoading: false
}

const buildings = (state = initialState, action) => {
    switch (action.type) {
        case SET_BUILDINGS_RESULTS:
            return {
                ...state,
                results: action.data
            }
            case TOGGLE_IS_LOADING:
            return {
                ...state,
                isLoading: action.data
            }

        default:
            return state;
    }
}

export default buildings;
