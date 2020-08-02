import {Tree, Icon} from "@blueprintjs/core";
import React, {useState} from "react";
import {createUseStyles} from "react-jss";
import {forEachNode, updateNodeProperty} from "../helpers/tree-helper";


export const ObjectsTree = ({nodes, setNodes, getSelectedNode}) => {

    const styles = useStyles()

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
