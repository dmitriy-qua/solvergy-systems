import React, {useEffect, useState} from "react";
import {createUseStyles} from "react-jss";
import {useDispatch, useSelector} from "react-redux";
import {getMonthInfo} from "../../../../../helpers/data-helper";
import {ResponsiveBarChart} from "./Charts/ResponsiveBarChart";
import {ResponsiveLineChart} from "./Charts/ResponsiveLineChart";

export const NetPresentValue = ({marketPaybackPeriod, height, width}) => {

    const styles = useStyles()

    const currency = useSelector(state => state.project && state.project.info.currency)

    const [yearlyNPV, setYearlyNPV] = useState([])

    useEffect(() => {
        const yearlyNPV = getNPVChartData(marketPaybackPeriod.yearlyNPV)
        setYearlyNPV(yearlyNPV)
    }, [])

    return <div style={{height: height - 280, overflow: "auto"}}>
        <div id="netpresentvalue-description">
            <p className={styles.dialogTitle}>
                Discounted payback period of thermal energy market creation
            </p>

            <hr className={styles.divider}/>

            {marketPaybackPeriod.paybackPeriod && <p className={styles.dialogText}>
                Discounted payback period: <span
                className={styles.bold}>{marketPaybackPeriod.paybackPeriod.toFixed(2)}</span> years
            </p>}

            <br/>

            <p className={styles.dialogTitle}>
                NPV chart:
            </p>

            <hr className={styles.divider}/>
        </div>


        <div style={{height: 600, textAlign: "center"}} id="netpresentvalue-chart">
            <ResponsiveLineChart data={yearlyNPV}
                                 axisLeftName={`NPV, ${currency} M`}
                                 axisBottomName={"Year"}
                                 height={600}
                                 width={(width - 100)}
                                 colorsScheme={"purples"}
                                 colors={["#ffca28"]}
            />
        </div>
    </div>
}


const getNPVChartData = (yearlyData) => {
    const data = []
    yearlyData.forEach((NPV, i) => {
            data.push({
                y: (NPV / 1000000).toFixed(3),
                x: i
            })
    })

    return [{id: "NetPresentValue", color: "hsl(107, 70%, 50%)", data}]
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
