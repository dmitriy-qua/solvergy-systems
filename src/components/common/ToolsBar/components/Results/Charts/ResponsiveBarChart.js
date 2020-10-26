import {ResponsiveBar} from "@nivo/bar";
import React from "react";

export const ResponsiveBarChart = ({data, height, width, keys, indexBy, axisBottomName, axisLeftName, groupMode, colorsScheme, colors = null}) => {
    return <ResponsiveBar
            data={data}
            keys={keys}
            indexBy={indexBy}
            margin={{top: 30, right: 10, bottom: 180, left: 40}}
            padding={0.1}
            theme={{
                fontFamily: "Montserrat"
            }}
            colors={colors ? colors : {scheme: colorsScheme}}
            defs={[
                {
                    id: 'dots',
                    type: 'patternDots',
                    background: 'inherit',
                    color: '#38bcb2',
                    size: 4,
                    padding: 1,
                    stagger: true
                },
                {
                    id: 'lines',
                    type: 'patternLines',
                    background: 'inherit',
                    color: '#eed312',
                    rotation: -45,
                    lineWidth: 6,
                    spacing: 10
                }
            ]}
            borderColor={{from: 'color', modifiers: [['darker', 1.6]]}}
            axisTop={null}
            axisRight={null}
            axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: axisBottomName,
                legendPosition: 'middle',
                legendOffset: 50
            }}
            axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: axisLeftName,
                legendPosition: 'middle',
                legendOffset: -60
            }}
            animate={false}
            motionStiffness={90}
            motionDamping={15}
            width={width}
            height={height}
            groupMode={groupMode}
            legends={[
                {
                    dataFrom: 'keys',
                    anchor: 'bottom-left',
                    direction: 'column',
                    justify: false,
                    translateX: 0,
                    translateY: 120,
                    itemsSpacing: 2,
                    itemWidth: 200,
                    itemHeight: 18,
                    itemDirection: 'left-to-right',
                    itemOpacity: 0.85,
                    symbolSize: 16,
                    effects: [
                        {
                            on: 'hover',
                            style: {
                                itemOpacity: 1
                            }
                        }
                    ]
                }
            ]}
        />
}