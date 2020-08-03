import {Tree,
    Icon,
    Classes,
    ContextMenu,
    Menu,
    MenuDivider,
    MenuItem
} from "@blueprintjs/core";
import React, {useState} from "react";
import {createUseStyles} from "react-jss";
import {forEachNode, updateNodeProperty} from "../helpers/tree-helper";


export const ObjectsTree = ({nodes, setNodes, getSelectedNode}) => {

    const styles = useStyles()

    const showContextMenu = (nodeData, path, e) => {
        e.preventDefault();
        // invoke static API, getting coordinates from mouse event
        ContextMenu.show(
            <Menu>
                <MenuItem icon="search-around" text="Search around..." />
                <MenuItem icon="search" text="Object viewer" />
                <MenuItem icon="graph-remove" text="Remove" />
                <MenuItem icon="group-objects" text="Group" />
                <MenuDivider />
                <MenuItem disabled={true} text="Clicked on node" />
            </Menu>,
            { left: e.clientX, top: e.clientY }
        );
    };

    const handleNodeClick = (nodeData, _nodePath, e) => {
        //const originallySelected = nodeData.isSelected;
        if (!e.shiftKey) {
            const newNodes = forEachNode(nodes, n => (n.isSelected = false))
            setNodes(newNodes)
        }

        const newNodes = updateNodeProperty(nodes, nodeData.id, "isSelected", true)
        setNodes(newNodes)
        getSelectedNode(nodeData)
    }

    const handleNodeCollapse = (nodeData) => {
        const newNodes = updateNodeProperty(nodes, nodeData.id, "isExpanded", false)
        setNodes(newNodes)
    }


    const handleNodeExpand = (nodeData) => {
        const newNodes = updateNodeProperty(nodes, nodeData.id, "isExpanded", true)
        setNodes(newNodes)
    }

    return <Tree
        contents={nodes}
        onNodeClick={handleNodeClick}
        onNodeCollapse={handleNodeCollapse}
        onNodeExpand={handleNodeExpand}
        onNodeContextMenu={showContextMenu}
        className={[styles.text]}
    />
}

const useStyles = createUseStyles({
    text: {
        fontSize: 11,
        fontWeight: 500,
        fontFamily: "Montserrat",
        color: "#5c7080"
    },
    backgroundNode: {
        backgroundColor: "red"
    }
})
