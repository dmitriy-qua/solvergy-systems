import React from "react";
import {
    Alignment,
    Button,
    Classes,
    Icon, Intent, Menu, MenuDivider, MenuItem,
    Navbar,
    NavbarDivider,
    NavbarGroup,
    Popover
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
    FaMap
} from 'react-icons/fa';
import {GiTeePipe, GiHouse, GiFactory, GiTreasureMap} from 'react-icons/gi';
import {GoPlus, GoPencil, GoFileDirectory, GoGear} from 'react-icons/go';


export const ToolsBar = ({setObjectType, headerHeight, mapIsVisible, setMapIsVisible, mapDistance, createTreeNode, project}) => {

    const styles = useStyles()

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
            <MenuItem icon={<FaUndo size={"1rem"} className={"bp3-icon"}/>} text="Undo" disabled={!project}/>
            <MenuItem icon={<FaRedo size={"1rem"} className={"bp3-icon"}/>} text="Redo" disabled={!project}/>
            <MenuDivider/>
            <MenuItem icon={<FaObjectUngroup size={"1rem"} className={"bp3-icon"}/>} text="Add new object"
                      disabled={!project}>
                <MenuItem icon={<GiHouse size={16} className={"bp3-icon material-icon"}/>}
                          disabled={!mapDistance || !project}
                          text="Consumer"
                          onClick={() => {
                              createTreeNode("consumer", "newConsumer")
                              setObjectType("consumer")
                          }}/>
                <MenuItem icon={<GiFactory size={16} className={"bp3-icon material-icon"}/>}
                          disabled={!mapDistance || !project}
                          text="Supplier"
                          onClick={() => {
                              createTreeNode("supplier", "newSupplier")
                              setObjectType("supplier")
                          }}/>
                <MenuItem icon={<GiTeePipe size={16} className={"bp3-icon material-icon"}/>}
                          disabled={!mapDistance || !project}
                          text="Network"
                          onClick={() => {
                              createTreeNode("network", "newNetwork")
                              setObjectType("network")
                          }}/>
            </MenuItem>

            <MenuItem icon={<FaUsersCog size={"1rem"} className={"bp3-icon"}/>} text="Edit producers..."
                      disabled={!project}/>
            <MenuItem icon={<FaPencilAlt size={"1rem"} className={"bp3-icon"}/>} text="Edit object..."
                      disabled={!project}/>
            <MenuItem icon={<FaTrashAlt size={"1rem"} className={"bp3-icon"}/>} text="Delete object" disabled={!project}
                      intent={Intent.DANGER}/>
        </Menu>
    }

    const SettingsMenu = () => {
        return <Menu className={[Classes.ELEVATION_1, styles.menuItemText]}>
            <MenuItem icon={<FaWrench size={"1rem"} className={"bp3-icon"}/>} text="Preferences"/>
            <MenuDivider/>
            <MenuItem icon={<FaSignInAlt size={"1rem"} className={"bp3-icon"}/>} text="Sign in..."/>
            <MenuItem icon={<FaUserPlus size={"1rem"} className={"bp3-icon"}/>} text="Sign up..."/>
            <MenuItem icon={<FaSignOutAlt size={"1rem"} className={"bp3-icon"}/>} text="Sign out"/>
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

            {project && <NavbarGroup align={Alignment.RIGHT} style={{height: headerHeight}}>

                <Button active={mapIsVisible}
                        disabled={!mapDistance || !project}
                        icon={<Icon icon={<FaMap size={16} className={"bp3-icon material-icon"}/>}/>}
                        className={[Classes.MINIMAL]}
                        onClick={() => setMapIsVisible(prevState => !prevState)}/>

                <NavbarDivider/>

                <Button icon={<Icon icon={<GiHouse size={16} className={"bp3-icon material-icon"}/>}/>}
                        className={[Classes.MINIMAL]}
                        disabled={!mapDistance || !project}
                        onClick={() => {
                            createTreeNode("consumer", "newConsumer")
                            setObjectType("consumer")
                        }}/>
                <Button icon={<Icon icon={<GiFactory size={16} className={"bp3-icon material-icon"}/>}/>}
                        className={[Classes.MINIMAL, styles.iconButton]}
                        disabled={!mapDistance || !project}
                        onClick={() => {
                            createTreeNode("supplier", "newSupplier")
                            setObjectType("supplier")
                        }}/>
                <Button icon={<Icon icon={<GiTeePipe size={16} className={"bp3-icon material-icon"}/>}/>}
                        className={[Classes.MINIMAL, styles.iconButton]}
                        disabled={!mapDistance || !project}
                        onClick={() => {
                            createTreeNode("network", "newNetwork")
                            setObjectType("network")
                        }}/>

                <NavbarDivider/>

                <Button icon={<Icon icon={<FaUsersCog size={16} className={"bp3-icon material-icon"}/>}/>}
                        className={[Classes.MINIMAL, styles.iconButton]}
                        disabled={!mapDistance || !project}
                        onClick={() => {
                        }}/>

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

