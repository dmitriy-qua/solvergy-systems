import {SET_BUILDINGS_RESULTS, TOGGLE_IS_LOADING} from "../constants/buildings";
import {ProjectsAPI} from "../../api/projects";

export const getBuildingsResults = () => (dispatch) => {
    return new Promise(async (res) => {
        dispatch(toogleIsLoading(true))
        const response = await ProjectsAPI.getUserResults()
        dispatch(setBuildingsResults(response.data))
        dispatch(toogleIsLoading(false))
    });
}


export const setBuildingsResults = (data) => ({
    type: SET_BUILDINGS_RESULTS,
    data
})

const toogleIsLoading = (data) => ({
    type: TOGGLE_IS_LOADING,
    data
})
