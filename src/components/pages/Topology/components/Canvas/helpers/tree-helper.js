import React from 'react'
import {Icon} from "@blueprintjs/core";
import {GiTeePipe, GiHouse, GiFactory} from 'react-icons/gi';

export const addObjectInTree = (objectType, objectName) => prevState => {

    const object = getNewObjectData(objectType, objectName)

    const objectTypeIndex = prevState[0].childNodes.findIndex(objType => objType.id === objectType)

    const updatedObject = {
        ...prevState[0].childNodes[objectTypeIndex],
        disabled: false,
        childNodes: [
            ...prevState[0].childNodes[objectTypeIndex].childNodes,
            object
        ]
    }

    return [{
        ...prevState[0],
        childNodes: [
            ...prevState[0].childNodes.slice(0, objectTypeIndex),
            updatedObject,
            ...prevState[0].childNodes.slice(objectTypeIndex + 1),

        ]
    }]
}

const getNewObjectData = (objectType, objectName) => {
    const id = objectType + '_' + Math.random().toString(36).substr(2, 9)
    return {
        id,
        icon: getObjectIcon(objectType),
        label: objectName,
    }
}

const getObjectIcon = (objectType) => {
    switch (objectType) {
        case "consumer":  return <Icon icon={<GiHouse size={16} className={"bp3-icon material-icon-tree"}/>}/>
        case "supplier":  return <Icon icon={<GiFactory size={16} className={"bp3-icon material-icon-tree"}/>}/>
        case "network":  return <Icon icon={<GiTeePipe size={16} className={"bp3-icon material-icon-tree"}/>}/>
        default: return null
    }
}