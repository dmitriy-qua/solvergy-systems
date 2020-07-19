import './App.css'
import React, {useState} from 'react'
import {ReflexContainer, ReflexElement} from 'react-reflex'
import {ToolsBar} from "./components/common/ToolsBar/ToolsBar";
import {NavigationBar} from "./components/common/Navigation/NavigationBar";
import {Topology} from "./components/pages/Topology/Topology";

const HEADER_HEIGHT = 50
const LEFT_MENU_WIDTH = 130
//const FOOTER_HEIGHT = 50

export const App = () => {

    const [figureType, setFigureType] = useState("none")
    const [currentPage, setCurrentPage] = useState("canvas")
    const [mapIsVisible, setMapIsVisible] = useState(false)
    const [mapDistance, setMapDistance] = useState(null)
    const [mapDistanceDialog, setMapDistanceDialog] = useState(false)

    const [consumers, setConsumers] = useState([])
    const [suppliers, setSuppliers] = useState([])
    const [networks, setNetworks] = useState([])

    return <div className="App">
        <ReflexContainer orientation="horizontal" windowResizeAware={true}>

            <ReflexElement className="header"
                           size={HEADER_HEIGHT}
                           minSize={HEADER_HEIGHT}
                           maxSize={HEADER_HEIGHT}
                           style={{boxShadow: "0px 0px 3px rgb(198, 198, 198)", zIndex: 1}}
            >
                <ToolsBar setFigureType={setFigureType}
                          headerHeight={HEADER_HEIGHT}
                          mapIsVisible={mapIsVisible}
                          setMapIsVisible={setMapIsVisible}
                          mapDistanceDialog={mapDistanceDialog}
                          setMapDistanceDialog={setMapDistanceDialog}
                          mapDistance={mapDistance}
                          setMapDistance={setMapDistance}
                />
            </ReflexElement>

            <ReflexElement>
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

                    {currentPage === "canvas" && <ReflexElement>
                        <Topology figureType={figureType}
                                  mapIsVisible={mapIsVisible}
                                  mapDistance={mapDistance}
                        />
                    </ReflexElement>}

                    {currentPage === "settings" && <ReflexElement>
                        <ReflexContainer orientation="vertical" windowResizeAware={true}>

                        </ReflexContainer>
                    </ReflexElement>}
                </ReflexContainer>
            </ReflexElement>

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

