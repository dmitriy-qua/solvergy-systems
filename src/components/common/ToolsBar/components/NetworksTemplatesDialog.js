import React, {useState} from "react";
import {
    Button,
    Classes,
    Dialog,
    Intent,
} from "@blueprintjs/core";
import {createUseStyles} from "react-jss";
import {GiHouse} from 'react-icons/gi';
import {useDispatch, useSelector} from "react-redux"
import {SelectList} from 'react-widgets'
import {setNetworkTemplates} from "../../../../redux/actions/project";
import {NameTextFieldForm} from "./NameTextFieldForm";
import {NetworkTemplateForm} from "./NetworkTemplateForm";


export const NetworksTemplatesDialog = ({dialogIsOpened, setDialogIsOpened, canvas}) => {

    const styles = useStyles()

    const dispatch = useDispatch()

    const templates = useSelector(state => state.project.templates.networks)

    let listItem = ({item}) => {
        return <span className={styles.selectText}>
            {item.properties.name}
        </span>
    }

    const [selectedTemplate, setSelectedTemplate] = useState(null)
    const [formType, setFormType] = useState(null)

    return <Dialog
        icon={<GiHouse size={16} className={"bp3-icon material-icon"}/>}
        onClose={() => {
            setDialogIsOpened(false)
        }}
        title={<span className={styles.dialogTitle}>Manage networks templates</span>}
        autoFocus={false}
        enforceFocus={false}
        canEscapeKeyClose={false}
        canOutsideClickClose={false}
        usePortal={true}
        style={{width: 550, height: 550, borderRadius: 2}}
        isOpen={dialogIsOpened}
    >
        <div className={[Classes.DIALOG_BODY]}>
            {!formType && <>
                <p className={styles.dialogText}>
                    Templates list:
                </p>
                <SelectList data={templates}
                            itemComponent={listItem}
                            onChange={item => setSelectedTemplate(item)}
                            value={selectedTemplate}
                />
                <br/>

                <div style={{display: "flex", justifyContent: "center"}}>
                    <Button intent={Intent.SUCCESS}
                            style={{width: 90, fontFamily: "Montserrat", fontSize: 13, margin: 10}}
                            onClick={() => {
                                setSelectedTemplate(null)
                                setFormType("new")
                            }}>
                        Add new
                    </Button>

                    <Button intent={Intent.DANGER}
                            disabled={!selectedTemplate}
                            style={{width: 90, fontFamily: "Montserrat", fontSize: 13, margin: 10}}
                            onClick={() => {
                                const newTemplatesList = templates.filter(template => template.id !== selectedTemplate.id)
                                dispatch(setNetworkTemplates(newTemplatesList))
                                setFormType(null)
                                setSelectedTemplate(null)
                            }}>
                        Delete
                    </Button>

                    <Button intent={Intent.NONE}
                            disabled={!selectedTemplate}
                            style={{width: 90, fontFamily: "Montserrat", fontSize: 13, margin: 10}}
                            onClick={() => {
                                setFormType("edit")
                            }}>
                        Edit
                    </Button>
                </div>
            </>}

            {formType && <NetworkTemplateForm setType={setFormType}
                                              type={formType}
                                              templates={templates}
                                              selectedTemplate={selectedTemplate}
                                              setSelectedTemplate={setSelectedTemplate}
                                              canvas={canvas}
            />}

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
        marginTop: 12,
        fontWeight: 600,
        fontSize: 13,
        fontFamily: "Montserrat"
    },
    bold: {
        fontWeight: 700,
    },
    switchTextContainer: {
        lineHeight: 0.95,
        display: "inline-block",
        justifyContent: "center",
        alignItems: "center",
        verticalAlign: "middle"
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
        fontFamily: "Montserrat"
    },
    dialogTitle: {
        fontWeight: 600,
        fontSize: 15,
        fontFamily: 'Montserrat'
    },
    dialogText: {
        fontWeight: 500,
        fontSize: 12,
        fontFamily: 'Montserrat',
    },
})