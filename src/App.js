import React, {useEffect, useState} from 'react'
import {Canvas} from "./components/Canvas/Canvas"
import $ from "jquery"
import {
    ReflexContainer,
    ReflexSplitter,
    ReflexElement
} from 'react-reflex'

import {
    Alignment,
    Button,
    Classes,
    Navbar,
    NavbarDivider,
    NavbarGroup,
    NavbarHeading, Tree,
} from "@blueprintjs/core";
import {createUseStyles} from 'react-jss'

import './App.css'
import {NavigationButton} from "./components/common/NavigationButton";
import {ObjectsTree} from "./components/ObjectsTree/ObjectsTree";

const HEADER_HEIGHT = 50
const FOOTER_HEIGHT = 50
const LEFT_MENU_WIDTH = 150

function App() {

    const styles = useStyles()

    const [figureType, setFigureType] = useState("none")
    const [currentPage, setCurrentPage] = useState("canvas")

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
                            <NavbarHeading className={styles.headerText}>Solvergy: Systems</NavbarHeading>
                            <NavbarDivider/>
                            <Button className={[Classes.MINIMAL, styles.menuItemText]} icon="home" text="Home"/>
                            <Button className={[Classes.MINIMAL, styles.menuItemText]} icon="document" text="Files"/>
                            <Button className={[Classes.MINIMAL, styles.menuItemText]} icon="new-layers" text="New node"/>
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
                                   style={{borderRight: "4px solid #f0f0f0"}}
                    >
                        <div className="pane-content">
                            <NavigationButton currentPage={currentPage}
                                              setCurrentPage={setCurrentPage}
                                              pageName={"canvas"}
                                              label={"Canvas"}
                                              icon={"map-create"}
                            />
                            <NavigationButton currentPage={currentPage}
                                              setCurrentPage={setCurrentPage}
                                              pageName={"settings"}
                                              label={"Settings"}
                                              icon={"cog"}
                            />
                        </div>
                    </ReflexElement>

                    <ReflexElement className="middle-pane" style={{overflow: "hidden"}}>
                        <div className="pane-content">
                            {currentPage === "canvas" && <Canvas figureType={figureType}/>}

                        </div>
                    </ReflexElement>

                    <ReflexSplitter style={{backgroundColor: "#efefef", width: 4, border: 0}}/>

                    <ReflexElement className="right-pane"
                                   minSize="200"
                                   maxSize="300"
                    >
                        <div className="pane-content">
                            <ObjectsTree/>
                        </div>
                    </ReflexElement>
                </ReflexContainer>
            </ReflexElement>
            <ReflexElement className="footer"
                           size={FOOTER_HEIGHT}
                           minSize={FOOTER_HEIGHT}
                           maxSize={FOOTER_HEIGHT}
                           style={{boxShadow: "0px 0px 3px rgb(198, 198, 198)", display: "flex", alignItems: "center"}}>
                <div className="pane-content">
                    <Button icon="layout-linear" className={styles.shapeButton} onClick={() => setFigureType("line")}/>
                    <Button icon="polygon-filter" className={styles.shapeButton} onClick={() => setFigureType("polygon")}/>
                    <Button icon="cross" className={styles.shapeButton} onClick={() => setFigureType("none")}/>
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
        fontSize: 12,
        fontFamily: 'Montserrat'
    },
    shapeButton: {
        marginLeft: 12
    }
})

export default App;
