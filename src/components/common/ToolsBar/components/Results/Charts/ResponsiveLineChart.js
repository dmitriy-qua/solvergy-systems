import React from "react";
import {ResponsiveLine} from "@nivo/line";
import {ResponsiveBar} from "@nivo/bar";

export const ResponsiveLineChart = ({data, height, width, axisBottomName, axisLeftName, colorsScheme, colors = null}) => {
    return <ResponsiveLine
        data={data}
        margin={{ top: 50, right: 60, bottom: 50, left: 60 }}
        xScale={{ type: 'point' }}
        yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: false, reverse: false }}
        curve="natural"
        axisTop={null}
        axisRight={null}
        axisBottom={{
            orient: 'bottom',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: axisBottomName,
            legendOffset: 36,
            legendPosition: 'middle'
        }}
        axisLeft={{
            orient: 'left',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: axisLeftName,
            legendOffset: -40,
            legendPosition: 'middle'
        }}
        colors={colors ? colors : {scheme: colorsScheme}}
        lineWidth={5}
        pointSize={2}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={1}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabel="y"
        animate={false}
        pointLabelYOffset={-12}
        areaBaselineValue={130}
        areaOpacity={0.4}
        useMesh={true}
        width={width}
        height={height}
    />
}