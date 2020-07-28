const STROKE_WIDTH = 0.2
const RADIUS = 1.2
const CANVAS_HEIGHT = 500

export const circleDrawing = (relativeSize, mapDistance) => {
    return {
        radius: RADIUS * (CANVAS_HEIGHT / mapDistance), //* relativeSize
        fill: '#ffffff',
        stroke: '#333333',
        strokeWidth: STROKE_WIDTH * (CANVAS_HEIGHT / mapDistance), //* relativeSize
        selectable: false,
        hasBorders: false,
        hasControls: false,
        originX: 'center',
        originY: 'center',
        objectCaching: false
    }
}

export const circleGenerated = (relativeSize, mapDistance) => ({
    radius: RADIUS * (CANVAS_HEIGHT / mapDistance), //* relativeSize
    fill: '#ffffff',
    stroke: '#333333',
    strokeWidth: STROKE_WIDTH * (CANVAS_HEIGHT / mapDistance), //* relativeSize
    originX: 'center',
    originY: 'center',
    hasBorders: false,
    hasControls: false,
    objectCaching: false
})

export const lineCircle = (left, top, type, id, relativeSize, mapDistance) => ({
    radius: RADIUS * (CANVAS_HEIGHT / mapDistance), //* relativeSize
    fill: '#ffffff',
    stroke: '#333333',
    strokeWidth: STROKE_WIDTH * (CANVAS_HEIGHT / mapDistance), //* relativeSize
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