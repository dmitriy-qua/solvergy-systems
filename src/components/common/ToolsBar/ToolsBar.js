import React, {useState} from "react";
import {
    Alignment,
    Button,
    Classes,
    Icon, Intent, Menu, MenuDivider, MenuItem,
    Navbar,
    NavbarDivider,
    NavbarGroup,
    Popover, Tooltip, Position
} from "@blueprintjs/core";
import {createUseStyles} from "react-jss";
import {
    FaRedo,
    FaFolder,
    FaSave,
    FaBoxes,
    FaDoorOpen,
    FaUndo,
    FaObjectUngroup,
    FaTrashAlt,
    FaPencilAlt,
    FaKey,
    FaSignOutAlt,
    FaQuestionCircle,
    FaUsersCog,
    FaBorderAll,
    FaLayerGroup,
    FaCoins,
    FaCalculator,
    FaChartBar,
    FaSlidersH,
    FaEye,
    FaDrawPolygon
} from 'react-icons/fa';
import {GiTeePipe, GiHouse, GiFactory} from 'react-icons/gi';
import {GoPlus, GoPencil, GoFileDirectory, GoGear, GoTools} from 'react-icons/go';
import {useDispatch, useSelector} from "react-redux";
import {calculateProject, openProject, saveProject} from "../../../redux/actions/project";

const { app } = window.require('electron').remote

const TOOLTIP_HOVER_OPEN_DELAY = 750

export const ToolsBar = ({
                             objectType,
                             setObjectType,
                             headerHeight,
                             gridIsVisible,
                             setGridIsVisible,
                             project,
                             selectedObject,
                             startCreateObject,
                             deleteObject,
                             objects,
                             nodes,
                             setConsumerDialogType,
                             setSupplierDialogType,
                             setNetworkDialogType,
                             setProducersDialogIsOpened,
                             setNetworksTemplatesDialogIsOpened,
                             setSuppliersTemplatesDialogIsOpened,
                             setModelSettingsIsOpened,
                             currentPage,
                             startDialog,
                             setStartDialog,
                             authDialog,
                             setAuthDialog,
                             onUndo,
                             onRedo,
                             toaster,
                             resultsIsOpened,
                             setResultsIsOpened,
                             isInspectionMode,
                             setIsInspectionMode,
                             mapImageAnalysisIsOpened,
                             setMapImageAnalysisIsOpened,
                             mapImageShouldBeAnalyzed,
                             canvas,
                             projectHistory,
                             projectStateInHistoryIndex,
                             setOpenProjectDialogIsOpened,
                             setSaveAsProjectDialogIsOpened,
                             setHelpDialogIsOpened
                         }) => {

    const styles = useStyles()

    const dispatch = useDispatch()

    const modelSettings = useSelector(state => state.project && state.project.settings)
    const results = useSelector(state => state.project && state.project.results)
    const isAuth = useSelector(state => state.auth.isAuth)

    const FileMenu = () => {
        return <Menu className={[Classes.ELEVATION_1, styles.menuItemText]}>
            <MenuItem icon={<GoPlus size={"1rem"} className={"bp3-icon"}/>} text="New project..." labelElement="CTRL + W"
                      onClick={() => setStartDialog(true)}/>
            <MenuDivider/>
            <MenuItem icon={<FaFolder size={"1rem"} className={"bp3-icon"}/>}
                      text="Open project..."
                      labelElement="CTRL + E"
                      disabled={!isAuth}
                      onClick={() => {
                          setOpenProjectDialogIsOpened(true)
                      }}
            />
            <MenuDivider/>
            <MenuItem icon={<FaSave size={"1rem"} className={"bp3-icon"}/>}
                      text="Save"
                      labelElement="CTRL + S"
                      disabled={!project}
                      onClick={() => {

                          const canvasState = canvas.toJSON(["circle1", "circle2", "objectType", "id", "networkType", "distance", "name", "connectedTo", "networkIsNew", "isCompleted"])
                          const projectState = {
                              ...project,
                              canvas: canvasState
                          }

                          dispatch(saveProject(projectState))
                          toaster.show({message: `Project saved.`, intent: Intent.SUCCESS, timeout: 3000})
                      }}
            />
            <MenuItem icon={<FaBoxes size={"1rem"} className={"bp3-icon"}/>} text="Save as..." disabled={!project} onClick={() => setSaveAsProjectDialogIsOpened(true)} labelElement="CTRL + D"/>
            <MenuDivider/>
            <MenuItem icon={<FaDoorOpen size={"1rem"} className={"bp3-icon"}/>} text="Exit" onClick={() => app.quit()} labelElement="ALT + Q"/>
        </Menu>
    }

    const EditMenu = () => {
        return <Menu className={[Classes.ELEVATION_1, styles.menuItemText]}>

            {/*<MenuItem icon={<FaUndo size={"1rem"} className={"bp3-icon"}/>} text="Undo" disabled={!project || projectHistory.length === 1 || projectStateInHistoryIndex === 0}*/}
            {/*          onClick={() => onUndo()}/>*/}
            {/*<MenuItem icon={<FaRedo size={"1rem"} className={"bp3-icon"}/>} text="Redo" disabled={!project || projectHistory.length === 1 || projectStateInHistoryIndex === projectHistory.length - 1}*/}
            {/*          onClick={() => onRedo()}/>*/}
            {/*<MenuDivider/>*/}

            <MenuItem icon={<FaObjectUngroup size={"1rem"} className={"bp3-icon"}/>} text="Add new object"
                      disabled={!project}>
                <MenuItem icon={<GiHouse size={16} className={"bp3-icon material-icon"}/>}
                          disabled={isInspectionMode || !project}
                          labelElement="SHIFT + C"
                          text="Consumer"
                          onClick={() => {
                              if (objectType !== "consumer") {
                                  setConsumerDialogType("new")
                              } else {
                                  setObjectType("none")
                              }
                          }}/>
                <MenuItem icon={<GiFactory size={16} className={"bp3-icon material-icon"}/>}
                          disabled={isInspectionMode || !project}
                          labelElement="SHIFT + S"
                          text="Supplier"
                          onClick={() => {
                              if (objectType !== "supplier") {
                                  setSupplierDialogType("new")
                              } else {
                                  setObjectType("none")
                              }
                          }}/>
                <MenuItem icon={<GiTeePipe size={16} className={"bp3-icon material-icon"}/>}
                          disabled={isInspectionMode || !project}
                          labelElement="SHIFT + Z"
                          text="Network"
                          onClick={() => {
                              if (objectType !== "network") {
                                  setNetworkDialogType("new")
                              } else {
                                  setObjectType("none")
                              }
                          }}/>
            </MenuItem>

            <MenuDivider/>

            <MenuItem icon={<FaUsersCog size={"1rem"} className={"bp3-icon"}/>} text="Producers list..."
                      labelElement="SHIFT + Q"
                      onClick={() => {
                          setProducersDialogIsOpened(true)
                      }}
                      disabled={!project}/>
            <MenuItem icon={<FaCoins size={"1rem"} className={"bp3-icon"}/>} text="Suppliers templates..."
                      labelElement="SHIFT + W"
                      onClick={() => {
                          setSuppliersTemplatesDialogIsOpened(true)
                      }}
                      disabled={!project}/>
            <MenuItem icon={<FaLayerGroup size={"1rem"} className={"bp3-icon"}/>} text="Networks templates..."
                      labelElement="SHIFT + E"
                      onClick={() => {
                          setNetworksTemplatesDialogIsOpened(true)
                      }}
                      disabled={!project}/>

            <MenuDivider/>

            <MenuItem icon={<FaPencilAlt size={"1rem"} className={"bp3-icon"}/>}
                      text="Edit object..."
                      disabled={isInspectionMode || !selectedObject || !project}/>
            <MenuItem icon={<FaTrashAlt size={"1rem"} className={"bp3-icon"}/>}
                      text="Delete object"
                      disabled={isInspectionMode || !selectedObject || !project}
                      intent={Intent.DANGER}
                      onClick={() => deleteObject(selectedObject, objects, nodes, canvas)}/>
        </Menu>
    }

    const ToolsMenu = () => {
        return <Menu className={[Classes.ELEVATION_1, styles.menuItemText]}>
            <MenuItem intent={Intent.SUCCESS}
                      disabled={!project}
                      icon={<FaCalculator size={"1rem"} className={"bp3-icon"}/>}
                      text="Calculate project"
                      labelElement="SHIFT + X"
                      onClick={() => dispatch(calculateProject(project))}
            />
            <MenuItem icon={<FaSlidersH size={"1rem"} className={"bp3-icon"}/>}
                      disabled={!project}
                      intent={modelSettings ? Intent.PRIMARY : Intent.WARNING}
                      text="Model settings..."
                      labelElement="SHIFT + M"
                      onClick={() => setModelSettingsIsOpened(true)}
            />
            <MenuItem disabled={!results || !project}
                      active={resultsIsOpened}
                      intent={Intent.PRIMARY}
                      icon={<FaChartBar size={"1rem"} className={"bp3-icon"}/>}
                      text="Results..."
                      labelElement="SHIFT + R"
                      onClick={() => setResultsIsOpened(true)}
            />
            <MenuDivider/>
            {/*<MenuItem icon={<FaEye size={"1rem"} className={"bp3-icon"}/>}*/}
            {/*          text="Inspection mode"*/}
            {/*          active={isInspectionMode}*/}
            {/*          disabled={!results || !project}*/}
            {/*          onClick={() => setIsInspectionMode(prevState => !prevState)}*/}
            {/*/>*/}
            {mapImageShouldBeAnalyzed && <MenuItem icon={<FaDrawPolygon size={"1rem"} className={"bp3-icon"}/>}
                      text="Polygons analysis"
                      active={mapImageAnalysisIsOpened}
                      disabled={!project}
                      onClick={() => setMapImageAnalysisIsOpened(true)}
            />}

            <MenuItem icon={<FaBorderAll size={"1rem"} className={"bp3-icon"}/>}
                      text="Set grid"
                      active={gridIsVisible}
                      disabled={!project}
                      labelElement="SHIFT + G"
                      onClick={() => setGridIsVisible(prevState => !prevState)}
            />
        </Menu>
    }


    const SettingsMenu = () => {
        return <Menu className={[Classes.ELEVATION_1, styles.menuItemText]}>
            <MenuItem disabled={!isAuth} icon={<FaKey size={"1rem"} className={"bp3-icon"}/>} text="License..."/>
            <MenuDivider/>
            <MenuItem icon={<FaSignOutAlt size={"1rem"} className={"bp3-icon"}/>}
                      text={isAuth ? "Sign out" : "Sign in"}
                      onClick={() => setAuthDialog(true)}/>
            <MenuDivider/>
            <MenuItem icon={<FaQuestionCircle size={"1rem"} className={"bp3-icon"}/>} text="Help..."
                      onClick={() => setHelpDialogIsOpened(true)}
            />
        </Menu>
    }

    return <div className="pane-content">
        <Navbar style={{height: headerHeight}}>
            <NavbarGroup align={Alignment.LEFT} style={{height: headerHeight}}>
                {/*<NavbarHeading className={styles.headerText}>Solvergy: Systems</NavbarHeading>*/}
                {/*<NavbarDivider/>*/}
                <Popover content={<FileMenu/>}
                         position={"bottom-left"}
                         usePortal={true}
                         modifiers={{
                             arrow: {enabled: false},
                             flip: {enabled: false},
                             keepTogether: {enabled: true},
                             preventOverflow: {enabled: false},
                         }}
                         minimal
                         hasBackdrop
                         transitionDuration={100}
                >
                    <Button className={[Classes.MINIMAL, styles.menuItemText]}
                            icon={<GoFileDirectory size={"1rem"} className={"bp3-icon"}/>} text="File"/>
                </Popover>

                <Popover content={<EditMenu/>}
                         position={"bottom-left"}
                         usePortal={true}
                         modifiers={{
                             arrow: {enabled: false},
                             flip: {enabled: false},
                             keepTogether: {enabled: true},
                             preventOverflow: {enabled: false},
                         }}
                         minimal
                         hasBackdrop
                         transitionDuration={100}
                >
                    <Button className={[Classes.MINIMAL, styles.menuItemText]}
                            icon={<GoPencil size={"1rem"} className={"bp3-icon"}/>} text="Edit"/>
                </Popover>

                <Popover content={<ToolsMenu/>}
                         position={"bottom-left"}
                         usePortal={true}
                         modifiers={{
                             arrow: {enabled: false},
                             flip: {enabled: false},
                             keepTogether: {enabled: true},
                             preventOverflow: {enabled: false},
                         }}
                         minimal
                         hasBackdrop
                         transitionDuration={100}
                >
                    <Button className={[Classes.MINIMAL, styles.menuItemText]}
                            icon={<GoTools size={"1rem"} className={"bp3-icon"}/>} text="Tools"/>
                </Popover>

                <Popover content={<SettingsMenu/>}
                         position={"bottom-left"}
                         usePortal={true}
                         modifiers={{
                             arrow: {enabled: false},
                             flip: {enabled: false},
                             keepTogether: {enabled: true},
                             preventOverflow: {enabled: false},
                         }}
                         minimal
                         hasBackdrop
                         transitionDuration={100}
                >
                    <Button className={[Classes.MINIMAL, styles.menuItemText]}
                            icon={<GoGear size={"1rem"} className={"bp3-icon"}/>} text="Settings"/>
                </Popover>
            </NavbarGroup>

            {project && currentPage === "topology" && isAuth &&
            <NavbarGroup align={Alignment.RIGHT} style={{height: headerHeight}}>

                {/*<Tooltip content="Undo"*/}
                {/*         hoverOpenDelay={TOOLTIP_HOVER_OPEN_DELAY}*/}
                {/*         position={Position.BOTTOM}*/}
                {/*         usePortal={true}*/}
                {/*         modifiers={{*/}
                {/*             arrow: {enabled: true},*/}
                {/*             flip: {enabled: false},*/}
                {/*             keepTogether: {enabled: true},*/}
                {/*             preventOverflow: {enabled: false},*/}
                {/*         }}*/}
                {/*>*/}
                {/*    <Button*/}
                {/*        disabled={!project || projectHistory.length === 1 || projectStateInHistoryIndex === 0}*/}
                {/*        icon={<Icon icon={<FaUndo size={14} className={"bp3-icon material-icon"}/>}/>}*/}
                {/*        className={[Classes.MINIMAL]}*/}
                {/*        onClick={() => onUndo()}*/}
                {/*    />*/}
                {/*</Tooltip>*/}

                {/*<Tooltip content="Redo"*/}
                {/*         hoverOpenDelay={TOOLTIP_HOVER_OPEN_DELAY}*/}
                {/*         position={Position.BOTTOM}*/}
                {/*         usePortal={true}*/}
                {/*         modifiers={{*/}
                {/*             arrow: {enabled: true},*/}
                {/*             flip: {enabled: false},*/}
                {/*             keepTogether: {enabled: true},*/}
                {/*             preventOverflow: {enabled: false},*/}
                {/*         }}*/}
                {/*>*/}
                {/*    <Button*/}
                {/*        disabled={!project || projectHistory.length === 1 || projectStateInHistoryIndex === projectHistory.length - 1}*/}
                {/*        icon={<Icon icon={<FaRedo size={14} className={"bp3-icon material-icon"}/>}/>}*/}
                {/*        className={[Classes.MINIMAL, styles.iconButton]}*/}
                {/*        onClick={() => onRedo()}*/}
                {/*    />*/}
                {/*</Tooltip>*/}

                {/*<NavbarDivider/>*/}

                <Tooltip content="Calculate project"
                         hoverOpenDelay={TOOLTIP_HOVER_OPEN_DELAY}
                         position={Position.BOTTOM}
                         usePortal={true}
                         disabled={!project}
                         modifiers={{
                             arrow: {enabled: true},
                             flip: {enabled: false},
                             keepTogether: {enabled: true},
                             preventOverflow: {enabled: false},
                         }}
                >
                    <Button intent={Intent.SUCCESS}
                            disabled={!project}
                            icon={<Icon icon={<FaCalculator size={16} className={"bp3-icon material-icon"}/>}/>}
                            className={[Classes.MINIMAL]}
                            onClick={() => dispatch(calculateProject(project))}
                    />
                </Tooltip>

                <Tooltip content="Model settings"
                         hoverOpenDelay={TOOLTIP_HOVER_OPEN_DELAY}
                         position={Position.BOTTOM}
                         disabled={!project}
                         usePortal={true}
                         modifiers={{
                             arrow: {enabled: true},
                             flip: {enabled: false},
                             keepTogether: {enabled: true},
                             preventOverflow: {enabled: false},
                         }}
                >
                    <Button
                        disabled={!project}
                        intent={modelSettings ? Intent.PRIMARY : Intent.WARNING}
                        icon={<Icon icon={<FaSlidersH size={16} className={"bp3-icon material-icon"}/>}/>}
                        className={[Classes.MINIMAL, styles.iconButton]}
                        onClick={() => setModelSettingsIsOpened(true)}
                    />
                </Tooltip>

                <Tooltip content="Results"
                         hoverOpenDelay={TOOLTIP_HOVER_OPEN_DELAY}
                         position={Position.BOTTOM}
                         usePortal={true}
                         disabled={!results || !project}
                         modifiers={{
                             arrow: {enabled: true},
                             flip: {enabled: false},
                             keepTogether: {enabled: true},
                             preventOverflow: {enabled: false},
                         }}
                >
                    <Button
                        active={resultsIsOpened}
                        disabled={!results || !project}
                        intent={Intent.PRIMARY}
                        icon={<Icon icon={<FaChartBar size={16} className={"bp3-icon material-icon"}/>}/>}
                        className={[Classes.MINIMAL, styles.iconButton]}
                        onClick={() => setResultsIsOpened(prevState => !prevState)}/>
                </Tooltip>

                <NavbarDivider/>

                {/*<Tooltip content="Inspection mode"*/}
                {/*         hoverOpenDelay={TOOLTIP_HOVER_OPEN_DELAY}*/}
                {/*         position={Position.BOTTOM}*/}
                {/*         usePortal={true}*/}
                {/*         disabled={!results || !project}*/}
                {/*         modifiers={{*/}
                {/*             arrow: {enabled: true},*/}
                {/*             flip: {enabled: false},*/}
                {/*             keepTogether: {enabled: true},*/}
                {/*             preventOverflow: {enabled: false},*/}
                {/*         }}*/}
                {/*>*/}
                {/*    <Button active={isInspectionMode}*/}
                {/*            disabled={!results || !project}*/}
                {/*            icon={<Icon icon={<FaEye size={16} className={"bp3-icon material-icon"}/>}/>}*/}
                {/*            className={[Classes.MINIMAL]}*/}
                {/*            onClick={() => setIsInspectionMode(prevState => !prevState)}/>*/}
                {/*</Tooltip>*/}

                {mapImageShouldBeAnalyzed && <Tooltip content="Analysis"
                                                      hoverOpenDelay={TOOLTIP_HOVER_OPEN_DELAY}
                                                      position={Position.BOTTOM}
                                                      usePortal={true}
                                                      disabled={!project}
                                                      modifiers={{
                                                          arrow: {enabled: true},
                                                          flip: {enabled: false},
                                                          keepTogether: {enabled: true},
                                                          preventOverflow: {enabled: false},
                                                      }}
                >
                    <Button
                        active={mapImageAnalysisIsOpened}
                        disabled={!project}
                        intent={Intent.NONE}
                        icon={<Icon icon={<FaDrawPolygon size={16} className={"bp3-icon material-icon"}/>}/>}
                        className={[Classes.MINIMAL]}
                        onClick={() => setMapImageAnalysisIsOpened(prevState => !prevState)}/>
                </Tooltip>}

                <Tooltip content="Set grid"
                         hoverOpenDelay={TOOLTIP_HOVER_OPEN_DELAY}
                         position={Position.BOTTOM}
                         usePortal={true}
                         disabled={!project}
                         modifiers={{
                             arrow: {enabled: true},
                             flip: {enabled: false},
                             keepTogether: {enabled: true},
                             preventOverflow: {enabled: false},
                         }}
                >
                    <Button active={gridIsVisible}
                            disabled={!project}
                            icon={<Icon icon={<FaBorderAll size={16} className={"bp3-icon material-icon"}/>}/>}
                            className={[Classes.MINIMAL, mapImageShouldBeAnalyzed && styles.iconButton]}
                            onClick={() => setGridIsVisible(prevState => !prevState)}/>
                </Tooltip>

                <NavbarDivider/>

                <Tooltip content="Create consumer"
                         hoverOpenDelay={TOOLTIP_HOVER_OPEN_DELAY}
                         position={Position.BOTTOM}
                         usePortal={true}
                         modifiers={{
                             arrow: {enabled: true},
                             flip: {enabled: false},
                             keepTogether: {enabled: true},
                             preventOverflow: {enabled: false},
                         }}
                >
                    <Button icon={<Icon icon={<GiHouse size={16} className={"bp3-icon material-icon"}/>}/>}
                            active={objectType === "consumer"}
                            className={[Classes.MINIMAL]}
                            disabled={isInspectionMode || !project}
                            onClick={() => {
                                if (objectType !== "consumer") {
                                    setConsumerDialogType("new")
                                } else {
                                    setObjectType("none")
                                }
                            }}/>
                </Tooltip>

                <Tooltip content="Create supplier"
                         hoverOpenDelay={TOOLTIP_HOVER_OPEN_DELAY}
                         position={Position.BOTTOM}
                         usePortal={true}
                         modifiers={{
                             arrow: {enabled: true},
                             flip: {enabled: false},
                             keepTogether: {enabled: true},
                             preventOverflow: {enabled: false},
                         }}
                >
                    <Button icon={<Icon icon={<GiFactory size={16} className={"bp3-icon material-icon"}/>}/>}
                            active={objectType === "supplier"}
                            className={[Classes.MINIMAL, styles.iconButton]}
                            disabled={isInspectionMode || !project}
                            onClick={() => {
                                if (objectType !== "supplier") {
                                    setSupplierDialogType("new")
                                } else {
                                    setObjectType("none")
                                }
                            }}/>
                </Tooltip>

                <Tooltip content="Create heat network"
                         hoverOpenDelay={TOOLTIP_HOVER_OPEN_DELAY}
                         position={Position.BOTTOM}
                         usePortal={true}
                         modifiers={{
                             arrow: {enabled: true},
                             flip: {enabled: false},
                             keepTogether: {enabled: true},
                             preventOverflow: {enabled: false},
                         }}
                >
                    <Button icon={<Icon icon={<GiTeePipe size={16} className={"bp3-icon material-icon"}/>}/>}
                            active={objectType === "network"}
                            className={[Classes.MINIMAL, styles.iconButton]}
                            disabled={isInspectionMode || !project}
                            onClick={() => {
                                if (objectType !== "network") {
                                    setNetworkDialogType("new")
                                } else {
                                    setObjectType("none")
                                }
                            }}/>
                </Tooltip>


                <NavbarDivider/>

                <Tooltip content="Manage producers"
                         hoverOpenDelay={TOOLTIP_HOVER_OPEN_DELAY}
                         position={Position.BOTTOM}
                         usePortal={true}
                         modifiers={{
                             arrow: {enabled: true},
                             flip: {enabled: false},
                             keepTogether: {enabled: true},
                             preventOverflow: {enabled: false},
                         }}
                >
                    <Button icon={<Icon icon={<FaUsersCog size={16} className={"bp3-icon material-icon"}/>}/>}
                            className={[Classes.MINIMAL, styles.iconButton]}
                            disabled={!project}
                            onClick={() => {
                                setProducersDialogIsOpened(true)
                            }}/>
                </Tooltip>

                <Tooltip content="Suppliers templates"
                         hoverOpenDelay={TOOLTIP_HOVER_OPEN_DELAY}
                         position={Position.BOTTOM_RIGHT}
                         usePortal={true}
                         modifiers={{
                             arrow: {enabled: true},
                             flip: {enabled: false},
                             keepTogether: {enabled: true},
                             preventOverflow: {enabled: false},
                         }}
                >
                    <Button icon={<Icon icon={<FaCoins size={16} className={"bp3-icon material-icon"}/>}/>}
                            className={[Classes.MINIMAL, styles.iconButton]}
                            disabled={!project}
                            onClick={() => {
                                setSuppliersTemplatesDialogIsOpened(true)
                            }}/>
                </Tooltip>

                <Tooltip content="Networks templates"
                         hoverOpenDelay={TOOLTIP_HOVER_OPEN_DELAY}
                         position={Position.BOTTOM_RIGHT}
                         usePortal={true}
                         modifiers={{
                             arrow: {enabled: true},
                             flip: {enabled: false},
                             keepTogether: {enabled: true},
                             preventOverflow: {enabled: false},
                         }}
                >
                    <Button icon={<Icon icon={<FaLayerGroup size={16} className={"bp3-icon material-icon"}/>}/>}
                            className={[Classes.MINIMAL, styles.iconButton]}
                            disabled={!project}
                            onClick={() => {
                                setNetworksTemplatesDialogIsOpened(true)
                            }}/>
                </Tooltip>

            </NavbarGroup>}
        </Navbar>
    </div>
}

const useStyles = createUseStyles({
    text: {
        marginTop: 12,
        fontWeight: 600,
        fontSize: 13,
        fontFamily: "Montserrat"
    },
    iconButton: {
        marginLeft: 6
    },
    headerText: {
        fontWeight: 600,
        fontSize: 14,
        fontFamily: 'Montserrat'
    },
    menuItemText: {
        fontSize: 12,
        fontWeight: 500,
        fontFamily: 'Montserrat',
    },
})

