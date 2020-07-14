export const circleDrawing = (relativeSize) => ({
    radius: 6 * relativeSize,
    fill: '#ffffff',
    stroke: '#333333',
    strokeWidth: 0.5 * relativeSize,
    selectable: false,
    hasBorders: false,
    hasControls: false,
    originX: 'center',
    originY: 'center',
    objectCaching: false
})

export const circleGenerated = (relativeSize) => ({
    radius: 6 * relativeSize,
    fill: '#ffffff',
    stroke: '#333333',
    strokeWidth: 0.5 * relativeSize,
    originX: 'center',
    originY: 'center',
    hasBorders: false,
    hasControls: false,
})

export const lineCircle = (left, top, type, id, relativeSize) => ({
    radius: 6 * relativeSize,
    fill: '#ffffff',
    stroke: '#333333',
    strokeWidth: 0.5 * relativeSize,
    left: left,
    top: top,
    selectable: true,
    hasBorders: false,
    hasControls: false,
    originX: 'center',
    originY: 'center',
    objectCaching: false,
    id: type,
    name: id
})