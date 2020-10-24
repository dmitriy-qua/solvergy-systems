import React, {useState} from "react";
import {FileInput, Intent, NumericInput, Switch} from "@blueprintjs/core";
import {createUseStyles} from "react-jss";
import {useSelector} from "react-redux";
import {FaInfoCircle} from "react-icons/fa";

export const MapSettings = ({
                                mapDistance,
                                setMapDistance,
                                mapImageUri,
                                setMapImageUri,
                                mapImageShouldBeAnalyzed,
                                setMapImageShouldBeAnalyzed,
                                mapImageForAnalysisUri,
                                setMapImageForAnalysisUri,
                                setLicenseRestrictionAlertDialogIsOpened,
                                setLicenseRestrictionAlertMessage
                            }) => {

    const styles = useStyles()

    const licenseRestrictions = useSelector(state => state.auth.licenseRestrictions)
    const user = useSelector(state => state.auth.user)

    const [mapDistanceInputTouched, setMapDistanceInputTouched] = useState(false)
    const [mapImageUriTouched, setMapImageUriTouched] = useState(false)
    const [mapImageForAnalysisUriTouched, setMapImageForAnalysisUriTouched] = useState(false)

    const restrictPolygonsAnalyze = () => {
        const message = <span>Your current license type is <b>{user && user.systemsLicense.pricingPlan.planName}</b>. You are not able to use "Polygons analyzer".</span>
        setLicenseRestrictionAlertMessage(message)
        setLicenseRestrictionAlertDialogIsOpened(true)
    }

    return <div className="start-block">
        <p className={styles.dialogText}>
            Set map image:
        </p>

        <FileInput text={mapImageUri ?
            <span className={styles.inputText}>{mapImageUri.path}</span>
            :
            <span className={styles.inputText}>Set map image...</span>}
                   buttonText={"Browse"}
                   fill
                   inputProps={{accept: "image/png"}} //"image/png, image/jpeg"
                   onInputChange={(e) => {
                       setMapImageUriTouched(true)
                       setMapImageUri(e.target.files[0])
                   }}
        />

        <br/>
        {(!mapImageUri && mapImageUriTouched) && <p className={styles.errorText}>Set map image!</p>}

        <br/>

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
                      value={mapDistance ? mapDistance : ""}
                      leftIcon="arrows-vertical"
                      fill
                      intent={(!mapDistance && mapDistanceInputTouched) ? Intent.DANGER : Intent.NONE}
        />
        {(!mapDistance && mapDistanceInputTouched) && <p className={styles.errorText}>Set map distance!</p>}

        <br/>

        <Switch checked={mapImageShouldBeAnalyzed}
                label={<span>Map image should be analyzed for objects detecting (opportunity to increase the speed of project development)
                    {!licenseRestrictions.canAnalyzePolygons &&
                    <FaInfoCircle size={16} className={"bp3-icon material-icon"}
                                  onClick={() => restrictPolygonsAnalyze()}/>
                    }
                </span>}
                disabled={!licenseRestrictions.canAnalyzePolygons}
                onChange={() => setMapImageShouldBeAnalyzed(prevState => !prevState)}/>

        <br/>

        {mapImageShouldBeAnalyzed && <>
            <p className={styles.dialogText}>
                Set map image for analysis (processed image with the same size):
            </p>

            <FileInput text={mapImageForAnalysisUri ?
                <span className={styles.inputText}>{mapImageForAnalysisUri.path}</span>
                :
                <span className={styles.inputText}>Set map image...</span>}
                       buttonText={"Browse"}
                       fill
                       inputProps={{accept: "image/png"}} //"image/png, image/jpeg"
                       onInputChange={(e) => {
                           setMapImageForAnalysisUriTouched(true)
                           setMapImageForAnalysisUri(e.target.files[0])
                       }}
            />

            <br/>
            {(!mapImageForAnalysisUri && mapImageForAnalysisUriTouched) &&
            <p className={styles.errorText}>Set map image!</p>}
        </>}
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