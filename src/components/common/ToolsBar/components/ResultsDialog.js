import React, {useEffect, useRef, useState} from "react";
import {createUseStyles} from "react-jss";
import {
    Button,
    Classes,
    Dialog,
    Intent,
} from "@blueprintjs/core";
import {FaChartBar} from "react-icons/fa";
import {useDispatch, useSelector} from "react-redux";
import Stepper from "react-stepper-horizontal";
import {Frame, Track, View, ViewPager} from "react-view-pager";
import {EnergyAmounts} from "./Results/EnergyAmounts";
import {Tariffs} from "./Results/Tariffs";
import {NetworksLosses} from "./Results/NetworksLosses";
import {NetworksLossesDetailed} from "./Results/NetworksLossesDetailed";
import {MainProducerFinancialResult} from "./Results/MainProducerFinancialResult";
import {TariffsWithMarket} from "./Results/TariffsWithMarket";
import {ProducersFinancialResult} from "./Results/ProducersFinancialResult";
import {MarketEfficiency} from "./Results/MarketEfficiency";
import {MarketEfficiencyOptimization} from "./Results/MarketEfficiencyOptimization";
import {NetPresentValue} from "./Results/NetPresentValue";
import {jsPDF} from 'jspdf'
import html2canvas from "html2canvas";
import {MontserratBoldBase64} from "../../../../assets/fonts/Montserrat/MontserratBoldBase64";
import {setProjectIsLoading} from "../../../../redux/actions/auth";
import {
    generateEnergyAmountPage,
    generateFrontPage, generateMainProducerFinancialResultPage,
    generateMarketEfficiencyOptimizationPage,
    generateMarketEfficiencyPage,
    generateNetPresentValuePage,
    generateNetworksLossesPage,
    generateProducersFinancialResultPage,
    generateTariffsPage, generateTariffsWithMarketPage
} from "../../../../helpers/pdf-helper";


export const ResultsDialog = ({
                                  dialogIsOpened,
                                  setDialogIsOpened,
                                  height,
                                  width,
                                  setResultsDialogSize,
                                  setLicenseRestrictionAlertDialogIsOpened,
                                  setLicenseRestrictionAlertMessage
}) => {

    const styles = useStyles()

    const dispatch = useDispatch()

    const results = useSelector(state => state.project && state.project.results)
    const producers = useSelector(state => state.project && state.project.objects.producers)
    const licenseRestrictions = useSelector(state => state.auth.licenseRestrictions)
    const user = useSelector(state => state.auth.user)
    const project = useSelector(state => state.project)
    const projectIsLoading = useSelector(state => state.auth.projectIsLoading)

    const [activeStep, setActiveStep] = useState(0)
    const [viewPager, setViewPager] = useState(null)
    const [steps, setSteps] = useState([])


    useEffect(() => {
        if (results && results.systemMarketEfficiency) {
            if (!licenseRestrictions.networksCalculationResultIsDetailed) {
                const filteredSteps = stepsWithMarket.filter(step => step.title !== "Networks losses (Detailed)")
                setSteps(filteredSteps)

            } else {
                setSteps(stepsWithMarket)
            }
        }

        if (results && results.systemMarketEfficiencyOptimizationSet) {
            if (!licenseRestrictions.networksCalculationResultIsDetailed) {
                const filteredSteps = stepsWithMarket.filter(step => step.title !== "Networks losses (Detailed)")
                setSteps(filteredSteps)
            } else {
                setSteps(stepsWithMarketOptimization)
            }
        }

        if (results && results.systemResultWithoutMarket) {
            if (!licenseRestrictions.networksCalculationResultIsDetailed) {
                const filteredSteps = stepsWithMarket.filter(step => step.title !== "Networks losses (Detailed)")
                setSteps(filteredSteps)
            } else {
                setSteps(stepsWithoutMarket)
            }
        }
    }, [results])

    const restrictReports = () => {
        const message = <span>Your current license type is <b>{user && user.systemsLicense.pricingPlan.planName}</b>. You are not able to export report.</span>
        setLicenseRestrictionAlertMessage(message)
        setLicenseRestrictionAlertDialogIsOpened(true)
    }

    const generateReportPDF = async () => {
        dispatch(setProjectIsLoading(true))
        const oldWidth = width
        setResultsDialogSize(prevState => ({...prevState, width: 1400}))

        setTimeout(async () => {
            const doc = new jsPDF('l', 'px', "a4")
            doc.addFileToVFS("Montserrat-Bold.ttf", MontserratBoldBase64)
            doc.addFont('Montserrat-Bold.ttf', 'Montserrat', 'normal')
            doc.setFont('Montserrat')

            const width = doc.internal.pageSize.getWidth()
            const widthWithPadding = width * 0.9
            const padding = (width - widthWithPadding) / 2

            await generateFrontPage(doc, padding, widthWithPadding, project)

            if (results.systemMarketEfficiency) {
                await generateEnergyAmountPage(doc, padding, widthWithPadding)
                await generateNetworksLossesPage(doc, padding, widthWithPadding)
                await generateProducersFinancialResultPage(doc, padding, widthWithPadding, producers)
                await generateTariffsWithMarketPage(doc, padding, widthWithPadding)
                await generateMarketEfficiencyPage(doc, padding, widthWithPadding)
                if (results.systemMarketEfficiencyOptimizationSet) await generateMarketEfficiencyOptimizationPage(doc, padding, widthWithPadding)
                await generateNetPresentValuePage(doc, padding, widthWithPadding)
            } else {
                await generateEnergyAmountPage(doc, padding, widthWithPadding)
                await generateNetworksLossesPage(doc, padding, widthWithPadding)
                await generateMainProducerFinancialResultPage(doc, padding, widthWithPadding, producers)
                await generateTariffsPage(doc, padding, widthWithPadding)
            }

            doc.save(`solvergy-systems-report-${project.info.name}.pdf`)
            setResultsDialogSize(prevState => ({...prevState, width: oldWidth}))

            dispatch(setProjectIsLoading(false))
        }, 3000)


    }

    return <Dialog
        icon={<FaChartBar size={16} className={"bp3-icon material-icon"}/>}
        onClose={() => setDialogIsOpened(false)}
        title={<span className={styles.dialogTitle}>Results</span>}
        autoFocus={false}
        enforceFocus={false}
        canEscapeKeyClose={false}
        canOutsideClickClose={false}
        usePortal={!projectIsLoading}
        style={{width, height}}
        isOpen={dialogIsOpened}
    >
        <div className={[Classes.DIALOG_BODY]}>

            {results && results.systemMarketEfficiency && <div>
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
                            style={{overflow: "auto", width: width}}
                        >

                            <View className="view">
                                <div className="start-block">
                                    <EnergyAmounts
                                        consumersMonthlyWeightedTariff={results.systemMarketEfficiency.consumersMonthlyWeightedTariffWithMarket}
                                        height={height}
                                        width={width}/>
                                </div>
                            </View>

                            <View className="view">
                                <div className="start-block">
                                    <NetworksLosses
                                        totalMonthlyNetworkLosses={results.systemMarketEfficiency.resultWithMarket.totalMonthlyNetworkLosses}
                                        totalElectricityConsumption={results.systemMarketEfficiency.resultWithMarket.totalElectricityConsumption}
                                        totalHeatLoss={results.systemMarketEfficiency.resultWithMarket.totalHeatLoss}
                                        height={height}
                                        width={width}
                                    />
                                </div>
                            </View>

                            {licenseRestrictions.networksCalculationResultIsDetailed ?
                                <View className="view">
                                    <div className="start-block">
                                        <NetworksLossesDetailed
                                            networksResult={results.systemMarketEfficiency.resultWithMarket.networksResult}
                                            height={height}
                                            width={width}/>
                                    </div>
                                </View>
                                :
                                <></>
                            }

                            <View className="view">
                                <div className="start-block">
                                    <ProducersFinancialResult
                                        financialResult={results.systemMarketEfficiency.resultWithMarket.financialResult}
                                        height={height}
                                        width={width}/>
                                </div>
                            </View>

                            <View className="view">
                                <div className="start-block">
                                    <TariffsWithMarket
                                        consumersAnnualWeightedTariffsWithAdditionalExpenses={results.systemMarketEfficiency.consumersAnnualWeightedTariffsWithAdditionalExpenses}
                                        monthlyMarketEfficiency={results.systemMarketEfficiency.monthlyMarketEfficiency}
                                        height={height}
                                        width={width}/>
                                </div>
                            </View>

                            {results.systemMarketEfficiencyOptimizationSet ?
                                <View className="view">
                                    <div className="start-block">
                                        <MarketEfficiencyOptimization
                                            systemMarketEfficiencyOptimizationSet={results.systemMarketEfficiencyOptimizationSet}
                                            annualMarketEfficiency={results.systemMarketEfficiency.annualMarketEfficiency}
                                            height={height}
                                            width={width}
                                        />
                                    </div>
                                </View>
                                :
                                <></>
                            }


                            <View className="view">
                                <div className="start-block">
                                    <MarketEfficiency
                                        monthlyMarketEfficiency={results.systemMarketEfficiency.monthlyMarketEfficiency}
                                        annualMarketEfficiency={results.systemMarketEfficiency.annualMarketEfficiency}
                                        height={height}
                                        width={width}
                                    />
                                </div>
                            </View>

                            <View className="view">
                                <div className="start-block">
                                    <NetPresentValue
                                        marketPaybackPeriod={results.systemMarketEfficiency.marketPaybackPeriod}
                                        height={height}
                                        width={width}
                                    />
                                </div>
                            </View>

                        </Track>
                    </Frame>
                </ViewPager>
            </div>}

            {results && results.systemResultWithoutMarket && <div>
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
                            style={{overflow: "auto", width: width}}
                        >

                            <View className="view">
                                <div className="start-block">
                                    <EnergyAmounts
                                        consumersMonthlyWeightedTariff={results.systemResultWithoutMarket.consumersMonthlyWeightedTariffWithoutMarket}
                                        height={height}
                                        width={width}/>
                                </div>
                            </View>

                            <View className="view">
                                <div className="start-block">
                                    <NetworksLosses
                                        totalMonthlyNetworkLosses={results.systemResultWithoutMarket.resultWithoutMarket.totalMonthlyNetworkLosses}
                                        totalElectricityConsumption={results.systemResultWithoutMarket.resultWithoutMarket.totalElectricityConsumption}
                                        totalHeatLoss={results.systemResultWithoutMarket.resultWithoutMarket.totalHeatLoss}
                                        height={height}
                                        width={width}
                                    />
                                </div>
                            </View>

                            {licenseRestrictions.networksCalculationResultIsDetailed ?
                                <View className="view">
                                    <div className="start-block">
                                        <NetworksLossesDetailed
                                            networksResult={results.systemResultWithoutMarket.resultWithoutMarket.networksResult}
                                            height={height}
                                            width={width}/>
                                    </div>
                                </View>
                                :
                                <></>
                            }

                            <View className="view">
                                <div className="start-block">
                                    <MainProducerFinancialResult
                                        financialResult={results.systemResultWithoutMarket.resultWithoutMarket.financialResult}
                                        height={height}
                                        width={width}/>
                                </div>
                            </View>

                            <View className="view">
                                <div className="start-block">
                                    <Tariffs
                                        consumersMonthlyWeightedTariff={results.systemResultWithoutMarket.consumersMonthlyWeightedTariffWithoutMarket}
                                        consumersAnnualWeightedTariff={results.systemResultWithoutMarket.consumersAnnualWeightedTariffWithoutMarket}
                                        height={height}
                                        width={width}/>
                                </div>
                            </View>

                        </Track>
                    </Frame>
                </ViewPager>

            </div>}

        </div>

        <div className={Classes.DIALOG_FOOTER}>
            <div className={Classes.DIALOG_FOOTER_ACTIONS}>
                <Button intent={Intent.NONE}
                        style={{width: 100, fontFamily: "Montserrat", fontSize: 13}}
                        onClick={() => {
                            setDialogIsOpened(false)
                        }}>
                    Close
                </Button>

                <Button intent={Intent.NONE}
                        style={{width: 120, fontFamily: "Montserrat", fontSize: 13}}
                        onClick={() => licenseRestrictions.reports ? generateReportPDF() : restrictReports()}>
                    Export PDF...
                </Button>


                <Button disabled={activeStep === 0}
                        intent={Intent.PRIMARY}
                        style={{width: 100, fontFamily: "Montserrat", fontSize: 13}}
                        onClick={() => {
                            setActiveStep(prevState => {
                                if (prevState > 0) return prevState - 1
                                else return prevState
                            })
                        }}>
                    Back
                </Button>
                <Button disabled={activeStep === steps.length - 1}
                        style={{width: 100, fontFamily: "Montserrat", fontSize: 13}}
                        text={activeStep === steps.length - 1 ? "Start" : "Next"}
                        intent={Intent.SUCCESS}
                        onClick={() => {
                            if (activeStep < steps.length - 1) {
                                setActiveStep(prevState => {
                                    if (prevState < steps.length - 1) return prevState + 1
                                    else return prevState
                                })
                            }
                        }}>
                </Button>
            </div>
        </div>
    </Dialog>
}

const stepperStyle = {
    activeColor: "#78909c",
    completeColor: "#78909c",
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

const stepsWithoutMarket = [
    {title: 'Energy amount'},
    {title: "Networks losses"},
    {title: "Networks losses (Detailed)"},
    {title: "Financial result"},
    {title: 'Tariffs'},
]

const stepsWithMarket = [
    {title: 'Energy amount'},
    {title: "Networks losses"},
    {title: "Networks losses (Detailed)"},
    {title: "Financial result"},
    {title: 'Tariffs'},
    {title: 'Market efficiency'},
    {title: 'Net present value'},
]

const stepsWithMarketOptimization = [
    {title: 'Energy amount'},
    {title: "Networks losses"},
    {title: "Networks losses (Detailed)"},
    {title: "Financial result"},
    {title: 'Tariffs'},
    {title: 'Market efficiency optimization'},
    {title: 'Market efficiency'},
    {title: 'Net present value'},
]

const useStyles = createUseStyles({
    text: {
        marginTop: 12,
        fontWeight: 600,
        fontSize: 13,
        fontFamily: "Montserrat"
    },
    dialogBackdrop: {
        //backgroundColor: "white",
        boxShadow: "none"
    },
    page: {
        flexDirection: 'row',
        backgroundColor: '#E4E4E4'
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1
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
