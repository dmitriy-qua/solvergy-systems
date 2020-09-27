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
import $ from 'jquery'
import 'rc-slider/assets/index.css';
import {forEachNode, updateNodeProperty} from "../../../pages/Topology/components/Canvas/helpers/tree-helper";
import {generateId} from "../../../../helpers/data-helper";
import {helpStructure} from "../../../data/help-tree";
import {setNodes} from "../../../../redux/actions/project";
import {
    AuthenticationHelp, ConsumersHelp,
    GeneralHelp, NetworksTemplatesHelp,
    NewProjectAuthenticationHelp,
    NewProjectHelp,
    NewProjectInfoHelp,
    NewProjectMapHelp,
    NewProjectTypeHelp, ObjectsHelp, OpenProjectHelp, ProducersHelp,
    ProjectHelp, SaveAsProjectHelp, SaveProjectHelp,
    SignInHelp,
    SignOutHelp,
    SignUpHelp, SuppliersTemplatesHelp, TemplatesHelp
} from "../../../data/help-data";


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

    useEffect(() => {
        const infoDiv = document.getElementById('info')
        if (infoDiv) infoDiv.scrollTop = 0
    }, [selectedCategoryId])

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
        style={{width: 1100, height: 620, borderRadius: 2}}
        isOpen={!!dialogIsOpened}
    >
        <div className={[Classes.DIALOG_BODY]} style={{overflow: "hidden", paddingRight: 4, paddingLeft: 4}}>

            <div style={{display: "flex"}}>
                <div style={{flex: "30%"}}>
                    <div style={{
                        backgroundColor: "white",
                        height: 490,
                        marginRight: 20,
                        //border: "2px solid #eceff1",
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
                <div style={{flex: "69%", }}>
                    {selectedCategoryId && <div id="info" style={{
                        backgroundColor: "white",
                        height: 490,
                        marginLeft: 12,
                        //border: "2px solid #eceff1",
                        overflow: "auto"
                    }}>

                        {selectedCategoryId === "general" && <GeneralHelp styles={styles}/>}
                        {selectedCategoryId === "authentication" && <AuthenticationHelp styles={styles}/>}
                        {selectedCategoryId === "signin" && <SignInHelp styles={styles}/>}
                        {selectedCategoryId === "signup" && <SignUpHelp styles={styles}/>}
                        {selectedCategoryId === "signout" && <SignOutHelp styles={styles}/>}
                        {selectedCategoryId === "project" && <ProjectHelp styles={styles}/>}
                        {selectedCategoryId === "newproject" && <NewProjectHelp styles={styles}/>}
                        {selectedCategoryId === "newproject_authentication" && <NewProjectAuthenticationHelp styles={styles}/>}
                        {selectedCategoryId === "newproject_projectinfo" && <NewProjectInfoHelp styles={styles}/>}
                        {selectedCategoryId === "newproject_modeltype" && <NewProjectTypeHelp styles={styles}/>}
                        {selectedCategoryId === "newproject_mapsettings" && <NewProjectMapHelp styles={styles}/>}
                        {selectedCategoryId === "openproject" && <OpenProjectHelp styles={styles}/>}
                        {selectedCategoryId === "saveproject" && <SaveProjectHelp styles={styles}/>}
                        {selectedCategoryId === "saveasproject" && <SaveAsProjectHelp styles={styles}/>}
                        {selectedCategoryId === "templates" && <TemplatesHelp styles={styles}/>}
                        {selectedCategoryId === "supplierstemplates" && <SuppliersTemplatesHelp styles={styles}/>}
                        {selectedCategoryId === "networkstemplates" && <NetworksTemplatesHelp styles={styles}/>}
                        {selectedCategoryId === "producers" && <ProducersHelp styles={styles}/>}
                        {selectedCategoryId === "objects" && <ObjectsHelp styles={styles}/>}
                        {selectedCategoryId === "consumers" && <ConsumersHelp styles={styles}/>}


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
        marginLeft: 10,
        marginTop: 10,
        fontFamily: 'Montserrat'
    },
    dialogText: {
        fontWeight: 400,
        fontSize: 12,
        marginLeft: 10,
        marginRight: 10,
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
