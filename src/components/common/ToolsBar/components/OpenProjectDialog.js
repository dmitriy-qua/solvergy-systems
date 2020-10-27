import React, {useEffect, useMemo, useState} from "react";
import {createUseStyles} from "react-jss";
import {
    Button,
    Classes,
    Dialog, Divider,
    Intent, Tree,
} from "@blueprintjs/core";
import {FaFolder} from "react-icons/fa";
import {useDispatch, useSelector} from "react-redux";

import 'rc-slider/assets/index.css';
import {getUserProjects, setProjectIsLoading} from "../../../../redux/actions/auth";
import {forEachNode, updateNodeProperty} from "../../../pages/Topology/components/Canvas/helpers/tree-helper";
import {deleteProject, openProject, setNodes} from "../../../../redux/actions/project";
import {Loading} from "../../Notifications/Loading";
import {DeleteConfirmationDialog} from "./DeleteConfirmationDialog";

export const OpenProjectDialog = ({setDialogIsOpened, dialogIsOpened, project = null}) => {

    const styles = useStyles()

    const dispatch = useDispatch()

    const userProjects = useSelector(state => state.auth.userProjects)
    const projectIsDeleting = useSelector(state => state.auth.projectIsDeleting)

    const [selectedProject, setSelectedProject] = useState(null)
    const [nodes, setNodes] = useState(null)

    const [deleteConfirmationDialogIsOpened, setDeleteConfirmationDialogIsOpened] = useState(false)

    useEffect(() => {
        if (dialogIsOpened) {
            dispatch(setProjectIsLoading(true))
            dispatch(getUserProjects())
            setTimeout(() => dispatch(setProjectIsLoading(false)), 1500)
        }
    }, [dialogIsOpened])

    useEffect(() => {
        if (userProjects) {
            const nodes = renderNodes(userProjects, project)
            setNodes(nodes)
            if (project) {
                const currentProject = userProjects.find(({id}) => id === project.id)
                setSelectedProject(currentProject)
            }
        }

    }, [userProjects])

    const handleNodeClick = (nodeData, _nodePath, e) => {
        let newNodes = forEachNode(nodes, n => (n.isSelected = false))
        newNodes = updateNodeProperty(newNodes, nodeData.id, "isSelected", true)
        const selectedProject = userProjects.find(project => project.id === nodeData.id)
        setSelectedProject(selectedProject)
        setNodes(newNodes)
    }

    const deleteSelectedProject = () => {
        dispatch(deleteProject(selectedProject.id))
        setSelectedProject(null)
    }

    return <Dialog
        icon={<FaFolder size={16} className={"bp3-icon material-icon"}/>}
        onClose={() => {
            setDialogIsOpened(null)
        }}
        title={<span className={styles.dialogTitle}>Open project</span>}
        autoFocus={false}
        enforceFocus={false}
        canEscapeKeyClose={false}
        canOutsideClickClose={false}
        usePortal={true}
        style={{width: 650, height: 550, borderRadius: 2}}
        isOpen={!!dialogIsOpened}
    >
        <div className={[Classes.DIALOG_BODY]} style={{overflow: "auto", paddingRight: 4, paddingLeft: 4}}>

            {userProjects && nodes && !projectIsDeleting ? <>
                    <div style={{display: "flex"}}>
                        <div style={{flex: "50%"}}>
                            <p className={styles.dialogText}>
                                Select project:
                            </p>
                            <div style={{
                                backgroundColor: "white",
                                height: 390,
                                marginRight: 20,
                                border: "2px solid #eceff1"
                            }}>
                                <Tree
                                    contents={nodes}
                                    onNodeClick={handleNodeClick}
                                    className={[styles.text]}

                                />
                            </div>

                        </div>
                        <div style={{flex: "1%", borderLeft: "1px solid #e0e0e0"}}>

                        </div>
                        <div style={{flex: "49%"}}>
                            {selectedProject && <>
                                <p className={styles.dialogText}>
                                    Project information:
                                </p>
                                <Divider style={{marginBottom: 12}}/>

                                <p className={styles.projectInfo}>
                                    Name: <span className={styles.bold}>{selectedProject.info.name}</span>
                                </p>
                                <p className={styles.projectInfo}>
                                    Location: <span className={styles.bold}>{selectedProject.info.location}</span>
                                </p>
                                <p className={styles.projectInfo}>
                                    Coordinates: <span
                                    className={styles.bold}>{selectedProject.info.coordinates.latitude}, {selectedProject.info.coordinates.longitude}</span>
                                </p>
                                <p className={styles.projectInfo}>
                                    Currency: <span className={styles.bold}>{selectedProject.info.currency}</span>
                                </p>
                                <p className={styles.projectInfo}>
                                    Model type: <span className={styles.bold}>{selectedProject.type.modelType}</span>
                                </p>
                                <p className={styles.projectInfo}>
                                    Energy system type: {selectedProject.type.energySystemType.map((type, i) => {
                                    return i === selectedProject.type.energySystemType.length - 1 ?
                                        <span key={i} className={styles.bold}>{type}</span>
                                        :
                                        <span key={i} className={styles.bold}>{type}, </span>
                                })}
                                </p>
                            </>}
                        </div>
                    </div>
                </>
                :
                <Loading isOpen={!userProjects || !nodes || projectIsDeleting}/>
            }

            <DeleteConfirmationDialog dialogIsOpened={deleteConfirmationDialogIsOpened}
                                      setDialogIsOpened={setDeleteConfirmationDialogIsOpened}
                                      message={<span>Do you really want to delete project <b>{selectedProject && selectedProject.info.name}</b>?</span>}
                                      action={deleteSelectedProject}
            />
        </div>
        <div className={Classes.DIALOG_FOOTER}>
            <div className={Classes.DIALOG_FOOTER_ACTIONS}>
                <Button intent={Intent.NONE}
                        style={{width: 90, fontFamily: "Montserrat", fontSize: 13}}
                        onClick={() => {
                            setSelectedProject(null)
                            setNodes(null)
                            setDialogIsOpened(false)
                        }}>
                    Close
                </Button>
                <Button intent={Intent.DANGER}
                        disabled={!selectedProject || (project && selectedProject.id === project.id)}
                        style={{width: 90, fontFamily: "Montserrat", fontSize: 13}}
                        onClick={() => {
                            setDeleteConfirmationDialogIsOpened(true)
                        }}>
                    Delete
                </Button>
                <Button disabled={!selectedProject}
                        style={{width: 90, fontFamily: "Montserrat", fontSize: 13}}
                        text={"Open"}
                        intent={Intent.SUCCESS}
                        onClick={() => {
                            dispatch(openProject(selectedProject.id))
                            setSelectedProject(null)
                            setNodes(null)
                            setDialogIsOpened(false)
                        }}>
                </Button>
            </div>
        </div>
    </Dialog>

}

const renderNodes = (userProjects, project) => {
    return userProjects.map(({id, info}) => {
        return {
            id,
            hasCaret: true,
            isExpanded: false,
            label: info.name,
            isSelected: project && id === project.id,
            icon: "document",
            secondaryLabel: project && id === project.id ? "(current)" : ""
        }
    })
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
