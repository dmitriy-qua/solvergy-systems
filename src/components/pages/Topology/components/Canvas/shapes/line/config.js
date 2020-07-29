const STROKE_WIDTH = 1.2

export const lineGenerated = (mapHeight, mapDistance) => ({
    strokeWidth: STROKE_WIDTH * (mapHeight / mapDistance),
    fill: 'red',
    stroke: 'black',
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
    strokeWidth: 0.4 * STROKE_WIDTH * (mapHeight / mapDistance),
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