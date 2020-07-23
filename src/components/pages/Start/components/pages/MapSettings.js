import React, {useState} from "react";
import {FileInput, Intent, NumericInput} from "@blueprintjs/core";
import {createUseStyles} from "react-jss";

export const MapSettings = ({hasError, setHasError}) => {

    const styles = useStyles()

    const [mapDistanceInput, setMapDistanceInput] = useState(null)
    const [mapImageUri, setMapImageUri] = useState(null)

    return <div className="start-block">
        <p className={styles.dialogText}>
            Set map image:
        </p>

        <FileInput text={mapImageUri ? mapImageUri : "Set map image..."}
                   buttonText={"Browse"}
                   fill
                   inputProps={{accept: "image/*"}}
                   onInputChange={(e) => setMapImageUri(e.target.files[0].path)} />

        <br/><br/>

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
        />
    </div>
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
        fontWeight: 600,
        fontSize: 12,
        fontFamily: 'Montserrat'
    },
})