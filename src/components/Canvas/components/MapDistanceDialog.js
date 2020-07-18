import React, {useState} from "react";
import {Button, Classes, Dialog, Icon, Intent, NumericInput} from "@blueprintjs/core";
import {createUseStyles} from "react-jss";
import {FaRuler} from 'react-icons/fa';


export const MapDistanceDialog = ({mapDistanceDialog, setMapDistanceDialog, mapDistance, setMapDistance}) => {

    const styles = useStyles()

    const [mapDistanceInput, setMapDistanceInput] = useState(mapDistance)

    return <Dialog
        icon={<FaRuler size={16} className={"bp3-icon material-icon"}/>}
        onClose={() => setMapDistanceDialog(false)}
        title={<span className={styles.dialogTitle}>Set map vertical real distance</span>}
        autoFocus={false}
        canEscapeKeyClose
        canOutsideClickClose
        enforceFocus={false}
        usePortal
        style={{width: 340}}
        isOpen={mapDistanceDialog}
    >
        <div className={Classes.DIALOG_BODY}>
            <p className={styles.dialogText}>
                Set vertical real distance of the current map fragment in meters:
            </p>
            <NumericInput placeholder="Enter a number im meters..."
                          onValueChange={(value) => setMapDistanceInput(value)}
                          allowNumericCharactersOnly
                          selectAllOnIncrement
                          majorStepSize={10}
                          min={0}
                          minorStepSize={0.1}
                          stepSize={1}
                          value={mapDistanceInput ? mapDistanceInput : ""}
                          leftIcon="arrows-vertical"
                          fill
            />
        </div>
        <div className={Classes.DIALOG_FOOTER}>
            <div className={Classes.DIALOG_FOOTER_ACTIONS}>
                <Button intent={Intent.SUCCESS}
                        onClick={() => {
                            setMapDistanceDialog(false)
                            setMapDistance(mapDistanceInput)
                        }}>Save</Button>

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
    dialogTitle: {
        fontWeight: 600,
        fontSize: 15,
        fontFamily: 'Montserrat'
    },
    dialogText: {
        fontWeight: 500,
        fontSize: 12,
        fontFamily: 'Montserrat'
    },
})
