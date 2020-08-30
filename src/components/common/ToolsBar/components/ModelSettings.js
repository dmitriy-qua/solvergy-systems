import React, {useEffect, useMemo, useState} from "react";
import {createUseStyles} from "react-jss";
import {
    Button,
    Classes,
    Dialog,
    FormGroup,
    InputGroup,
    Intent,
    MenuItem,
    NumericInput,
    Switch
} from "@blueprintjs/core";
import {FaSlidersH} from "react-icons/fa";
import {useDispatch, useSelector} from "react-redux";
import {setMarketModelSettings} from "../../../../redux/actions/project";
import {Select} from "@blueprintjs/select";
import {generateId} from "../../../../helpers/data-helper";
import {marketShareCoefficientTypes} from "../../../data/market-share-coefficient-types";
import Slider, {Range} from 'rc-slider';

import 'rc-slider/assets/index.css';


export const ModelSettings = ({setDialogIsOpened, dialogIsOpened}) => {

    const styles = useStyles()

    const dispatch = useDispatch()

    const modelSettings = useSelector(state => state.project.settings)
    const producers = useSelector(state => state.project && state.project.objects.producers)

    const defaultSharesArray = producers.map((producer, i) => {
            return {
                id: producer.id,
                share: i === producers.length - 1 ? 100 : (100 / producers.length) * (i + 1)
            }
    })

    const initialSettings = {
        marketShareCoefficientType: "",
        marketShareCoefficient: 10,
        optimizeMarketShareCoefficient: false,
        marketShareCoefficientRanges: defaultSharesArray,
        mainProducerFixedCostLossesCompensation: "",
        marketCapitalInvestment: "",
    }


    useEffect(() => {
        if (modelSettings && dialogIsOpened) setSettings(modelSettings)
    }, [dialogIsOpened])

    const [settings, setSettings] = useState(modelSettings ? modelSettings : initialSettings)

    const producersRangeData = useMemo(() => {
        const convertedRanges = modelSettings ? modelSettings.marketShareCoefficientRanges : defaultSharesArray

        setSettings(prevState => ({...prevState, marketShareCoefficientRanges: convertedRanges}))

        return producers.map((producer, i) => {
            if (i === producers.length - 1) {
                return {
                    display: "none",
                }
            } else {
                return {
                    backgroundColor: producers[i+1].color,
                    borderColor: producer.color
                }
            }
        }).splice(0)
    }, [producers])

    const [marketShareCoefficientTouched, setMarketShareCoefficientTouched] = useState(false)
    const [marketShareCoefficientTypeTouched, setMarketShareCoefficientTypeTouched] = useState(false)
    const [optimizeMarketShareCoefficientTouched, setOptimizeMarketShareCoefficientTouched] = useState(false)
    const [mainProducerFixedCostLossesCompensationTouched, setMainProducerFixedCostLossesCompensationTouched] = useState(false)
    const [marketCapitalInvestmentTouched, setMarketCapitalInvestmentTouched] = useState(false)

    const handleMarketShareCoefficientTypeSelect = (item) => {
        setMarketShareCoefficientTypeTouched(true)
        setSettings(prevState => ({...prevState, marketShareCoefficientType: item}))
    }

    const renderMarketShareCoefficientTypeItem = (item) => {
        return (
            <MenuItem
                key={generateId()}
                onClick={() => handleMarketShareCoefficientTypeSelect(item)}
                text={item.name}
            />
        );
    }

    const resetStates = () => {
        setSettings(initialSettings)
        setMarketShareCoefficientTypeTouched(false)
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
        style={{width: 550, height: 580, borderRadius: 2}}
        isOpen={!!dialogIsOpened}
    >
        <div className={[Classes.DIALOG_BODY]} style={{overflow: "auto", paddingRight: 4, paddingLeft: 4}}>

            <div style={{display: "flex"}}>
                <div style={{flex: "100%"}}>

                    <p className={styles.dialogText} style={{marginTop: 14}}>
                        Select market share coefficient type:
                    </p>
                    <Select
                        items={marketShareCoefficientTypes}
                        itemRenderer={renderMarketShareCoefficientTypeItem}
                        activeItem={settings.marketShareCoefficientType && settings.marketShareCoefficientType.name}
                        className="fullwidth"
                        popoverProps={{minimal: true, portalClassName: "fullwidth", popoverClassName: "selectPopover"}}
                        filterable={false}
                        onItemSelect={handleMarketShareCoefficientTypeSelect}
                    >
                        <Button text={<span
                            className={styles.selectText}>{settings.marketShareCoefficientType && settings.marketShareCoefficientType.name || "Select market share coefficient type..."}</span>}
                                rightIcon="caret-down" alignText="left" fill="{true}"/>
                    </Select>


                    {(!settings.marketShareCoefficientType && marketShareCoefficientTypeTouched) &&
                    <p className={styles.errorText}>Set market share coefficient type!</p>}

                    {settings.marketShareCoefficientType.type === "constant" && <>
                        <p className={styles.dialogText} style={{marginTop: 18}}>
                            Market share coefficient, %:
                        </p>
                        <div style={{display: "flex", marginTop: 12}}>
                            <div style={{flex: "85%", paddingRight: 10, paddingLeft: 10}}>
                                <Slider disabled={settings.optimizeMarketShareCoefficient}
                                        min={0.1}
                                        max={99.9}
                                    //railStyle={{height: 6}}
                                        trackStyle={{backgroundColor: settings.optimizeMarketShareCoefficient ? "grey" : "#137cbd"}}
                                        handleStyle={{
                                            borderColor: settings.optimizeMarketShareCoefficient ? "grey" : "#137cbd",
                                            backgroundColor: settings.optimizeMarketShareCoefficient ? "grey" : '#137cbd',
                                        }}
                                        step={0.1}
                                        defaultValue={settings.marketShareCoefficient}
                                        onChange={(value) => setSettings(prevState => ({
                                            ...prevState,
                                            marketShareCoefficient: value
                                        }))}/>
                            </div>
                            <div style={{flex: "15%", marginTop: -2, textAlign: "center"}}>
                            <span className={styles.indicatorText}
                                  style={{color: settings.optimizeMarketShareCoefficient && "grey"}}>
                                {settings.marketShareCoefficient} %
                            </span>
                            </div>
                        </div>
                        <div style={{marginTop: 12}}>
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
                        </div>
                    </>}

                    {settings.marketShareCoefficientType.type === "manual" && <>
                        <p className={styles.dialogText} style={{marginTop: 18}}>
                            Market share coefficient ranges, %:
                        </p>
                        <div style={{display: "flex", marginTop: 12, paddingRight: 10, paddingLeft: 10}}>
                            <Range count={producers.length - 1}
                                   trackStyle={producersRangeData}
                                   handleStyle={producersRangeData}
                                   disabled={producers.length === 1}
                                   railStyle={{backgroundColor: producers.length === 1 ? "lightgrey" :producers[0].color}}
                                   allowCross={false}
                                   //pushable={1}
                                   step={0.1}
                                   value={settings.marketShareCoefficientRanges.map(producer => producer.share)}
                                   onChange={(value) => {
                                       if (value[value.length - 1] === 100) {
                                           setSettings(prevState => ({
                                               ...prevState,
                                               marketShareCoefficientRanges: prevState.marketShareCoefficientRanges.map((prod, i) => {
                                                   return {
                                                       ...prod,
                                                       share: value[i]
                                                   }
                                               })
                                           }))
                                       }
                                   }}/>
                        </div>

                        <ul>
                            {settings.marketShareCoefficientRanges.map((producer, i) => {

                                const producerData = producers.find(prod => producer.id === prod.id)

                                const share = i === 0 ?
                                    Math.floor(producer.share * 10) / 10
                                    :
                                    Math.floor((producer.share - settings.marketShareCoefficientRanges[i - 1].share) * 10) / 10

                                return <li key={producer.id} style={{color: producerData.color, fontSize: 20}}>
                                    <span className={styles.listText} style={{position: "relative", top: -2}}>
                                        {producerData.name}: {share} %
                                    </span>
                                </li>
                            })}
                        </ul>

                    </>}

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
