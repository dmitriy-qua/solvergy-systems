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
    FaWrench,
    FaSignInAlt,
    FaSignOutAlt,
    FaUserPlus,
    FaQuestionCircle,
    FaUsersCog,
    FaBorderAll,
    FaLayerGroup,
    FaCoins
} from 'react-icons/fa';
import {GiTeePipe, GiHouse, GiFactory} from 'react-icons/gi';
import {GoPlus, GoPencil, GoFileDirectory, GoGear} from 'react-icons/go';
import {useSelector} from "react-redux";

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
                             currentPage
                         }) => {

    const styles = useStyles()

    const isAuth = useSelector(state => state.auth.isAuth)

    const FileMenu = () => {
        return <Menu className={[Classes.ELEVATION_1, styles.menuItemText]}>
            <MenuItem icon={<GoPlus size={"1rem"} className={"bp3-icon"}/>} text="New project..."/>
            <MenuDivider/>
            <MenuItem icon={<FaFolder size={"1rem"} className={"bp3-icon"}/>} text="Open project..."/>
            <MenuDivider/>
            <MenuItem icon={<FaSave size={"1rem"} className={"bp3-icon"}/>} text="Save" disabled={!project}/>
            <MenuItem icon={<FaBoxes size={"1rem"} className={"bp3-icon"}/>} text="Save as..." disabled={!project}/>
            <MenuDivider/>
            <MenuItem icon={<FaDoorOpen size={"1rem"} className={"bp3-icon"}/>} text="Exit"/>
        </Menu>
    }

    const EditMenu = () => {
        return <Menu className={[Classes.ELEVATION_1, styles.menuItemText]}>

            {/*<MenuItem icon={<FaUndo size={"1rem"} className={"bp3-icon"}/>} text="Undo" disabled={!project}/>*/}
            {/*<MenuItem icon={<FaRedo size={"1rem"} className={"bp3-icon"}/>} text="Redo" disabled={!project}/>*/}
            {/*<MenuDivider/>*/}

            <MenuItem icon={<FaBorderAll size={"1rem"} className={"bp3-icon"}/>}
                      text="Set grid"
                      active={gridIsVisible}
                      disabled={!project}
                      onClick={() => setGridIsVisible(prevState => !prevState)}
            />
            <MenuDivider/>
            <MenuItem icon={<FaObjectUngroup size={"1rem"} className={"bp3-icon"}/>} text="Add new object"
                      disabled={!project}>
                <MenuItem icon={<GiHouse size={16} className={"bp3-icon material-icon"}/>}
                          disabled={!project}
                          text="Consumer"
                          onClick={() => setConsumerDialogType("new")}/>
                <MenuItem icon={<GiFactory size={16} className={"bp3-icon material-icon"}/>}
                          disabled={!project}
                          text="Supplier"
                          onClick={() => setSupplierDialogType("new")}/>
                <MenuItem icon={<GiTeePipe size={16} className={"bp3-icon material-icon"}/>}
                          disabled={!project}
                          text="Network"
                          onClick={() => setNetworkDialogType("new")}/>
            </MenuItem>

            <MenuDivider/>

            <MenuItem icon={<FaUsersCog size={"1rem"} className={"bp3-icon"}/>} text="Producers list..."
                      disabled={!project}/>
            <MenuItem icon={<FaCoins size={"1rem"} className={"bp3-icon"}/>} text="Suppliers templates..."
                      disabled={!project}/>
            <MenuItem icon={<FaLayerGroup size={"1rem"} className={"bp3-icon"}/>} text="Networks templates..."
                      disabled={!project}/>

            <MenuDivider/>

            <MenuItem icon={<FaPencilAlt size={"1rem"} className={"bp3-icon"}/>}
                      text="Edit object..."
                      disabled={!selectedObject || !project}/>
            <MenuItem icon={<FaTrashAlt size={"1rem"} className={"bp3-icon"}/>}
                      text="Delete object"
                      disabled={!selectedObject || !project}
                      intent={Intent.DANGER}
                      onClick={() => deleteObject(selectedObject, objects, nodes)}/>
        </Menu>
    }

    const SettingsMenu = () => {
        return <Menu className={[Classes.ELEVATION_1, styles.menuItemText]}>
            <MenuItem icon={<FaWrench size={"1rem"} className={"bp3-icon"}/>} text="Preferences"/>

            <MenuDivider/>

            {!isAuth && <MenuItem icon={<FaSignInAlt size={"1rem"} className={"bp3-icon"}/>} text="Sign in..."/>}
            {!isAuth && <MenuItem icon={<FaUserPlus size={"1rem"} className={"bp3-icon"}/>} text="Sign up..."/>}
            {isAuth && <MenuItem icon={<FaSignOutAlt size={"1rem"} className={"bp3-icon"}/>} text="Sign out"/>}

            <MenuDivider/>

            <MenuItem icon={<FaQuestionCircle size={"1rem"} className={"bp3-icon"}/>} text="Help..."/>
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

            {project && currentPage === "topology" &&
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
                {/*        disabled={!project}*/}
                {/*        icon={<Icon icon={<FaUndo size={14} className={"bp3-icon material-icon"}/>}/>}*/}
                {/*        className={[Classes.MINIMAL]}*/}
                {/*        onClick={() => {*/}
                {/*        }}/>*/}
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
                {/*        disabled={!project}*/}
                {/*        icon={<Icon icon={<FaRedo size={14} className={"bp3-icon material-icon"}/>}/>}*/}
                {/*        className={[Classes.MINIMAL]}*/}
                {/*        onClick={() => {*/}
                {/*        }}/>*/}
                {/*</Tooltip>*/}

                {/*<NavbarDivider/>*/}

                <Tooltip content="Set grid"
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
                    <Button active={gridIsVisible}
                            disabled={!project}
                            icon={<Icon icon={<FaBorderAll size={16} className={"bp3-icon material-icon"}/>}/>}
                            className={[Classes.MINIMAL]}
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
                            disabled={!project}
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
                            disabled={!project}
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
                            disabled={!project}
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

