import './App.css'
import React, {useCallback, useEffect, useState} from 'react'
import {fabric} from "fabric"
import {ReflexContainer, ReflexElement} from 'react-reflex'
import {ToolsBar} from "./components/common/ToolsBar/ToolsBar";
import {NavigationBar} from "./components/common/Navigation/NavigationBar";
import {Topology} from "./components/pages/Topology/Topology";
import {ContextMenu, Icon, Intent} from "@blueprintjs/core";
import {FaObjectUngroup} from 'react-icons/fa';
import {GiTeePipe, GiHouse, GiFactory} from 'react-icons/gi';
import {
    addObjectInTree,
    forEachNode, forEachNodeFilter,
    updateNodeProperty
} from "./components/pages/Topology/components/Canvas/helpers/tree-helper";
import {Start} from "./components/pages/Start/Start";
import {useDispatch, useSelector} from "react-redux";
import {setLoadedProjectId, successLogin} from "./redux/actions/auth";
import {generateId} from "./helpers/data-helper";
import Consumer from "./objects/consumer";
import {
    addNewConsumer,
    addNewNetwork,
    addNewSupplier, setCanvasState, setNodes,
    setObjects, setProject,
} from "./redux/actions/project";
import Supplier from "./objects/supplier";
import HeatNetwork from "./objects/heat-network";
import {BrowserRouter, Route} from "react-router-dom";
import {Redirect} from "react-router";
import {ObjectContextMenu} from "./components/common/ContextMenu/ObjectContextMenu";
import {ConsumerDialog} from "./components/common/ToolsBar/components/ConsumerDialog";
import {SupplierDialog} from "./components/common/ToolsBar/components/SupplierDialog";
import {NetworkDialog} from "./components/common/ToolsBar/components/NetworkDialog";
import {ProducersDialog} from "./components/common/ToolsBar/components/ProducersDialog";
import {NetworksTemplatesDialog} from "./components/common/ToolsBar/components/NetworksTemplatesDialog";
import {SuppliersTemplatesDialog} from "./components/common/ToolsBar/components/SuppliersTemplatesDialog";
import {ModelSettings} from "./components/common/ToolsBar/components/ModelSettings";
import {AuthDialog} from "./components/common/Authentication/AuthDialog";
import {handleObjectSelection} from "./components/pages/Topology/components/Canvas/helpers/canvas-helper";

const HEADER_HEIGHT = 50
//const LEFT_MENU_WIDTH = 134
//const FOOTER_HEIGHT = 50

let creatingObjectData = null
let currentToaster = null
let currentProject = null

export const App = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        const user = localStorage.getItem('user')

        if (user) {
            dispatch(successLogin(JSON.parse(user).data.user))
        }
    }, [])


    const project = useSelector(state => state.project)

    useEffect(() => {
        currentProject = project
    }, [project])

    const objects = useSelector(state => state.project && state.project.objects)
    const nodes = useSelector(state => state.project && state.project.nodes)
    const networkTemplates = useSelector(state => state.project && state.project.templates.networks)
    const isAuth = useSelector(state => state.auth.isAuth)
    const loadedProject = useSelector(state => state.auth.loadedProject)
    //console.log(objects)

    useEffect(() => {
        if (canvas && loadedProject) {
            canvas.clear()
            setEnlivenObjects(canvas, project.canvas.objects)
            setNodes(project.nodes)
            setProjectState(project)
            dispatch(setLoadedProjectId(null))
        }
    }, [loadedProject])

    const producers = useSelector(state => state.project && state.project.objects.producers)
    const mapDistance = useSelector(state => state.project && state.project.map.mapDistance)

    const [startDialog, setStartDialog] = useState(false)
    const [authDialog, setAuthDialog] = useState(false)

    const [objectType, setObjectType] = useState("none")
    const [selectedObject, setSelectedObject] = useState(null)
    const [currentPage, setCurrentPage] = useState("topology")
    const [gridIsVisible, setGridIsVisible] = useState(false)

    const [toasts, setToasts] = useState([])
    const [toaster, setToaster] = useState(null)

    const [canvas, setCanvas] = useState(null)
    const [projectHistory, setProjectHistory] = useState([project])
    const [projectState, setProjectState] = useState(project)

    const [mapSize, setMapSize] = useState({width: 2000, height: 2000})

    const [objectToDelete, setObjectToDelete] = useState(null)

    const [consumerDialogType, setConsumerDialogType] = useState(null)
    const [supplierDialogType, setSupplierDialogType] = useState(null)
    const [networkDialogType, setNetworkDialogType] = useState(null)
    const [producersDialogIsOpened, setProducersDialogIsOpened] = useState(false)
    const [networksTemplatesDialogIsOpened, setNetworksTemplatesDialogIsOpened] = useState(false)
    const [suppliersTemplatesDialogIsOpened, setSuppliersTemplatesDialogIsOpened] = useState(false)
    const [modelSettingsIsOpened, setModelSettingsIsOpened] = useState(false)

    const saveState = () => {
        setProjectState(currentProject)
        setProjectHistory(history => [...history, currentProject].slice(-4))
    }

    const saveCanvasState = (canvas) => {
        const canvasState = canvas.toJSON(["circle1", "circle2", "objectType", "id", "networkType", "distance", "name", "connectedTo", "networkIsNew"])
        dispatch(setCanvasState(canvasState))
    }

    const getSelectedNode = (node, e, isRightClick) => {
        if (node.objectType !== undefined) {
            const selectedObjectNode = canvas.getObjects().find(object => object.id === node.id)

            const newSelectedObject = handleObjectSelection(canvas, selectedObjectNode, selectedObject)
            setSelectedObject(newSelectedObject)

            if (isRightClick) {
                ContextMenu.show(
                    <ObjectContextMenu selectedObject={selectedObjectNode} deleteObject={deleteObject}
                                       objects={objects} nodes={nodes} editObject={editObject} canvas={canvas}/>,
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

    const unselectAllNodes = () => {
        return forEachNode(nodes, n => (n.isSelected = false))
    }

    const getSelectedTreeNode = (object) => {
        const unselectedNodes = unselectAllNodes()
        return updateNodeProperty(unselectedNodes, object.id, "isSelected", true)
    }

    useEffect(() => {
        if (selectedObject) {
            const newNodes = getSelectedTreeNode(selectedObject)
            dispatch(setNodes(newNodes))
        } else {
            const newNodes = unselectAllNodes()
            dispatch(setNodes(newNodes))
        }
    }, [selectedObject])

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

        saveCanvasState(canvas)
        saveState()

        currentToaster.show({message: `Object "${objectType}" created!`, intent: Intent.SUCCESS, timeout: 3000});

        creatingObjectData = null
    }

    const updateNodeLabel = (id, name) => {
        const newNodes = updateNodeProperty(nodes, id, "label", name)
        dispatch(setNodes(newNodes))
    }

    const setEnlivenObjects = (canvas, objects) => {

        fabric.util.enlivenObjects(objects, function (objs) {
            objs.forEach(function (o) {
                o.hasBorders = false
                o.hasControls = false
                o.perPixelTargetFind = true
                if (o.type === "polygon" || o.type === "line") {

                    if (o.type === "line") {
                        o.set({
                            x1: o.left + o.x1,
                            x2: o.left + o.x2,
                            y1: o.top + o.y1,
                            y2: o.top + o.y2,
                        })
                    }

                    objs.forEach(object => {
                        if (object.type === "circle" && object.id === o.id) {


                            if (o.type === "polygon") object.evented = false

                            if (object.name === "start") {
                                o.circle1 = object
                            } else if (object.name === "end") {
                                o.circle2 = object
                            }
                        }
                    })

                    canvas.add(o)
                    canvas.add(o.circle1)
                    canvas.add(o.circle2)
                } else if (o.type === "image") {
                    o.evented = false
                    canvas.add(o)
                }
                o.setCoords()
            });

            canvas.renderAll()

            setObjectType("none")
        });
    }

    const moveHistory = useCallback(
        step => {
            const currentStateIndex = projectHistory.indexOf(projectState);
            const prevState = projectHistory[currentStateIndex + step]

            if (prevState && prevState.canvas.objects.length > 0) {
                dispatch(setProject(prevState))
                //console.log(prevState.canvas)
                setProjectState(prevState)
                canvas.clear()
                setEnlivenObjects(canvas, prevState.canvas.objects)
                setNodes(prevState.nodes)
            }
        },
        [canvas, projectState, projectHistory, setProjectState]
    );

    const onUndo = useCallback(() => moveHistory(-1), [moveHistory]);

    const onRedo = useCallback(() => moveHistory(1), [moveHistory]);

    return <div className="App">
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
                />
            </ReflexElement>


            {project && isAuth ? <ReflexElement>
                    <BrowserRouter>
                        <ReflexContainer orientation="vertical"
                                         windowResizeAware={true}
                        >
                            {/*<ReflexElement className="left-pane"*/}
                            {/*               size={LEFT_MENU_WIDTH}*/}
                            {/*               minSize={LEFT_MENU_WIDTH}*/}
                            {/*               maxSize={LEFT_MENU_WIDTH}*/}
                            {/*               style={{borderRight: "4px solid #eceff1"}}*/}
                            {/*>*/}
                            {/*    <NavigationBar currentPage={currentPage}*/}
                            {/*                   setCurrentPage={setCurrentPage}*/}
                            {/*    />*/}
                            {/*</ReflexElement>*/}

                            <ReflexElement>

                                <Route
                                    exact
                                    path="/"
                                    render={() => {
                                        return <Redirect to="/topology"/>
                                    }}
                                />
                                <Route path="/topology">
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
                                    />
                                    <ConsumerDialog startCreateObject={startCreateObject}
                                                    selectedObject={selectedObject}
                                                    dialogIsOpened={consumerDialogType}
                                                    setDialogIsOpened={setConsumerDialogType}
                                                    updateNodeLabel={updateNodeLabel}
                                                    canvas={canvas}
                                    />

                                    <SupplierDialog startCreateObject={startCreateObject}
                                                    selectedObject={selectedObject}
                                                    dialogIsOpened={supplierDialogType}
                                                    setDialogIsOpened={setSupplierDialogType}
                                                    updateNodeLabel={updateNodeLabel}
                                                    canvas={canvas}
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

                                    <AuthDialog startDialog={authDialog}
                                                setStartDialog={setAuthDialog}
                                    />
                                </Route>
                                <Route path="/results">

                                </Route>
                            </ReflexElement>
                        </ReflexContainer>
                    </BrowserRouter>
                </ReflexElement>
                :
                <ReflexElement>
                    <Start startDialog={startDialog}
                           setStartDialog={setStartDialog}
                           authDialog={authDialog}
                           setAuthDialog={setAuthDialog}/>
                </ReflexElement>
            }
        </ReflexContainer>
    </div>
}



