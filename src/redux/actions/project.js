import {
    ADD_NEW_CONSUMER,
    ADD_NEW_NETWORK, ADD_NEW_NETWORK_TEMPLATE,
    ADD_NEW_PRODUCER,
    ADD_NEW_SUPPLIER, ADD_NEW_SUPPLIER_TEMPLATE, SET_CANVAS_STATE,
    SET_INITIAL_STATE, SET_MAP_IMAGE_ANALYZED_POLYGONS, SET_MARKET_MODEL_SETTINGS,
    SET_NETWORKS_TEMPLATES, SET_NODES,
    SET_OBJECTS,
    SET_PRODUCERS, SET_PROJECT, SET_PROJECT_RESULTS, SET_SUPPLIERS_TEMPLATES,
} from "../constants/project";

import {ProjectsAPI} from "../../api/projects";
import {
    getUserProjects,
    setLoadedProjectId,
    setProjectIsCalculating,
    setProjectIsDeleting,
    setProjectIsLoading
} from "./auth";

export const setInitialState = () => ({
    type: SET_INITIAL_STATE,
})

export const setObjects = (data) => ({
    type: SET_OBJECTS,
    data
})

export const setNodes = (data) => ({
    type: SET_NODES,
    data
})

export const setCanvasState = (data) => ({
    type: SET_CANVAS_STATE,
    data
})

export const setProject = (data) => ({
    type: SET_PROJECT,
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

export const setProjectResult = (data) => ({
    type: SET_PROJECT_RESULTS,
    data
})

export const calculateProject = (project) => (dispatch) => {
    return new Promise(async (res) => {
        dispatch(setProjectIsCalculating(true))
        const projectData = {
            ...project,
            results: null
        }

        const calculationResult = await ProjectsAPI.calculateProject(projectData)

        const newProjectData = {
            ...project,
            results: calculationResult.data.results
        }

        await ProjectsAPI.saveProject(newProjectData)

        dispatch(setProjectResult(calculationResult.data.results))
        dispatch(setProjectIsCalculating(false))
    });
}

export const saveProject = (project) => (dispatch) => {
    return new Promise(async (res) => {
        const calculationResult = await ProjectsAPI.saveProject(project)
    });
}

export const saveAsProject = (project, oldId) => (dispatch) => {
    return new Promise(async (res) => {
        dispatch(setProjectIsLoading(true))
        const copyStatus = await ProjectsAPI.copyMapImage({oldId, newId: project.id})
        const createdProject = await ProjectsAPI.createProject(project)

        dispatch(setInitialState())
        dispatch(setProject(createdProject.data))
        dispatch(setProjectIsLoading(false))
    });
}

export const deleteProject = (id) => (dispatch) => {
    return new Promise(async (res) => {
        dispatch(setProjectIsDeleting(true))
        const deletedId = await ProjectsAPI.deleteProject(id)
        dispatch(getUserProjects())
        dispatch(setProjectIsDeleting(false))
    });
}

export const openProject = (id) => (dispatch) => {
    return new Promise(async (res) => {
        dispatch(setProjectIsLoading(true))
        dispatch(setProject(null))
        const project = await ProjectsAPI.openProject(id)
        dispatch(setProject(project.data))
        dispatch(setLoadedProjectId(project.data.id))
        dispatch(setProjectIsLoading(false))
    });
}

export const createNewProject = ({id, mapImageUri, mapDistance, mapImageShouldBeAnalyzed, mapImageForAnalysisUri, name, location, coordinates, currency, modelType, energySystemType}) => (dispatch) => {
    return new Promise(async (res) => {
        dispatch(setProjectIsLoading(true))
        dispatch(setInitialState())
        const response = await ProjectsAPI.getMapImageUrl({id, mapImageUri, mapDistance, mapImageShouldBeAnalyzed, mapImageForAnalysisUri})

        const newProject = getNewProjectData({id, mapImageUri, mapDistance, mapImageShouldBeAnalyzed, mapImageForAnalysisUri, name, location, coordinates, currency, modelType, energySystemType, polygons: response.data})

        const createdProject = await ProjectsAPI.createProject(newProject)

        dispatch(setProject(createdProject.data))
        //dispatch(setMapImageAnalyzedPolygons(response.data))
        dispatch(setProjectIsLoading(false))
    });
}

export const setMapImageAnalyzedPolygons = (data) => ({
    type: SET_MAP_IMAGE_ANALYZED_POLYGONS,
    data
})

const getNewProjectData = ({id, mapImageUri, mapDistance, mapImageShouldBeAnalyzed, mapImageForAnalysisUri, name, location, coordinates, currency, modelType, energySystemType, polygons}) => {
    return {
        id,
        info: {name, location, currency, coordinates},
        type: {modelType, energySystemType},
        map: {mapDistance, mapImageShouldBeAnalyzed, mapImageForAnalysisUri},
        results: null,
        settings: null,
        polygons,
        objects: {
            consumers: [],
            suppliers: [],
            networks: [],
            producers: [{name: "Main producer", id: "main_producer", color: "#f44336"}]
        },
        templates: {
            networks: [],
            suppliers: []
        },
        canvas: {
            version: "3.6.3",
            objects: []
        },
        nodes: [
            {
                id: "objects",
                hasCaret: true,
                isExpanded: false,
                label: "System objects",
                childNodes: [
                    {
                        id: "consumer",
                        hasCaret: true,
                        isExpanded: false,
                        disabled: true,
                        label: "Consumers",
                        childNodes: [],
                    },
                    {
                        id: "supplier",
                        hasCaret: true,
                        isExpanded: false,
                        disabled: true,
                        label: "Suppliers",
                        childNodes: [],
                    },
                    {
                        id: "network",
                        hasCaret: true,
                        isExpanded: false,
                        disabled: true,
                        label: "Networks",
                        childNodes: [],
                    },
                ],
            },
        ],

    }
}
