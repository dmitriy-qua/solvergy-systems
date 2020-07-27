const STROKE_WIDTH = 0.2
const RADIUS = 1.2
const CANVAS_HEIGHT = 500

export const circleDrawing = (relativeSize, mapDistance) => {
    return {
        radius: RADIUS ,//* relativeSize * (CANVAS_HEIGHT / mapDistance),
        fill: '#ffffff',
        stroke: '#333333',
        strokeWidth: STROKE_WIDTH ,//* relativeSize * (CANVAS_HEIGHT / mapDistance),
        selectable: false,
        hasBorders: false,
        hasControls: false,
        originX: 'center',
        originY: 'center',
        objectCaching: false
    }
}

export const circleGenerated = (relativeSize, mapDistance) => ({
    radius: RADIUS ,//* relativeSize * (CANVAS_HEIGHT / mapDistance),
    fill: '#ffffff',
    stroke: '#333333',
    strokeWidth: STROKE_WIDTH ,//* relativeSize * (CANVAS_HEIGHT / mapDistance),
    originX: 'center',
    originY: 'center',
    hasBorders: false,
    hasControls: false,
    objectCaching: false
})

export const lineCircle = (left, top, type, id, relativeSize, mapDistance) => ({
    radius: RADIUS ,//* relativeSize * (CANVAS_HEIGHT / mapDistance),
    fill: '#ffffff',
    stroke: '#333333',
    strokeWidth: STROKE_WIDTH ,//* relativeSize * (CANVAS_HEIGHT / mapDistance),
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