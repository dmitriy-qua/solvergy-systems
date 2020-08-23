const STROKE_WIDTH = 0.2
const RADIUS = 0.8

export const circleDrawing = (mapHeight, mapDistance) => {
    return {
        radius: 2* RADIUS * (mapHeight / mapDistance),
        fill: '#ffffff',
        stroke: '#333333',
        strokeWidth: STROKE_WIDTH * (mapHeight / mapDistance),
        selectable: false,
        hasBorders: false,
        hasControls: false,
        originX: 'center',
        originY: 'center',
        objectCaching: false
    }
}

export const circleGenerated = (mapHeight, mapDistance) => ({
    radius: RADIUS * (mapHeight / mapDistance),
    fill: '#ffffff',
    stroke: "#aaaaaa",
    strokeWidth: STROKE_WIDTH * (mapHeight / mapDistance),
    originX: 'center',
    originY: 'center',
    hasBorders: false,
    hasControls: false,
    objectCaching: false,
    evented: false
})

export const lineCircle = (left, top, type, id, mapHeight, mapDistance, networkType) => ({
    radius: RADIUS * (mapHeight / mapDistance),
    fill: '#ffffff',
    stroke: "#aaaaaa",
    strokeWidth: STROKE_WIDTH * (mapHeight / mapDistance),
    left: left,
    top: top,
    selectable: true,
    hasBorders: false,
    hasControls: false,
    originX: 'center',
    originY: 'center',
    objectCaching: false,
    id: id,
    name: type,
    connectedTo: null
})