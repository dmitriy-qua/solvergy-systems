import './App.css'
import React, {useState} from 'react'
import {ReflexContainer, ReflexElement} from 'react-reflex'
import {ToolsBar} from "./components/common/ToolsBar/ToolsBar";
import {NavigationBar} from "./components/common/Navigation/NavigationBar";
import {Topology} from "./components/pages/Topology/Topology";
import {Icon} from "@blueprintjs/core";
import {FaObjectUngroup} from 'react-icons/fa';
import {GiTeePipe, GiHouse, GiFactory} from 'react-icons/gi';
import {addObjectInTree} from "./components/pages/Topology/components/Canvas/helpers/tree-helper";
import {Start} from "./components/pages/Start/Start";

const HEADER_HEIGHT = 50
const LEFT_MENU_WIDTH = 130
//const FOOTER_HEIGHT = 50

export const App = () => {

    const [objectType, setObjectType] = useState("none")
    const [currentPage, setCurrentPage] = useState("topology")
    const [mapIsVisible, setMapIsVisible] = useState(false)
    const [mapDistance, setMapDistance] = useState(300)
    const [mapDistanceDialog, setMapDistanceDialog] = useState(false)

    const [objects, setObjects] = useState({
        consumers: [],
        suppliers: [],
        networks: []
    })

    const [nodes, setNodes] = useState(initialNodes)
    const [project, setProject] = useState(null)

    const createTreeNode = (objectType, objectName) => {
        setNodes(addObjectInTree(objectType, objectName))
    }

    return <div className="App">
        <ReflexContainer orientation="horizontal" windowResizeAware={true}>

            <ReflexElement className="header"
                           size={HEADER_HEIGHT}
                           minSize={HEADER_HEIGHT}
                           maxSize={HEADER_HEIGHT}
                           style={{boxShadow: "0px 0px 3px rgb(198, 198, 198)", zIndex: 1}}
            >
                <ToolsBar setObjectType={setObjectType}
                          headerHeight={HEADER_HEIGHT}
                          mapIsVisible={mapIsVisible}
                          setMapIsVisible={setMapIsVisible}
                          mapDistanceDialog={mapDistanceDialog}
                          setMapDistanceDialog={setMapDistanceDialog}
                          mapDistance={mapDistance}
                          setMapDistance={setMapDistance}
                          createTreeNode={createTreeNode}
                          project={project}
                />
            </ReflexElement>


            {project ? <ReflexElement>
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

                    {currentPage === "topology" && <ReflexElement>
                        <Topology objectType={objectType}
                                  mapIsVisible={mapIsVisible}
                                  mapDistance={mapDistance}
                                  nodes={nodes}
                                  setNodes={setNodes}
                                  objects={objects}
                                  setObjects={setObjects}
                                  setObjectType={setObjectType}
                        />
                    </ReflexElement>}

                    {currentPage === "settings" && <ReflexElement>
                        <ReflexContainer orientation="vertical" windowResizeAware={true}>

                        </ReflexContainer>
                    </ReflexElement>}
                </ReflexContainer>
            </ReflexElement>
                :
                <Start setProject={setProject}/>
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

