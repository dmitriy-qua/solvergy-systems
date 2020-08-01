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
import {setProducers} from "../../../../redux/actions/project";
import {NameTextFieldForm} from "./NameTextFieldForm";


export const ProducersDialog = ({dialogIsOpened, setDialogIsOpened}) => {

    const styles = useStyles()

    const dispatch = useDispatch()

    const producers = useSelector(state => state.project.project.objects.producers)

    let listItem = ({item}) => {
        return <span className={styles.selectText}>
            {item.name}
        </span>
    }

    const [selectedProducer, setSelectedProducer] = useState(null)
    const [nameTextFieldType, setNameTextFieldType] = useState(null)

    return <Dialog
        icon={<GiHouse size={16} className={"bp3-icon material-icon"}/>}
        onClose={() => {
            setDialogIsOpened(false)
        }}
        title={<span className={styles.dialogTitle}>Manage producers</span>}
        autoFocus={false}
        enforceFocus={false}
        canEscapeKeyClose={false}
        canOutsideClickClose={false}
        usePortal={true}
        style={{width: 450, height: 550, borderRadius: 2}}
        isOpen={dialogIsOpened}
    >
        <div className={[Classes.DIALOG_BODY]}>
            {!nameTextFieldType && <>
                <p className={styles.dialogText}>
                    Producers list:
                </p>
                <SelectList data={producers}
                            itemComponent={listItem}
                            onChange={item => setSelectedProducer(item)}
                            value={selectedProducer}
                />
                <br/>

                <div style={{display: "flex", justifyContent: "center"}}>
                    <Button intent={Intent.SUCCESS}
                            style={{width: 90, fontFamily: "Montserrat", fontSize: 13, margin: 10}}
                            onClick={() => {
                                setSelectedProducer(null)
                                setNameTextFieldType("new")
                            }}>
                        Add new
                    </Button>

                    <Button intent={Intent.DANGER}
                            disabled={!selectedProducer}
                            style={{width: 90, fontFamily: "Montserrat", fontSize: 13, margin: 10}}
                            onClick={() => {
                                const newProducersList = producers.filter(producer => producer.id !== selectedProducer.id)
                                dispatch(setProducers(newProducersList))
                                setNameTextFieldType(null)
                                setSelectedProducer(null)
                            }}>
                        Delete
                    </Button>

                    <Button intent={Intent.NONE}
                            disabled={!selectedProducer || nameTextFieldType === "new"}
                            style={{width: 90, fontFamily: "Montserrat", fontSize: 13, margin: 10}}
                            onClick={() => {
                                setNameTextFieldType("edit")
                            }}>
                        Rename
                    </Button>
                </div>
            </>}

            <br/>

            {nameTextFieldType && <NameTextFieldForm setType={setNameTextFieldType}
                                                     type={nameTextFieldType}
                                                     producers={producers}
                                                     selectedProducer={selectedProducer}
                                                     setSelectedProducer={setSelectedProducer}/>}


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