import React, {useState} from "react";
import {Intent, NumericInput} from "@blueprintjs/core";
import {createUseStyles} from "react-jss";

export const ProjectInfo = ({hasError, setHasError}) => {

    const styles = useStyles()

    const [mapDistanceInput, setMapDistanceInput] = useState(null)

    return <div>
        <p className={styles.dialogText}>
            Set vertical real distance of the current map fragment in meters:
        </p>
        <NumericInput placeholder="Enter a distance in meters..."
                      onValueChange={(value) => {
                          setHasError(false)
                          setMapDistanceInput(value)
                          if (!value) {
                              setHasError(true)
                          }
                      }}
                      allowNumericCharactersOnly
                      selectAllOnIncrement
                      majorStepSize={10}
                      min={0}
                      minorStepSize={0.1}
                      stepSize={1}
                      value={mapDistanceInput ? mapDistanceInput : ""}
                      leftIcon="arrows-vertical"
                      fill
                      intent={hasError ? Intent.DANGER : Intent.NONE}
        /></div>
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