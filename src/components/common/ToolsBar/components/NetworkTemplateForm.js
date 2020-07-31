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
import {ReflexContainer, ReflexElement} from "react-reflex";
import {Select} from "@blueprintjs/select";


export const NetworkTemplateForm = ({type, setType, templates, selectedTemplate, setSelectedTemplate}) => {

    const styles = useStyles()

    const dispatch = useDispatch()

    const initialTemplate = {name: "", diameter: "", insulationThickness: ""}

    const [properties, setProperties] = useState(selectedTemplate ? selectedTemplate.properties : initialTemplate)
    const [nameTouched, setNameTouched] = useState(false)
    const [diameterTouched, setDiameterTouched] = useState(false)
    const [insulationThicknessTouched, setInsulationThicknessTouched] = useState(false)
    const [selectedInsulationTypeTouched, setSelectedInsulationTypeTouched] = useState(false)
    const [selectedPipeLayingTypeTouched, setSelectedPipeLayingTypeTouched] = useState(false)

    const handleInsulationTypeSelect = (item) => {
        setSelectedInsulationTypeTouched(true)
        setSelectedTemplate(item)
    }

    const handlePipeLayingTypeSelect = (item) => {
        setSelectedPipeLayingTypeTouched(true)
        setSelectedTemplate(item)
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
    }

    return <>
        <ReflexContainer orientation="horizontal">
            <ReflexElement size={78}>
                <div style={{paddingRight: 10, paddingLeft: 10}}>
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
            </ReflexElement>
            <ReflexElement size={78}>
                <ReflexContainer orientation="vertical">
                    <ReflexElement className="left-pane" style={{paddingRight: 10, paddingLeft: 10}}>
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
                        {(!properties.diameter && diameterTouched) &&
                        <p className={styles.errorText}>Enter value...</p>}
                    </ReflexElement>

                    <ReflexElement className="right-pane" style={{paddingRight: 10, paddingLeft: 10}}>
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
                        {(!properties.insulationThickness.diameter && insulationThicknessTouched) &&
                        <p className={styles.errorText}>Enter value...</p>}
                    </ReflexElement>
                </ReflexContainer>
            </ReflexElement>
            <ReflexElement size={78}>
                <ReflexContainer orientation="vertical" >

                    <ReflexElement className="left-pane" style={{paddingRight: 10, paddingLeft: 10}}>
                        <p className={styles.dialogText}>
                            Type of network laying:
                        </p>
                        <Select
                            items={templates}
                            itemRenderer={renderInsulationTypeItem}
                            activeItem={selectedTemplate && selectedTemplate.name}
                            className="fullwidth"
                            popoverProps={{minimal: true, portalClassName: "fullwidth", popoverClassName: "selectPopover"}}
                            filterable={false}
                            onItemSelect={handleInsulationTypeSelect}
                        >
                            <Button text={<span
                                className={styles.selectText}>{selectedTemplate && selectedTemplate.name || "Select template..."}</span>}
                                    rightIcon="caret-down" alignText="left" fill="{true}"/>
                        </Select>
                    </ReflexElement>

                    <ReflexElement className="right-pane" style={{paddingRight: 10, paddingLeft: 10}}>
                        <p className={styles.dialogText}>
                            Network insulation type:
                        </p>
                        <Select
                            items={templates}
                            itemRenderer={renderPipeLayingTypeItem}
                            activeItem={selectedTemplate && selectedTemplate.name}
                            className="fullwidth"
                            popoverProps={{minimal: true, portalClassName: "fullwidth", popoverClassName: "selectPopover"}}
                            filterable={false}
                            onItemSelect={handlePipeLayingTypeSelect}
                        >
                            <Button text={<span
                                className={styles.selectText}>{selectedTemplate && selectedTemplate.name || "Select template..."}</span>}
                                    rightIcon="caret-down" alignText="left" fill="{true}"/>
                        </Select>
                    </ReflexElement>
                </ReflexContainer>
            </ReflexElement>
            <ReflexElement>
                <div style={{display: "flex", justifyContent: "center"}}>
                    <Button intent={Intent.SUCCESS}
                            style={{width: 90, fontFamily: "Montserrat", fontSize: 13, margin: 10}}
                            onClick={() => {
                                if (type === "new") {
                                    dispatch(addNewNetworkTemplate({
                                        properties: {name: properties.name},
                                        id: "template_" + generateId()
                                    }))
                                } else if (type === "edit") {
                                    const updatedProducers = updateObjectKey(templates, selectedTemplate, properties, "properties")
                                    dispatch(setNetworkTemplates(updatedProducers))
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
            </ReflexElement>
        </ReflexContainer>
    </>

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