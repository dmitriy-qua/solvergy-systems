import React, {useState} from "react";
import {FileInput, Intent, NumericInput} from "@blueprintjs/core";
import {createUseStyles} from "react-jss";

export const MapSettings = ({mapDistance, setMapDistance, mapImageUri, setMapImageUri}) => {

    const styles = useStyles()

    const [mapDistanceInputTouched, setMapDistanceInputTouched] = useState(false)
    const [mapImageUriTouched, setMapImageUriTouched] = useState(false)

    return <div className="start-block">
        <p className={styles.dialogText}>
            Set map image:
        </p>

        <FileInput text={mapImageUri ?
            <span className={styles.inputText}>{mapImageUri}</span>
            :
            <span className={styles.inputText}>Set map image...</span>}
                   buttonText={"Browse"}
                   fill
                   inputProps={{accept: "image/*"}}
                   onInputChange={(e) => {
                       setMapImageUriTouched(true)
                       setMapImageUri(e.target.files[0].path)
                   }}
        />

        <br/>
        {(!mapImageUri && mapImageUriTouched) && <span className={styles.errorText}>Set map image!</span>}

        <br/><br/>

        <p className={styles.dialogText}>
            Set vertical real distance of the current map fragment in meters:
        </p>
        <NumericInput placeholder="Enter a distance in meters..."
                      onValueChange={(value) => {
                          setMapDistanceInputTouched(true)
                          setMapDistance(value)
                      }}
                      className={styles.inputText}
                      allowNumericCharactersOnly
                      selectAllOnIncrement
                      majorStepSize={10}
                      min={0}
                      minorStepSize={0.1}
                      stepSize={1}
                      value={mapDistance ? mapDistance: ""}
                      leftIcon="arrows-vertical"
                      fill
                      intent={(!mapDistance && mapDistanceInputTouched) ? Intent.DANGER : Intent.NONE}
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
    errorText: {
        marginLeft: 4,
        fontWeight: 500,
        color: "#c23030",
        fontSize: 12,
        fontFamily: "Montserrat"
    },
    inputText: {
        fontWeight: 400,
        fontSize: 14,
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