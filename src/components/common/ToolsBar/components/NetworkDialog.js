import React, {useState} from "react";
import {
    Button,
    Classes,
    Dialog,
    FormGroup,
    InputGroup,
    Intent,
    MenuItem,
} from "@blueprintjs/core";
import {createUseStyles} from "react-jss";
import {GiTeePipe} from 'react-icons/gi';
import {useDispatch, useSelector} from "react-redux";
import {Select} from "@blueprintjs/select";
import {generateId} from "../../../../helpers/data-helper";

export const NetworkDialog = ({dialogIsOpened, setDialogIsOpened, startCreateObject}) => {

    const styles = useStyles()

    const dispatch = useDispatch()

    const templates = useSelector(state => state.project.project && state.project.project.templates.networks)

    const [name, setName] = useState("")
    const [nameTouched, setNameTouched] = useState(false)

    const [selectedTemplate, setSelectedTemplate] = useState(null)
    const [selectedTemplateTouched, setSelectedTemplateTouched] = useState(false)

    const resetStates = () => {
        setName("")
        setNameTouched(false)
        setSelectedTemplate(null)
        setSelectedTemplateTouched(false)
    }

    const handleTemplateSelect = (item) => {
        setSelectedTemplateTouched(true)
        setSelectedTemplate(item)
    }

    const renderTemplateItem = (item) => {
        return (
            <MenuItem
                key={generateId()}
                onClick={() => handleTemplateSelect(item)}
                text={item.properties.name}
            />
        );
    }

    return <Dialog
        icon={<GiTeePipe size={16} className={"bp3-icon material-icon"}/>}
        onClose={() => {
            setDialogIsOpened(null)
        }}
        title={<span className={styles.dialogTitle}>Create network</span>}
        autoFocus={false}
        enforceFocus={false}
        canEscapeKeyClose={false}
        canOutsideClickClose={false}
        usePortal={true}
        style={{width: 450, height: 450, borderRadius: 2}}
        isOpen={!!dialogIsOpened}
    >
        <div className={[Classes.DIALOG_BODY]}>

            <p className={styles.dialogText}>
                Network name:
            </p>
            <FormGroup
                disabled={false}
                helperText={(!name && nameTouched) && "Please enter network name..."}
                intent={(!name && nameTouched) ? Intent.DANGER : Intent.NONE}
                labelFor="name"
                fill
                className={styles.labelText}
            >
                <InputGroup id="name"
                            placeholder="Enter network name"
                            className={styles.labelText}
                            intent={(!name && nameTouched) ? Intent.DANGER : Intent.NONE}
                            value={name}
                            type={"text"}
                            leftIcon={"clipboard"}
                            onChange={e => {
                                setNameTouched(true)
                                setName(e.target.value)
                            }}
                />
            </FormGroup>

            <p className={styles.dialogText}>
                Select template:
            </p>
            <Select
                items={templates}
                itemRenderer={renderTemplateItem}
                activeItem={selectedTemplate && selectedTemplate.properties.name}
                className="fullwidth"
                popoverProps={{minimal: true, portalClassName: "fullwidth", popoverClassName: "selectPopover"}}
                filterable={false}
                onItemSelect={handleTemplateSelect}
            >
                <Button text={<span
                    className={styles.selectText}>{selectedTemplate && selectedTemplate.properties.name || "Select template..."}</span>}
                        rightIcon="caret-down" alignText="left" fill="{true}"/>
            </Select>

            {(!selectedTemplate && selectedTemplateTouched) &&
            <p className={styles.errorText}>Set template!</p>}
        </div>
        <div className={Classes.DIALOG_FOOTER}>
            <div className={Classes.DIALOG_FOOTER_ACTIONS}>
                <Button intent={Intent.NONE}
                        style={{width: 90, fontFamily: "Montserrat", fontSize: 13}}
                        onClick={() => {
                            resetStates()
                            setDialogIsOpened(null)
                        }}>
                    Close
                </Button>
                <Button disabled={!name || !selectedTemplate}
                        style={{width: 90, fontFamily: "Montserrat", fontSize: 13}}
                        text={"Create"}
                        intent={Intent.SUCCESS}
                        onClick={() => {
                            startCreateObject("network", name, {templateId: selectedTemplate.id})
                            resetStates()
                            setDialogIsOpened(null)
                        }}>
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
    solvergyBuildingsIcon: {
        display: "inline-block",
        verticalAlign: "middle",
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