import React, {useEffect, useState} from "react";
import {createUseStyles} from "react-jss";
import {useDispatch, useSelector} from "react-redux";
import {getMonthInfo} from "../../../../../helpers/data-helper";
import {ResponsiveBarChart} from "./Charts/ResponsiveBarChart";
import {Select} from "@blueprintjs/select";
import {energySources} from "../../../../data/energy-sources";
import {Button, Intent, NumericInput} from "@blueprintjs/core";

export const NetworksLosses = ({totalMonthlyNetworkLosses, totalElectricityConsumption, totalHeatLoss, height, width}) => {

    const styles = useStyles()

    const dispatch = useDispatch()

    const currency = useSelector(state => state.project && state.project.info.currency)

    const [networksHeatLosses, setNetworksHeatLosses] = useState([])
    const [networksElectricityConsumption, setNetworksElectricityConsumption] = useState([])

    useEffect(() => {
        const networksHeatLosses = getMonthlyNetworksHeatLossesChartData(totalMonthlyNetworkLosses)
        const networksElectricityConsumption = getMonthlyNetworksElectricityConsumptionChartData(totalMonthlyNetworkLosses)

        setNetworksHeatLosses(networksHeatLosses)
        setNetworksElectricityConsumption(networksElectricityConsumption)
    }, [])

    return <div style={{height: height - 280, overflow: "auto"}}>
        <div id="networks-losses-description">
            <p className={styles.dialogTitle}>
                Annual networks losses:
            </p>

            <hr className={styles.divider}/>

            <p className={styles.dialogText}>
                Annual networks heat losses: <span className={styles.bold}>{totalHeatLoss.toFixed(2)}</span> Gcal
            </p>

            <p className={styles.dialogText}>
                Annual electricity consumption for heat carrier transportation through networks: <span
                className={styles.bold}>{totalElectricityConsumption.toFixed(2)}</span> kWh
            </p>

            <br/>
        </div>

        <div style={{display: "flex"}}>
            <div style={{flex: "50%", paddingRight: 10}}>
                <div id="monthly-networks-losses-description">
                    <p className={styles.dialogTitle}>
                        Monthly networks heat losses:
                    </p>

                    <hr className={styles.divider}/>
                </div>

                <div style={{height: 600, textAlign: "center"}} id="monthly-networks-losses-chart">
                    <ResponsiveBarChart data={networksHeatLosses}
                                        keys={["Heat loss"]}
                                        indexBy={"Month"}
                                        axisLeftName={"Heat losses, Gcal"}
                                        axisBottomName={"Month"}
                                        height={600}
                                        width={(width - 150) / 2}
                                        groupMode={"grouped"}
                                        colorsScheme={"reds"}
                                        colors={["#ff9800"]}
                    />
                </div>
            </div>

            <div style={{flex: "50%", paddingLeft: 10}}>
                <div id="monthly-electricity-consumption-description">
                    <p className={styles.dialogTitle}>
                        Monthly electricity consumption (heat carrier transportation):
                    </p>

                    <hr className={styles.divider}/>
                </div>

                <div style={{height: 600, textAlign: "center"}} id="monthly-electricity-consumption-chart">
                    <ResponsiveBarChart data={networksElectricityConsumption}
                                        keys={["Electricity consumption"]}
                                        indexBy={"Month"}
                                        axisLeftName={"Electricity consumption, kWh"}
                                        axisBottomName={"Month"}
                                        height={600}
                                        width={(width - 150) / 2}
                                        groupMode={"grouped"}
                                        colorsScheme={"purples"}
                                        colors={["#9575cd"]}
                    />
                </div>
            </div>
        </div>


    </div>
}

const getMonthlyNetworksHeatLossesChartData = (monthlyData) => {

    const networksData = []
    for (const [monthNum, monthData] of Object.entries(monthlyData)) {
        networksData.push({
            "Heat loss": parseFloat(monthData.totalHeatLoss.toFixed(2)),
            "Heat lossColor": "hsl(105,64%,58%)",
            Month: getMonthInfo(parseInt(monthNum).toString()).fullName
        })
    }

    return networksData
}

const getMonthlyNetworksElectricityConsumptionChartData = (monthlyData) => {

    const networksData = []
    for (const [monthNum, monthData] of Object.entries(monthlyData)) {
        networksData.push({
            "Electricity consumption": parseFloat(monthData.totalElectricityConsumption.toFixed(2)),
            "Electricity consumptionColor": "hsl(240,63%,60%)",
            Month: getMonthInfo(parseInt(monthNum).toString()).fullName
        })
    }

    return networksData
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
        fontSize: 13,
        fontFamily: 'Montserrat',
        marginTop: 16,
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
