import {Tree, Icon} from "@blueprintjs/core";
import React, {useState} from "react";
import {createUseStyles} from "react-jss";


export const ObjectsTree = ({nodes, setNodes}) => {

    const styles = useStyles()

    const handleNodeClick = (nodeData, _nodePath, e) => {
        const originallySelected = nodeData.isSelected;
        if (!e.shiftKey) {
            const newNodes = forEachNode(nodes, n => (n.isSelected = false))
            setNodes(newNodes)
        }

        const newNodes = updateNodeProperty(nodes, nodeData.id, "isSelected", originallySelected == null ? true : !originallySelected)
        setNodes(newNodes)
    }

    const handleNodeCollapse = (nodeData) => {
        const newNodes = updateNodeProperty(nodes, nodeData.id, "isExpanded", false)
        setNodes(newNodes)
    }


    const handleNodeExpand = (nodeData) => {
        const newNodes = updateNodeProperty(nodes, nodeData.id, "isExpanded", true)
        setNodes(newNodes)
    }

    const updateNodeProperty = (nodes, id, key, value) => {
        const nodesCopy = [...nodes]
        nodesCopy.forEach(function recursiveNodeUpdate(node) {
            if (id === node.id) {
                node[key] = value
            }

            Array.isArray(node.childNodes) && node.childNodes.forEach(recursiveNodeUpdate);
        });

        return nodesCopy
    }

    const forEachNode = (nodes, callback) => {
        if (nodes == null) {
            return;
        }

        const nodesCopy = [...nodes]

        for (const node of nodesCopy) {
            callback(node);
            forEachNode(node.childNodes, callback);
        }

        return nodesCopy
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
