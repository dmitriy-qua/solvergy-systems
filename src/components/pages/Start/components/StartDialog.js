import React, {useState} from "react";
import {Button, Classes, Dialog, Intent} from "@blueprintjs/core";
import {createUseStyles} from "react-jss";
import {FaProjectDiagram} from 'react-icons/fa';
import Stepper from 'react-stepper-horizontal'
import {Authentication} from "./pages/Authentication";
import {ProjectInfo} from "./pages/ProjectInfo";
import {MapSettings} from "./pages/MapSettings";
import {ModelType} from "./pages/ModelType";
import { ViewPager, Frame, Track, View } from 'react-view-pager'

export const StartDialog = ({startDialog, setStartDialog}) => {

    const styles = useStyles()

    const [hasError, setHasError] = useState(false)
    const [activeStep, setActiveStep] = useState(0)
    const [viewPager, setViewPager] = useState(null)

    return <Dialog
        icon={<FaProjectDiagram size={16} className={"bp3-icon material-icon"}/>}
        onClose={() => {
            setHasError(false)
            setStartDialog(false)
        }}
        title={<span className={styles.dialogTitle}>Set initial project</span>}
        autoFocus={false}
        enforceFocus={false}
        canEscapeKeyClose={false}
        canOutsideClickClose={false}
        usePortal={true}
        style={{width: 650, height: 550, borderRadius: 2}}
        isOpen={startDialog}
    >
        <div className={[Classes.DIALOG_BODY]}>
            <div className='stepper-container'>
                <Stepper steps={steps} activeStep={activeStep} {...stepperStyle(hasError)} />
            </div>
            <br/>

            <ViewPager tag="main">
                <Frame className="frame" accessibility={false}>
                    <Track
                        ref={c => setViewPager(c)}
                        viewsToShow={1}
                        swipe={false}
                        currentView={activeStep}
                        className="track"
                    >
                        <View className="view"><Authentication/></View>
                        <View className="view"><ProjectInfo/></View>
                        <View className="view"><ModelType/></View>
                        <View className="view"><MapSettings/></View>
                    </Track>
                </Frame>
            </ViewPager>

        </div>
        <div className={Classes.DIALOG_FOOTER}>
            <div className={Classes.DIALOG_FOOTER_ACTIONS}>
                <Button intent={Intent.NONE}
                        style={{width: 70, fontFamily: "Montserrat", fontSize: 13}}
                        onClick={() => {
                            setHasError(false)
                            setStartDialog(false)
                        }}>
                    Close
                </Button>
                <Button disabled={activeStep === 0}
                        intent={Intent.PRIMARY}
                        style={{width: 70, fontFamily: "Montserrat", fontSize: 13}}
                        onClick={() => {
                            //if (viewPager) viewPager.prev()
                            setActiveStep(prevState => {
                                if (prevState > 0) return prevState - 1
                                else return prevState
                            })
                        }}>
                    Back
                </Button>
                <Button disabled={activeStep === steps.length - 1}
                        style={{width: 70, fontFamily: "Montserrat", fontSize: 13}}
                        intent={Intent.SUCCESS}
                        onClick={() => {
                            //if (viewPager) viewPager.next()
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
    defaultTitleColor: "#c2d1dd",
    circleFontColor: "white",
    size: 22,
    circleFontSize: 13,
    titleFontSize: 14,
    circleTop: 6,
    defaultBarColor: "#e0e0e0",
    completeBarColor: "#e0e0e0",
    lineMarginOffset: 10
})

const steps = [
    {title: 'Authentication'},
    {title: 'Project info'},
    {title: 'Model type'},
    {title: 'Map settings'}
]
