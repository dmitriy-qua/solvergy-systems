const STROKE_WIDTH = 1.0

export const lineGenerated = (mapHeight, mapDistance, networkType) => ({
    strokeWidth: STROKE_WIDTH * (mapHeight / mapDistance),
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