import React, {useState} from "react";
import {createUseStyles} from "react-jss";
import {Button, Classes, Dialog, FormGroup, InputGroup, Intent, NumericInput, Switch} from "@blueprintjs/core";
import {FaSlidersH} from "react-icons/fa";
import {useDispatch, useSelector} from "react-redux";
import {setMarketModelSettings} from "../../../../redux/actions/project";


export const ModelSettings = ({setDialogIsOpened, dialogIsOpened}) => {

    const styles = useStyles()

    const dispatch = useDispatch()

    const modelSettings = useSelector(state => state.project.settings)

    const initialSettings = {
        marketShareCoefficient: "",
        optimizeMarketShareCoefficient: false,
        mainProducerFixedCostLossesCompensation: "",
        marketCapitalInvestment: "",
    }

    const [settings, setSettings] = useState(modelSettings ? modelSettings : initialSettings)

    const [marketShareCoefficientTouched, setMarketShareCoefficientTouched] = useState(false)
    const [optimizeMarketShareCoefficientTouched, setOptimizeMarketShareCoefficientTouched] = useState(false)
    const [mainProducerFixedCostLossesCompensationTouched, setMainProducerFixedCostLossesCompensationTouched] = useState(false)
    const [marketCapitalInvestmentTouched, setMarketCapitalInvestmentTouched] = useState(false)

    const resetStates = () => {
        setMarketShareCoefficientTouched(false)
        setOptimizeMarketShareCoefficientTouched(false)
        setMainProducerFixedCostLossesCompensationTouched(false)
        setMarketCapitalInvestmentTouched(false)
    }


    return <Dialog
        icon={<FaSlidersH size={16} className={"bp3-icon material-icon"}/>}
        onClose={() => {
            setDialogIsOpened(null)
        }}
        title={<span className={styles.dialogTitle}>Market model settings</span>}
        autoFocus={false}
        enforceFocus={false}
        canEscapeKeyClose={false}
        canOutsideClickClose={false}
        usePortal={true}
        style={{width: 450, height: 550, borderRadius: 2}}
        isOpen={!!dialogIsOpened}
    >
        <div className={[Classes.DIALOG_BODY]}>

            <div style={{display: "flex"}}>
                <div style={{flex: "100%"}}>

                    <p className={styles.dialogText}>
                        Market share coefficient, %:
                    </p>
                    <NumericInput placeholder="Enter value in %..."
                                  onValueChange={(value) => {
                                      setMarketShareCoefficientTouched(true)
                                      setSettings(prevState => ({
                                          ...prevState,
                                          marketShareCoefficient: value
                                      }))
                                  }}
                                  className={styles.inputText}
                                  allowNumericCharactersOnly
                                  selectAllOnIncrement
                                  majorStepSize={10}
                                  min={0}
                                  minorStepSize={0.1}
                                  stepSize={1}
                                  value={settings.marketShareCoefficient}
                                  leftIcon="pie-chart"
                                  fill
                                  intent={(!settings.marketShareCoefficient && marketShareCoefficientTouched) ? Intent.DANGER : Intent.NONE}
                    />
                    {(!settings.marketShareCoefficient && marketShareCoefficientTouched) &&
                    <span className={styles.errorText}>Enter value...</span>}
                    <br/>
                    <Switch checked={settings.optimizeMarketShareCoefficient}
                            label={<div className={styles.switchTextContainer}>
                                        <span className={styles.dialogText}>
                                            Optimize market share coefficient
                                        </span>
                                    </div>}
                            onChange={() => {
                                setOptimizeMarketShareCoefficientTouched(true)
                                setSettings(prevState => ({
                                    ...prevState,
                                    optimizeMarketShareCoefficient: !prevState.optimizeMarketShareCoefficient
                                }))
                            }}/>

                    <p className={styles.dialogText} style={{marginTop: 18}}>
                        Main producer fixed cost losses compensation, %:
                    </p>
                    <NumericInput placeholder="Enter value in %..."
                                  onValueChange={(value) => {
                                      setMainProducerFixedCostLossesCompensationTouched(true)
                                      setSettings(prevState => ({
                                          ...prevState,
                                          mainProducerFixedCostLossesCompensation: value
                                      }))
                                  }}
                                  className={styles.inputText}
                                  allowNumericCharactersOnly
                                  selectAllOnIncrement
                                  majorStepSize={10}
                                  min={0}
                                  minorStepSize={0.1}
                                  stepSize={1}
                                  value={settings.mainProducerFixedCostLossesCompensation}
                                  leftIcon="comparison"
                                  fill
                                  intent={(!settings.mainProducerFixedCostLossesCompensation && mainProducerFixedCostLossesCompensationTouched) ? Intent.DANGER : Intent.NONE}
                    />
                    {(!settings.mainProducerFixedCostLossesCompensation && mainProducerFixedCostLossesCompensationTouched) &&
                    <span className={styles.errorText}>Enter value...</span>}

                    <p className={styles.dialogText} style={{marginTop: 18}}>
                        Market creation capital investment, $:
                    </p>
                    <NumericInput placeholder="Enter value..."
                                  onValueChange={(value) => {
                                      setMarketCapitalInvestmentTouched(true)
                                      setSettings(prevState => ({
                                          ...prevState,
                                          marketCapitalInvestment: value
                                      }))
                                  }}
                                  className={styles.inputText}
                                  allowNumericCharactersOnly
                                  selectAllOnIncrement
                                  majorStepSize={10}
                                  min={0}
                                  minorStepSize={0.1}
                                  stepSize={1}
                                  value={settings.marketCapitalInvestment}
                                  leftIcon="dollar"
                                  fill
                                  intent={(!settings.marketCapitalInvestment && marketCapitalInvestmentTouched) ? Intent.DANGER : Intent.NONE}
                    />
                    {(!settings.marketCapitalInvestment && marketCapitalInvestmentTouched) &&
                    <span className={styles.errorText}>Enter value...</span>}
                </div>
            </div>

        </div>
        <div className={Classes.DIALOG_FOOTER}>
            <div className={Classes.DIALOG_FOOTER_ACTIONS}>
                <Button intent={Intent.NONE}
                        style={{width: 90, fontFamily: "Montserrat", fontSize: 13}}
                        onClick={() => {
                            resetStates()
                            setDialogIsOpened(null)
                        }}>
                    Close
                </Button>
                <Button disabled={Object.keys(settings).some(k => {
                    if (k !== "optimizeMarketShareCoefficient") return !settings[k]
                })}
                        style={{width: 90, fontFamily: "Montserrat", fontSize: 13}}
                        text={"Save"}
                        intent={Intent.SUCCESS}
                        onClick={() => {
                            dispatch(setMarketModelSettings(settings))
                            resetStates()
                            setDialogIsOpened(null)
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
        marginTop: 20,
        fontFamily: 'Montserrat'
    },
    dialogText: {
        fontWeight: 500,
        fontSize: 12,
        fontFamily: 'Montserrat',
    },
    divider: {
        border: 0,
        height: 0,
        borderTop: "1px solid rgba(0, 0, 0, 0.1)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.3)"
    }
})
