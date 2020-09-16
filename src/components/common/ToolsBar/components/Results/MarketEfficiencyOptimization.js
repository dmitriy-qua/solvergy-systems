import React, {useEffect, useState} from "react";
import {createUseStyles} from "react-jss";
import {useDispatch, useSelector} from "react-redux";
import {getMonthInfo} from "../../../../../helpers/data-helper";
import {ResponsiveBarChart} from "./Charts/ResponsiveBarChart";
import {Select} from "@blueprintjs/select";
import {energySources} from "../../../../data/energy-sources";
import {Button, Intent, NumericInput} from "@blueprintjs/core";
import {ResponsiveLineChart} from "./Charts/ResponsiveLineChart";

export const MarketEfficiencyOptimization = ({systemMarketEfficiencyOptimizationSet, annualMarketEfficiency, height, width}) => {

    const styles = useStyles()

    const dispatch = useDispatch()

    const currency = useSelector(state => state.project && state.project.info.currency)

    const [relativeMarketEfficiency, setRelativeMarketEfficiency] = useState([])
    const [absoluteMarketEfficiency, setAbsoluteMarketEfficiency] = useState([])

    useEffect(() => {
        const relativeMarketEfficiency = getMonthlyRelativeMarketEfficiencyChartData(systemMarketEfficiencyOptimizationSet)
        const absoluteMarketEfficiency = getMonthlyAbsoluteMarketEfficiencyChartData(systemMarketEfficiencyOptimizationSet)

        setRelativeMarketEfficiency(relativeMarketEfficiency)
        setAbsoluteMarketEfficiency(absoluteMarketEfficiency)
    }, [])

    return <div style={{height: height - 280, overflow: "auto"}}>
        <div style={{display: "flex"}}>
            <div style={{flex: "50%", paddingRight: 10}}>
                <p className={styles.dialogTitle}>
                    Monthly relative market efficiency:
                </p>

                <hr className={styles.divider}/>

                <div style={{height: 400, textAlign: "center"}}>
                    <ResponsiveLineChart data={relativeMarketEfficiency}
                                        axisLeftName={"Relative market efficiency, %"}
                                        axisBottomName={"Market share coefficient"}
                                        height={400}
                                        width={(width - 150) / 2}
                                        colorsScheme={"reds"}
                                        colors={["#9ccc65"]}
                    />
                </div>
            </div>

            <div style={{flex: "50%", paddingLeft: 10}}>
                <p className={styles.dialogTitle}>
                    Monthly absolute market efficiency:
                </p>

                <hr className={styles.divider}/>

                <div style={{height: 400, textAlign: "center"}}>
                    <ResponsiveLineChart data={absoluteMarketEfficiency}
                                        axisLeftName={`Absolute market efficiency, ${currency} M`}
                                        axisBottomName={"Market share coefficient"}
                                        height={400}
                                        width={(width - 150) / 2}
                                        colorsScheme={"purples"}
                                        colors={["#ffca28"]}
                    />
                </div>
            </div>
        </div>




    </div>
}

const getMonthlyRelativeMarketEfficiencyChartData = (systemMarketEfficiencyOptimizationSet) => {
    const data = []
    systemMarketEfficiencyOptimizationSet.forEach((coef, i) => {
        if ((i) % 4 === 0) {
            data.push({
                y: (coef.marketRelativeEfficiency * 100).toFixed(2),
                x: coef.marketShareCoefficient
            })
        }
    })

    return [{id: "RelativeMarketEfficiency", color: "hsl(107, 70%, 50%)", data}]
}

const getMonthlyAbsoluteMarketEfficiencyChartData = (systemMarketEfficiencyOptimizationSet) => {
    const data = []
    systemMarketEfficiencyOptimizationSet.forEach((coef, i) => {
        if ((i) % 4 === 0) {
            data.push({
                y: (coef.marketAbsoluteEfficiency / 1000000).toFixed(3),
                x: coef.marketShareCoefficient
            })
        }
    })

    return [{id: "AbsoluteMarketEfficiency", color: "hsl(107, 70%, 50%)", data}]
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
