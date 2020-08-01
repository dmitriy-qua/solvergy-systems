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
import {GiFactory} from 'react-icons/gi';
import {useDispatch, useSelector} from "react-redux";
import {Select} from "@blueprintjs/select";
import {generateId} from "../../../../helpers/data-helper";

export const CreateSupplierDialog = ({dialogIsOpened, setDialogIsOpened, startCreateObject}) => {

    const styles = useStyles()

    const dispatch = useDispatch()

    const producers = useSelector(state => state.project.project && state.project.project.objects.producers)

    const [name, setName] = useState("")
    const [nameTouched, setNameTouched] = useState(false)

    const [selectedProducer, setSelectedProducer] = useState(null)
    const [selectedProducerTouched, setSelectedProducerTouched] = useState(false)

    const resetStates = () => {
        setName("")
        setNameTouched(false)
        setSelectedProducer(null)
        setSelectedProducerTouched(false)
    }

    const handleProducerSelect = (item) => {
        setSelectedProducerTouched(true)
        setSelectedProducer(item)
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

    return <Dialog
        icon={<GiFactory size={16} className={"bp3-icon material-icon"}/>}
        onClose={() => {
            setDialogIsOpened(false)
        }}
        title={<span className={styles.dialogTitle}>Create supplier</span>}
        autoFocus={false}
        enforceFocus={false}
        canEscapeKeyClose={false}
        canOutsideClickClose={false}
        usePortal={true}
        style={{width: 450, height: 450, borderRadius: 2}}
        isOpen={dialogIsOpened}
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
                <Button disabled={!name || !selectedProducer}
                        style={{width: 90, fontFamily: "Montserrat", fontSize: 13}}
                        text={"Create"}
                        intent={Intent.SUCCESS}
                        onClick={() => {
                            startCreateObject("supplier", name, {producerId: selectedProducer.id})
                            resetStates()
                            setDialogIsOpened(false)
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