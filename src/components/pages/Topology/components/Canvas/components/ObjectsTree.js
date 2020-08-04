import {Tree, ContextMenu} from "@blueprintjs/core";
import React, {useState} from "react";
import {createUseStyles} from "react-jss";
import {forEachNode, updateNodeProperty} from "../helpers/tree-helper";
import {ObjectContextMenu} from "../../../../../common/ContextMenu/ObjectContextMenu";


export const ObjectsTree = ({nodes, setNodes, getSelectedNode}) => {

    const styles = useStyles()

    const showContextMenu = (nodeData, path, e) => {
        handleNodeClick(nodeData, path, e, true)
    };

    const handleNodeClick = (nodeData, _nodePath, e, isRightClick = false) => {
        //const originallySelected = nodeData.isSelected;

        let newNodes = forEachNode(nodes, n => (n.isSelected = false))
        //setNodes(newNodes)

        newNodes = updateNodeProperty(newNodes, nodeData.id, "isSelected", true)
        setNodes(newNodes)
        getSelectedNode(nodeData, e, isRightClick)
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
