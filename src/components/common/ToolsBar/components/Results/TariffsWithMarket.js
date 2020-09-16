import React, {useEffect, useState} from "react";
import {createUseStyles} from "react-jss";
import {useDispatch, useSelector} from "react-redux";
import {getMonthInfo} from "../../../../../helpers/data-helper";
import {ResponsiveBarChart} from "./Charts/ResponsiveBarChart";

export const TariffsWithMarket = ({
                            consumersMonthlyWeightedTariffWithMarket,
                            consumersAnnualWeightedTariffWithMarket,
                            consumersMonthlyWeightedTariffWithoutMarket,
                            consumersAnnualWeightedTariffWithoutMarket,
                            height,
                            width
}) => {

    const styles = useStyles()

    const dispatch = useDispatch()

    const currency = useSelector(state => state.project && state.project.info.currency)

    const [tariffs, setTariffs] = useState([])

    useEffect(() => {
        const tariffs = getMonthlyTariffChartData(consumersMonthlyWeightedTariffWithMarket, consumersMonthlyWeightedTariffWithoutMarket)
        setTariffs(tariffs)
    }, [])

    return <div style={{height: height - 280, overflow: "auto"}}>
        <p className={styles.dialogTitle}>
            Annual tariff:
        </p>

        <hr className={styles.divider}/>

        <p className={styles.dialogText}>
            Annual average weighted tariff for consumers (with market): <span
            className={styles.bold}>{consumersAnnualWeightedTariffWithMarket.tariff.toFixed(2)}</span> {currency}/Gcal
        </p>

        <p className={styles.dialogText}>
            Annual average weighted tariff for consumers (without market): <span
            className={styles.bold}>{consumersAnnualWeightedTariffWithoutMarket.tariff.toFixed(2)}</span> {currency}/Gcal
        </p>

        <br/>

        <p className={styles.dialogTitle}>
            Monthly financial results:
        </p>

        <hr className={styles.divider}/>

        <div style={{height: 400, textAlign: "center"}}>
            <ResponsiveBarChart data={tariffs}
                                keys={["Tariff with market", "Tariff without market"]}
                                indexBy={"Month"}
                                axisLeftName={`Tariff ${currency}/Gcal`}
                                axisBottomName={"Month"}
                                height={400}
                                width={width - 200}
                                groupMode={"grouped"}
                                colorsScheme={"pastel1"}
            />
        </div>
    </div>
}

const getMonthlyTariffChartData = (consumersMonthlyWeightedTariffWithMarket, consumersMonthlyWeightedTariffWithoutMarket) => {
    const tariffs = consumersMonthlyWeightedTariffWithMarket.map((monthData, i) => {
        return {
            "Tariff with market": parseFloat(monthData.tariff.toFixed(2)),
            "Tariff with marketColor": "hsl(336, 70%, 50%)",
            "Tariff without market": parseFloat(consumersMonthlyWeightedTariffWithoutMarket[i].tariff.toFixed(2)),
            "Tariff without marketColor": "hsl(336, 70%, 50%)",
            Month: getMonthInfo(monthData.month).fullName
        }
    })

    return tariffs
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
