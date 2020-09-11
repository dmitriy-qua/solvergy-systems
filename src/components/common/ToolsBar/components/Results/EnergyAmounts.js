import React, {useEffect, useState} from "react";
import {createUseStyles} from "react-jss";
import {useDispatch, useSelector} from "react-redux";
import {getMonthInfo} from "../../../../../helpers/data-helper";
import {ResponsiveBarChart} from "./Charts/ResponsiveBarChart";

export const EnergyAmounts = ({results, height, width}) => {

    const styles = useStyles()

    const dispatch = useDispatch()

    const currency = useSelector(state => state.project && state.project.info.currency)

    const {consumersMonthlyWeightedTariffWithoutMarket} = results

    const [energyAmounts, setEnergyAmounts] = useState([])

    useEffect(() => {
        const energyAmounts = getMonthlyEnergyAmountsChartData(consumersMonthlyWeightedTariffWithoutMarket)
        setEnergyAmounts(energyAmounts)
    }, [])

    const {annualEnergyConsumption, annualEnergyProduction} = getAnnualEnergyAmounts(consumersMonthlyWeightedTariffWithoutMarket)

    return <div style={{height: height - 280, overflow: "auto"}}>
            <p className={styles.dialogTitle}>
                Annual energy consumption/production:
            </p>

            <hr className={styles.divider}/>

            <p className={styles.dialogText}>
                Annual energy consumption/energy production: <span
                className={styles.bold}>{annualEnergyConsumption.toFixed(2)}</span> Gcal / <span
                className={styles.bold}>{annualEnergyProduction.toFixed(2)}</span> Gcal
            </p>

            <br/>

            <p className={styles.dialogTitle}>
                Monthly energy consumption/production:
            </p>

            <hr className={styles.divider}/>

        <div style={{height: 400, textAlign: "center"}}>
            <ResponsiveBarChart data={energyAmounts}
                                keys={["Consumption", "Production"]}
                                indexBy={"Month"}
                                axisLeftName={"Energy amount"}
                                axisBottomName={"Month"}
                                height={400}
                                width={width - 200}
                                groupMode={"grouped"}
                                colorsScheme={"accent"}
            />
        </div>
        </div>
}


const getMonthlyEnergyAmountsChartData = (monthlyData) => {
    const energyAmounts = monthlyData.map(monthData => {
        return {
            Consumption: parseFloat(monthData.amountConsumption.toFixed(2)),
            ConsumptionColor: "hsl(105,64%,58%)",
            Production: parseFloat(monthData.amountProduction.toFixed(2)),
            ProductionColor: "hsl(240,63%,60%)",
            Month: getMonthInfo(monthData.month).fullName
        }
    })

    return energyAmounts
}


const getAnnualEnergyAmounts = (monthlyData) => {
    const annualEnergyConsumption = monthlyData.reduce((acc, monthData) => acc += monthData.amountConsumption, 0)
    const annualEnergyProduction = monthlyData.reduce((acc, monthData) => acc += monthData.amountProduction, 0)

    return {annualEnergyConsumption, annualEnergyProduction}
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
