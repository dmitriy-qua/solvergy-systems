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
    Classes, Icon,
    Navbar,
    NavbarDivider,
    NavbarGroup,
    NavbarHeading,
} from "@blueprintjs/core";
import {createUseStyles} from 'react-jss'

import './App.css'
import {NavigationButton} from "./components/common/NavigationButton";
import {ObjectsTree} from "./components/ObjectsTree/ObjectsTree";
import MaterialIcon from "@mdi/react";
import {mdiFolder, mdiFolderPlusOutline} from "@mdi/js";
import { FaMap } from 'react-icons/fa';

const {dialog} = window.require('electron').remote;
const path = require('path');

const {app} = window.require('electron').remote;
console.log(app.getAppPath());

const HEADER_HEIGHT = 50
const FOOTER_HEIGHT = 50
const LEFT_MENU_WIDTH = 130

function App() {

    const styles = useStyles()

    const [figureType, setFigureType] = useState("none")
    const [currentPage, setCurrentPage] = useState("canvas")
    const [treeWidth, setTreeWidth] = useState(250)
    const [map, setMap] = useState(false)

    const setMapBackground = () => {
        // dialog.showOpenDialog({
        //     filters: [{ name: 'Images', extensions: ['jpg', 'png', 'gif'] }],
        //     properties: ['openFile']
        // }).then((filesName) => {
        //     if (filesName) {
        //         const normalizedFilePath = filesName.filePaths[0].replace(/\\/g, '/')
        //         setMap(normalizedFilePath)
        //     }
        // });

        setMap(prevState => !prevState)

    }

    return <div className="App">
        <ReflexContainer orientation="horizontal" windowResizeAware={true}>
            <ReflexElement className="header"
                           size={HEADER_HEIGHT}
                           minSize={HEADER_HEIGHT}
                           maxSize={HEADER_HEIGHT}
                           style={{boxShadow: "0px 0px 3px rgb(198, 198, 198)", zIndex: 1}}>
                <div className="pane-content">
                    <Navbar style={{height: HEADER_HEIGHT}}>
                        <NavbarGroup align={Alignment.LEFT} style={{height: HEADER_HEIGHT}}>
                            {/*<NavbarHeading className={styles.headerText}>Solvergy: Systems</NavbarHeading>*/}
                            {/*<NavbarDivider/>*/}
                            <Button className={[Classes.MINIMAL, styles.menuItemText]} icon={<Icon icon={<MaterialIcon path={mdiFolderPlusOutline} className={"bp3-icon material-icon"}/>} />} text="Home"/>
                            <Button className={[Classes.MINIMAL, styles.menuItemText]} icon="document" text="Files"/>
                            <Button className={[Classes.MINIMAL, styles.menuItemText]} icon="new-layers"
                                    text="New node"/>
                            <NavbarDivider/>
                            <Button icon={<Icon icon={<MaterialIcon path={mdiFolder} className={"bp3-icon material-icon"}/>} />} className={[Classes.MINIMAL, styles.shapeButton]}
                                    onClick={() => setFigureType("line")}/>
                            <Button icon="polygon-filter" className={[Classes.MINIMAL, styles.shapeButton]}
                                    onClick={() => setFigureType("polygon")}/>
                            <Button icon="cross" className={[Classes.MINIMAL, styles.shapeButton]}
                                    onClick={() => setFigureType("none")}/>
                        </NavbarGroup>
                    </Navbar>
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
                                              icon={<Icon icon={<MaterialIcon path={mdiFolder} className={"material-icon"}/>} />}
                            />
                            <NavigationButton currentPage={currentPage}
                                              setCurrentPage={setCurrentPage}
                                              pageName={"settings"}
                                              label={"Settings"}
                                              icon={<Icon icon={<MaterialIcon path={mdiFolder} className={"material-icon"}/>} />}
                            />
                        </div>
                    </ReflexElement>

                    {currentPage === "canvas" && <ReflexElement>
                        <ReflexContainer orientation="vertical" windowResizeAware={true}>
                            <ReflexElement className="middle-pane" style={{overflow: "hidden"}}>
                                <div className="pane-content">
                                    <Canvas figureType={figureType} map={map}/>
                                </div>
                            </ReflexElement>

                            <ReflexSplitter style={{backgroundColor: "#eceff1", width: 4, border: 0}}
                            />

                            <ReflexElement className="right-pane"
                                           minSize="230"
                                           maxSize="300"
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
            <ReflexElement className="footer"
                           size={FOOTER_HEIGHT}
                           minSize={FOOTER_HEIGHT}
                           maxSize={FOOTER_HEIGHT}
                           style={{boxShadow: "0px 0px 3px rgb(198, 198, 198)", display: "flex", alignItems: "center"}}>
                <div className="pane-content">
                    <Button active={map} icon={<Icon icon={<FaMap size={16} className={"bp3-icon material-icon"}/>} />} className={[Classes.MINIMAL, styles.shapeButton]} onClick={setMapBackground}/>
                    {/*<Button icon="polygon-filter" className={[Classes.MINIMAL, styles.shapeButton]} onClick={() => setFigureType("polygon")}/>*/}
                    {/*<Button icon="cross" className={[Classes.MINIMAL, styles.shapeButton]} onClick={() => setFigureType("none")}/>*/}
                </div>
            </ReflexElement>
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
    shapeButton: {
        marginLeft: 12
    }
})

export default App;
