const STROKE_WIDTH = 1.2
const CANVAS_HEIGHT = 500

export const polygonDrawing = (relativeSize, mapDistance) => ({
    stroke: '#333333',
    strokeWidth: STROKE_WIDTH * relativeSize  * (CANVAS_HEIGHT / mapDistance),
    fill: '#cccccc',
    opacity: 0.4,
    selectable: false,
    hasBorders: false,
    hasControls: false,
    evented: false,
    objectCaching: false
})

export const polygonGenerated = (relativeSize, mapDistance) => ({
    stroke: 'black',
    strokeWidth: STROKE_WIDTH * relativeSize  * (CANVAS_HEIGHT / mapDistance),
    fill: '#528be0',
    opacity: 0.4,
    hasBorders: false,
    hasControls: false,
    perPixelTargetFind: true,
    targetFindTolerance: 5,
    objectCaching: false
})

export const polygonLine = (relativeSize, mapDistance) => ({
    strokeWidth: STROKE_WIDTH * relativeSize  * (CANVAS_HEIGHT / mapDistance),
    fill: '#999999',
    stroke: '#999999',
    class: 'line',
    originX: 'center',
    originY: 'center',
    selectable: false,
    hasBorders: false,
    hasControls: false,
    evented: false,
    objectCaching: false
})
