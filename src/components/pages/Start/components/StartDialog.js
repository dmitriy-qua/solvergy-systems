import React, {useState} from "react";
import {Button, Classes, Dialog, Icon, Intent} from "@blueprintjs/core";
import {createUseStyles} from "react-jss";
import {FaProjectDiagram} from 'react-icons/fa';
import Stepper from 'react-stepper-horizontal'
import {Authentication} from "./pages/Authentication";
import {ProjectInfo} from "./pages/ProjectInfo";
import {MapSettings} from "./pages/MapSettings";
import {ModelType} from "./pages/ModelType";

export const StartDialog = ({startDialog, setStartDialog}) => {

    const styles = useStyles()

    const [hasError, setHasError] = useState(false)
    const [activeStep, setActiveStep] = useState(0)

    return <Dialog
        icon={<FaProjectDiagram size={16} className={"bp3-icon material-icon"}/>}
        onClose={() => {
            setHasError(false)
            setStartDialog(false)
            //setMapDistanceInput(mapDistance)
        }}
        title={<span className={styles.dialogTitle}>Set initial project</span>}
        autoFocus={false}
        enforceFocus={false}
        canEscapeKeyClose={false}
        canOutsideClickClose={false}
        usePortal={true}
        style={{width: 600, height: 500}}
        isOpen={startDialog}
    >
        <div className={[Classes.DIALOG_BODY]}>
            <div className='stepper-container'>
                <Stepper steps={steps} activeStep={activeStep} {...stepperStyle(hasError)} />
            </div>
            <br/>

            {activeStep === 0 &&
                <Authentication/>
            }
            {activeStep === 1 &&
                <ProjectInfo/>
            }
            {activeStep === 2 &&
                <ModelType/>
            }
            {activeStep === 3 &&
                <MapSettings/>
            }

        </div>
        <div className={Classes.DIALOG_FOOTER}>
            <div className={Classes.DIALOG_FOOTER_ACTIONS}>
                <Button onClick={() => {
                    setActiveStep(prevState => {
                        if (prevState > 0) return prevState - 1
                        else return prevState
                    })
                }}>
                    Back
                </Button>
                <Button intent={Intent.SUCCESS}
                        onClick={() => {
                            setActiveStep(prevState => {
                                if (prevState < steps.length - 1) return prevState + 1
                                else return prevState
                            })
                        }}>
                    Next
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

const stepperStyle = (hasError) => ({
    activeColor: "#78909c",
    completeColor: hasError ? "#ef5350" : "#81c784",
    defaultColor: "#a7b6c2",
    activeTitleColor: "#78909c",
    completeTitleColor: "#78909c",
    defaultTitleColor: "#a7b6c2",
    circleFontColor: "white",
    size: 22,
    circleFontSize: 13,
    titleFontSize: 14,
    circleTop: 6,
    defaultBarColor: "#e0e0e0",
    completeBarColor: "#e0e0e0",
    lineMarginOffset: 2
})

const steps = [
    {title: 'Authentication'},
    {title: 'Project info'},
    {title: 'Model type'},
    {title: 'Map settings'}
]
