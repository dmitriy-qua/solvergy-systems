const STROKE_WIDTH = 0.6

export const lineGenerated = (mapHeight, mapDistance, networkType, diameter) => ({
    strokeWidth: STROKE_WIDTH * (mapHeight / mapDistance) * (diameter / 100),
    //fill: 'red',
    stroke: networkType === "supply" ? 'red' : "blue",
    originX: 'center',
    originY: 'center',
    selectable: true,
    hasBorders: false,
    hasControls: false,
    strokeLineCap: 'round',
    perPixelTargetFind: true,
    targetFindTolerance: 5,
    objectCaching: false,
})

export const gridLineGenerated = (mapHeight, mapDistance) => ({
    strokeWidth: 0.4 * (mapHeight / mapDistance),
    id: "grid",
    opacity: 0.1,
    fill: '#e0e0e0',
    stroke: 'black',
    originX: 'center',
    originY: 'center',
    selectable: false,
    hasBorders: false,
    hasControls: false,
    hoverCursor: 'default',
    objectCaching: false,
    evented: false
})