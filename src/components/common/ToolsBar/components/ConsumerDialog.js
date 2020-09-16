import React, {useEffect, useState} from "react";
import {
    Button,
    Classes,
    Dialog,
    FormGroup,
    InputGroup,
    Intent,
    MenuItem,
    NumericInput, Spinner,
    Switch
} from "@blueprintjs/core";
import {createUseStyles} from "react-jss";
import {GiHouse} from 'react-icons/gi';
import {useDispatch, useSelector} from "react-redux";
import {Select} from "@blueprintjs/select";
import {generateId, getLocationString, updateObject} from "../../../../helpers/data-helper";
import {setObjects} from "../../../../redux/actions/project";
import {getBuildingsResults} from "../../../../redux/actions/buildings";


export const ConsumerDialog = ({dialogIsOpened, setDialogIsOpened, startCreateObject, selectedObject, updateNodeLabel, canvas, createObjectFromAnalysis}) => {

    const styles = useStyles()

    const dispatch = useDispatch()

    const consumers = useSelector(state => state.project.objects.consumers)
    const buildingsResults = useSelector(state => state.buildings.results)
    const buildingsResultsIsLoading = useSelector(state => state.buildings.isLoading)

    const [name, setName] = useState("")
    const [nameTouched, setNameTouched] = useState(false)

    const [consumption, setConsumption] = useState("")
    const [consumptionTouched, setConsumptionTouched] = useState(false)

    const [importFromSolvergyBuildings, setImportFromSolvergyBuildings] = useState(false)
    const [selectedUserDataItem, setSelectedUserDataItem] = useState(null)
    const [selectedUserDataItemTouched, setSelectedUserDataItemTouched] = useState(false)

    useEffect(() => {
        if (dialogIsOpened === "edit" && selectedObject) {
            const object = consumers.find(object => object.id === selectedObject.id)

            setName(object.name)
            setConsumption(object.properties.consumption)
        }
    }, [selectedObject, dialogIsOpened])

    const resetStates = () => {
        setName("")
        setNameTouched(false)
        setConsumption("")
        setConsumptionTouched(false)
        setImportFromSolvergyBuildings(false)
        setSelectedUserDataItem(null)
        setSelectedUserDataItemTouched(false)
    }

    const handleUserDataElementSelect = (item) => {
        setSelectedUserDataItemTouched(true)
        setSelectedUserDataItem(item)
    }

    const getBuildingsResultName = (selectedUserDataItem) => {
       return `${selectedUserDataItem.projectInfo.name} (${getLocationString(selectedUserDataItem.projectInfo.city)})`
    }

    const renderUserDataItem = (item) => {
        return (
            <MenuItem
                key={generateId()}
                onClick={() => handleUserDataElementSelect(item)}
                text={getBuildingsResultName(item)}
            />
        );
    }

    return <Dialog
        icon={<GiHouse size={16} className={"bp3-icon material-icon"}/>}
        onClose={() => {
            setDialogIsOpened(null)
        }}
        title={<span className={styles.dialogTitle}>Create consumer</span>}
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
                Consumer name:
            </p>
            <FormGroup
                disabled={false}
                helperText={(!name && nameTouched) && "Please enter consumer name..."}
                intent={(!name && nameTouched) ? Intent.DANGER : Intent.NONE}
                labelFor="name"
                fill
                className={styles.labelText}
            >
                <InputGroup id="name"
                            placeholder="Enter consumer name"
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
                Set consumer heat energy consumption:
            </p>
            <NumericInput placeholder="Enter value in Gcal..."
                          disabled={importFromSolvergyBuildings}
                          onValueChange={(value) => {
                              setConsumptionTouched(true)
                              setConsumption(value)
                          }}
                          className={styles.inputText}
                          allowNumericCharactersOnly
                          selectAllOnIncrement
                          majorStepSize={10}
                          min={0}
                          minorStepSize={0.1}
                          stepSize={1}
                          value={consumption}
                          leftIcon="flow-end"
                          fill
                          intent={(!consumption && consumptionTouched) ? Intent.DANGER : Intent.NONE}
            />
            {(!consumption && consumptionTouched) && <span className={styles.errorText}>Enter value...</span>}
            <br/>
            <Switch checked={importFromSolvergyBuildings}
                    label={<div className={styles.switchTextContainer}>
                        <span className={styles.dialogText}>Import consumer data from
                    <span className={styles.bold}> Solvergy: Buildings </span><img
                            className={styles.solvergyBuildingsIcon}
                            src={require("./../../../../assets/images/solvergy-buildings-logo-sm.png")}
                            width={16} height={16}/>

                    </span></div>}
                    onChange={() => {
                        if (!importFromSolvergyBuildings) {
                            dispatch(getBuildingsResults())
                            setConsumption("")
                            setConsumptionTouched(false)
                        } else {
                            setSelectedUserDataItem(null)
                            setSelectedUserDataItemTouched(false)
                        }

                        setImportFromSolvergyBuildings(prevState => !prevState)
                    }}/>
            {importFromSolvergyBuildings && (buildingsResultsIsLoading ?
                <Spinner size={20}/>
                :
                <>
                    <Select
                        items={buildingsResults}
                        itemRenderer={renderUserDataItem}
                        activeItem={selectedUserDataItem && getBuildingsResultName(selectedUserDataItem)}
                        className="fullwidth"
                        popoverProps={{minimal: true, portalClassName: "fullwidth", popoverClassName: "selectPopover"}}
                        filterable={false}
                        onItemSelect={handleUserDataElementSelect}
                    >
                        <Button text={<span
                            className={styles.selectText}>{selectedUserDataItem && getBuildingsResultName(selectedUserDataItem) || "Select consumer data..."}</span>}
                                rightIcon="caret-down" alignText="left" fill="{true}"/>
                    </Select>

                    {(!selectedUserDataItem && selectedUserDataItemTouched) &&
                    <span className={styles.errorText}>Set consumer data!</span>}
                </>)}
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
                <Button disabled={!name || (!consumption && !selectedUserDataItem)}
                        style={{width: 90, fontFamily: "Montserrat", fontSize: 13}}
                        text={dialogIsOpened === "new" ? "Create" : "Save"}
                        intent={Intent.SUCCESS}
                        onClick={() => {
                            if (dialogIsOpened === "edit") {
                                const updatedConsumers = updateObject(consumers, selectedObject.id, {
                                    name,
                                    properties: {consumption, importFromSolvergyBuildings, buildingsResult: selectedUserDataItem}
                                })

                                const canvasObject = canvas.getObjects().find(object => object.id === selectedObject.id)
                                canvasObject.set({name})

                                dispatch(setObjects({objectType: "consumers", newObjects: updatedConsumers}))
                                updateNodeLabel(selectedObject.id, name)
                            } else if (dialogIsOpened === "new") {
                                startCreateObject("consumer", name, {consumption, importFromSolvergyBuildings, buildingsResult: selectedUserDataItem})
                            } else if (dialogIsOpened === "complete") {
                                createObjectFromAnalysis("consumer", name, {consumption, importFromSolvergyBuildings, buildingsResult: selectedUserDataItem})
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