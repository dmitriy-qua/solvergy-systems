import React, {useEffect, useState} from "react";
import {
    Button,
    Classes,
    Dialog,
    FormGroup,
    InputGroup,
    Intent,
    MenuItem, NumericInput,
} from "@blueprintjs/core";
import {createUseStyles} from "react-jss";
import {GiFactory} from 'react-icons/gi';
import {useDispatch, useSelector} from "react-redux";
import {Select} from "@blueprintjs/select";
import {generateId, updateObject} from "../../../../helpers/data-helper";
import {setObjects} from "../../../../redux/actions/project";

export const SupplierDialog = ({dialogIsOpened, setDialogIsOpened, startCreateObject, selectedObject, updateNodeLabel, canvas}) => {

    const styles = useStyles()

    const dispatch = useDispatch()
    const suppliers = useSelector(state => state.project.objects.suppliers)
    const producers = useSelector(state => state.project.objects.producers)
    const templates = useSelector(state => state.project.templates.suppliers)

    const [name, setName] = useState("")
    const [nameTouched, setNameTouched] = useState(false)

    const [capacity, setCapacity] = useState("")
    const [capacityTouched, setCapacityTouched] = useState(false)

    const [selectedProducer, setSelectedProducer] = useState(null)
    const [selectedProducerTouched, setSelectedProducerTouched] = useState(false)

    const [selectedTemplate, setSelectedTemplate] = useState(null)
    const [selectedTemplateTouched, setSelectedTemplateTouched] = useState(false)

    useEffect(() => {
        if (dialogIsOpened === "edit" && selectedObject) {
            const object = suppliers.find(object => object.id === selectedObject.id)

            setName(object.name)
            setCapacity(object.capacity)

            const producer = producers.find(producer => producer.id === object.producerId)
            setSelectedProducer(producer)

            const template = templates.find(template => template.id === object.templateId)
            setSelectedTemplate(template)
        }
    }, [selectedObject, dialogIsOpened])

    const resetStates = () => {
        setName("")
        setCapacity("")
        setCapacityTouched(false)
        setNameTouched(false)
        setSelectedProducer(null)
        setSelectedTemplate(null)
        setSelectedProducerTouched(false)
        setSelectedTemplateTouched(false)
    }

    const handleProducerSelect = (item) => {
        setSelectedProducerTouched(true)
        setSelectedProducer(item)
    }

    const handleTemplateSelect = (item) => {
        setSelectedTemplateTouched(true)
        setSelectedTemplate(item)
    }

    const renderProducerItem = (item) => {
        return (
            <MenuItem
                key={generateId()}
                onClick={() => handleProducerSelect(item)}
                text={item.name}
            />
        );
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
        icon={<GiFactory size={16} className={"bp3-icon material-icon"}/>}
        onClose={() => {
            setDialogIsOpened(null)
        }}
        title={<span className={styles.dialogTitle}>Create supplier</span>}
        autoFocus={false}
        enforceFocus={false}
        canEscapeKeyClose={false}
        canOutsideClickClose={false}
        usePortal={true}
        style={{width: 450, height: 550, borderRadius: 2}}
        isOpen={!!dialogIsOpened}
    >
        <div className={[Classes.DIALOG_BODY]}>

            <p className={styles.dialogText}>
                Supplier name:
            </p>
            <FormGroup
                disabled={false}
                helperText={(!name && nameTouched) && "Please enter supplier name..."}
                intent={(!name && nameTouched) ? Intent.DANGER : Intent.NONE}
                labelFor="name"
                fill
                className={styles.labelText}
            >
                <InputGroup id="name"
                            placeholder="Enter supplier name"
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
                Station capacity, MW::
            </p>
            <NumericInput placeholder="Enter value in MW..."
                          onValueChange={(value) => {
                              setCapacityTouched(true)
                              setCapacity(value)
                          }}
                          className={styles.inputText}
                          allowNumericCharactersOnly
                          selectAllOnIncrement
                          majorStepSize={10}
                          min={0}
                          minorStepSize={0.1}
                          stepSize={1}
                          value={capacity}
                          leftIcon="flow-linear"
                          fill
                          intent={(!capacity && capacityTouched) ? Intent.DANGER : Intent.NONE}
            />
            {(!capacity && capacityTouched) && <span className={styles.errorText}>Enter value...</span>}

            <p className={styles.dialogText} style={{marginTop: 14}}>
                Select producer:
            </p>
            <Select
                items={producers}
                itemRenderer={renderProducerItem}
                activeItem={selectedProducer && selectedProducer.name}
                className="fullwidth"
                popoverProps={{minimal: true, portalClassName: "fullwidth", popoverClassName: "selectPopover"}}
                filterable={false}
                onItemSelect={handleProducerSelect}
            >
                <Button text={<span
                    className={styles.selectText}>{selectedProducer && selectedProducer.name || "Select producer..."}</span>}
                        rightIcon="caret-down" alignText="left" fill="{true}"/>
            </Select>

            {(!selectedProducer && selectedProducerTouched) &&
            <p className={styles.errorText}>Set producer!</p>}

            <p className={styles.dialogText} style={{marginTop: 14}}>
                Select supplier template:
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
                <Button disabled={!name || !selectedProducer || !selectedTemplate || !capacity}
                        style={{width: 90, fontFamily: "Montserrat", fontSize: 13}}
                        text={dialogIsOpened === "new" ? "Create" : "Save"}
                        intent={Intent.SUCCESS}
                        onClick={() => {
                            if (dialogIsOpened === "edit") {
                                const updatedSuppliers = updateObject(suppliers, selectedObject.id, {name, producerId: selectedProducer.id, templateId: selectedTemplate.id, capacity})
                                dispatch(setObjects({objectType: "suppliers", newObjects: updatedSuppliers}))
                                const canvasObject = canvas.getObjects().find(object => object.id === selectedObject.id)
                                canvasObject.set({name})
                                updateNodeLabel(selectedObject.id, name)
                            } else if (dialogIsOpened === "new") {
                                startCreateObject("supplier", name, {producerId: selectedProducer.id, templateId: selectedTemplate.id, capacity})
                            }

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
        fontFamily: "Montserrat",
        display: "block"
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