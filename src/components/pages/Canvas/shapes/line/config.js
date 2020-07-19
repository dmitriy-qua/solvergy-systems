const STROKE_WIDTH = 1.2
const CANVAS_HEIGHT = 500

export const lineGenerated = (relativeSize, mapDistance) => ({
    strokeWidth: STROKE_WIDTH * relativeSize  * (CANVAS_HEIGHT / mapDistance),
    fill: 'red',
    stroke: 'black',
    originX: 'center',
    originY: 'center',
    selectable: true,
    hasBorders: false,
    hasControls: false,
    strokeLineCap: 'round',
    id: '1111',
    perPixelTargetFind: true,
    targetFindTolerance: 5
})