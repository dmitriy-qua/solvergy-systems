import './App.css'
import React, {useEffect, useState} from 'react'
import {ReflexContainer, ReflexElement} from 'react-reflex'
import {ToolsBar} from "./components/common/ToolsBar/ToolsBar";
import {NavigationBar} from "./components/common/Navigation/NavigationBar";
import {Topology} from "./components/pages/Topology/Topology";
import {Icon, Intent} from "@blueprintjs/core";
import {FaObjectUngroup} from 'react-icons/fa';
import {GiTeePipe, GiHouse, GiFactory} from 'react-icons/gi';
import {
    addObjectInTree,
    forEachNode,
    updateNodeProperty
} from "./components/pages/Topology/components/Canvas/helpers/tree-helper";
import {Start} from "./components/pages/Start/Start";
import {useDispatch, useSelector} from "react-redux";
import {successLogin} from "./redux/actions/auth";
import {generateId} from "./helpers/data-helper";
import Consumer from "./objects/consumer";
import {addNewConsumer, addNewNetwork, addNewSupplier} from "./redux/actions/project";
import Supplier from "./objects/supplier";
import HeatNetwork from "./objects/heat-network";
import {BrowserRouter, Route} from "react-router-dom";
import {Redirect} from "react-router";

const HEADER_HEIGHT = 50
const LEFT_MENU_WIDTH = 130
//const FOOTER_HEIGHT = 50

let creatingObjectData = null
let currentToaster = null
let selectedObjectUnhook = null
let nodesUnhook = null

export const App = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        const user = localStorage.getItem('user')

        if (user) {
            dispatch(successLogin(JSON.parse(user).data.user))
        }
    }, [])


    const project = useSelector(state => state.project.project)

    const producers = useSelector(state => state.project.project && state.project.project.objects.producers)
    const consumers = useSelector(state => state.project.project && state.project.project.objects.consumers)
    const mapDistance = useSelector(state => state.project.project && state.project.project.map.mapDistance)

    const [objectType, setObjectType] = useState("none")
    const [selectedObject, setSelectedObject] = useState(null)
    const [currentPage, setCurrentPage] = useState("topology")
    const [gridIsVisible, setGridIsVisible] = useState(false)

    const [toasts, setToasts] = useState([])
    const [toaster, setToaster] = useState(null)

    const [nodes, setNodes] = useState(initialNodes)

    const selectObject = (object) => {

        //unselectAllNodes()

        if (selectedObjectUnhook) {
            selectedObjectUnhook.set({
                stroke: "#333333"
            })
        }

        if (object) {
            object.set({
                stroke: "red"
            })

        }

        selectedObjectUnhook = object
        setSelectedObject(object)

        //console.log(selectedObjectUnhook)
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
            setNodes(newNodes)
        } else {
            const newNodes = unselectAllNodes()
            setNodes(newNodes)
        }
    }, [selectedObject])

    const startCreateObject = (objectType, name, properties) => {
        const id = objectType + "_" + generateId()

        toaster.show({message: `Start drawing "${objectType}".`, intent: Intent.PRIMARY, timeout: 3000});
        currentToaster = toaster

        switch (objectType) {
            case "consumer":
                creatingObjectData = {id, name, consumption: properties.consumption}
                break
            case "supplier":
                creatingObjectData = {id, name, producerId: properties.producerId}
                break
            case "network":
                creatingObjectData = {id, name, templateId: properties.templateId}
                break
            default:
                break
        }

        setObjectType(objectType)
    }

    const finishCreateObject = (objectType, shape) => {

        currentToaster.show({message: `Object "${objectType}" created!`, intent: Intent.SUCCESS, timeout: 3000});

        shape.set({id: creatingObjectData.id})

        switch (objectType) {
            case "consumer":
                const consumer = new Consumer(creatingObjectData.id, creatingObjectData.name, shape, "manual", creatingObjectData.consumption, "Gcal")
                dispatch(addNewConsumer(consumer))
                setNodes(addObjectInTree(objectType, creatingObjectData.name, creatingObjectData.id))
                break
            case "supplier":
                const supplier = new Supplier(creatingObjectData.id, creatingObjectData.name, shape, creatingObjectData.producerId)
                const producer = producers.find(producer => producer.id === creatingObjectData.producerId)
                dispatch(addNewSupplier(supplier))
                setNodes(addObjectInTree(objectType, creatingObjectData.name, creatingObjectData.id, producer.name))
                break
            case "network":
                const network = new HeatNetwork(creatingObjectData.id, creatingObjectData.name, shape, creatingObjectData.templateId)
                dispatch(addNewNetwork(network))
                setNodes(addObjectInTree(objectType, creatingObjectData.name, creatingObjectData.id))
                break
            default:
                break
        }

        creatingObjectData = null
    }

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
                />
            </ReflexElement>


            {project ? <ReflexElement>
                    <BrowserRouter>
                        <ReflexContainer orientation="vertical"
                                         windowResizeAware={true}
                        >
                            <ReflexElement className="left-pane"
                                           size={LEFT_MENU_WIDTH}
                                           minSize={LEFT_MENU_WIDTH}
                                           maxSize={LEFT_MENU_WIDTH}
                                           style={{borderRight: "4px solid #eceff1"}}
                            >
                                <NavigationBar currentPage={currentPage}
                                               setCurrentPage={setCurrentPage}
                                />
                            </ReflexElement>

                            <ReflexElement>

                                <Route
                                    exact
                                    path="/"
                                    render={() => <Redirect to="/topology"/>}
                                />
                                <Route path="/topology">
                                    <Topology objectType={objectType}
                                              gridIsVisible={gridIsVisible}
                                              mapDistance={mapDistance}
                                              nodes={nodes}
                                              setNodes={setNodes}
                                              setObjectType={setObjectType}
                                              finishCreateObject={finishCreateObject}
                                              toasts={toasts}
                                              setToaster={setToaster}
                                              selectObject={selectObject}
                                    />
                                </Route>
                                <Route path="/settings">
                                    <ReflexElement>
                                        <ReflexContainer orientation="vertical" windowResizeAware={true}>

                                        </ReflexContainer>
                                    </ReflexElement>
                                </Route>
                            </ReflexElement>
                        </ReflexContainer>
                    </BrowserRouter>
                </ReflexElement>
                :
                <ReflexElement>
                    <Start/>
                </ReflexElement>
            }

            {/*<ReflexElement className="footer"*/}
            {/*               size={FOOTER_HEIGHT}*/}
            {/*               minSize={FOOTER_HEIGHT}*/}
            {/*               maxSize={FOOTER_HEIGHT}*/}
            {/*               style={{boxShadow: "0px 0px 3px rgb(198, 198, 198)", display: "flex", alignItems: "center"}}>*/}
            {/*    <div className="pane-content">*/}

            {/*    </div>*/}
            {/*</ReflexElement>*/}
        </ReflexContainer>
    </div>
}

const initialNodes = [
    {
        id: "objects",
        hasCaret: true,
        isExpanded: false,
        secondaryLabel: <Icon icon={<FaObjectUngroup size={16} className={"bp3-icon material-icon-tree"}/>}/>,
        label: "System objects",
        childNodes: [
            {
                id: "consumer",
                hasCaret: true,
                isExpanded: false,
                disabled: true,
                secondaryLabel: <Icon icon={<GiHouse size={16} className={"bp3-icon material-icon-tree"}/>}/>,
                label: "Consumers",
                childNodes: [],
            },
            {
                id: "supplier",
                hasCaret: true,
                isExpanded: false,
                disabled: true,
                secondaryLabel: <Icon icon={<GiFactory size={16} className={"bp3-icon material-icon-tree"}/>}/>,
                label: "Suppliers",
                childNodes: [],
            },
            {
                id: "network",
                hasCaret: true,
                isExpanded: false,
                disabled: true,
                secondaryLabel: <Icon icon={<GiTeePipe size={16} className={"bp3-icon material-icon-tree"}/>}/>,
                label: "Networks",
                childNodes: [],
            },
        ],
    },
];

