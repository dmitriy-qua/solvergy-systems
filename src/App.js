import React, {useEffect, useState} from 'react'
import {Canvas} from "./components/Canvas/Canvas"
import {
    ReflexContainer,
    ReflexSplitter,
    ReflexElement
} from 'react-reflex'

import {
    Alignment,
    Button,
    Classes,
    Dialog,
    Icon,
    Intent,
    Navbar,
    NavbarDivider,
    NavbarGroup,
    NumericInput,
} from "@blueprintjs/core";
import {createUseStyles} from 'react-jss'

import './App.css'
import {NavigationButton} from "./components/common/NavigationButton";
import {ObjectsTree} from "./components/Canvas/components/ObjectsTree";
import MaterialIcon from "@mdi/react";
import {mdiFolder} from "@mdi/js";
import {TopNavigationBar} from "./components/common/TopNavigationBar";

//const {dialog} = window.require('electron').remote;

const HEADER_HEIGHT = 50
//const FOOTER_HEIGHT = 50
const LEFT_MENU_WIDTH = 130

function App() {

    const styles = useStyles()

    const [figureType, setFigureType] = useState("none")
    const [currentPage, setCurrentPage] = useState("canvas")
    const [treeWidth, setTreeWidth] = useState(250)
    const [mapIsVisible, setMapIsVisible] = useState(false)
    const [mapDistance, setMapDistance] = useState(null)
    const [mapDistanceDialog, setMapDistanceDialog] = useState(false)

    const [consumers, setConsumers] = useState([])
    const [suppliers, setSuppliers] = useState([])
    const [networks, setNetworks] = useState([])


    const openMapSelectDialog = () => {
        // dialog.showOpenDialog({
        //     filters: [{ name: 'Images', extensions: ['jpg', 'png', 'gif'] }],
        //     properties: ['openFile']
        // }).then((filesName) => {
        //     if (filesName) {
        //         const normalizedFilePath = filesName.filePaths[0].replace(/\\/g, '/')
        //         setMap(normalizedFilePath)
        //     }
        // });
    }

    return <div className="App">
        <ReflexContainer orientation="horizontal" windowResizeAware={true}>
            <ReflexElement className="header"
                           size={HEADER_HEIGHT}
                           minSize={HEADER_HEIGHT}
                           maxSize={HEADER_HEIGHT}
                           style={{boxShadow: "0px 0px 3px rgb(198, 198, 198)", zIndex: 1}}>
                <div className="pane-content">
                    <TopNavigationBar setFigureType={setFigureType}
                                      headerHeight={HEADER_HEIGHT}
                                      mapIsVisible={mapIsVisible}
                                      setMapIsVisible={setMapIsVisible}
                                      mapDistanceDialog={mapDistanceDialog}
                                      setMapDistanceDialog={setMapDistanceDialog}
                                      mapDistance={mapDistance}
                                      setMapDistance={setMapDistance}
                    />
                </div>
            </ReflexElement>
            <ReflexElement>
                <ReflexContainer orientation="vertical" windowResizeAware={true}>
                    <ReflexElement className="left-pane"
                                   size={LEFT_MENU_WIDTH}
                                   minSize={LEFT_MENU_WIDTH}
                                   maxSize={LEFT_MENU_WIDTH}
                                   style={{borderRight: "4px solid #eceff1"}}
                    >
                        <div className="pane-content">
                            <NavigationButton currentPage={currentPage}
                                              setCurrentPage={setCurrentPage}
                                              pageName={"canvas"}
                                              label={"Canvas"}
                                              icon={<Icon
                                                  icon={<MaterialIcon path={mdiFolder} className={"material-icon"}/>}/>}
                            />
                            <NavigationButton currentPage={currentPage}
                                              setCurrentPage={setCurrentPage}
                                              pageName={"settings"}
                                              label={"Settings"}
                                              icon={<Icon
                                                  icon={<MaterialIcon path={mdiFolder} className={"material-icon"}/>}/>}
                            />
                        </div>
                    </ReflexElement>

                    {currentPage === "canvas" && <ReflexElement>
                        <ReflexContainer orientation="vertical" windowResizeAware={true}>
                            <ReflexElement className="middle-pane" style={{overflow: "hidden"}}>
                                <div className="pane-content">
                                    <Canvas figureType={figureType} mapIsVisible={mapIsVisible} map_Distance={mapDistance}/>
                                </div>
                            </ReflexElement>

                            <ReflexSplitter style={{backgroundColor: "#eceff1", width: 4, border: 0, zIndex: 0}}
                            />

                            <ReflexElement className="right-pane"
                                           minSize="230"
                                           maxSize="350"
                                           size={treeWidth}
                                           onStopResize={({domElement}) => setTreeWidth(domElement.offsetWidth)}
                            >
                                <div className="pane-content">
                                    <ObjectsTree/>
                                </div>
                            </ReflexElement>
                        </ReflexContainer>
                    </ReflexElement>
                    }

                    {currentPage === "settings" && <ReflexElement>
                        <ReflexContainer orientation="vertical" windowResizeAware={true}>

                        </ReflexContainer>
                    </ReflexElement>
                    }
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

const useStyles = createUseStyles({
    headerText: {
        fontWeight: 600,
        fontSize: 14,
        fontFamily: 'Montserrat'
    },
    menuItemText: {
        fontSize: 13,
        fontWeight: 500,
        fontFamily: 'Montserrat',
    },
})

export default App;
