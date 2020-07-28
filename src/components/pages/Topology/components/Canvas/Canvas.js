import React, {useEffect, useState} from "react";
import {fabric} from "fabric";
import {lineGenerated} from "./shapes/line/config";
import {
    addPolygonPoint,
    connectLineToOtherLine,
    generatePolygon,
    limitCanvasBoundary,
    makeCircle, setGrid,
    zoomCanvas
} from "./helpers/canvas-helper";
import {generateId} from "../../../../../helpers/data-helper";
import {lineCircle} from "./shapes/circle/config";
import {useSelector} from "react-redux";

let MAP_HEIGHT = 2000
let CANVAS_HEIGHT = 800, CANVAS_WIDTH = 800

let canvas, zoom = 1;
let _line, isDown, initialCanvasHeight, initialCanvasWidth, currentFigureType;
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

export const Canvas = ({objectType, mapIsVisible, map_Distance, setObjectType, finishCreateObject}) => {

    const [canvasHeight, setCanvasHeight] = useState(CANVAS_HEIGHT)
    const [canvasWidth, setCanvasWidth] = useState(CANVAS_WIDTH)

    useEffect(() => {
        mapDistance = map_Distance
    }, [map_Distance])

    const objects = useSelector(state => state.project.project && state.project.project.objects)

    useEffect(() => {

        canvas = new fabric.Canvas('c', {
            selection: false,
            preserveObjectStacking: true,
            fireMiddleClick: true,
            renderOnAddRemove: false
        })

        canvas.setZoom(0.4)
        fitResponsiveCanvas();
        window.onresize = (event) => {
            fitResponsiveCanvas();
        };

        setGrid(canvas, 40, MAP_HEIGHT, mapDistance)

        objects.consumers.forEach((item) => {
            canvas.add(item.shape)
            canvas.add(item.shape.circle1)
            canvas.add(item.shape.circle2)
        })

        objects.suppliers.forEach((item) => {
            canvas.add(item.shape)
            canvas.add(item.shape.circle1)
            canvas.add(item.shape.circle2)
        })

        objects.networks.forEach((item) => {
            canvas.add(item.shape)
            canvas.add(item.shape.circle1)
            canvas.add(item.shape.circle2)
        })

        canvas.renderAll()

        canvas.on('mouse:down', onMouseDown)
        canvas.on('mouse:move', onMouseMove)
        canvas.on('mouse:up', onMouseUp)
        canvas.on('object:moving', objectMoving)

        // const imagePath = "https://serving.photos.photobox.com/02915431de16107f0826909e7e542578c22f8674f038e0621ba87aa64a7353c93fc55c48.jpg"
        //
        // fabric.Image.fromURL(imagePath, setMap);
        // canvas.on('mouse:wheel', setZoom)

        canvas.on('mouse:wheel', function (opt) {
            if (opt.e.ctrlKey === true) {
                const delta = opt.e.deltaY;
                let zoom = canvas.getZoom();
                zoom *= 0.999 ** delta;
                if (zoom > 20) zoom = 20;
                if (zoom < 0.1) zoom = 0.1;
                canvas.zoomToPoint({x: opt.e.offsetX, y: opt.e.offsetY}, zoom);
                opt.e.preventDefault();
                opt.e.stopPropagation();
                setViewportTransform(zoom, false, null)
            }
        });
        canvas.on('mouse:down', function (opt) {
            var evt = opt.e;
            if (evt.altKey === true) {
                canvas.isDragging = true;
                canvas.selection = false;
                canvas.lastPosX = evt.clientX;
                canvas.lastPosY = evt.clientY;
            }
        });
        canvas.on('mouse:move', function (opt) {
            if (canvas.isDragging) {
                const zoom = canvas.getZoom();
                setViewportTransform(zoom, true, opt)
                canvas.requestRenderAll();
                canvas.lastPosX = opt.e.clientX;
                canvas.lastPosY = opt.e.clientY;
            }
        });
        canvas.on('mouse:up', function (opt) {
            canvas.isDragging = false;
        });

    }, [])

    function setViewportTransform(zoom, isPan = false, opt = null) {
        let vpt = canvas.viewportTransform;
        if (zoom < canvas.getHeight() / MAP_HEIGHT) {
            vpt[4] = canvas.getWidth() / 2 - MAP_HEIGHT * zoom / 2;
            vpt[5] = canvas.getHeight() / 2 - MAP_HEIGHT * zoom / 2;
        } else {
            if (isPan) {
                const e = opt.e;
                vpt[4] += e.clientX - canvas.lastPosX;
                vpt[5] += e.clientY - canvas.lastPosY;
            }

            if (vpt[4] >= 0) {
                vpt[4] = isPan ? 0 : canvas.getWidth() / 2 - MAP_HEIGHT * zoom / 2;
            } else if (vpt[4] < canvas.getWidth() - MAP_HEIGHT * zoom) {
                vpt[4] = canvas.getWidth() - MAP_HEIGHT * zoom;
            }
            if (vpt[5] >= 0) {
                vpt[5] = isPan ? 0 : canvas.getHeight() / 2 - MAP_HEIGHT * zoom / 2;
            } else if (vpt[5] < canvas.getHeight() - MAP_HEIGHT * zoom) {
                vpt[5] = canvas.getHeight() - MAP_HEIGHT * zoom;
            }
        }
        canvas.renderAll()
    }

    function fitResponsiveCanvas() {
        // canvas dimensions
        let canvasSize = {
            width: 800,
            height: 800
        };
        // canvas container dimensions
        let containerSize = {
            width: document.getElementById('div-canvas').offsetWidth,
            height: document.getElementById('div-canvas').offsetHeight
        };

        let scaleRatio = Math.min(containerSize.width / canvasSize.width, containerSize.height / canvasSize.height);

        canvas.setWidth(containerSize.width);
        canvas.setHeight(containerSize.height);

        const zoom = canvas.getZoom();
        setViewportTransform(zoom, false, null)
    }

    useEffect(() => {

        if (mapIsVisible) {
            var bg = new fabric.Rect({
                width: MAP_HEIGHT - 10,
                height: MAP_HEIGHT - 10,
                stroke: 'pink',
                strokeWidth: 10,
                fill: '',
                selectable: false,
                hoverCursor: "default",
                evented: false
            });
            bg.fill = new fabric.Pattern({source: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAASElEQVQ4y2NkYGD4z0A6+M3AwMBKrGJWBgYGZiibEQ0zIInDaCaoelYyHYcX/GeitomjBo4aOGrgQBj4b7RwGFwGsjAwMDAAAD2/BjgezgsZAAAAAElFTkSuQmCC'},
                function () {
                    bg.dirty = true;
                    canvas.renderAll()
                });

            //canvas.add(bg)
            canvas.renderAll()
        } else {
            canvas.setBackgroundImage(0, canvas.renderAll.bind(canvas))
        }

    }, [mapIsVisible])


    useEffect(() => {
        currentFigureType = objectType
        if (objectType === "consumer" || objectType === "supplier") {
            canvas.defaultCursor = 'crosshair'
            canDrawPolygon = true
            polygonMode = true
            pointArray = []
            lineArray = []
            activeLine = null
        } else if (objectType === "network") {
            canvas.defaultCursor = 'crosshair'
            canDrawLine = true;
        } else if (objectType === "none") {
            canvas.defaultCursor = 'default'
            canDrawPolygon = false;
            canDrawLine = false;
        }
    }, [objectType])


    const setZoom = (opt) => {
        if (opt.e.ctrlKey) {
            let delta = opt.e.deltaY;
            let zoom = canvas.getZoom();
            zoom *= 0.999 ** delta;
            if (zoom > 20) zoom = 20;
            if (zoom < 1) zoom = 1;
            //canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);
            canvas.setZoom(zoom)
            opt.e.preventDefault()
            opt.e.stopPropagation()

            // const canvasDiv = $('#canvas-div')
            //
            // if (zoom >= -20 && zoom < 20) {
            //     canvasDiv.scrollLeft(opt.e.offsetX / 2)
            //     canvasDiv.scrollTop(opt.e.offsetY / 2)
            // }
            // else if (zoom >= 20 && zoom < 40) {
            //     canvasDiv.scrollLeft(opt.e.offsetX / 2.1)
            //     canvasDiv.scrollTop(opt.e.offsetY / 2.1)
            // }
            // else if (zoom >= 40 && zoom < 60) {
            //     canvasDiv.scrollLeft(opt.e.offsetX / 2.1)
            //     canvasDiv.scrollTop(opt.e.offsetY / 2.1)
            // }
            // else if (zoom >= 60 && zoom <= 120) {
            //     canvasDiv.scrollLeft(opt.e.offsetX / 4)
            //     canvasDiv.scrollTop(opt.e.offsetY / 4)
            // }

            //canvas.setWidth(initialCanvasWidth * zoom)
            //canvas.setHeight(initialCanvasHeight * zoom)
            canvas.renderAll()
            console.log("width: ", canvas.getWidth(), "height: ", canvas.getHeight())
        }
    }

    const setMap = (img) => {
        const scaleY = canvas.getHeight() / img.height
        //const scaleX = canvas.getWidth() / img.width

        const imageResolution = img.width / img.height

        canvas.setWidth(canvas.getHeight() * imageResolution)

        img.set({scaleX: scaleY, scaleY: scaleY});

        canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas))

        initialCanvasHeight = canvas.getHeight()
        initialCanvasWidth = canvas.getWidth()
    }

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
            _line.set({name: name, id: name, objectCaching: false})
            canvas.add(_line);
            canvas.moveTo(_line, 1000);
            canvas.add(
                makeCircle(_line.get('x1'), _line.get('y1'), _line, 'start', name, relativeSize, mapDistance),
                makeCircle(_line.get('x2'), _line.get('y2'), _line, 'end', currentName, relativeSize, mapDistance)
            );
        } else if ((currentFigureType === "consumer" || currentFigureType === "supplier") && canDrawPolygon) {
            if (o.target && o.target.id === pointArray[0].id) {
                generatePolygon(pointArray, lineArray, activeShape, activeLine, canvas, relativeSize, mapDistance, currentFigureType, finishCreateObject)
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
            finishCreateObject(currentFigureType, _line)
            _line = null
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
        if (!e.e.altKey) {
            if (currentFigureType === "none") {
                const zoom = canvas.getZoom()
                let p = e.target;

                limitCanvasBoundary(p, MAP_HEIGHT, MAP_HEIGHT);

                let objType = p.get('type');

                if (objType === 'circle') {
                    connectLineToOtherLine(canvas, e, p);

                } else if (objType === 'line') {
                    let _curXm = (_curX - e.e.clientX) / zoom
                    let _curYm = (_curY - e.e.clientY) / zoom

                    limitCanvasBoundary(p.circle1, MAP_HEIGHT, MAP_HEIGHT);
                    limitCanvasBoundary(p.circle2, MAP_HEIGHT, MAP_HEIGHT);

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
                        left: p.getCenterPoint().x + 1, // * (canvas.getHeight() / mapDistance),
                        top: p.getCenterPoint().y
                    });

                    p.circle2.set({
                        left: p.getCenterPoint().x - 1, // * (canvas.getHeight() / mapDistance),
                        top: p.getCenterPoint().y
                    });
                    p.circle1.setCoords();
                    p.circle2.setCoords();
                    p.setCoords();
                    canvas.renderAll();
                }
            }
        }

    }

    return <div className="canvas-container" id="div-canvas">
            <canvas className="canvas" id="c" height={CANVAS_HEIGHT} width={CANVAS_HEIGHT}/>
        </div>


    // return <div id="canvas-div" className={"div-canvas"}>
    //     <div className="canvas-container">
    //         <canvas className="upper-canvas"></canvas>
    //         <canvas className="lower-canvas" id="c" width={"800"} height={"800"}/>
    //     </div>
    // </div>


}