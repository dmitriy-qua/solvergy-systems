import {
    Intent,
    Menu,
    MenuDivider,
    MenuItem
} from "@blueprintjs/core";
import React, {useState} from "react";
import {createUseStyles} from "react-jss";
import {
    FaTrashAlt,
    FaPencilAlt
} from 'react-icons/fa';

export const ObjectContextMenu = ({selectedObject, deleteObject, objects, nodes, editObject, canvas, isInspectionMode}) => {

    const styles = useStyles()

    return <Menu>
        <MenuItem icon={<FaPencilAlt size={"1rem"} className={"bp3-icon"}/>}
                  text="Edit object..."
                  disabled={isInspectionMode || !selectedObject}
                  onClick={() => editObject(selectedObject, objects)}/>
        <MenuItem icon={<FaTrashAlt size={"1rem"} className={"bp3-icon"}/>}
                  text="Delete object"
                  disabled={isInspectionMode || !selectedObject}
                  intent={Intent.DANGER}
                  onClick={() => deleteObject(selectedObject, objects, nodes, canvas)}/>
    </Menu>
}

const useStyles = createUseStyles({
    text: {
        fontSize: 11,
        fontWeight: 500,
        fontFamily: "Montserrat",
        color: "#5c7080"
    },
})
