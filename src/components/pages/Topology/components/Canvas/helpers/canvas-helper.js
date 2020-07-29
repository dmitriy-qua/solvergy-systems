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

export const limitCanvasBoundary = (currentObj, mapWidth, mapHeight) => {

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
        canvas.add(line)
        canvas.moveTo(line, 2)
    }

    for (let i = 1; i < linesCountX; i++) {
        let line = new fabric.Line([0, DELTA * i, canvasWidth, DELTA * i], gridLineGenerated(canvasHeight, mapDistance))
        canvas.add(line)
        canvas.moveTo(line, 2)
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

    canvas.moveTo(circle1, 3)
    canvas.moveTo(circle2, 3)
    canvas.moveTo(polygon, 3)

    canvas.renderAll()

    finishCreateObject(currentFigureType, polygon)

}

