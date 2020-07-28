const STROKE_WIDTH = 1.2
const CANVAS_HEIGHT = 500

export const polygonDrawing = (relativeSize, mapDistance) => ({
    stroke: '#333333',
    strokeWidth: STROKE_WIDTH * (CANVAS_HEIGHT / mapDistance), //* relativeSize
    fill: '#cccccc',
    opacity: 0.4,
    selectable: false,
    hasBorders: false,
    hasControls: false,
    evented: false,
    objectCaching: false
})

export const polygonGenerated = (relativeSize, mapDistance, objectType) => ({
    stroke: 'black',
    strokeWidth: STROKE_WIDTH * (CANVAS_HEIGHT / mapDistance),//* relativeSize
    fill: getPolygonFillColor(objectType),
    opacity: 0.4,
    hasBorders: false,
    hasControls: false,
    perPixelTargetFind: true,
    targetFindTolerance: 5,
    objectCaching: false,
    strokeLineJoin: "round",
    // lockMovementX: true,
    // lockMovementY: true
})

export const polygonLine = (relativeSize, mapDistance) => ({
    strokeWidth: STROKE_WIDTH * (CANVAS_HEIGHT / mapDistance), //* relativeSize
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

const getPolygonFillColor = (objectType) => {
    if (objectType === "supplier") {
        return "#ee7265"
    } else if (objectType === "consumer") {
        return "#528be0"
    }
}
