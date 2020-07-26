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
import {useDispatch, useSelector} from "react-redux";
import {createNewProject} from "../../../../redux/actions/project";

export const StartDialog = ({startDialog, setStartDialog}) => {

    const styles = useStyles()

    const dispatch = useDispatch()

    const isAuth = useSelector(state => state.auth.isAuth)

    const [login, setLogin] = useState("")
    const [password, setPassword] = useState("")

    const [name, setName] = useState("")
    const [location, setLocation] = useState("")

    const [modelType, setModelType] = useState(null)
    const [energySystemType, setEnergySystemType] = useState([])

    const [mapDistance, setMapDistance] = useState(null)
    const [mapImageUri, setMapImageUri] = useState(null)

    const [activeStep, setActiveStep] = useState(0)
    const [viewPager, setViewPager] = useState(null)

    const validateStep = (activeStep) => {
        switch (activeStep) {
            case 0:
                return isAuth
            case 1:
                return name && location
            case 2:
                return modelType && energySystemType.length > 0
            case 3:
                return mapDistance && mapImageUri
            default:
                return false
        }
    }

    const createProject = () => {
        const newProject = {
            info: {
                name,
                location
            },
            type: {
                modelType,
                energySystemType
            },
            map: {
                mapImageUri,
                mapDistance
            },
            objects: {
                consumers: [],
                suppliers: [],
                networks: [],
                producers: []
            },
        }

        dispatch(createNewProject(newProject))
    }


    return <Dialog
        icon={<FaProjectDiagram size={16} className={"bp3-icon material-icon"}/>}
        onClose={() => {
            setStartDialog(false)
        }}
        title={<span className={styles.dialogTitle}>Set initial project information</span>}
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
                <Stepper steps={steps} activeStep={activeStep} {...stepperStyle} />
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
                        <View className="view">
                            <Authentication login={login}
                                            setLogin={setLogin}
                                            password={password}
                                            setPassword={setPassword}

                            />
                        </View>

                        <View className="view">
                            <ProjectInfo name={name}
                                         setName={setName}
                                         location={location}
                                         setLocation={setLocation}
                            />
                        </View>

                        <View className="view">
                            <ModelType selectedModelType={modelType}
                                       setSelectedModelType={setModelType}
                                       selectedEnergySystemType={energySystemType}
                                       setSelectedEnergySystemType={setEnergySystemType}
                            />
                        </View>

                        <View className="view">
                            <MapSettings mapDistance={mapDistance}
                                         setMapDistance={setMapDistance}
                                         mapImageUri={mapImageUri}
                                         setMapImageUri={setMapImageUri}
                            />
                        </View>

                    </Track>
                </Frame>
            </ViewPager>

        </div>
        <div className={Classes.DIALOG_FOOTER}>
            <div className={Classes.DIALOG_FOOTER_ACTIONS}>
                <Button intent={Intent.NONE}
                        style={{width: 90, fontFamily: "Montserrat", fontSize: 13}}
                        onClick={() => {
                            setStartDialog(false)
                        }}>
                    Close
                </Button>
                <Button disabled={activeStep === 0}
                        intent={Intent.PRIMARY}
                        style={{width: 90, fontFamily: "Montserrat", fontSize: 13}}
                        onClick={() => {
                            setActiveStep(prevState => {
                                if (prevState > 0) return prevState - 1
                                else return prevState
                            })
                        }}>
                    Back
                </Button>
                <Button disabled={!validateStep(activeStep)}
                        style={{width: 90, fontFamily: "Montserrat", fontSize: 13}}
                        text={activeStep === steps.length - 1 ? "Start" : "Next"}
                        intent={Intent.SUCCESS}
                        onClick={() => {
                            if (activeStep < steps.length - 1) {
                                setActiveStep(prevState => {
                                    if (prevState < steps.length - 1) return prevState + 1
                                    else return prevState
                                })
                            } else {
                                createProject()
                                setStartDialog(false)
                            }
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

const stepperStyle = {
    activeColor: "#78909c",
    completeColor: "#0f9960",
    defaultColor: "#a7b6c2",
    activeTitleColor: "#78909c",
    completeTitleColor: "#78909c",
    defaultTitleColor: "#c2d1dd",
    circleFontColor: "white",
    size: 25,
    circleFontSize: 14,
    titleFontSize: 14,
    circleTop: 6,
    defaultBarColor: "#e0e0e0",
    completeBarColor: "#e0e0e0",
    lineMarginOffset: 10,
    activeBorderColor: "#78909c",
    completeBorderColor: "#45525d",
    defaultBorderColor: "#78909c",
    defaultBorderWidth: 0,
    defaultBorderStyle: "solid",
    completeBorderStyle: "solid",
    activeBorderStyle: "solid",
}

const steps = [
    {title: 'Authentication'},
    {title: 'Project info'},
    {title: 'Model type'},
    {title: 'Map settings'}
]
