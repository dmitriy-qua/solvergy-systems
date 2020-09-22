import $ from "jquery";
import {fabric} from "fabric";
import {gridLineGenerated} from "../shapes/line/config";
import {circleDrawing, circleGenerated, lineCircle} from "../shapes/circle/config";
import {polygonDrawing, polygonGenerated, polygonLine} from "../shapes/polygon/config";
import {generateId} from "../../../../../../helpers/data-helper";
import {getStorageBaseUrl} from "../../../../../../api/axios-connection";
import polylabel from 'polylabel'

export const connectLineToOtherLine = (canvas, e, p) => {

    let circles = canvas.getObjects('circle');

    for (let i = 0; i < circles.length; i++) {
        if (canvas.containsPoint(canvas.getPointer(e.e), circles[i]) && p.get('id') !== circles[i].get('id')) {

            const circleLine = canvas.getObjects().find(obj => {
                if (obj.type === "line") return obj.id === p.id
            })

            p.set({
                stroke: circleLine.networkType === "supply" ? "red" : "blue",
                left: circles[i].left,
                top: circles[i].top
            })

            circles[i].set({
                stroke: circleLine.networkType === "supply" ? "red" : "blue",
            });

            p.setCoords();

            if (p.name === 'end') {
                circleLine && circleLine.set({
                    x2: circles[i].left,
                    y2: circles[i].top
                });
                circleLine.setCoords();
            } else if (p.name === 'start') {
                circleLine && circleLine.set({
                    x1: circles[i].left,
                    y1: circles[i].top
                });

                circleLine.setCoords();
            }

            p.set({
                connectedTo: {
                    id: circles[i].id,
                    name: circles[i].name
                }
            })
            circles[i].set({
                connectedTo: {
                    id: p.id,
                    name: p.name
                }})
            //canvas.renderAll();
            break

        } else {

            p.set({
                stroke: "#aaaaaa",
            })

            if (p.connectedTo) {
                const lineCircle = canvas.getObjects().find(obj => {
                    if (obj.type === "circle") return (obj.id === p.connectedTo.id && obj.name === p.connectedTo.name)
                })

                if (lineCircle !== undefined) {
                    lineCircle.set({
                        stroke: "#aaaaaa",
                    })
                }
            }

            p.set({connectedTo: null})

            const circleLine = canvas.getObjects().find(obj => {
                if (obj.type === "line") return obj.id === p.id
            })

            if (p.name === 'end') {
                circleLine && circleLine.set({
                    'x2': p.left,
                    'y2': p.top
                });
                circleLine.setCoords();

            } else if (p.name === 'start') {
                circleLine && circleLine.set({
                    'x1': p.left,
                    'y1': p.top
                });
                circleLine.setCoords();
            }

            //canvas.renderAll();
        }
    }

    //canvas.renderAll()
}

export const limitCanvasBoundary = (currentObj, mapHeight, mapWidth) => {

    const canvasHeight = mapHeight
    const canvasWidth = mapWidth

    if (currentObj.currentHeight > canvasHeight || currentObj.currentWidth > canvasWidth) {
        return;
    }
    currentObj.setCoords();
    // top-left  corner
    if (currentObj.getBoundingRect(true).top < 0 || currentObj.getBoundingRect(true).left < 0) {
        currentObj.top = Math.max(currentObj.top, currentObj.top - currentObj.getBoundingRect(true).top);
        currentObj.left = Math.max(currentObj.left, currentObj.left - currentObj.getBoundingRect(true).left);
    }
    // bot-right corner
    if (currentObj.getBoundingRect(true).top + currentObj.getBoundingRect(true).height > canvasHeight || currentObj.getBoundingRect(true).left + currentObj.getBoundingRect(true).width > canvasWidth) {
        currentObj.top = Math.min(currentObj.top, canvasHeight - currentObj.getBoundingRect(true).height + currentObj.top - currentObj.getBoundingRect(true).top);
        currentObj.left = Math.min(currentObj.left, canvasWidth - currentObj.getBoundingRect(true).width + currentObj.left - currentObj.getBoundingRect(true).left);
    }
}

export const setGrid = (canvas, linesCount, canvasWidth, canvasHeight, mapDistance) => {

    const DELTA = 30
    const linesCountX = canvasHeight / DELTA
    const linesCountY = canvasWidth / DELTA

    for (let i = 1; i < linesCountY; i++) {
        let line = new fabric.Line([DELTA * i, 0, DELTA * i, canvasHeight], gridLineGenerated(canvasHeight, mapDistance))
        canvas.moveTo(line, 2)
        //canvas.add(line)
    }

    for (let i = 1; i < linesCountX; i++) {
        let line = new fabric.Line([0, DELTA * i, canvasWidth, DELTA * i], gridLineGenerated(canvasHeight, mapDistance))
        canvas.moveTo(line, 2)
        //canvas.add(line)
    }

    canvas.renderAll()
}

export const removeGrid = (canvas) => {
    canvas.getObjects().forEach(item => item.id === "grid" && canvas.remove(item))
    canvas.renderAll()
}

export const addPolygonPoint = (o, mapHeight, mapDistance, activeShape, canvas, activeLine, pointArray, lineArray) => {
    let id = generateId()
    let pointer = canvas.getPointer(o);
    let circle = new fabric.Circle(circleDrawing(mapHeight, mapDistance));
    circle.set({
        id: id,
        left: (pointer.x),
        top: (pointer.y)
    })
    if (pointArray.length === 0) {
        circle.set({
            fill: 'red'
        })
    }
    let points = [(pointer.x), (pointer.y), (pointer.x), (pointer.y)];
    const line = new fabric.Line(points, polygonLine(mapHeight, mapDistance));
    if (activeShape) {
        let pos = canvas.getPointer(o);
        let points = activeShape.get("points");
        points.push({
            x: pos.x,
            y: pos.y
        });
        let polygon = new fabric.Polygon(points, polygonDrawing(mapHeight, mapDistance));
        canvas.remove(activeShape)
        canvas.add(polygon)
        activeShape = polygon
        canvas.renderAll()
    } else {
        let polyPoint = [{x: (pointer.x), y: (pointer.y)}];
        let polygon = new fabric.Polygon(polyPoint, polygonDrawing(mapHeight, mapDistance));
        activeShape = polygon;
        canvas.add(polygon);
    }

    activeLine = line

    pointArray.push(circle);
    lineArray.push(line);

    canvas.add(line);
    canvas.add(circle);
    canvas.selection = false;

    return {pointArrayBuf: pointArray, lineArrayBuf: lineArray, activeLineBuf: activeLine, activeShapeBuf: activeShape}
}

export const generatePolygon = (pointArray, lineArray, activeShape, activeLine, canvas, mapHeight, mapDistance, currentFigureType, finishCreateObject, currentCreatingObjectData, currentNodes) => {
    const points = [];
    $.each(pointArray, (index, point) => {
        points.push({
            x: point.left,
            y: point.top
        });
        canvas.remove(point);
    });
    $.each(lineArray, (index, line) => {
        canvas.remove(line);
    });
    canvas.remove(activeShape).remove(activeLine)
    const color = getPolygonFillColor(currentFigureType, currentCreatingObjectData)
    let polygon = new fabric.Polygon(points, polygonGenerated(mapHeight, mapDistance, color))
    canvas.add(polygon)

    const polygonPoints = points.map(point => [point.x, point.y])
    const center = polylabel([polygonPoints], 1.0)

    let circle1 = new fabric.Circle(circleGenerated(mapHeight, mapDistance));
    circle1.set({
        id: currentCreatingObjectData.id,
        name: "start",
        left: center[0] + 2 * (mapHeight / mapDistance),
        top: center[1],
        selectable: false,
        fill: 'red'
    })
    polygon.circle1 = circle1

    let circle2 = new fabric.Circle(circleGenerated(mapHeight, mapDistance));
    circle2.set({
        id: currentCreatingObjectData.id,
        name: "end",
        left: center[0] - 2 * (mapHeight / mapDistance),
        top: center[1],
        selectable: false,
        fill: 'blue'
    })
    polygon.circle2 = circle2

    polygon.set({
        id: currentCreatingObjectData.id,
        objectType: currentFigureType,
        objectCaching: false,
        name: currentCreatingObjectData.name,
        lockMovementY: true,
        lockMovementX: true,
        isCompleted: true,
        hoverCursor: "pointer",
    })

    canvas.add(polygon.circle1)
    canvas.add(polygon.circle2)

    canvas.moveTo(polygon, 3)
    //canvas.moveTo(circle1, 4)
    //canvas.moveTo(circle2, 4)

    canvas.renderAll()

    finishCreateObject(currentFigureType, currentNodes, canvas)

}

export const regeneratePolygon = (canvas, selectedObject, mapHeight, mapDistance, objectType, name, color) => {

    const polygonPoints = selectedObject.points.map(point => [point.x, point.y])
    const center = polylabel([polygonPoints], 1.0)

    let circle1 = new fabric.Circle(circleGenerated(mapHeight, mapDistance));
    circle1.set({
        id: selectedObject.id,
        name: "start",
        left: center[0] + 2 * (mapHeight / mapDistance),
        top: center[1],
        selectable: false,
        fill: 'red'
    })
    selectedObject.circle1 = circle1

    let circle2 = new fabric.Circle(circleGenerated(mapHeight, mapDistance));
    circle2.set({
        id: selectedObject.id,
        name: "end",
        left: center[0] - 2 * (mapHeight / mapDistance),
        top: center[1],
        selectable: false,
        fill: 'blue'
    })
    selectedObject.circle2 = circle2

    selectedObject.set({
        id: selectedObject.id,
        objectType,
        objectCaching: false,
        name,
        lockMovementY: true,
        lockMovementX: true,
        isCompleted: true,
        hoverCursor: "pointer",
        strokeDashArray: [1, 0],
        fill: color
    })

    canvas.add(selectedObject.circle1)
    canvas.add(selectedObject.circle2)

    //canvas.moveTo(selectedObject, 3)
    //canvas.moveTo(circle1, 4)
    //canvas.moveTo(circle2, 4)

    canvas.renderAll()
}

const getPolygonFillColor = (objectType, currentCreatingObjectData) => {
    if (objectType === "supplier") {
        const producer = currentCreatingObjectData.producers.find(producer => producer.id === currentCreatingObjectData.producerId)
        return producer.color
    } else if (objectType === "consumer") {
        return "#528be0"
    }
}

export function setViewportTransform(canvas, zoom, isPan = false, opt = null, mapHeight, mapWidth) {
    let vpt = canvas.viewportTransform
    if (zoom < canvas.getHeight() / mapHeight) {
        vpt[4] = canvas.getWidth() / 2 - mapWidth * zoom / 2
        vpt[5] = canvas.getHeight() / 2 - mapHeight * zoom / 2
    } else {
        if (isPan) {
            const e = opt.e
            vpt[4] += e.clientX - canvas.lastPosX
            vpt[5] += e.clientY - canvas.lastPosY
        }

        if (vpt[4] >= 0) {
            vpt[4] = isPan ? 0 : canvas.getWidth() / 2 - mapWidth * zoom / 2
        } else if (vpt[4] < canvas.getWidth() - mapWidth * zoom) {
            vpt[4] = canvas.getWidth() - mapWidth * zoom
        }
        if (vpt[5] >= 0) {
            vpt[5] = isPan ? 0 : canvas.getHeight() / 2 - mapHeight * zoom / 2
        } else if (vpt[5] < canvas.getHeight() - mapHeight * zoom) {
            vpt[5] = canvas.getHeight() - mapHeight * zoom
        }
    }
    canvas.renderAll()
}

export function fitResponsiveCanvas(canvas, mapHeight, mapWidth) {
    let containerSize = {
        width: document.getElementById('div-canvas').offsetWidth,
        height: document.getElementById('div-canvas').offsetHeight
    }

    canvas.setWidth(containerSize.width)
    canvas.setHeight(containerSize.height)

    const zoom = canvas.getZoom()
    setViewportTransform(canvas, zoom, false, null, mapHeight, mapWidth)
}

export function fitResponsiveCanvasForAnalysis(canvas, mapHeight, mapWidth, dialogWidth, dialogHeight) {
    let containerSize = {
        width: dialogWidth - 60,
        height: dialogHeight - 140
    }

    canvas.setWidth(containerSize.width)
    canvas.setHeight(containerSize.height)

    const zoom = canvas.getZoom()
    setViewportTransform(canvas, zoom, false, null, mapHeight, mapWidth)
}

export const setMapForAnalysis = (canvas, projectId, dialogWidth, dialogHeight) => {
    try {
        canvas.clear()
    } catch(e) {
        console.log(e)
    }

    const imagePath = getStorageBaseUrl() + `${projectId}/photoOfMap`

    const mapHeight = 2000
    let mapWidth

    const result = new Promise((resolve) => fabric.Image.fromURL(imagePath, (img) => {
        const scaleY = mapHeight / img.height
        const imageResolution = img.width / img.height
        mapWidth = mapHeight * imageResolution

        img.set({
            id: "background",
            scaleX: scaleY,
            scaleY: scaleY,
            stroke: '#cbcbcb',
            strokeWidth: 2,
            selectable: false,
            hoverCursor: "default",
            evented: false,
        })

        canvas.add(img)
        canvas.sendToBack(img)
        canvas.renderAll()

        fitResponsiveCanvasForAnalysis(canvas, mapHeight, mapWidth, dialogWidth, dialogHeight)

        resolve({mapHeight, mapWidth})

        //loadObjects(canvas, objects)
    })).then((result) => {
        return result
    })

    return result
}

export const setMap = (canvas, projectId) => {
    canvas.clear()

    //const imagePath = "https://serving.photos.photobox.com/02915431de16107f0826909e7e542578c22f8674f038e0621ba87aa64a7353c93fc55c48.jpg"
    const imagePath = getStorageBaseUrl() + `${projectId}/photoOfMap`

    const mapHeight = 2000
    let mapWidth

    const result = new Promise((resolve) => fabric.Image.fromURL(imagePath, (img) => {
        const scaleY = mapHeight / img.height
        const imageResolution = img.width / img.height
        mapWidth = mapHeight * imageResolution

        img.set({
            id: "background",
            scaleX: scaleY,
            scaleY: scaleY,
            stroke: '#cbcbcb',
            strokeWidth: 2,
            selectable: false,
            hoverCursor: "default",
            evented: false,
        })

        canvas.add(img)
        canvas.sendToBack(img)
        canvas.renderAll()

        fitResponsiveCanvas(canvas, mapHeight, mapWidth)

        resolve({mapHeight, mapWidth})

        //loadObjects(canvas, objects)
    })).then((result) => {
        return result
    })

    return result
}

export const handleObjectSelection = (canvas, shape, selectedObject) => {
    if (selectedObject) {
        if (selectedObject.objectType === "network") {
            if (selectedObject.networkType === "supply") {
                selectedObject.set({stroke: "red"})
            } else {
                selectedObject.set({stroke: "blue"})
            }
        } else if (selectedObject.objectType === "consumer" || selectedObject.objectType === "supplier") {
            selectedObject.set({stroke: "#333333"})
        }

        canvas.renderAll()
    }

    if (shape && shape.type !== "circle") {
        shape.set({stroke: "green"})
        canvas.renderAll()
    }

    return shape
}

export const makeCircle = (left, top, line, type, mapHeight, mapDistance, networkType, id) => {
    const circle = new fabric.Circle(lineCircle(left, top, type, id, mapHeight, mapDistance, networkType))
    //circle.line = line
    if (type === 'start') {
        line.circle1 = circle
    } else if (type === 'end') {
        line.circle2 = circle
    }
    circle.moveTo(-2)
    circle.setCoords()
    return circle
}

export const calculateLineDistance = (line, mapDistance, mapHeight) => {
    const a = Math.abs(line.x1 - line.x2)
    const b = Math.abs(line.y1 - line.y2)
    const c = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2))

    return c * mapDistance / mapHeight
}

export const setEnlivenObjects = (canvas, objects, setObjectType) => {
    canvas.clear()

    fabric.util.enlivenObjects(objects, function (objs) {
        objs.forEach(function (o) {
            o.hasBorders = false
            o.hasControls = false
            o.perPixelTargetFind = true
            if (o.type === "polygon" || o.type === "line") {

                if (o.type === "line") {
                    o.set({
                        x1: o.left + o.x1,
                        x2: o.left + o.x2,
                        y1: o.top + o.y1,
                        y2: o.top + o.y2,
                        stroke: o.networkType === "supply" ? 'red' : "blue"
                    })
                }

                objs.forEach(object => {
                    if (object.type === "circle" && object.id === o.id) {


                        if (o.type === "polygon") object.evented = false

                        if (object.name === "start") {
                            o.circle1 = object
                        } else if (object.name === "end") {
                            o.circle2 = object
                        }
                    }
                })

                canvas.add(o)
                canvas.add(o.circle1)
                canvas.add(o.circle2)
            } else if (o.type === "image") {
                o.evented = false
                canvas.add(o)
            }
            o.setCoords()
        });

        canvas.renderAll()

        setObjectType("none")
    });
}

export const toggleInspectionMode = (canvas, isInspectionMode) => {
    if (canvas) {
        if (isInspectionMode) {
            canvas.forEachObject((o) => {
                if (o.type === "line" || o.type === "circle" || o.type === "polygon") {
                    o.selectable = false
                    o.hoverCursor = "default"
                    //o.evented = false
                }
            })
        } else {
            canvas.forEachObject((o) => {
                if (o.type === "line" || o.type === "circle" || o.type === "polygon") {
                    o.selectable = true
                    o.hoverCursor = "move"
                    //o.evented = true
                }
            })
        }

        canvas.renderAll()
    }
}

export const moveLineObject = (e, p, canvas, _curXm, _curYm, mapDistance, height) => {
    //limitCanvasBoundary(p.circle1, height, width)
    //limitCanvasBoundary(p.circle2, height, width)

    p.circle1.set({
        stroke: "#aaaaaa",
        'left': (p.circle1.left - _curXm),
        'top': (p.circle1.top - _curYm)
    })
    p.circle1.setCoords()

    p.circle2.set({
        stroke: "#aaaaaa",
        'left': (p.circle2.left - _curXm),
        'top': (p.circle2.top - _curYm)
    })
    p.circle2.setCoords()

    if (p.circle1.connectedTo) {
        const lineCircle = canvas.getObjects().find(obj => {
            if (obj.type === "circle") return (obj.id === p.circle1.connectedTo.id && obj.name === p.circle1.connectedTo.name)
        })

        lineCircle.set({
            stroke: "#aaaaaa",
        })

        p.circle1.set({connectedTo: null})
    }

    if (p.circle2.connectedTo) {
        const lineCircle = canvas.getObjects().find(obj => {
            if (obj.type === "circle") return (obj.id === p.circle2.connectedTo.id && obj.name === p.circle2.connectedTo.name)
        })

        lineCircle.set({
            stroke: "#aaaaaa",
        })

        p.circle2.set({connectedTo: null})
    }

    p && p.set({
        'x1': p.circle1.left,
        'y1': p.circle1.top
    })

    p && p.set({
        'x2': p.circle2.left,
        'y2': p.circle2.top
    })

    p.setCoords()

    // _curX = e.e.clientX
    // _curY = e.e.clientY

    const distance = calculateLineDistance(p, mapDistance, height)
    p.set({distance})

    canvas.renderAll()

    return {_curX: e.e.clientX, _curY: e.e.clientY}
}

