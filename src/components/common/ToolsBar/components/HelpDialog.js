import React, {useEffect, useState} from "react";
import {createUseStyles} from "react-jss";
import {
    Button,
    Classes,
    Dialog, Divider, FormGroup, InputGroup,
    Intent, Tree,
} from "@blueprintjs/core";
import {FaInfoCircle} from "react-icons/fa";
import {useDispatch, useSelector} from "react-redux";

import 'rc-slider/assets/index.css';
import {forEachNode, updateNodeProperty} from "../../../pages/Topology/components/Canvas/helpers/tree-helper";
import {generateId} from "../../../../helpers/data-helper";
import {helpStructure} from "../../../data/help-tree";
import {setNodes} from "../../../../redux/actions/project";


export const HelpDialog = ({setDialogIsOpened, dialogIsOpened}) => {

    const styles = useStyles()

    const [selectedCategoryId, setSelectedCategoryId] = useState(null)
    const [nodes, setNodes] = useState(helpStructure)

    const dispatch = useDispatch()

    const handleNodeClick = (nodeData, _nodePath, e) => {
        let newNodes = forEachNode(nodes, n => (n.isSelected = false))
        newNodes = updateNodeProperty(newNodes, nodeData.id, "isSelected", true)
        setSelectedCategoryId(nodeData.id)
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

    return <Dialog
        icon={<FaInfoCircle size={16} className={"bp3-icon material-icon"}/>}
        onClose={() => {
            setDialogIsOpened(null)
        }}
        title={<span className={styles.dialogTitle}>Help</span>}
        autoFocus={false}
        enforceFocus={false}
        canEscapeKeyClose={false}
        canOutsideClickClose={false}
        usePortal={true}
        style={{width: 950, height: 620, borderRadius: 2}}
        isOpen={!!dialogIsOpened}
    >
        <div className={[Classes.DIALOG_BODY]} style={{overflow: "hidden", paddingRight: 4, paddingLeft: 4}}>

            <div style={{display: "flex"}}>
                <div style={{flex: "37%"}}>
                    <div style={{
                        backgroundColor: "white",
                        height: 490,
                        marginRight: 20,
                        border: "2px solid #eceff1",
                        overflow: "auto"
                    }}>
                        <Tree
                            contents={nodes}
                            onNodeClick={handleNodeClick}
                            onNodeCollapse={handleNodeCollapse}
                            onNodeExpand={handleNodeExpand}
                            className={[styles.text]}
                        />
                    </div>

                </div>
                <div style={{flex: "1%", borderLeft: "1px solid #e0e0e0"}}>

                </div>
                <div style={{flex: "62%", }}>
                    {selectedCategoryId && <div style={{
                        backgroundColor: "white",
                        height: 490,
                        marginLeft: 12,
                        border: "2px solid #eceff1",
                        overflow: "auto"
                    }}>

                    </div>}
                </div>
            </div>

        </div>
        <div className={Classes.DIALOG_FOOTER}>
            <div className={Classes.DIALOG_FOOTER_ACTIONS}>
                <Button intent={Intent.NONE}
                        style={{width: 90, fontFamily: "Montserrat", fontSize: 13}}
                        onClick={() => {
                            setDialogIsOpened(false)
                        }}>
                    Close
                </Button>
            </div>
        </div>
    </Dialog>

}

const useStyles = createUseStyles({
    text: {
        //paddingLeft: -16,
        fontWeight: 500,
        fontSize: 12,
        fontFamily: "Montserrat"
    },
    bold: {
        fontWeight: 700,
    },
    projectInfo: {
        marginLeft: 10,
        fontWeight: 500,
        fontSize: 12,
        fontFamily: "Montserrat"
    },
    switchTextContainer: {
        lineHeight: 1.5,
        display: "inline-block",
        // justifyContent: "center",
        // alignItems: "center",
        // verticalAlign: "middle"
    },
    selectText: {
        fontWeight: 500,
        fontSize: 13,
        fontFamily: "Montserrat"
    },
    errorText: {
        marginLeft: 0,
        marginTop: 8,
        fontWeight: 500,
        color: "#c23030",
        fontSize: 10,
        fontFamily: "Montserrat",
        display: "block"
    },
    dialogTitle: {
        fontWeight: 600,
        fontSize: 14,
        marginLeft: 0,
        fontFamily: 'Montserrat'
    },
    dialogText: {
        fontWeight: 600,
        fontSize: 12,
        marginLeft: 10,
        fontFamily: 'Montserrat',
    },
    listText: {
        fontWeight: 600,
        fontSize: 13,
        fontFamily: 'Montserrat',
        color: "#444444",
    },
    indicatorText: {
        fontWeight: 600,
        fontSize: 16,
        fontFamily: 'Montserrat',
    },
    divider: {
        border: 0,
        height: 0,
        borderTop: "1px solid rgba(0, 0, 0, 0.1)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.3)"
    }
})
