import {Tree, Icon} from "@blueprintjs/core";
import React, {useState} from "react";
import {createUseStyles} from "react-jss";
import MaterialIcon from '@mdi/react'
import { mdiContentSave, mdiFolder } from '@mdi/js'
import { FcFolder } from 'react-icons/fc';


export const ObjectsTree = () => {

    const styles = useStyles()

    const [nodes, setNodes] = useState(initialNodes)

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
        fontSize: 12,
        fontWeight: 400,
        fontFamily: "Montserrat",
        color: "#5c7080"
    },
    backgroundNode: {
        backgroundColor: "red"
    }
})

const initialNodes = [
    {
        id: 0,
        hasCaret: true,
        isExpanded: true,
        icon: <Icon icon={<FcFolder size={16} className={"bp3-icon material-icon-tree"}/>} />,
        label: "Folder 0",
        childNodes: [
            {
                id: 1,
                icon: "document",
                label: "Item 0",
            },
            {
                id: 2,
                icon: <Icon icon={<MaterialIcon path={mdiContentSave} className={"bp3-icon material-icon-tree"}/>} />,
                label: "Organic meditation",
            },
            {
                id: 3,
                hasCaret: true,
                icon: "folder-close",
                label: "Item 0",
                childNodes: [
                    {
                        id: 11,
                        icon: "document",
                        label: "Item 0",
                    },
                    {
                        id: 21,
                        icon: "tag",
                        label: "Organic meditation",
                    },
                    {
                        id: 31,
                        hasCaret: true,
                        icon: "folder-close",
                        label: "Item 0",
                    },
                ]
            },
        ],
    },
    {
        id: 4,
        icon: "folder-close",
        isExpanded: false,
        label: "Folder 2",
        childNodes: [
            {
                id: 5,
                icon: "document",
                label: "Item 0",
            },
            {
                id: 6,
                icon: "tag",
                label: "Organic meditation",
            },
            {
                id: 7,
                hasCaret: true,
                icon: "folder-close",
                label: "Item 0",
            },
        ],
    }
];