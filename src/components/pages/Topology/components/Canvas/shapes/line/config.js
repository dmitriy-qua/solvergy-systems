const STROKE_WIDTH = 1.2
const CANVAS_HEIGHT = 500

export const lineGenerated = (relativeSize, mapDistance) => ({
    strokeWidth: STROKE_WIDTH * (CANVAS_HEIGHT / mapDistance), //* relativeSize
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

export const gridLineGenerated = (relativeSize, mapDistance) => ({
    strokeWidth: 1.0 ,//* STROKE_WIDTH * relativeSize  * (CANVAS_HEIGHT / mapDistance),
    opacity: 0.2,
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