import React, {useEffect, useState} from "react";
import {createUseStyles} from "react-jss";
import {
    Button,
    Classes,
    Dialog, Divider, FormGroup, InputGroup,
    Intent, Tree,
} from "@blueprintjs/core";
import {FaFolder} from "react-icons/fa";
import {useDispatch, useSelector} from "react-redux";

import 'rc-slider/assets/index.css';
import {getUserProjects} from "../../../../redux/actions/auth";
import {forEachNode, updateNodeProperty} from "../../../pages/Topology/components/Canvas/helpers/tree-helper";
import {deleteProject, openProject, saveAsProject, setNodes} from "../../../../redux/actions/project";
import {Loading} from "../../Loading/Loading";
import {generateId} from "../../../../helpers/data-helper";

export const SaveAsProjectDialog = ({setDialogIsOpened, dialogIsOpened, project, canvas}) => {

    const styles = useStyles()

    const dispatch = useDispatch()

    const [newProjectName, setNewProjectName] = useState("")
    const [nameTouched, setNameTouched] = useState(false)

    return <Dialog
        icon={<FaFolder size={16} className={"bp3-icon material-icon"}/>}
        onClose={() => {
            setDialogIsOpened(null)
        }}
        title={<span className={styles.dialogTitle}>Save as...</span>}
        autoFocus={false}
        enforceFocus={false}
        canEscapeKeyClose={false}
        canOutsideClickClose={false}
        usePortal={true}
        style={{width: 450, height: 300, borderRadius: 2}}
        isOpen={!!dialogIsOpened}
    >
        <div className={[Classes.DIALOG_BODY]} style={{overflow: "auto", paddingRight: 4, paddingLeft: 4}}>
            <FormGroup
                disabled={false}
                helperText={(!newProjectName && nameTouched) && "Please enter project name..."}
                intent={(!newProjectName && nameTouched) ? Intent.DANGER : Intent.NONE}
                label={"Project new name: "}
                labelFor="name"
                fill
                className={styles.labelText}
            >
                <InputGroup id="name"
                            placeholder="Enter project new name"
                            className={styles.labelText}
                            intent={(!newProjectName && nameTouched) ? Intent.DANGER : Intent.NONE}
                            value={newProjectName}
                            type={"text"}
                            leftIcon={"clipboard"}
                            onChange={e => {
                                setNameTouched(true)
                                setNewProjectName(e.target.value)
                            }}
                />
            </FormGroup>

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
                <Button disabled={!newProjectName}
                        style={{width: 90, fontFamily: "Montserrat", fontSize: 13}}
                        text={"Save"}
                        intent={Intent.SUCCESS}
                        onClick={() => {
                            const id = generateId()
                            const oldId = project.id

                            const canvasState = canvas.toJSON(["circle1", "circle2", "objectType", "id", "networkType", "distance", "name", "connectedTo", "networkIsNew", "isCompleted"])

                            const newProject = {
                                ...project,
                                info: {
                                    ...project.info,
                                    name: newProjectName,
                                },
                                canvas: canvasState,
                                id
                            }

                            delete newProject["_id"]
                            dispatch(saveAsProject(newProject, oldId))
                            setDialogIsOpened(false)
                        }}>
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
