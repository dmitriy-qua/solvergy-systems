import React from 'react';
import { fabric } from 'fabric';
import './App.css';
import $ from 'jquery';

let canvas, zoom = 0;
let _line, isDown, line, figureType;


let min = 99;
let max = 999999;
let polygonMode = true;
let pointArray = new Array();
let lineArray = new Array();
let activeLine;
let activeShape = false;
let polygon;
let canDrawLine = false;
let canDrawPolygon = false;
let _curX, _curY;
let currentName;
let initialCanvasHeight;
let relativeSize = 1;

let polygonConfigDrawing = {
    stroke: '#333333',
    strokeWidth: 1 * relativeSize,
    fill: '#cccccc',
    opacity: 0.3,
    selectable: false,
    hasBorders: false,
    hasControls: false,
    evented: false,
    objectCaching: false
}

let polygonConfigGenerated = {
    stroke: 'black',
    strokeWidth: 1.4 * relativeSize,
    fill: 'red',
    opacity: 0.4,
    hasBorders: false,
    hasControls: false,
    perPixelTargetFind: true,
    targetFindTolerance: 5,
    objectCaching: false
}

let polygonLineConfig = {
    strokeWidth: 2 * relativeSize,
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
}

let polygonCircleConfigDrawing = {
    radius: 6 * relativeSize,
    fill: '#ffffff',
    stroke: '#333333',
    strokeWidth: 0.5 * relativeSize,
    selectable: false,
    hasBorders: false,
    hasControls: false,
    originX: 'center',
    originY: 'center',
    objectCaching: false
}

let polygonCircleConfigGenerated = {
    radius: 6 * relativeSize,
    fill: '#ffffff',
    stroke: '#333333',
    strokeWidth: 0.5 * relativeSize,
    originX: 'center',
    originY: 'center',
    hasBorders: false,
    hasControls: false,
}


let lineConfig = {
    strokeWidth: 4 * relativeSize,
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
}

class App extends React.Component {
    constructor() {
        super();

        polygon = {
            drawPolygon: () => {
                polygonMode = true;
                pointArray = new Array();
                lineArray = new Array();
                activeLine = null;
            },
            addPoint: (o) => {
                let random = Math.floor(Math.random() * (max - min + 1)) + min;
                let id = new Date().getTime() + random;
                let circle = new fabric.Circle(polygonCircleConfigDrawing);
                circle.set({
                    id: id,
                    left: (o.e.layerX / canvas.getZoom()),
                    top: (o.e.layerY / canvas.getZoom())
                })
                if (pointArray.length == 0) {
                    circle.set({
                        fill: 'red'
                    })
                }
                let points = [(o.e.layerX / canvas.getZoom()), (o.e.layerY / canvas.getZoom()), (o.e.layerX / canvas.getZoom()), (o.e.layerY / canvas.getZoom())];
                line = new fabric.Line(points, polygonLineConfig);
                if (activeShape) {
                    let pos = canvas.getPointer(o.e);
                    let points = activeShape.get("points");
                    points.push({
                        x: pos.x,
                        y: pos.y
                    });
                    let polygon = new fabric.Polygon(points, polygonConfigDrawing);
                    canvas.remove(activeShape);
                    canvas.add(polygon);
                    activeShape = polygon;
                    canvas.renderAll();
                }
                else {
                    let polyPoint = [{ x: (o.e.layerX / canvas.getZoom()), y: (o.e.layerY / canvas.getZoom()) }];
                    let polygon = new fabric.Polygon(polyPoint, polygonConfigDrawing);
                    activeShape = polygon;
                    canvas.add(polygon);
                }
                activeLine = line;

                pointArray.push(circle);
                lineArray.push(line);

                canvas.add(line);
                canvas.add(circle);
                canvas.selection = false;
            },
            generatePolygon: (pointArray) => {
                let points = new Array();
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
                let polygon = new fabric.Polygon(points, polygonConfigGenerated);
                canvas.add(polygon);

                let circle1 = new fabric.Circle(polygonCircleConfigGenerated);
                circle1.set({
                    left: polygon.getCenterPoint().x + 20,
                    top: polygon.getCenterPoint().y,
                    selectable: false,
                    fill: 'red'
                })
                polygon.circle1 = circle1;
                canvas.add(circle1);

                let circle2 = new fabric.Circle(polygonCircleConfigGenerated);
                circle2.set({
                    left: polygon.getCenterPoint().x - 20,
                    top: polygon.getCenterPoint().y,
                    selectable: false,
                    fill: 'blue'
                })
                polygon.circle2 = circle2;
                canvas.add(circle2);

                canvas.moveTo(circle1, 0);
                canvas.moveTo(circle2, 0);
                canvas.moveTo(polygon, 0);


                activeLine = null;
                activeShape = null;
                polygonMode = false;
            }
        };

    }

    componentDidMount() {

        canvas = new fabric.Canvas('c', {
            selection: false,
            preserveObjectStacking: true,
            fireMiddleClick: true
        });



        let canvasDiv = document.getElementById('canvas-div');
        initialCanvasHeight = canvas.getHeight();
        canvasDiv.addEventListener('wheel', (opt) => {
            opt.preventDefault();

            let myDelta;
            relativeSize = canvas.getHeight() / initialCanvasHeight;
            console.log(relativeSize)

            let delta = opt.deltaY;
            if (delta < 0) {
                myDelta = -1;
            }
            else {
                myDelta = 1;
            }

            zoom = Math.round(zoom - myDelta);
            //console.log(myDelta)
            //console.log(zoom);
            if (zoom <= 100 && zoom >= -20) {
                if (delta < 0) {
                    this.zoomCanvas(1.02, opt, zoom);
                }
                else {
                    this.zoomCanvas(1 / 1.02, opt, zoom);
                }
            }
            else {
                if (zoom > 100) {
                    zoom = 100;
                }
                else if (zoom < -20) {
                    zoom = -20;
                }
            }

        })


        canvas.on('mouse:down', this.onMouseDown);
        canvas.on('mouse:move', this.onMouseMove);
        canvas.on('mouse:up', this.onMouseUp);
        canvas.on('object:moving', this.objectMoving);

        $(document).ready(() => {
            $("input[type='radio']").click(function () {
                figureType = $("input[name='figure']:checked").val();
                if (figureType === "polygon") {
                    canDrawPolygon = true;
                    polygon.drawPolygon();
                }
                else if (figureType === "line") {
                    canDrawLine = true;
                }
            });
        });
    }

    onMouseDown = (o) => {
        if (figureType === "line" && canDrawLine) {
            if (canvas.findTarget(o.e)) return;
            isDown = true;
            let pointer = canvas.getPointer(o.e);
            let points = [pointer.x, pointer.y, pointer.x, pointer.y];
            let random = Math.floor(Math.random() * (max - min + 1)) + min;
            let name = new Date().getTime() + random;
            currentName = name;
            _line = new fabric.Line(points, lineConfig);
            _line.set({
                name: name,
                strokeWidth: 4 * relativeSize,
                objectCaching: false
            })
            canvas.add(_line);
            canvas.moveTo(_line, 1000);
            canvas.add(
                this.makeCircle(_line.get('x1'), _line.get('y1'), _line, 'start', name),
                this.makeCircle(_line.get('x2'), _line.get('y2'), _line, 'end', currentName)
            );
        }
        else if (figureType === "polygon" && canDrawPolygon) {

            if (o.target && o.target.id === pointArray[0].id) {
                polygon.generatePolygon(pointArray);
            }
            if (polygonMode) {
                polygon.addPoint(o);
            }
        }
        else if (!canDrawLine && !canDrawPolygon) {
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

    onMouseMove = (o) => {
        if (figureType === "line") {
            if (!isDown) return;
            let pointer = canvas.getPointer(o.e);
            _line.set({ x2: pointer.x, y2: pointer.y });
            _line.circle2.set({ left: pointer.x, top: pointer.y })
            _line.circle2.setCoords();
            _line.setCoords();
            this.connectLineToOtherLine(o, _line.circle2);
            canvas.renderAll();
        }
        else if (figureType === "polygon") {
            if (activeLine && activeLine.class === "line") {
                let pointer = canvas.getPointer(o.e);
                activeLine.set({ x2: pointer.x, y2: pointer.y });

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
            canvas.renderAll();
        }
    }


    onMouseUp = (o) => {
        if (figureType === "line" && canDrawLine) {

            isDown = false;
            canDrawLine = false;
        }
        else if (figureType === "polygon" && canDrawPolygon && !polygonMode) {
            canDrawPolygon = false;
        }
    }


    connectLineToOtherLine = (e, p) => {
        let pt = { x: canvas.getPointer(e.e).x, y: canvas.getPointer(e.e).y };
        let circles = canvas.getObjects('circle');
        //console.log(circles);
        for (let i = 0; i < circles.length; i++) {
            if (circles[i].containsPoint(pt) && p.get('name') != circles[i].get('name')) {
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

                canvas.renderAll();
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

                canvas.renderAll();
            }
        }
        canvas.renderAll();
    }

    objectMoving = (e) => {
        let p = e.target;

        this.limitCanvasBoundary(p);

        let objType = p.get('type');

        if (objType === 'circle') {
            this.connectLineToOtherLine(e, p);

        } else if (objType === 'line') {
            let _curXm = (_curX - e.e.clientX);
            let _curYm = (_curY - e.e.clientY);

            this.limitCanvasBoundary(p.circle1);
            this.limitCanvasBoundary(p.circle2);

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

            console.log("x2 " + p.x2);
            console.log("circle left " + p.circle2.left);
            console.log("y2 " + p.y2);
            console.log("circle top " + p.circle2.top);

            _curX = e.e.clientX;
            _curY = e.e.clientY;
            canvas.renderAll();
        }
        else if (objType === 'polygon') {
            p.circle1.set({
                left: p.getCenterPoint().x + 20 * relativeSize,
                top: p.getCenterPoint().y
            });

            p.circle2.set({
                left: p.getCenterPoint().x - 20 * relativeSize,
                top: p.getCenterPoint().y
            });
            p.circle1.setCoords();
            p.circle2.setCoords();
            p.setCoords();
            canvas.renderAll();
        }
    }

    setCircleParameters = (left, top, type) => {
        let random = Math.floor(Math.random() * (max - min + 1)) + min;
        let id = new Date().getTime() + random;
        let circleConfig = {
            radius: 6 * relativeSize,
            fill: '#ffffff',
            stroke: '#333333',
            strokeWidth: 0.5 * relativeSize,
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
        }

        return circleConfig;
    }

    makeCircle = (left, top, line, type) => {
        let c = new fabric.Circle(this.setCircleParameters(left, top, type));
        //canvas.moveTo(c, 2);
        c.line = line;
        if (type === 'start') {
            line.circle1 = c;
        }
        else if (type === 'end') {
            line.circle2 = c;
        }
        c.setCoords();
        return c;
    }

    limitCanvasBoundary = (currentObj) => {
        if (currentObj.currentHeight > currentObj.canvas.height || currentObj.currentWidth > currentObj.canvas.width) {
            return;
        }
        currentObj.setCoords();
        // top-left  corner
        if (currentObj.getBoundingRect().top < 0 || currentObj.getBoundingRect().left < 0) {
            currentObj.top = Math.max(currentObj.top, currentObj.top - currentObj.getBoundingRect().top);
            currentObj.left = Math.max(currentObj.left, currentObj.left - currentObj.getBoundingRect().left);
        }
        // bot-right corner
        if (currentObj.getBoundingRect().top + currentObj.getBoundingRect().height > currentObj.canvas.height || currentObj.getBoundingRect().left + currentObj.getBoundingRect().width > currentObj.canvas.width) {
            currentObj.top = Math.min(currentObj.top, currentObj.canvas.height - currentObj.getBoundingRect().height + currentObj.top - currentObj.getBoundingRect().top);
            currentObj.left = Math.min(currentObj.left, currentObj.canvas.width - currentObj.getBoundingRect().width + currentObj.left - currentObj.getBoundingRect().left);
        }
    }

    zoomCanvas = (factor, opt, zoom) => {

        if (zoom >= -20 && zoom < 20) {
            $('#canvas-div').scrollLeft(canvas.getPointer(opt.e).x / 2);
            $('#canvas-div').scrollTop(canvas.getPointer(opt.e).y / 2);
        }
        else if (zoom >= 20 && zoom < 40) {
            $('#canvas-div').scrollLeft(canvas.getPointer(opt.e).x / 2.1);
            $('#canvas-div').scrollTop(canvas.getPointer(opt.e).y / 2.1);
        }
        else if (zoom >= 40 && zoom < 60) {
            $('#canvas-div').scrollLeft(canvas.getPointer(opt.e).x / 2.1);
            $('#canvas-div').scrollTop(canvas.getPointer(opt.e).y / 2.1);
        }
        else if (zoom >= 60 && zoom <= 100) {
            $('#canvas-div').scrollLeft(canvas.getPointer(opt.e).x / 4);
            $('#canvas-div').scrollTop(canvas.getPointer(opt.e).y / 4);
        }

        canvas.setHeight(Math.round(canvas.getHeight() * factor));
        canvas.setWidth(Math.round(canvas.getWidth() * factor));

        if (canvas.backgroundImage) {
            // Need to scale background images as well
            let bi = canvas.backgroundImage;
            bi.width = bi.width * factor; bi.height = bi.height * factor;
        }
        let objects = canvas.getObjects();

        let tcounter = 0;

        for (let i in objects) {

            tcounter++;

            //alert(tcounter);
            let scaleX = objects[i].scaleX;
            let scaleY = objects[i].scaleY;
            let left = objects[i].left;
            let top = objects[i].top;

            let tempScaleX = scaleX * factor;
            let tempScaleY = scaleY * factor;
            let tempLeft = left * factor;
            let tempTop = top * factor;
            
            if (objects[i].get('type') === 'line') {
                console.log("x1 - " + objects[i].x1);
                console.log("y1 - " + objects[i].y1);
                console.log("x2 - " + objects[i].x2);
                console.log("y2 - " + objects[i].y2);
            }

            if (objects[i].get('type') !== 'line') {
                objects[i].scaleX = Math.round(tempScaleX * 1000) / 1000;
                objects[i].scaleY = Math.round(tempScaleY * 1000) / 1000;
            }
            else {
                let strokeWidth = objects[i].strokeWidth;
                let tempStrokeWidth = strokeWidth * factor;
                objects[i].strokeWidth = Math.round(tempStrokeWidth * 1000) / 1000

                let x1 = objects[i].x1;
                let x2 = objects[i].x2;
                let y1 = objects[i].y1;
                let y2 = objects[i].y2;

                let tempX1 = x1 * factor;
                let tempX2 = x2 * factor;
                let tempY1 = y1 * factor;
                let tempY2 = y2 * factor;

                objects[i].set({
                    'x1': Math.round(tempX1 * 1000) / 1000,
                    'y1': Math.round(tempY1 * 1000) / 1000,
                    'x2': Math.round(tempX2 * 1000) / 1000,
                    'y2': Math.round(tempY2 * 1000) / 1000
                });
            }
            
            objects[i].left = Math.round(tempLeft * 1000) / 1000;
            objects[i].top = Math.round(tempTop * 1000) / 1000;

            objects[i].setCoords();

            if (objects[i].get('type') === 'line') {
                console.log("x1 - " + objects[i].x1);
                console.log("y1 - " + objects[i].y1);
                console.log("x2 - " + objects[i].x2);
                console.log("y2 - " + objects[i].y2);
            }

        }
        canvas.renderAll();
        canvas.calcOffset();
    }


    render() {
        return (
            <div className="App">
                <div>
                    <input type="radio" id="contactChoice1"
                        name="figure" value="line" />
                    <label htmlFor="contactChoice1">Line</label>
                    <input type="radio" id="contactChoice2"
                        name="figure" value="polygon" />
                    <label htmlFor="contactChoice2">Polygon</label>
                    <input type="radio" id="contactChoice3"
                        name="figure" value="none" />
                    <label htmlFor="contactChoice3">None</label>
                </div>

                <div id="canvas-div" className="div-canvas">
                    <canvas className="canvas" id="c" width="500" height="500"/>
                </div>
                {/* <div>
                    <div className="div-canvas" >
                        <canvas
                            className="scaled"
                            id="c"
                            width="700"
                            height="500"></canvas>
                    </div>

                </div> */}
            </div>
        );
    }

}


export default App;
