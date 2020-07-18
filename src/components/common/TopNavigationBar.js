import React from "react";
import {Alignment, Button, Classes, Icon, Navbar, NavbarDivider, NavbarGroup} from "@blueprintjs/core";
import {createUseStyles} from "react-jss";
import MaterialIcon from "@mdi/react";
import {mdiFolder, mdiFolderPlusOutline} from "@mdi/js";
import {MapDistanceDialog} from "../Canvas/components/MapDistanceDialog";
import {FaMap} from 'react-icons/fa';
import {FaRuler} from 'react-icons/fa';

export const TopNavigationBar = ({setFigureType, headerHeight, mapIsVisible, setMapIsVisible, mapDistanceDialog, setMapDistanceDialog, mapDistance, setMapDistance}) => {

    const styles = useStyles()

    return <Navbar style={{height: headerHeight}}>
        <NavbarGroup align={Alignment.LEFT} style={{height: headerHeight}}>
            {/*<NavbarHeading className={styles.headerText}>Solvergy: Systems</NavbarHeading>*/}
            {/*<NavbarDivider/>*/}
            <Button className={[Classes.MINIMAL, styles.menuItemText]} icon={<Icon
                icon={<MaterialIcon path={mdiFolderPlusOutline}
                                    className={"bp3-icon material-icon"}/>}/>} text="Home"/>
            <Button className={[Classes.MINIMAL, styles.menuItemText]} icon="document" text="Files"/>
            <Button className={[Classes.MINIMAL, styles.menuItemText]} icon="new-layers"
                    text="New node"/>

            <NavbarDivider/>

            <Button icon={<Icon
                icon={<MaterialIcon path={mdiFolder} className={"bp3-icon material-icon"}/>}/>}
                    className={[Classes.MINIMAL]}
                    onClick={() => setFigureType("line")}/>
            <Button icon="polygon-filter" className={[Classes.MINIMAL, styles.iconButton]}
                    onClick={() => setFigureType("polygon")}/>
            <Button icon="cross" className={[Classes.MINIMAL, styles.iconButton]}
                    onClick={() => setFigureType("none")}/>

            <NavbarDivider/>

            <Button active={mapIsVisible}
                    icon={<Icon icon={<FaMap size={16} className={"bp3-icon material-icon"}/>}/>}
                    className={[Classes.MINIMAL]}
                    onClick={() => setMapIsVisible(prevState => !prevState)}/>
            <Button icon={<Icon icon={<FaRuler size={16} className={"bp3-icon material-icon"}/>}/>}
                    className={[Classes.MINIMAL, styles.iconButton]}
                    onClick={() => setMapDistanceDialog(true)}/>
            <MapDistanceDialog mapDistanceDialog={mapDistanceDialog}
                               setMapDistanceDialog={setMapDistanceDialog}
                               mapDistance={mapDistance}
                               setMapDistance={setMapDistance}/>
        </NavbarGroup>
    </Navbar>
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
})
