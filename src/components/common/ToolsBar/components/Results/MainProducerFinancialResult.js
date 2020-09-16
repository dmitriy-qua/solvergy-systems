import React, {useEffect, useState} from "react";
import {createUseStyles} from "react-jss";
import {useDispatch, useSelector} from "react-redux";
import {getMonthInfo} from "../../../../../helpers/data-helper";
import {Cell, Column, Table} from "@blueprintjs/table";


export const MainProducerFinancialResult = ({financialResult, height, width}) => {

    const styles = useStyles()

    const currency = useSelector(state => state.project && state.project.info.currency)

    const [rows, setRows] = useState([])

    useEffect(() => {
        const rows = getFinancialResultRows(currency)
        setRows(rows)
    }, [])

    return <div style={{height: height - 280, overflow: "auto"}}>
        <p className={styles.dialogTitle}>
            Main producer financial results:
        </p>

        {rows.length > 0 && <Table numRows={rows.length} columnWidths={getColumnWidth(financialResult)} enableRowHeader={false} enableColumnResizing={false}>
            <Column name="Parameter" className={[styles.text, styles.bold]} cellRenderer={(rowIndex) => <Cell>{`${rows[rowIndex].name}`}</Cell>}/>
            {financialResult.map((monthData, i) => {
                const monthName = getMonthInfo(monthData.month).fullName

                const mainProducerData = monthData.producerFinancialResults.find(producer => producer.id === "main_producer")

                return <Column className={styles.text} key={monthName} name={monthName} cellRenderer={(rowIndex) => {
                    return <Cell>{`${mainProducerData[rows[rowIndex].key].toFixed(2)} ${rows[rowIndex].measureUnit}`}</Cell>
                }}/>
            })}
        </Table>}
    </div>
}

const getColumnWidth = (result) => {
    const COLUMN_WIDTH = 140
    const columnWidth = [COLUMN_WIDTH + 100]
    result.forEach(() => columnWidth.push(COLUMN_WIDTH))
    return columnWidth
}

const getFinancialResultRows = (currency) => {
    return [
        {name: "Heat energy production", key: "GcalAmountProductionInFact", measureUnit: "Gcal"},
        {name: "Tariff", key: "totalMonthlyForecastedTariff", measureUnit: currency + "/Gcal"},
        {name: "Total costs in fact", key: "totalCostsInFact", measureUnit: currency},
        {name: "Total profit in fact", key: "totalProfit", measureUnit: currency}
    ]
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
