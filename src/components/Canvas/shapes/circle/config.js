export const circleDrawing = (relativeSize) => ({
    radius: 2 * relativeSize,
    fill: '#ffffff',
    stroke: '#333333',
    strokeWidth: 0.0 * relativeSize,
    selectable: false,
    hasBorders: false,
    hasControls: false,
    originX: 'center',
    originY: 'center',
    objectCaching: false
})

export const circleGenerated = (relativeSize) => ({
    radius: 2 * relativeSize,
    fill: '#ffffff',
    stroke: '#333333',
    strokeWidth: 0.0 * relativeSize,
    originX: 'center',
    originY: 'center',
    hasBorders: false,
    hasControls: false,
})

export const lineCircle = (left, top, type, id, relativeSize) => ({
    radius: 1 * relativeSize,
    fill: '#ffffff',
    stroke: '#333333',
    strokeWidth: 0.2 * relativeSize,
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