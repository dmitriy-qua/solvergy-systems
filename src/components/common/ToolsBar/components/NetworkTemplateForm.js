import React, {useState} from "react";
import {
    Button,
    FormGroup,
    InputGroup,
    Intent, MenuItem, NumericInput,
} from "@blueprintjs/core";
import {createUseStyles} from "react-jss";
import {useDispatch, useSelector} from "react-redux"
import {generateId, updateObjectKey} from "../../../../helpers/data-helper";
import {
    addNewNetworkTemplate,
    setNetworkTemplates,
} from "../../../../redux/actions/project";
import {Select} from "@blueprintjs/select";
import {pipeLayingTypes} from "../../../data/pipe-laying-types";
import {insulationTypes} from "../../../data/insulation-types";


export const NetworkTemplateForm = ({type, setType, templates, selectedTemplate, setSelectedTemplate}) => {

    const styles = useStyles()

    const dispatch = useDispatch()

    const initialTemplate = {
        name: "",
        diameter: "",
        insulationThickness: "",
        insulationType: "",
        pipeLayingType: ""
    }

    const [properties, setProperties] = useState(selectedTemplate ? selectedTemplate.properties : initialTemplate)
    const [nameTouched, setNameTouched] = useState(false)
    const [diameterTouched, setDiameterTouched] = useState(false)
    const [insulationThicknessTouched, setInsulationThicknessTouched] = useState(false)
    const [selectedInsulationTypeTouched, setSelectedInsulationTypeTouched] = useState(false)
    const [selectedPipeLayingTypeTouched, setSelectedPipeLayingTypeTouched] = useState(false)

    const handleInsulationTypeSelect = (item) => {
        setSelectedInsulationTypeTouched(true)
        setProperties(prevState => ({
            ...prevState,
            insulationType: item
        }))
    }

    const handlePipeLayingTypeSelect = (item) => {
        setSelectedPipeLayingTypeTouched(true)
        setProperties(prevState => ({
            ...prevState,
            pipeLayingType: item
        }))
    }

    const renderInsulationTypeItem = (item) => {
        return (
            <MenuItem
                key={generateId()}
                onClick={() => handleInsulationTypeSelect(item)}
                text={item.name}
            />
        );
    }

    const renderPipeLayingTypeItem = (item) => {
        return (
            <MenuItem
                key={generateId()}
                onClick={() => handlePipeLayingTypeSelect(item)}
                text={item.name}
            />
        );
    }

    const resetStates = () => {
        setProperties(initialTemplate)
        setNameTouched(false)
        setDiameterTouched(false)
        setInsulationThicknessTouched(false)
        setSelectedInsulationTypeTouched(false)
        setSelectedPipeLayingTypeTouched(false)
    }

    return <div style={{paddingRight: 10, paddingLeft: 10}}>
        <div>
            <p className={styles.dialogText}>
                Template name:
            </p>
            <FormGroup
                disabled={false}
                helperText={(!properties.name && nameTouched) && "Please enter template name..."}
                intent={(!properties.name && nameTouched) ? Intent.DANGER : Intent.NONE}
                labelFor="name"
                fill
                className={styles.labelText}
            >
                <InputGroup id="name"
                            placeholder="Enter template name"
                            className={styles.labelText}
                            intent={(!properties.name && nameTouched) ? Intent.DANGER : Intent.NONE}
                            value={properties.name}
                            type={"text"}
                            leftIcon={"clipboard"}
                            onChange={e => {
                                e.persist()
                                setNameTouched(true)
                                setProperties(prevState => ({
                                    ...prevState,
                                    name: e.target.value
                                }))
                            }}
                />
            </FormGroup>
        </div>

        <div style={{display: "flex"}}>
            <div style={{flex: "50%", paddingRight: 10}}>
                <p className={styles.dialogText}>
                    Network outer diameter:
                </p>
                <NumericInput placeholder="Enter value in mm..."
                              onValueChange={(value) => {
                                  setDiameterTouched(true)
                                  setProperties(prevState => ({
                                      ...prevState,
                                      diameter: value
                                  }))
                              }}
                              className={styles.inputText}
                              allowNumericCharactersOnly
                              selectAllOnIncrement
                              majorStepSize={10}
                              min={0}
                              minorStepSize={0.1}
                              stepSize={1}
                              value={properties.diameter}
                              leftIcon="full-circle"
                              fill
                              intent={(!properties.diameter && diameterTouched) ? Intent.DANGER : Intent.NONE}
                />
                {(!properties.diameter && diameterTouched) && <span className={styles.errorText}>Enter value...</span>}
            </div>

            <div style={{flex: "50%", paddingLeft: 10}}>
                <p className={styles.dialogText}>
                    Network insulation thickness:
                </p>
                <NumericInput placeholder="Enter value in mm..."
                              onValueChange={(value) => {
                                  setInsulationThicknessTouched(true)
                                  setProperties(prevState => ({
                                      ...prevState,
                                      insulationThickness: value
                                  }))
                              }}
                              className={styles.inputText}
                              allowNumericCharactersOnly
                              selectAllOnIncrement
                              majorStepSize={10}
                              min={0}
                              minorStepSize={0.1}
                              stepSize={1}
                              value={properties.insulationThickness}
                              leftIcon="ring"
                              fill
                              intent={(!properties.insulationThickness && insulationThicknessTouched) ? Intent.DANGER : Intent.NONE}
                />
                {(!properties.insulationThickness && insulationThicknessTouched) && <span className={styles.errorText}>Enter value...</span>}
            </div>

        </div>

        <div style={{display: "flex", marginTop: 12}}>
            <div style={{flex: "50%", paddingRight: 10}}>
                <p className={styles.dialogText}>
                    Type of network laying:
                </p>
                <Select
                    items={insulationTypes}
                    itemRenderer={renderInsulationTypeItem}
                    activeItem={properties.insulationType && properties.insulationType.name}
                    className="fullwidth"
                    popoverProps={{
                        minimal: true,
                        portalClassName: "fullwidth",
                        popoverClassName: "selectPopover"
                    }}
                    filterable={false}
                    onItemSelect={handleInsulationTypeSelect}
                >
                    <Button text={<span
                        className={styles.selectText}>{properties.insulationType && properties.insulationType.name || "Select insulation type..."}</span>}
                            rightIcon="caret-down" alignText="left" fill="{true}"/>
                </Select>

                {(!properties.insulationType && selectedInsulationTypeTouched) && <span className={styles.errorText}>Set insulation type!</span>}
            </div>
            <div style={{flex: "50%", paddingLeft: 10}}>
                <p className={styles.dialogText}>
                    Network insulation type:
                </p>
                <Select
                    items={pipeLayingTypes}
                    itemRenderer={renderPipeLayingTypeItem}
                    activeItem={properties.pipeLayingType && properties.pipeLayingType.name}
                    className="fullwidth"
                    popoverProps={{
                        minimal: true,
                        portalClassName: "fullwidth",
                        popoverClassName: "selectPopover"
                    }}
                    filterable={false}
                    onItemSelect={handlePipeLayingTypeSelect}
                >
                    <Button text={<span
                        className={styles.selectText}>{properties.pipeLayingType && properties.pipeLayingType.name || "Select pipe laying type..."}</span>}
                            rightIcon="caret-down" alignText="left" fill="{true}"/>
                </Select>

                {(!properties.pipeLayingType && selectedPipeLayingTypeTouched) && <span className={styles.errorText}>Set pipe laying type!</span>}
            </div>
        </div>
        <div style={{display: "flex", justifyContent: "center", marginTop: 10}}>
            <Button intent={Intent.SUCCESS}
                    disabled={Object.keys(properties).some(k => !properties[k])}
                    style={{width: 90, fontFamily: "Montserrat", fontSize: 13, margin: 10}}
                    onClick={() => {
                        if (type === "new") {
                            dispatch(addNewNetworkTemplate({
                                properties,
                                id: "network_template_" + generateId()
                            }))
                        } else if (type === "edit") {
                            const updatedTemplates = updateObjectKey(templates, selectedTemplate, properties, "properties")
                            dispatch(setNetworkTemplates(updatedTemplates))
                        }

                        resetStates()
                        setSelectedTemplate(null)
                        setType(null)
                    }}>
                {type === "new" ? "Create" : "Save"}
            </Button>

            <Button intent={Intent.NONE}
                    style={{width: 90, fontFamily: "Montserrat", fontSize: 13, margin: 10}}
                    onClick={() => {
                        setSelectedTemplate(null)
                        resetStates()
                        setType(null)
                    }}>
                Cancel
            </Button>
        </div>
    </div>

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