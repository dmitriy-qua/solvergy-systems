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
    addNewNetworkTemplate, addNewSupplierTemplate,
    setNetworkTemplates, setSuppliersTemplates,
} from "../../../../redux/actions/project";
import {Select} from "@blueprintjs/select";
import {energySources} from "../../../data/energy-sources";


export const SupplierTemplateForm = ({type, setType, templates, selectedTemplate, setSelectedTemplate}) => {

    const styles = useStyles()

    const dispatch = useDispatch()

    const initialTemplate = {
        name: "",
        energySource: "",
        capitalFixedCosts: "",
        capitalVariableCostsPerOneMW: "",
        fuelConsumption: "",
        fuelPrice: "",
        fuelTransportationCosts: "",
        electricityCosts: "",
        annualSalaryCostsForWorkersPerOneMW: "",
        annualSalaryCostsForAdministrationPerOneMW: "",
        otherCostsPerOneMW: "",
        depreciationYears: "",
        rateOfReturn: ""
    }

    const [properties, setProperties] = useState(selectedTemplate ? selectedTemplate.properties : initialTemplate)

    const [nameTouched, setNameTouched] = useState(false)
    const [selectedEnergySourceTouched, setSelectedEnergySourceTouched] = useState(false)
    const [capitalFixedCostsTouched, setCapitalFixedCostsTouched] = useState(false)
    const [capitalVariableCostsPerOneMWTouched, setCapitalVariableCostsPerOneMWTouched] = useState(false)
    const [fuelConsumptionTouched, setFuelConsumptionTouched] = useState(false)
    const [fuelPriceTouched, setFuelPriceTouched] = useState(false)
    const [fuelTransportationCostsTouched, setFuelTransportationCostsTouched] = useState(false)
    const [electricityCostsTouched, setElectricityCostsTouched] = useState(false)
    const [annualSalaryCostsForWorkersPerOneMWTouched, setAnnualSalaryCostsForWorkersPerOneMWTouched] = useState(false)
    const [annualSalaryCostsForAdministrationPerOneMWTouched, setAnnualSalaryCostsForAdministrationPerOneMWTouched] = useState(false)
    const [otherCostsPerOneMWTouched, setOtherCostsPerOneMWTouched] = useState(false)
    const [depreciationYearsTouched, setDepreciationYearsTouched] = useState(false)
    const [rateOfReturnTouched, setRateOfReturnTouched] = useState(false)

    const handleEnergySourceSelect = (item) => {
        setSelectedEnergySourceTouched(true)
        setProperties(prevState => ({
            ...prevState,
            energySource: item
        }))
    }


    const renderInsulationTypeItem = (item) => {
        return (
            <MenuItem
                key={generateId()}
                onClick={() => handleEnergySourceSelect(item)}
                text={item.name}
            />
        );
    }

    const resetStates = () => {
        setProperties(initialTemplate)
        setNameTouched(false)
        setSelectedEnergySourceTouched(false)
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

        <p className={styles.dialogTitle}>
            Energy source
        </p>

        <hr className={styles.divider}/>

        <div style={{display: "flex", marginTop: 12}}>
            <div style={{flex: "50%", paddingRight: 10}}>
                <p className={styles.dialogText}>
                    Set energy source:
                </p>

                <Select
                    items={energySources}
                    itemRenderer={renderInsulationTypeItem}
                    activeItem={properties.energySource && properties.energySource.name}
                    className="fullwidth"
                    popoverProps={{
                        minimal: true,
                        portalClassName: "fullwidth",
                        popoverClassName: "selectPopover"
                    }}
                    filterable={false}
                    onItemSelect={handleEnergySourceSelect}
                >
                    <Button text={<span
                        className={styles.selectText}>{(properties.energySource && properties.energySource.name) || "Select energy source..."}</span>}
                            rightIcon="caret-down" alignText="left" fill="{true}"/>
                </Select>

                {(!properties.energySource && selectedEnergySourceTouched) &&
                <span className={styles.errorText}>Set energy source!</span>}
            </div>

            <div style={{flex: "50%", paddingLeft: 10}}>
                <p className={styles.dialogText}>
                    Rate of return, %:
                </p>
                <NumericInput placeholder="Enter value..."
                              onValueChange={(value) => {
                                  setRateOfReturnTouched(true)
                                  setProperties(prevState => ({
                                      ...prevState,
                                      rateOfReturn: value
                                  }))
                              }}
                              className={styles.inputText}
                              allowNumericCharactersOnly
                              selectAllOnIncrement
                              majorStepSize={10}
                              min={0}
                              minorStepSize={0.1}
                              stepSize={1}
                              value={properties.rateOfReturn}
                              fill
                              intent={(!properties.rateOfReturn && rateOfReturnTouched) ? Intent.DANGER : Intent.NONE}
                />
                {(!properties.rateOfReturn && rateOfReturnTouched) && <span className={styles.errorText}>Enter value...</span>}
            </div>
        </div>

        <p className={styles.dialogTitle}>
            Capital investment
        </p>
        <hr className={styles.divider}/>

        <div style={{display: "flex"}}>
            <div style={{flex: "50%", paddingRight: 10}}>
                <p className={styles.dialogText}>
                    Fixed capital costs (independent of the station capacity), $:
                </p>
                <NumericInput placeholder="Enter value..."
                              onValueChange={(value) => {
                                  setCapitalFixedCostsTouched(true)
                                  setProperties(prevState => ({
                                      ...prevState,
                                      capitalFixedCosts: value
                                  }))
                              }}
                              className={styles.inputText}
                              allowNumericCharactersOnly
                              selectAllOnIncrement
                              majorStepSize={10}
                              min={0}
                              minorStepSize={0.1}
                              stepSize={1}
                              value={properties.capitalFixedCosts}
                              //leftIcon="full-circle"
                              fill
                              intent={(!properties.capitalFixedCosts && capitalFixedCostsTouched) ? Intent.DANGER : Intent.NONE}
                />
                {(!properties.capitalFixedCosts && capitalFixedCostsTouched) && <span className={styles.errorText}>Enter value...</span>}
            </div>

            <div style={{flex: "50%", paddingLeft: 10}}>
                <p className={styles.dialogText}>
                    Variable capital costs per 1 MW of station capacity, $/MW:
                </p>
                <NumericInput placeholder="Enter value..."
                              onValueChange={(value) => {
                                  setCapitalVariableCostsPerOneMWTouched(true)
                                  setProperties(prevState => ({
                                      ...prevState,
                                      capitalVariableCostsPerOneMW: value
                                  }))
                              }}
                              className={styles.inputText}
                              allowNumericCharactersOnly
                              selectAllOnIncrement
                              majorStepSize={10}
                              min={0}
                              minorStepSize={0.1}
                              stepSize={1}
                              value={properties.capitalVariableCostsPerOneMW}
                              //leftIcon="ring"
                              fill
                              intent={(!properties.capitalVariableCostsPerOneMW && capitalVariableCostsPerOneMWTouched) ? Intent.DANGER : Intent.NONE}
                />
                {(!properties.capitalVariableCostsPerOneMW && capitalVariableCostsPerOneMWTouched) && <span className={styles.errorText}>Enter value...</span>}
            </div>

        </div>

        <p className={styles.dialogTitle}>
            Operating costs
        </p>
        <hr className={styles.divider}/>

        <div style={{display: "flex"}}>
            <div style={{flex: "50%", paddingRight: 10}}>
                <p className={styles.dialogText}>
                    Fuel consumption (kg/MWh or m3/MWh):
                </p>
                <NumericInput placeholder="Enter value..."
                              onValueChange={(value) => {
                                  setFuelConsumptionTouched(true)
                                  setProperties(prevState => ({
                                      ...prevState,
                                      fuelConsumption: value
                                  }))
                              }}
                              className={styles.inputText}
                              allowNumericCharactersOnly
                              selectAllOnIncrement
                              majorStepSize={10}
                              min={0}
                              minorStepSize={0.1}
                              stepSize={1}
                              value={properties.fuelConsumption}
                              fill
                              intent={(!properties.fuelConsumption && fuelConsumptionTouched) ? Intent.DANGER : Intent.NONE}
                />
                {(!properties.fuelConsumption && fuelConsumptionTouched) && <span className={styles.errorText}>Enter value...</span>}
            </div>

            <div style={{flex: "50%", paddingLeft: 10}}>
                <p className={styles.dialogText}>
                    Fuel price ($/kg or $/m3):
                </p>
                <NumericInput placeholder="Enter value..."
                              onValueChange={(value) => {
                                  setFuelPriceTouched(true)
                                  setProperties(prevState => ({
                                      ...prevState,
                                      fuelPrice: value
                                  }))
                              }}
                              className={styles.inputText}
                              allowNumericCharactersOnly
                              selectAllOnIncrement
                              majorStepSize={10}
                              min={0}
                              minorStepSize={0.1}
                              stepSize={1}
                              value={properties.fuelPrice}
                    //leftIcon="ring"
                              fill
                              intent={(!properties.fuelPrice && fuelPriceTouched) ? Intent.DANGER : Intent.NONE}
                />
                {(!properties.fuelPrice && fuelPriceTouched) && <span className={styles.errorText}>Enter value...</span>}
            </div>

        </div>

        <div style={{display: "flex", marginTop: 14}}>
            <div style={{flex: "50%", paddingRight: 10}}>
                <p className={styles.dialogText}>
                    Fuel transportation costs ($/kg or $/m3):
                </p>
                <NumericInput placeholder="Enter value..."
                              onValueChange={(value) => {
                                  setFuelTransportationCostsTouched(true)
                                  setProperties(prevState => ({
                                      ...prevState,
                                      fuelTransportationCosts: value
                                  }))
                              }}
                              className={styles.inputText}
                              allowNumericCharactersOnly
                              selectAllOnIncrement
                              majorStepSize={10}
                              min={0}
                              minorStepSize={0.1}
                              stepSize={1}
                              value={properties.fuelTransportationCosts}
                              fill
                              intent={(!properties.fuelTransportationCosts && fuelTransportationCostsTouched) ? Intent.DANGER : Intent.NONE}
                />
                {(!properties.fuelTransportationCosts && fuelTransportationCostsTouched) && <span className={styles.errorText}>Enter value...</span>}
            </div>

            <div style={{flex: "50%", paddingLeft: 10}}>
                <p className={styles.dialogText}>
                    Electricity costs ($/MWh or $/MWh):
                </p>
                <NumericInput placeholder="Enter value..."
                              onValueChange={(value) => {
                                  setElectricityCostsTouched(true)
                                  setProperties(prevState => ({
                                      ...prevState,
                                      electricityCosts: value
                                  }))
                              }}
                              className={styles.inputText}
                              allowNumericCharactersOnly
                              selectAllOnIncrement
                              majorStepSize={10}
                              min={0}
                              minorStepSize={0.1}
                              stepSize={1}
                              value={properties.electricityCosts}
                    //leftIcon="ring"
                              fill
                              intent={(!properties.electricityCosts && electricityCostsTouched) ? Intent.DANGER : Intent.NONE}
                />
                {(!properties.electricityCosts && electricityCostsTouched) && <span className={styles.errorText}>Enter value...</span>}
            </div>

        </div>

        <div style={{display: "flex", marginTop: 14}}>
            <div style={{flex: "50%", paddingRight: 10}}>
                <p className={styles.dialogText}>
                    Annual salary costs for workers per 1 MW station capacity, $/MW:
                </p>
                <NumericInput placeholder="Enter value..."
                              onValueChange={(value) => {
                                  setAnnualSalaryCostsForWorkersPerOneMWTouched(true)
                                  setProperties(prevState => ({
                                      ...prevState,
                                      annualSalaryCostsForWorkersPerOneMW: value
                                  }))
                              }}
                              className={styles.inputText}
                              allowNumericCharactersOnly
                              selectAllOnIncrement
                              majorStepSize={10}
                              min={0}
                              minorStepSize={0.1}
                              stepSize={1}
                              value={properties.annualSalaryCostsForWorkersPerOneMW}
                              fill
                              intent={(!properties.annualSalaryCostsForWorkersPerOneMW && annualSalaryCostsForWorkersPerOneMWTouched) ? Intent.DANGER : Intent.NONE}
                />
                {(!properties.annualSalaryCostsForWorkersPerOneMW && annualSalaryCostsForWorkersPerOneMWTouched) && <span className={styles.errorText}>Enter value...</span>}
            </div>

            <div style={{flex: "50%", paddingLeft: 10}}>
                <p className={styles.dialogText}>
                    Annual salary costs for administration per 1 MW station capacity, $/MW:
                </p>
                <NumericInput placeholder="Enter value..."
                              onValueChange={(value) => {
                                  setAnnualSalaryCostsForAdministrationPerOneMWTouched(true)
                                  setProperties(prevState => ({
                                      ...prevState,
                                      annualSalaryCostsForAdministrationPerOneMW: value
                                  }))
                              }}
                              className={styles.inputText}
                              allowNumericCharactersOnly
                              selectAllOnIncrement
                              majorStepSize={10}
                              min={0}
                              minorStepSize={0.1}
                              stepSize={1}
                              value={properties.annualSalaryCostsForAdministrationPerOneMW}
                    //leftIcon="ring"
                              fill
                              intent={(!properties.annualSalaryCostsForAdministrationPerOneMW && annualSalaryCostsForAdministrationPerOneMWTouched) ? Intent.DANGER : Intent.NONE}
                />
                {(!properties.annualSalaryCostsForAdministrationPerOneMW && annualSalaryCostsForAdministrationPerOneMWTouched) && <span className={styles.errorText}>Enter value...</span>}
            </div>

        </div>

        <div style={{display: "flex", marginTop: 14}}>
            <div style={{flex: "50%", paddingRight: 10}}>
                <p className={styles.dialogText}>
                    Other costs per 1 MW station capacity, $/MW:
                </p>
                <NumericInput placeholder="Enter value..."
                              onValueChange={(value) => {
                                  setOtherCostsPerOneMWTouched(true)
                                  setProperties(prevState => ({
                                      ...prevState,
                                      otherCostsPerOneMW: value
                                  }))
                              }}
                              className={styles.inputText}
                              allowNumericCharactersOnly
                              selectAllOnIncrement
                              majorStepSize={10}
                              min={0}
                              minorStepSize={0.1}
                              stepSize={1}
                              value={properties.otherCostsPerOneMW}
                              fill
                              intent={(!properties.otherCostsPerOneMW && otherCostsPerOneMWTouched) ? Intent.DANGER : Intent.NONE}
                />
                {(!properties.otherCostsPerOneMW && otherCostsPerOneMWTouched) && <span className={styles.errorText}>Enter value...</span>}
            </div>

            <div style={{flex: "50%", paddingLeft: 10}}>
                <p className={styles.dialogText}>
                    Service life of the station, years:
                </p>
                <NumericInput placeholder="Enter value..."
                              onValueChange={(value) => {
                                  setDepreciationYearsTouched(true)
                                  setProperties(prevState => ({
                                      ...prevState,
                                      depreciationYears: value
                                  }))
                              }}
                              className={styles.inputText}
                              allowNumericCharactersOnly
                              selectAllOnIncrement
                              majorStepSize={10}
                              min={0}
                              minorStepSize={0.1}
                              stepSize={1}
                              value={properties.depreciationYears}
                    //leftIcon="ring"
                              fill
                              intent={(!properties.depreciationYears && depreciationYearsTouched) ? Intent.DANGER : Intent.NONE}
                />
                {(!properties.depreciationYears && depreciationYearsTouched) && <span className={styles.errorText}>Enter value...</span>}
            </div>

        </div>

        <div style={{display: "flex", justifyContent: "center", marginTop: 10}}>
            <Button intent={Intent.SUCCESS}
                    disabled={Object.keys(properties).some(k => !properties[k])}
                    style={{width: 90, fontFamily: "Montserrat", fontSize: 13, margin: 10}}
                    onClick={() => {
                        if (type === "new") {
                            dispatch(addNewSupplierTemplate({
                                properties,
                                id: "supplier_template_" + generateId()
                            }))
                        } else if (type === "edit") {
                            const updatedTemplates = updateObjectKey(templates, selectedTemplate, properties, "properties")
                            dispatch(setSuppliersTemplates(updatedTemplates))
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
        fontSize: 14,
        marginTop: 20,
        fontFamily: 'Montserrat'
    },
    dialogText: {
        fontWeight: 500,
        fontSize: 12,
        fontFamily: 'Montserrat',
    },
    divider: {
        border: 0,
        height: 0,
        borderTop: "1px solid rgba(0, 0, 0, 0.1)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.3)"
    }
})

