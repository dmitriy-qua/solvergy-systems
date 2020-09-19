import React from 'react'
import {Icon} from "@blueprintjs/core";
import {GiTeePipe, GiHouse, GiFactory} from 'react-icons/gi';
import {FaObjectUngroup} from 'react-icons/fa';

export const addObjectInTree = (nodes, objectType, objectName, id, info = null) => {

    const object = getNewObjectData(objectType, objectName, id, info)

    const objectTypeIndex = nodes[0].childNodes.findIndex(objType => objType.id === objectType)

    const updatedObject = {
        ...nodes[0].childNodes[objectTypeIndex],
        disabled: false,
        childNodes: [
            ...nodes[0].childNodes[objectTypeIndex].childNodes,
            object
        ]
    }

    return [{
        ...nodes[0],
        childNodes: [
            ...nodes[0].childNodes.slice(0, objectTypeIndex),
            updatedObject,
            ...nodes[0].childNodes.slice(objectTypeIndex + 1),

        ]
    }]
}

const getNewObjectData = (objectType, objectName, id, info) => {
    return {
        id,
        //icon: getObjectIcon(objectType),
        objectType,
        childNodes: [],
        hasCaret: false,
        label: info ? objectName + " ("+ info + ")" : objectName,
    }
}

export const getObjectIcon = (objectType) => {
    switch (objectType) {
        case "consumer":  return <Icon icon={<GiHouse size={16} className={"bp3-icon material-icon-tree"}/>}/>
        case "supplier":  return <Icon icon={<GiFactory size={16} className={"bp3-icon material-icon-tree"}/>}/>
        case "network":  return <Icon icon={<GiTeePipe size={16} className={"bp3-icon material-icon-tree"}/>}/>
        case "objects":  return  <Icon icon={<FaObjectUngroup size={16} className={"bp3-icon material-icon-tree"}/>}/>
        default: return null
    }
}

export const updateNodeProperty = (nodes, id, key, value) => {
    const nodesCopy = [...nodes]
    nodesCopy.forEach(function recursiveNodeUpdate(node) {
        if (id === node.id) {
            node[key] = value
        }

        Array.isArray(node.childNodes) && node.childNodes.forEach(recursiveNodeUpdate);
    });

    return nodesCopy
}

export const forEachNode = (nodes, callback) => {
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

export const forEachNodeFilter = (nodes, id) => {

    nodes.childNodes = nodes.childNodes
        .filter((child) => {
            return child.id !== id
        })
        .map((child) => {
            return forEachNodeFilter(child, id)
        })

    if (nodes.childNodes.length === 0 && nodes.hasCaret) {
        nodes.isExpanded = false
        nodes.disabled = true
    }

    return {...nodes}
}

export const unselectAllNodes = (nodes) => {
    return forEachNode(nodes, n => (n.isSelected = false))
}

export const getSelectedTreeNode = (object, nodes) => {
    const unselectedNodes = unselectAllNodes(nodes)
    return updateNodeProperty(unselectedNodes, object.id, "isSelected", true)
}

