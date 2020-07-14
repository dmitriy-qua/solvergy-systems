export const polygonDrawing = (relativeSize) => ({
    stroke: '#333333',
    strokeWidth: 1 * relativeSize,
    fill: '#cccccc',
    opacity: 0.3,
    selectable: false,
    hasBorders: false,
    hasControls: false,
    evented: false,
    objectCaching: false
})

export const polygonGenerated = (relativeSize) => ({
    stroke: 'black',
    strokeWidth: 1.4 * relativeSize,
    fill: 'red',
    opacity: 0.4,
    hasBorders: false,
    hasControls: false,
    perPixelTargetFind: true,
    targetFindTolerance: 5,
    objectCaching: false
})

export const polygonLine = (relativeSize) => ({
    strokeWidth: 2 * relativeSize,
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
