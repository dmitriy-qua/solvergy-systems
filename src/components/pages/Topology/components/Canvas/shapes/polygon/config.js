const STROKE_WIDTH = 1.2

export const polygonDrawing = (mapHeight, mapDistance) => ({
    stroke: '#333333',
    strokeWidth: STROKE_WIDTH * (mapHeight / mapDistance),
    fill: '#cccccc',
    opacity: 0.4,
    selectable: false,
    hasBorders: false,
    hasControls: false,
    evented: false,
    objectCaching: false
})

export const polygonGenerated = (mapHeight, mapDistance, objectType) => ({
    stroke: 'black',
    strokeWidth: STROKE_WIDTH * (mapHeight / mapDistance),
    fill: getPolygonFillColor(objectType),
    opacity: 0.4,
    hasBorders: false,
    hasControls: false,
    perPixelTargetFind: true,
    targetFindTolerance: 5,
    objectCaching: false,
    strokeLineJoin: "round",
})

export const polygonLine = (mapHeight, mapDistance) => ({
    strokeWidth: STROKE_WIDTH * (mapHeight / mapDistance),
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
