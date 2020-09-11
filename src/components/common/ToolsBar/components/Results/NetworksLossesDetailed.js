import React, {useEffect, useState} from "react";
import {createUseStyles} from "react-jss";
import {useDispatch, useSelector} from "react-redux";
import { Cell, Column, Table } from "@blueprintjs/table";
import {Select} from "@blueprintjs/select";
import {Button, MenuItem} from "@blueprintjs/core";
import {generateId, getMonthInfo} from "../../../../../helpers/data-helper";


export const NetworksLossesDetailed = ({results, height, width}) => {

    const styles = useStyles()

    const dispatch = useDispatch()

    const networks = useSelector(state => state.project && state.project.objects.networks)

    const {networksResult} = results

    const [networksDetailed, setNetworksDetailed] = useState(null)
    const [networksData, setNetworksData] = useState([])

    const [selectedNetwork, setSelectedNetwork] = useState(null)

    useEffect(() => {
        const networksData = networks.map(({id, name, networkType}) => ({id, name, networkType}))
        setNetworksData(networksData)
    }, [])

    useEffect(() => {
        if (selectedNetwork) {
            const networksDetailed = getDetailedNetworksResults(networksResult[selectedNetwork.id])
            setNetworksDetailed(networksDetailed)
        }
    }, [selectedNetwork])

    const handleNetworkSelect = (item) => {
        setSelectedNetwork(item)
    }

    const renderNetworkItem = (item) => {
        return (
            <MenuItem
                key={generateId()}
                onClick={() => handleNetworkSelect(item)}
                text={item.name + " (" + item.networkType + ")"}
            />
        )
    }

    return <div style={{height: height - 280, overflow: "auto"}}>
        <p className={styles.dialogTitle}>
            Detailed networks losses:
        </p>

        <hr className={styles.divider}/>

        <p className={styles.dialogText} style={{marginTop: 14}}>
            Select network:
        </p>
        <Select
            items={networksData}
            itemRenderer={renderNetworkItem}
            activeItem={selectedNetwork}
            //className="fullwidth"
            popoverProps={{minimal: true, portalClassName: "fullwidth", popoverClassName: "selectPopover"}}
            filterable={false}
            onItemSelect={handleNetworkSelect}
        >
            <Button text={<span
                className={styles.selectText}>{selectedNetwork ? `${selectedNetwork.name} (${selectedNetwork.networkType})` : "Select network..."}</span>}
                    rightIcon="caret-down" alignText="left" fill="{true}" style={{width: 250}}/>
        </Select>

        {selectedNetwork && networksDetailed && <div>
            <br/>
            <p className={styles.dialogText}>
                Network properties:
            </p>

            <hr className={styles.divider}/>

            <p className={styles.dialogText} style={{marginTop: 10}}>
                Name: <span className={styles.bold}>{selectedNetwork.name}</span>
            </p>

            <p className={styles.dialogText} style={{marginTop: 10}}>
                Type: <span className={styles.bold}>{selectedNetwork.networkType}</span>
            </p>

            <p className={styles.dialogText} style={{marginTop: 10}}>
                Diameter: <span className={styles.bold}>{networksDetailed.properties.diameter}</span> mm
            </p>

            <p className={styles.dialogText} style={{marginTop: 10}}>
                Length: <span className={styles.bold}>{networksDetailed.properties.distance.toFixed(2)}</span> m
            </p>

            <p className={styles.dialogText} style={{marginTop: 10}}>
                Insulation thickness: <span className={styles.bold}>{networksDetailed.properties.insulationThickness}</span> mm
            </p>

            <p className={styles.dialogText} style={{marginTop: 10}}>
                Insulation type: <span className={styles.bold}>{networksDetailed.properties.insulationType.name}</span>
            </p>

            <p className={styles.dialogText} style={{marginTop: 10}}>
                Pipe laying type: <span className={styles.bold}>{networksDetailed.properties.pipeLayingType.name}</span>
            </p>

            <br/>

            {networksDetailed && networksDetailed.networksData.map(({month, dailyResult}) => {
                return <div key={month}>
                    <p className={styles.dialogText}>
                        {month}
                    </p>

                    <Table numRows={dailyResult.length} columnWidths={[200, 200, 200, 200, 200, 200]}>
                        <Column name="Heat loss capacity" cellRenderer={(rowIndex) => {
                            return <Cell>{`${dailyResult[rowIndex].heatLossData.heatFlow.toFixed(2)} kW`}</Cell>
                        }}/>
                        <Column name="Heat energy loss" cellRenderer={(rowIndex) => {
                            return <Cell>{`${dailyResult[rowIndex].heatLossData.heatEnergyLoss.toFixed(3)} Gcal`}</Cell>
                        }}/>
                        <Column name="Electricity consumption" cellRenderer={(rowIndex) => {
                            return <Cell>{`${dailyResult[rowIndex].hydraulicLossData.electricityConsumption.toFixed(4)} kWh`}</Cell>
                        }}/>
                        <Column name="Heat carrier temperature" cellRenderer={(rowIndex) => {
                            return <Cell>{`${dailyResult[rowIndex].parameters.t.toFixed(2)} °C`}</Cell>
                        }}/>
                        <Column name="Heat carrier volume flow" cellRenderer={(rowIndex) => {
                            return <Cell>{`${dailyResult[rowIndex].parameters.waterVolumeFlow.toFixed(2)} m³/h`}</Cell>
                        }}/>
                        <Column name="Heat carrier speed" cellRenderer={(rowIndex) => {
                            return <Cell>{`${dailyResult[rowIndex].parameters.w.toFixed(4)} m/s`}</Cell>
                        }}/>
                    </Table>
                </div>
            })}


        </div>}


    </div>
}

const getDetailedNetworksResults = (selectedNetwork) => {

    const {heatingSeasonResults, properties} = selectedNetwork

    const networksData = []
    for (const [monthNum, monthData] of Object.entries(heatingSeasonResults)) {
        networksData.push({
            month: getMonthInfo(parseInt(monthNum).toString()).fullName,
            dailyResult: monthData
        })
    }

    return {networksData, properties}
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
