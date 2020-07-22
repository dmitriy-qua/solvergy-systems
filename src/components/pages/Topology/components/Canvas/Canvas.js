import React, {useEffect, useState} from "react";
import {fabric} from "fabric";
import {lineGenerated} from "./shapes/line/config";
import {
    addPolygonPoint,
    connectLineToOtherLine,
    generatePolygon,
    limitCanvasBoundary,
    makeCircle,
    zoomCanvas
} from "./helpers/canvas-helper";
import {generateId} from "../../../../../helpers/data-helper";
import {lineCircle} from "./shapes/circle/config";

let canvas, zoom = 0;
let _line, isDown, initialCanvasHeight, currentFigureType;
let polygonMode = true;
let pointArray = []
let lineArray = []
let activeLine;
let activeShape = false;
let canDrawLine = false;
let canDrawPolygon = false;
let _curX, _curY;
let currentName;
let relativeSize = 1;
let mapDistance = null;

export const Canvas = ({objectType, mapIsVisible, map_Distance, setObjectType}) => {

    useEffect(() => {
        mapDistance = map_Distance
    }, [map_Distance])

    useEffect(() => {

        canvas = new fabric.Canvas('c', {
            selection: false,
            preserveObjectStacking: true,
            fireMiddleClick: true,
            renderOnAddRemove: false
        })

        canvas.on('mouse:down', onMouseDown)
        canvas.on('mouse:move', onMouseMove)
        canvas.on('mouse:up', onMouseUp)
        canvas.on('object:moving', objectMoving)

        initialCanvasHeight = canvas.getHeight()
        let canvasDiv = document.getElementById('canvas-div')
        canvasDiv.addEventListener('wheel', onMouseWheel)

    }, [])

    useEffect(() => {

        if (mapIsVisible) {
            const imagePath = "https://serving.photos.photobox.com/02915431de16107f0826909e7e542578c22f8674f038e0621ba87aa64a7353c93fc55c48.jpg"

            fabric.Image.fromURL(imagePath, (img) => {
                const scaleY = canvas.getHeight() / img.height
                //const scaleX = canvas.getWidth() / img.width

                const imageResolution = img.width / img.height

                canvas.setWidth(canvas.getHeight() * imageResolution)

                img.set({
                    scaleX: scaleY,
                    scaleY: scaleY,
                });

                canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas))
            });
        } else {
            canvas.setBackgroundImage(0, canvas.renderAll.bind(canvas))
        }

    }, [mapIsVisible])


    useEffect(() => {
        currentFigureType = objectType
        if (objectType === "consumer" || objectType === "supplier") {
            canDrawPolygon = true
            polygonMode = true
            pointArray = []
            lineArray = []
            activeLine = null
        } else if (objectType === "network") {
            canDrawLine = true;
        } else if (objectType === "none") {
            canDrawPolygon = false;
            canDrawLine = false;
        }
    }, [objectType])


    const onMouseWheel = (opt) => {
        opt.preventDefault()

        if (opt.ctrlKey) {
            relativeSize = canvas.getHeight() / initialCanvasHeight

            let myDelta;
            let delta = opt.deltaY;
            if (delta < 0) {
                myDelta = -1
            } else {
                myDelta = 1
            }

            zoom = Math.round(zoom - myDelta)

            if (zoom <= 120 && zoom >= -20) {
                if (delta < 0) {
                    zoomCanvas(1.02, opt, zoom, canvas)
                } else {
                    zoomCanvas(1 / 1.02, opt, zoom, canvas)
                }
            } else {
                if (zoom > 120) {
                    zoom = 120
                } else if (zoom < -20) {
                    zoom = -20
                }
            }
        }
    }

    const onMouseDown = (o) => {
        if (currentFigureType === "network" && canDrawLine) {
            if (canvas.findTarget(o.e)) return;
            isDown = true
            let pointer = canvas.getPointer(o);
            let points = [pointer.x, pointer.y, pointer.x, pointer.y];
            let name = generateId()
            currentName = name
            _line = new fabric.Line(points, lineGenerated(relativeSize, mapDistance))
            _line.set({
                name: name,
                id: name,
                objectCaching: false
            })
            canvas.add(_line);
            canvas.moveTo(_line, 1000);
            canvas.add(
                makeCircle(_line.get('x1'), _line.get('y1'), _line, 'start', name, relativeSize, mapDistance),
                makeCircle(_line.get('x2'), _line.get('y2'), _line, 'end', currentName, relativeSize, mapDistance)
            );
        } else if ((currentFigureType === "consumer" || currentFigureType === "supplier") && canDrawPolygon) {
            if (o.target && o.target.id === pointArray[0].id) {
                generatePolygon(pointArray, lineArray, activeShape, activeLine, canvas, relativeSize, mapDistance, currentFigureType)
                activeLine = null
                activeShape = null
                polygonMode = false
            }
            if (polygonMode) {
                const {
                    pointArrayBuf,
                    lineArrayBuf,
                    activeLineBuf,
                    activeShapeBuf
                } = addPolygonPoint(o, relativeSize, mapDistance, activeShape, canvas, activeLine, pointArray, lineArray)

                pointArray = pointArrayBuf
                lineArray = lineArrayBuf
                activeLine = activeLineBuf
                activeShape = activeShapeBuf
            }
        } else if (!canDrawLine && !canDrawPolygon) {
            if (o.target != null) {
                let objType = o.target.get('type');
                if (objType === 'line') {
                    //canvas.sendBackwards(o.target);
                    _curX = o.e.clientX;
                    _curY = o.e.clientY;

                }
            }
        }
    }

    const onMouseMove = (o) => {
        if (currentFigureType === "network") {
            if (!isDown) return;
            let pointer = canvas.getPointer(o);
            _line.set({x2: pointer.x, y2: pointer.y});
            _line.circle2.set({left: pointer.x, top: pointer.y})
            _line.circle2.setCoords();
            _line.setCoords();
            connectLineToOtherLine(canvas, o, _line.circle2);
            canvas.renderAll();
        } else if (currentFigureType === "consumer" || currentFigureType === "supplier") {
            if (activeLine && activeLine.class === "line") {
                let pointer = canvas.getPointer(o);
                activeLine.set({x2: pointer.x, y2: pointer.y});

                let points = activeShape.get("points");
                points[pointArray.length] = {
                    x: pointer.x,
                    y: pointer.y
                }
                activeShape.set({
                    points: points
                });
                canvas.renderAll();
            }
            //canvas.renderAll();
        }
    }

    const onMouseUp = (o) => {
        if (currentFigureType === "network" && canDrawLine) {
            isDown = false
            canDrawLine = false
            setObjectType("none")
        } else if ((currentFigureType === "consumer" || currentFigureType === "supplier") && canDrawPolygon && !polygonMode) {
            canDrawPolygon = false
            setObjectType("none")
        }

    }

    const makeCircle = (left, top, line, type) => {
        const id = generateId()
        const circle = new fabric.Circle(lineCircle(left, top, type, id, relativeSize, mapDistance))
        circle.line = line
        if (type === 'start') {
            line.circle1 = circle
        } else if (type === 'end') {
            line.circle2 = circle
        }
        circle.setCoords();
        return circle
    }

    const objectMoving = (e) => {
        if (currentFigureType === "none") {
            let p = e.target;

            limitCanvasBoundary(p);

            let objType = p.get('type');

            if (objType === 'circle') {
                connectLineToOtherLine(canvas, e, p);

            } else if (objType === 'line') {
                let _curXm = (_curX - e.e.clientX)
                let _curYm = (_curY - e.e.clientY)

                limitCanvasBoundary(p.circle1);
                limitCanvasBoundary(p.circle2);

                p.circle1.set({
                    'left': (p.circle1.left - _curXm),
                    'top': (p.circle1.top - _curYm)
                });
                p.circle1.setCoords();

                p.circle2.set({
                    'left': (p.circle2.left - _curXm),
                    'top': (p.circle2.top - _curYm)
                });
                p.circle2.setCoords();

                p && p.set({
                    'x1': p.circle1.left,
                    'y1': p.circle1.top
                });

                p && p.set({
                    'x2': p.circle2.left,
                    'y2': p.circle2.top
                });

                p.setCoords();

                _curX = e.e.clientX;
                _curY = e.e.clientY;

                canvas.renderAll();
            } else if (objType === 'polygon') {
                p.circle1.set({
                    left: p.getCenterPoint().x + 2 * (canvas.getHeight() / mapDistance),
                    top: p.getCenterPoint().y
                });

                p.circle2.set({
                    left: p.getCenterPoint().x - 2 * (canvas.getHeight() / mapDistance),
                    top: p.getCenterPoint().y
                });
                p.circle1.setCoords();
                p.circle2.setCoords();
                p.setCoords();
                canvas.renderAll();
            }
        }
    }

    return <div id="canvas-div" className="div-canvas">
        <canvas className="canvas" id="c" width="500" height="500"/>
    </div>

}