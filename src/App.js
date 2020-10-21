import './App.css'
import React, {useCallback, useEffect, useState} from 'react'
import {ReflexContainer, ReflexElement} from 'react-reflex'
import {ToolsBar} from "./components/common/ToolsBar/ToolsBar";
import {Topology} from "./components/pages/Topology/Topology";
import {
    ContextMenu,
    Intent,
    ResizeSensor,
} from "@blueprintjs/core";
import {
    addObjectInTree,
    forEachNode, forEachNodeFilter, getSelectedTreeNode, unselectAllNodes,
    updateNodeProperty
} from "./components/pages/Topology/components/Canvas/helpers/tree-helper";
import {Start} from "./components/pages/Start/Start";
import {useDispatch, useSelector} from "react-redux";
import {setInitialUserLicense, setLoadedProjectId, successLogin} from "./redux/actions/auth";
import {generateId} from "./helpers/data-helper";
import Consumer from "./objects/consumer";
import {
    addNewConsumer,
    addNewNetwork,
    addNewSupplier, calculateProject, saveProject, setCanvasState, setNodes,
    setObjects, setProject,
} from "./redux/actions/project";
import Supplier from "./objects/supplier";
import HeatNetwork from "./objects/heat-network";
import {ObjectContextMenu} from "./components/common/ContextMenu/ObjectContextMenu";
import {ConsumerDialog} from "./components/common/ToolsBar/components/ConsumerDialog";
import {SupplierDialog} from "./components/common/ToolsBar/components/SupplierDialog";
import {NetworkDialog} from "./components/common/ToolsBar/components/NetworkDialog";
import {ProducersDialog} from "./components/common/ToolsBar/components/ProducersDialog";
import {NetworksTemplatesDialog} from "./components/common/ToolsBar/components/NetworksTemplatesDialog";
import {SuppliersTemplatesDialog} from "./components/common/ToolsBar/components/SuppliersTemplatesDialog";
import {ModelSettings} from "./components/common/ToolsBar/components/ModelSettings";
import {AuthDialog} from "./components/common/Authentication/AuthDialog";
import {
    handleObjectSelection, regeneratePolygon,
    setEnlivenObjects, toggleInspectionMode
} from "./components/pages/Topology/components/Canvas/helpers/canvas-helper";
import {ResultsDialog} from "./components/common/ToolsBar/components/ResultsDialog";
import {MapImageAnalysisDialog} from "./components/common/ToolsBar/components/MapImageAnalysisDialog";
import {Loading} from "./components/common/Notifications/Loading";
import {StartDialog} from "./components/pages/Start/components/StartDialog";
import {OpenProjectDialog} from "./components/common/ToolsBar/components/OpenProjectDialog";
import {SaveAsProjectDialog} from "./components/common/ToolsBar/components/SaveAsProjectDialog";
import {useHotkeys} from "react-hotkeys-hook";
import {HelpDialog} from "./components/common/ToolsBar/components/HelpDialog";
import {LicenseDialog} from "./components/common/ToolsBar/components/LicenseDialog";
import {InfoDialog} from "./components/common/ToolsBar/components/InfoDialog";
import {UpdateNotification} from "./components/common/Notifications/UpdateNotification";
import {UpdateDownloadedNotification} from "./components/common/Notifications/UpdateDownloadedNotification"
import {InternetConnectionDialog} from "./components/common/ToolsBar/components/InternetConnectionDialog";

const isOnline = require('is-online')

const {app} = window.require('electron').remote
const {ipcRenderer} = window.require('electron')

const HEADER_HEIGHT = 50
//const LEFT_MENU_WIDTH = 134
//const FOOTER_HEIGHT = 50

const HISTORY_DEPTH = 10

let creatingObjectData = null
let currentToaster = null
let currentProject = null
let currentResults = null

export const App = () => {

    const dispatch = useDispatch()

    const project = useSelector(state => state.project)

    const user = useSelector(state => state.auth.user)

    const objects = useSelector(state => state.project && state.project.objects)
    const results = useSelector(state => state.project && state.project.results)
    const nodes = useSelector(state => state.project && state.project.nodes)
    const networkTemplates = useSelector(state => state.project && state.project.templates.networks)
    const isAuth = useSelector(state => state.auth.isAuth)
    const loadedProject = useSelector(state => state.auth.loadedProject)
    const projectIsLoading = useSelector(state => state.auth.projectIsLoading)
    const projectIsCalculating = useSelector(state => state.auth.projectIsCalculating)

    const producers = useSelector(state => state.project && state.project.objects.producers)
    const mapDistance = useSelector(state => state.project && state.project.map.mapDistance)
    const mapImageShouldBeAnalyzed = useSelector(state => state.project && state.project.map.mapImageShouldBeAnalyzed)


    const [startDialog, setStartDialog] = useState(false)
    const [authDialog, setAuthDialog] = useState(false)

    const [objectType, setObjectType] = useState("none")
    const [selectedObject, setSelectedObject] = useState(null)
    const [currentPage, setCurrentPage] = useState("topology")
    const [gridIsVisible, setGridIsVisible] = useState(false)
    const [isInspectionMode, setIsInspectionMode] = useState(false)

    const [toasts, setToasts] = useState([])
    const [toaster, setToaster] = useState(null)

    const [canvas, setCanvas] = useState(null)
    const [projectHistory, setProjectHistory] = useState([])
    const [projectState, setProjectState] = useState(null)
    const [projectStateInHistoryIndex, setProjectStateInHistoryIndex] = useState(0)

    const [mapSize, setMapSize] = useState({width: 2000, height: 2000})

    const [objectToDelete, setObjectToDelete] = useState(null)

    const [consumerDialogType, setConsumerDialogType] = useState(null)
    const [supplierDialogType, setSupplierDialogType] = useState(null)
    const [networkDialogType, setNetworkDialogType] = useState(null)
    const [producersDialogIsOpened, setProducersDialogIsOpened] = useState(false)
    const [networksTemplatesDialogIsOpened, setNetworksTemplatesDialogIsOpened] = useState(false)
    const [suppliersTemplatesDialogIsOpened, setSuppliersTemplatesDialogIsOpened] = useState(false)
    const [modelSettingsIsOpened, setModelSettingsIsOpened] = useState(false)
    const [resultsIsOpened, setResultsIsOpened] = useState(false)
    const [mapImageAnalysisIsOpened, setMapImageAnalysisIsOpened] = useState(false)
    const [openProjectDialogIsOpened, setOpenProjectDialogIsOpened] = useState(false)
    const [saveAsProjectDialogIsOpened, setSaveAsProjectDialogIsOpened] = useState(false)
    const [helpDialogIsOpened, setHelpDialogIsOpened] = useState(false)
    const [licenseDialogIsOpened, setLicenseDialogIsOpened] = useState(false)
    const [infoDialogIsOpened, setInfoDialogIsOpened] = useState(false)

    const [updateNotificationIsOpened, setUpdateNotificationIsOpened] = useState(false)
    const [updateNotificationData, setUpdateNotificationData] = useState({percent: 0})

    const [hasInternetConnection, setHasInternetConnection] = useState(true)
    const [internetConnectionDialogIsOpened, setInternetConnectionDialogIsOpened] = useState(false)

    const [updateDownloadedNotificationIsOpened, setUpdateDownloadedNotificationIsOpened] = useState(false)

    const [resultsDialogSize, setResultsDialogSize] = useState({width: 300, height: 300})

    ipcRenderer.on('update_available', () => {
        ipcRenderer.removeAllListeners('update_available')
        setUpdateNotificationIsOpened(true)
    })

    ipcRenderer.on('update_downloaded', () => {
        ipcRenderer.removeAllListeners('update_downloaded')
        setUpdateNotificationIsOpened(false)
        setUpdateDownloadedNotificationIsOpened(true)
        setTimeout(() => ipcRenderer.send('restart_app'), 2000)
    })

    ipcRenderer.on('progress_object', (event, progressObj) => {
        setUpdateNotificationData(progressObj)
    })

    const checkInternetConnection = async () => {
        const hasInternetConnection = await isOnline()
        setHasInternetConnection(hasInternetConnection)
        return hasInternetConnection
    }

    useEffect(() => {
        checkInternetConnection()
        const interval = setInterval(checkInternetConnection, 10000)
        return () => clearInterval(interval)
    }, [])

    useEffect(() => {
        if (!hasInternetConnection) {
            setInternetConnectionDialogIsOpened(true)
        } else {
            setInternetConnectionDialogIsOpened(false)
        }
    }, [hasInternetConnection])

    useEffect(() => {
        const user = localStorage.getItem('user')
        if (user) dispatch(successLogin(JSON.parse(user).data.user))
    }, [])

    useEffect(() => {
        if (user && user.systemsLicense === undefined) dispatch(setInitialUserLicense())
    }, [user])

    useEffect(() => {
        currentProject = project
    }, [project])


    useHotkeys('ctrl+d', () => {
        if (!!project && !saveAsProjectDialogIsOpened) setSaveAsProjectDialogIsOpened(true)
    }, [project, saveAsProjectDialogIsOpened])

    useHotkeys('ctrl+e', () => {
        if (!openProjectDialogIsOpened) setOpenProjectDialogIsOpened(true)
    }, [openProjectDialogIsOpened])

    useHotkeys('alt+q', () => {
        app.quit()
    }, [])

    useHotkeys('ctrl+s', () => {
        if (!!project) {
            dispatch(saveProject(project))
            toaster.show({message: `Project saved.`, intent: Intent.SUCCESS, timeout: 3000})
        }
    }, [project, toaster])

    useHotkeys('shift+r', () => {
        if (!resultsIsOpened && !!project && !!results) setResultsIsOpened(true)
    }, [project, results, resultsIsOpened])

    useHotkeys('shift+m', () => {
        if (!modelSettingsIsOpened && !!project) setModelSettingsIsOpened(true)
    }, [project, modelSettingsIsOpened])

    useHotkeys('shift+x', () => {
        if (!!project) dispatch(calculateProject(project))
    }, [project])

    useHotkeys('shift+g', () => {
        if (!!project) setGridIsVisible(prevState => !prevState)
    }, [project])

    useHotkeys('shift+c', () => {
        if (!!project && !consumerDialogType) {
            if (objectType !== "consumer") {
                setConsumerDialogType("new")
            } else {
                setObjectType("none")
            }
        }
    }, [consumerDialogType, objectType, project])

    useHotkeys('shift+s', () => {
        if (!!project && !supplierDialogType) {
            if (objectType !== "supplier") {
                setSupplierDialogType("new")
            } else {
                setObjectType("none")
            }
        }
    }, [supplierDialogType, objectType, project])

    useHotkeys('shift+z', () => {
        if (!!project && !networkDialogType) {
            if (objectType !== "network") {
                setNetworkDialogType("new")
            } else {
                setObjectType("none")
            }
        }
    }, [networkDialogType, objectType, project])

    useHotkeys('shift+q', () => {
        if (!!project && !producersDialogIsOpened) setProducersDialogIsOpened(true)
    }, [project, producersDialogIsOpened])

    useHotkeys('shift+w', () => {
        if (!!project && !suppliersTemplatesDialogIsOpened) setSuppliersTemplatesDialogIsOpened(true)
    }, [project, suppliersTemplatesDialogIsOpened])

    useHotkeys('shift+e', () => {
        if (!!project && !networksTemplatesDialogIsOpened) setNetworksTemplatesDialogIsOpened(true)
    }, [project, networksTemplatesDialogIsOpened])

    useEffect(() => {
        if (canvas && loadedProject) {

            setEnlivenObjects(canvas, project.canvas.objects, setObjectType)
            const newNodes = forEachNode(project.nodes, n => (n.isSelected = false))
            dispatch(setNodes(newNodes))
            setProjectState(JSON.parse(JSON.stringify(project)))
            setProjectHistory([JSON.parse(JSON.stringify(project))])

            // const canvasState = canvas.toJSON(["circle1", "circle2", "objectType", "id", "networkType", "distance", "name", "connectedTo", "networkIsNew", "isCompleted"])
            // dispatch(saveProject({...project, canvas: canvasState}))

            dispatch(setLoadedProjectId(null))
        }
    }, [loadedProject, canvas])

    useEffect(() => {
        toggleInspectionMode(canvas, isInspectionMode)
    }, [isInspectionMode])

    useEffect(() => {
        const currentStateIndex = projectHistory.indexOf(projectState)
        setProjectStateInHistoryIndex(currentStateIndex)
    }, [projectHistory, projectState])

    useEffect(() => {
        if (project) {
            if (selectedObject) {
                const newNodes = getSelectedTreeNode(selectedObject, nodes)
                dispatch(setNodes(newNodes))
            } else {
                const newNodes = unselectAllNodes(nodes)
                dispatch(setNodes(newNodes))
            }
        }
    }, [selectedObject])

    const saveState = () => {
        const canvasState = canvas.toJSON(["circle1", "circle2", "objectType", "id", "networkType", "distance", "name", "connectedTo", "networkIsNew", "isCompleted"])

        const projectWithCanvas = {
            ...currentProject,
            canvas: canvasState
        }

        const newProjectState = JSON.parse(JSON.stringify(projectWithCanvas))
        setProjectState(newProjectState)
        setProjectHistory(history => [...history, newProjectState].slice(-HISTORY_DEPTH))
    }

    const saveCanvasState = (canvas) => {
        const canvasState = canvas.toJSON(["circle1", "circle2", "objectType", "id", "networkType", "distance", "name", "connectedTo", "networkIsNew", "isCompleted"])
        dispatch(setCanvasState(canvasState))
    }

    const getSelectedNode = (node, e, isRightClick) => {
        if (node.objectType !== undefined) {
            const selectedObjectNode = canvas.getObjects().find(object => {
                if (object.type === "polygon" || object.type === "line") {
                    return object.id === node.id
                }
            })

            const newSelectedObject = handleObjectSelection(canvas, selectedObjectNode, selectedObject)
            setSelectedObject(newSelectedObject)

            if (isRightClick) {
                ContextMenu.show(
                    <ObjectContextMenu selectedObject={selectedObjectNode} deleteObject={deleteObject}
                                       objects={objects} nodes={nodes} editObject={editObject} canvas={canvas}
                                       isInspectionMode={isInspectionMode}/>,
                    {left: e.clientX, top: e.clientY}
                );
            }

        } else {
            setSelectedObject(null)
        }
    }

    const deleteObject = (selectedObject, objects, nodes, canvas) => {

        const objectType = `${selectedObject.objectType}s`
        const newObjects = objects[objectType].filter(object => object.id !== selectedObject.id)
        dispatch(setObjects({objectType, newObjects}))

        const newNodes = forEachNodeFilter(nodes[0], selectedObject.id)
        dispatch(setNodes([newNodes]))
        setObjectToDelete(selectedObject)
        setSelectedObject(null)
    }

    const editObject = (selectedObject) => {
        switch (selectedObject.objectType) {
            case "consumer":
                setConsumerDialogType("edit")
                break
            case "supplier":
                setSupplierDialogType("edit")
                break
            case "network":
                setNetworkDialogType("edit")
                break
            default:
                break
        }
    }


    const startCreateObject = (objectType, name, properties) => {
        const id = objectType + "_" + generateId()

        toaster.show({message: `Start drawing "${objectType}".`, intent: Intent.PRIMARY, timeout: 3000});
        currentToaster = toaster

        switch (objectType) {
            case "consumer":
                creatingObjectData = {
                    id,
                    name,
                    consumption: properties.consumption,
                    buildingsResult: properties.buildingsResult,
                    importFromSolvergyBuildings: properties.importFromSolvergyBuildings
                }
                break
            case "supplier":
                creatingObjectData = {
                    id,
                    name,
                    producerId: properties.producerId,
                    templateId: properties.templateId,
                    capacity: properties.capacity,
                    producers
                }
                break
            case "network":
                const networkTemplate = networkTemplates.find(template => template.id === properties.templateId)
                creatingObjectData = {
                    id,
                    name,
                    templateId: properties.templateId,
                    networkType: properties.networkType,
                    networkIsNew: properties.networkIsNew,
                    diameter: networkTemplate.properties.diameter
                }
                break
            default:
                break
        }

        setObjectType(objectType)
    }

    const finishCreateObject = (objectType, nodes, canvas) => {

        let newNodes = []

        switch (objectType) {
            case "consumer":
                const consumer = new Consumer(
                    creatingObjectData.id,
                    creatingObjectData.name,
                    creatingObjectData.consumption,
                    creatingObjectData.importFromSolvergyBuildings,
                    creatingObjectData.buildingsResult
                )
                dispatch(addNewConsumer(consumer))
                newNodes = addObjectInTree(nodes, objectType, creatingObjectData.name, creatingObjectData.id)
                dispatch(setNodes(newNodes))
                break
            case "supplier":
                const supplier = new Supplier(
                    creatingObjectData.id,
                    creatingObjectData.name,
                    creatingObjectData.capacity,
                    creatingObjectData.producerId,
                    creatingObjectData.templateId
                )
                const producer = creatingObjectData.producers.find(producer => producer.id === creatingObjectData.producerId)
                dispatch(addNewSupplier(supplier))
                newNodes = addObjectInTree(nodes, objectType, creatingObjectData.name, creatingObjectData.id, producer.name)
                dispatch(setNodes(newNodes))
                break
            case "network":
                const network = new HeatNetwork(
                    creatingObjectData.id,
                    creatingObjectData.name,
                    creatingObjectData.templateId,
                    creatingObjectData.networkType,
                    creatingObjectData.networkIsNew
                )
                dispatch(addNewNetwork(network))
                newNodes = addObjectInTree(nodes, objectType, creatingObjectData.name, creatingObjectData.id, creatingObjectData.networkType)
                dispatch(setNodes(newNodes))
                break
            default:
                break
        }

        currentToaster.show({message: `Object "${objectType}" created!`, intent: Intent.SUCCESS, timeout: 3000})
        saveCanvasState(canvas)
        creatingObjectData = null
    }

    const updateNodeLabel = (id, name) => {
        const newNodes = updateNodeProperty(nodes, id, "label", name)
        dispatch(setNodes(newNodes))
    }

    const moveHistory = useCallback(
        step => {
            const currentStateIndex = projectHistory.indexOf(projectState)
            const prevState = projectHistory[currentStateIndex + step]
            if (prevState && prevState.canvas.objects.length > 0) {
                setEnlivenObjects(canvas, prevState.canvas.objects, setObjectType)
                setProjectState(prevState)
                dispatch(setProject(prevState))
                // const newNodes = forEachNode(prevState.nodes, n => (n.isSelected = false))
                // dispatch(setNodes(newNodes))
            }
        },
        [canvas, projectState, projectHistory, setProjectState]
    );

    const onUndo = useCallback(() => moveHistory(-1), [moveHistory]);
    const onRedo = useCallback(() => moveHistory(1), [moveHistory]);

    const handleResize = (entries) => {
        setResultsDialogSize({width: entries[0].contentRect.width - 50, height: entries[0].contentRect.height - 70})
    }

    const saveAnalyzedObjects = (canvasObjects) => {
        canvasObjects.forEach(object => {
            object.set({
                isCompleted: false,
                fill: object.objectType === "consumer" ? "#bad2d8" : "#dbaca7",
                stroke: "black",
                hoverCursor: "pointer",
                strokeDashArray: [3, 2]
            })
            canvas.add(object)
            canvas.renderAll()
        })
    }

    const deleteNotCompletedObject = (selectedObject, canvas) => {
        canvas.remove(selectedObject)
        canvas.renderAll()
    }

    const completeObject = (selectedObject, canvas) => {
        if (selectedObject.objectType === "consumer") {
            setConsumerDialogType("complete")
        } else if (selectedObject.objectType === "supplier") {
            setSupplierDialogType("complete")
        }
    }

    const createObjectFromAnalysis = (objectType, name, objectData) => {
        let newNodes = []

        switch (objectType) {
            case "consumer":
                const consumer = new Consumer(
                    selectedObject.id,
                    name,
                    objectData.consumption,
                    objectData.importFromSolvergyBuildings,
                    objectData.buildingsResult
                )

                regeneratePolygon(canvas, selectedObject, mapSize.height, mapDistance, objectType, name, "#528be0")

                dispatch(addNewConsumer(consumer))
                newNodes = addObjectInTree(nodes, objectType, name, selectedObject.id)
                dispatch(setNodes(newNodes))
                break
            case "supplier":
                const supplier = new Supplier(
                    selectedObject.id,
                    name,
                    objectData.capacity,
                    objectData.producerId,
                    objectData.templateId
                )
                const producer = producers.find(producer => producer.id === objectData.producerId)

                regeneratePolygon(canvas, selectedObject, mapSize.height, mapDistance, objectType, name, producer.color)

                dispatch(addNewSupplier(supplier))
                newNodes = addObjectInTree(nodes, objectType, name, selectedObject.id, producer.name)
                dispatch(setNodes(newNodes))
                break
            default:
                break
        }
        toaster.show({message: `Object "${objectType}" created!`, intent: Intent.SUCCESS, timeout: 3000});
    }

    return <div className="App">
        <ResizeSensor onResize={handleResize}>
            <ReflexContainer orientation="horizontal" windowResizeAware={true}>

                <ReflexElement className="header"
                               size={HEADER_HEIGHT}
                               minSize={HEADER_HEIGHT}
                               maxSize={HEADER_HEIGHT}
                               style={{boxShadow: "0px 0px 3px rgb(198, 198, 198)", zIndex: 1}}
                >
                    <ToolsBar objectType={objectType}
                              setObjectType={setObjectType}
                              headerHeight={HEADER_HEIGHT}
                              gridIsVisible={gridIsVisible}
                              setGridIsVisible={setGridIsVisible}
                              project={project}
                              selectedObject={selectedObject}
                              startCreateObject={startCreateObject}
                              deleteObject={deleteObject}
                              editObject={editObject}
                              objects={objects}
                              nodes={nodes}
                              setConsumerDialogType={setConsumerDialogType}
                              setSupplierDialogType={setSupplierDialogType}
                              setNetworkDialogType={setNetworkDialogType}
                              setProducersDialogIsOpened={setProducersDialogIsOpened}
                              setNetworksTemplatesDialogIsOpened={setNetworksTemplatesDialogIsOpened}
                              setSuppliersTemplatesDialogIsOpened={setSuppliersTemplatesDialogIsOpened}
                              setModelSettingsIsOpened={setModelSettingsIsOpened}
                              currentPage={currentPage}
                              startDialog={startDialog}
                              setStartDialog={setStartDialog}
                              authDialog={authDialog}
                              setAuthDialog={setAuthDialog}
                              onUndo={onUndo}
                              onRedo={onRedo}
                              toaster={toaster}
                              resultsIsOpened={resultsIsOpened}
                              setResultsIsOpened={setResultsIsOpened}
                              isInspectionMode={isInspectionMode}
                              setIsInspectionMode={setIsInspectionMode}
                              mapImageAnalysisIsOpened={mapImageAnalysisIsOpened}
                              setMapImageAnalysisIsOpened={setMapImageAnalysisIsOpened}
                              mapImageShouldBeAnalyzed={mapImageShouldBeAnalyzed}
                              canvas={canvas}
                              projectHistory={projectHistory}
                              projectStateInHistoryIndex={projectStateInHistoryIndex}
                              setOpenProjectDialogIsOpened={setOpenProjectDialogIsOpened}
                              setSaveAsProjectDialogIsOpened={setSaveAsProjectDialogIsOpened}
                              setHelpDialogIsOpened={setHelpDialogIsOpened}
                              setLicenseDialogIsOpened={setLicenseDialogIsOpened}
                              setInfoDialogIsOpened={setInfoDialogIsOpened}
                    />
                </ReflexElement>

                {project && isAuth ? <ReflexElement>
                        <ReflexContainer orientation="vertical"
                                         windowResizeAware={true}>
                            <ReflexElement>
                                <Topology objectType={objectType}
                                          gridIsVisible={gridIsVisible}
                                          mapDistance={mapDistance}
                                          nodes={nodes}
                                          setObjectType={setObjectType}
                                          finishCreateObject={finishCreateObject}
                                          toasts={toasts}
                                          setToaster={setToaster}
                                          setSelectedObject={setSelectedObject}
                                          getSelectedNode={getSelectedNode}
                                          setObjectToDelete={setObjectToDelete}
                                          objectToDelete={objectToDelete}
                                          selectedObject={selectedObject}
                                          deleteObject={deleteObject}
                                          objects={objects}
                                          editObject={editObject}
                                          creatingObjectData={creatingObjectData}
                                          authDialog={authDialog}
                                          setAuthDialog={setAuthDialog}
                                          loadedProject={loadedProject}
                                          canvas={canvas}
                                          setCanvas={setCanvas}
                                          mapSize={mapSize}
                                          setMapSize={setMapSize}
                                          setProjectState={setProjectState}
                                          setProjectHistory={setProjectHistory}
                                          saveCanvasState={saveCanvasState}
                                          isInspectionMode={isInspectionMode}
                                          deleteNotCompletedObject={deleteNotCompletedObject}
                                          completeObject={completeObject}
                                          saveState={saveState}
                                />
                                <ConsumerDialog startCreateObject={startCreateObject}
                                                selectedObject={selectedObject}
                                                dialogIsOpened={consumerDialogType}
                                                setDialogIsOpened={setConsumerDialogType}
                                                updateNodeLabel={updateNodeLabel}
                                                canvas={canvas}
                                                createObjectFromAnalysis={createObjectFromAnalysis}
                                />

                                <SupplierDialog startCreateObject={startCreateObject}
                                                selectedObject={selectedObject}
                                                dialogIsOpened={supplierDialogType}
                                                setDialogIsOpened={setSupplierDialogType}
                                                updateNodeLabel={updateNodeLabel}
                                                canvas={canvas}
                                                createObjectFromAnalysis={createObjectFromAnalysis}
                                />

                                <NetworkDialog startCreateObject={startCreateObject}
                                               selectedObject={selectedObject}
                                               dialogIsOpened={networkDialogType}
                                               setDialogIsOpened={setNetworkDialogType}
                                               updateNodeLabel={updateNodeLabel}
                                               canvas={canvas}
                                />

                                <ProducersDialog dialogIsOpened={producersDialogIsOpened}
                                                 setDialogIsOpened={setProducersDialogIsOpened}
                                                 canvas={canvas}
                                                 saveCanvasState={saveCanvasState}
                                />

                                <NetworksTemplatesDialog dialogIsOpened={networksTemplatesDialogIsOpened}
                                                         setDialogIsOpened={setNetworksTemplatesDialogIsOpened}
                                                         canvas={canvas}
                                />

                                <SuppliersTemplatesDialog dialogIsOpened={suppliersTemplatesDialogIsOpened}
                                                          setDialogIsOpened={setSuppliersTemplatesDialogIsOpened}/>

                                <ModelSettings dialogIsOpened={modelSettingsIsOpened}
                                               setDialogIsOpened={setModelSettingsIsOpened}
                                />

                                <ResultsDialog dialogIsOpened={resultsIsOpened}
                                               setDialogIsOpened={setResultsIsOpened}
                                               height={resultsDialogSize.height - 50}
                                               width={resultsDialogSize.width - 50}
                                />

                                <MapImageAnalysisDialog dialogIsOpened={mapImageAnalysisIsOpened}
                                                        setDialogIsOpened={setMapImageAnalysisIsOpened}
                                                        height={resultsDialogSize.height - 70}
                                                        width={resultsDialogSize.width - 100}
                                                        saveAnalyzedObjects={saveAnalyzedObjects}
                                                        currentCanvasObjects={canvas ? canvas.getObjects() : []}
                                />

                                <AuthDialog startDialog={authDialog}
                                            setStartDialog={setAuthDialog}
                                />

                                <StartDialog startDialog={startDialog}
                                             setStartDialog={setStartDialog}
                                             canvas={canvas}
                                />

                                <OpenProjectDialog dialogIsOpened={openProjectDialogIsOpened}
                                                   setDialogIsOpened={setOpenProjectDialogIsOpened}
                                                   project={project}
                                />

                                <SaveAsProjectDialog dialogIsOpened={saveAsProjectDialogIsOpened}
                                                     setDialogIsOpened={setSaveAsProjectDialogIsOpened}
                                                     project={project}
                                                     canvas={canvas}
                                />

                                <HelpDialog dialogIsOpened={helpDialogIsOpened}
                                            setDialogIsOpened={setHelpDialogIsOpened}
                                />

                                <LicenseDialog dialogIsOpened={licenseDialogIsOpened}
                                               setDialogIsOpened={setLicenseDialogIsOpened}
                                />

                                <InfoDialog dialogIsOpened={infoDialogIsOpened}
                                            setDialogIsOpened={setInfoDialogIsOpened}
                                />

                                <InternetConnectionDialog dialogIsOpened={internetConnectionDialogIsOpened}
                                                          setDialogIsOpened={setInternetConnectionDialogIsOpened}
                                                          checkInternetConnection={checkInternetConnection}
                                />

                                <UpdateNotification isOpen={updateNotificationIsOpened}
                                                    updateNotificationData={updateNotificationData}/>
                                <UpdateDownloadedNotification isOpen={updateDownloadedNotificationIsOpened}/>

                                <Loading isOpen={projectIsCalculating || projectIsLoading}/>

                            </ReflexElement>
                        </ReflexContainer>

                    </ReflexElement>
                    :
                    <ReflexElement>
                        <Start startDialog={startDialog}
                               setStartDialog={setStartDialog}
                               authDialog={authDialog}
                               setAuthDialog={setAuthDialog}
                               openProjectDialogIsOpened={openProjectDialogIsOpened}
                               setOpenProjectDialogIsOpened={setOpenProjectDialogIsOpened}
                               helpDialogIsOpened={helpDialogIsOpened}
                               setHelpDialogIsOpened={setHelpDialogIsOpened}
                               licenseDialogIsOpened={licenseDialogIsOpened}
                               setLicenseDialogIsOpened={setLicenseDialogIsOpened}
                               infoDialogIsOpened={infoDialogIsOpened}
                               setInfoDialogIsOpened={setInfoDialogIsOpened}
                        />

                        <InternetConnectionDialog dialogIsOpened={internetConnectionDialogIsOpened}
                                                  setDialogIsOpened={setInternetConnectionDialogIsOpened}
                                                  checkInternetConnection={checkInternetConnection}
                        />

                        <UpdateNotification isOpen={updateNotificationIsOpened}
                                            updateNotificationData={updateNotificationData}/>
                        <UpdateDownloadedNotification isOpen={updateDownloadedNotificationIsOpened}/>

                        <Loading isOpen={!project && projectIsLoading}/>

                    </ReflexElement>
                }

            </ReflexContainer>
        </ResizeSensor>
    </div>
}




