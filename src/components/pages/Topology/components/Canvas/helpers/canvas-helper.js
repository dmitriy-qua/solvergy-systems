import $ from "jquery";
import {fabric} from "fabric";
import {gridLineGenerated} from "../shapes/line/config";
import {circleDrawing, circleGenerated, lineCircle} from "../shapes/circle/config";
import {polygonDrawing, polygonGenerated, polygonLine} from "../shapes/polygon/config";
import {generateId} from "../../../../../../helpers/data-helper";

export const connectLineToOtherLine = (canvas, e, p) => {

    let circles = canvas.getObjects('circle');

    for (let i = 0; i < circles.length; i++) {
        if (canvas.containsPoint(canvas.getPointer(e.e), circles[i]) && p.get('name') !== circles[i].get('name')) {
            p.set({
                left: circles[i].left,
                top: circles[i].top
            });
            p.setCoords();
            if (p.id === 'end') {
                p.line && p.line.set({
                    'x2': circles[i].left,
                    'y2': circles[i].top
                });
                p.line.setCoords();
            }
            else if (p.id === 'start') {
                p.line && p.line.set({
                    'x1': circles[i].left,
                    'y1': circles[i].top
                });

                p.line.setCoords();
            }

            //canvas.renderAll();
            break;

        }
        else {
            if (p.id === 'end') {
                p.line && p.line.set({
                    'x2': p.left,
                    'y2': p.top
                });
                p.line.setCoords();

            }
            else if (p.id === 'start') {
                p.line && p.line.set({
                    'x1': p.left,
                    'y1': p.top
                });
                p.line.setCoords();
            }

            //canvas.renderAll();
        }
    }
    canvas.renderAll();
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

export const generatePolygon = (pointArray, lineArray, activeShape, activeLine, canvas, mapHeight, mapDistance, currentFigureType, finishCreateObject) => {
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
    canvas.remove(activeShape).remove(activeLine);
    let polygon = new fabric.Polygon(points, polygonGenerated(mapHeight, mapDistance, currentFigureType));
    canvas.add(polygon)

    let circle1 = new fabric.Circle(circleGenerated(mapHeight, mapDistance));
    circle1.set({
        left: polygon.getCenterPoint().x + 2 * (mapHeight / mapDistance),
        top: polygon.getCenterPoint().y,
        selectable: false,
        fill: 'red'
    })
    polygon.circle1 = circle1
    canvas.add(circle1)

    let circle2 = new fabric.Circle(circleGenerated(mapHeight, mapDistance));
    circle2.set({
        left: polygon.getCenterPoint().x - 2 * (mapHeight / mapDistance),
        top: polygon.getCenterPoint().y,
        selectable: false,
        fill: 'blue'
    })
    polygon.circle2 = circle2

    canvas.add(circle2)

    canvas.moveTo(polygon, 3)
    canvas.moveTo(circle1, 4)
    canvas.moveTo(circle2, 4)


    canvas.renderAll()

    finishCreateObject(currentFigureType, polygon)

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

export const setMap = (canvas) => {
    canvas.clear()

    const imagePath = "https://serving.photos.photobox.com/02915431de16107f0826909e7e542578c22f8674f038e0621ba87aa64a7353c93fc55c48.jpg"

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

export const handleObjectSelection = (canvas, o, selectedObjectUnhook) => {
    if (selectedObjectUnhook) {
        if (selectedObjectUnhook.objectType === "network") {
            if (selectedObjectUnhook.networkType === "supply") {
                selectedObjectUnhook.set({stroke: "red"})
            } else {
                selectedObjectUnhook.set({stroke: "blue"})
            }
        } else if (selectedObjectUnhook.objectType === "consumer" || selectedObjectUnhook.objectType === "supplier") {
            selectedObjectUnhook.set({stroke: "#333333"})
        }

        canvas.renderAll()
    }

    if (o.target && o.target.type !== "circle") {
        o.target.set({stroke: "green"})
        canvas.renderAll()
    }

    return o.target
}

export const makeCircle = (left, top, line, type, mapHeight, mapDistance, networkType) => {
    const id = generateId()
    const circle = new fabric.Circle(lineCircle(left, top, type, id, mapHeight, mapDistance, networkType))
    circle.line = line
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

