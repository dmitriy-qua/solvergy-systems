import React, {useState} from "react";
import {
    Button,
    FormGroup,
    InputGroup,
    Intent,
} from "@blueprintjs/core";
import {createUseStyles} from "react-jss";
import {useDispatch, useSelector} from "react-redux"
import {generateId, updateObjectKey} from "../../../../helpers/data-helper";
import {addNewProducer, setProducers} from "../../../../redux/actions/project";


export const NameTextFieldForm = ({type, setType, producers, selectedProducer, setSelectedProducer}) => {

    const styles = useStyles()

    const dispatch = useDispatch()

    const [name, setName] = useState(selectedProducer ? selectedProducer.name : "")
    const [nameTouched, setNameTouched] = useState(false)

    const resetStates = () => {
        setName("")
        setNameTouched(false)
    }

    return <div style={{paddingRight: 10, paddingLeft: 10}}>
                <p className={styles.dialogText}>
                    New producer name:
                </p>
                <FormGroup
                    disabled={false}
                    helperText={(!name && nameTouched) && "Please enter producer name..."}
                    intent={(!name && nameTouched) ? Intent.DANGER : Intent.NONE}
                    labelFor="name"
                    fill
                    className={styles.labelText}
                >
                    <InputGroup id="name"
                                placeholder="Enter producer name"
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

                <div style={{display: "flex", justifyContent: "center"}}>
                    <Button intent={Intent.SUCCESS}
                            style={{width: 90, fontFamily: "Montserrat", fontSize: 13, margin: 10}}
                            onClick={() => {
                                if (type === "new") {
                                    dispatch(addNewProducer({name, id: "producer_" + generateId()}))
                                } else if (type === "edit") {
                                    const updatedProducers = updateObjectKey(producers, selectedProducer, name, "name")
                                    dispatch(setProducers(updatedProducers))
                                }

                                resetStates()
                                setSelectedProducer(null)
                                setType(null)
                            }}>
                        {type === "new" ? "Create" : "Save"}
                    </Button>

                    <Button intent={Intent.NONE}
                            style={{width: 90, fontFamily: "Montserrat", fontSize: 13, margin: 10}}
                            onClick={() => {
                                setSelectedProducer(null)
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