import React, {useEffect, useState} from "react";
import {createUseStyles} from "react-jss";
import {
    Button,
    Classes,
    Dialog,
    Intent,
} from "@blueprintjs/core";
import {FaDrawPolygon} from "react-icons/fa";
import {useDispatch, useSelector} from "react-redux";
import {CanvasForAnalysis} from "../../../pages/Topology/components/Canvas/CanvasForAnalysis";
import {generateId} from "../../../../helpers/data-helper";

export const MapImageAnalysisDialog = ({dialogIsOpened, setDialogIsOpened, height, width, saveAnalyzedObjects, currentCanvasObjects}) => {

    const styles = useStyles()

    const dispatch = useDispatch()

    const polygons = useSelector(state => state.project.polygons)
    const projectId = useSelector(state => state.project && state.project.id)
    const mapDistance = useSelector(state => state.project && state.project.map.mapDistance)

    const [mapSize, setMapSize] = useState({width: 2000, height: 2000})
    const [canvas, setCanvas] = useState(null)

    return <Dialog
        icon={<FaDrawPolygon size={16} className={"bp3-icon material-icon"}/>}
        onClose={() => setDialogIsOpened(false)}
        title={<span className={styles.dialogTitle}>Select polygons as consumers/suppliers objects</span>}
        autoFocus={false}
        enforceFocus={false}
        canEscapeKeyClose={false}
        canOutsideClickClose={false}
        usePortal={true}
        style={{width, height, backgroundColor: "white"}}
        isOpen={dialogIsOpened}
    >
        <div className={[Classes.DIALOG_BODY]}>
            <CanvasForAnalysis
                    canvas={canvas}
                    setCanvas={setCanvas}
                    mapSize={mapSize}
                    setMapSize={setMapSize}
                    projectId={projectId}
                    dialogWidth={width}
                    dialogHeight={height}
                    polygons={polygons}
                    mapDistance={mapDistance}
                    objects={currentCanvasObjects}
            />
        </div>

        <div className={Classes.DIALOG_FOOTER}>
            <div className={Classes.DIALOG_FOOTER_ACTIONS}>
                <Button intent={Intent.NONE}
                        style={{width: 90, fontFamily: "Montserrat", fontSize: 13}}
                        onClick={() => {
                            setCanvas(null)
                            setDialogIsOpened(false)
                        }}>
                    Close
                </Button>
                <Button intent={Intent.SUCCESS}
                        style={{width: 90, fontFamily: "Montserrat", fontSize: 13}}
                        onClick={() => {
                            const canvasObjects = canvas.getObjects().filter(object => object.type === "polygon" && object.objectType && currentCanvasObjects.find(obj => obj.id === object.id) === undefined)
                            saveAnalyzedObjects(canvasObjects)
                            setCanvas(null)
                            setDialogIsOpened(false)
                        }}>
                    Generate
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
        lineHeight: 1.5,
        display: "inline-block",
        // justifyContent: "center",
        // alignItems: "center",
        // verticalAlign: "middle"
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
        marginTop: 6,
        fontFamily: 'Montserrat'
    },
    dialogText: {
        fontWeight: 500,
        fontSize: 12,
        fontFamily: 'Montserrat',
    },
    listText: {
        fontWeight: 600,
        fontSize: 13,
        fontFamily: 'Montserrat',
        color: "#444444",
    },
    indicatorText: {
        fontWeight: 600,
        fontSize: 16,
        fontFamily: 'Montserrat',
    },
    divider: {
        border: 0,
        height: 0,
        borderTop: "1px solid rgba(0, 0, 0, 0.1)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.3)"
    }
})
