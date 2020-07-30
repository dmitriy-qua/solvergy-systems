import React, {useEffect, useState} from "react"
import {fabric} from "fabric"
import {lineGenerated} from "./shapes/line/config"
import {
    addPolygonPoint,
    connectLineToOtherLine,
    generatePolygon,
    limitCanvasBoundary,
    removeGrid,
    setGrid,
} from "./helpers/canvas-helper"
import {generateId} from "../../../../../helpers/data-helper"
import {lineCircle} from "./shapes/circle/config"
import {useSelector} from "react-redux"
import ResizeSensor from 'resize-sensor'

let MAP_HEIGHT = 2000, MAP_WIDTH = 2000

let canvas, zoom = 1
let _line, isDown, currentFigureType
let polygonMode = true
let pointArray = []
let lineArray = []
let activeLine
let activeShape = false
let canDrawLine = false
let canDrawPolygon = false
let _curX, _curY
let currentName
let mapDistance = null

export const Canvas = ({objectType, gridIsVisible, map_Distance, setObjectType, finishCreateObject}) => {

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

        canvas.setZoom(0.25)
        setMap()
        new ResizeSensor(document.getElementById('div-canvas'), function () {
            fitResponsiveCanvas()
        });

        canvas.on('mouse:down', onMouseDown)
        canvas.on('mouse:move', onMouseMove)
        canvas.on('mouse:up', onMouseUp)
        canvas.on('object:moving', objectMoving)
        canvas.on('mouse:wheel', onMouseWheel)

    }, [])

    useEffect(() => {

        if (gridIsVisible) {
            setGrid(canvas, 40, MAP_WIDTH, MAP_HEIGHT, mapDistance)
        } else {
            removeGrid(canvas)
        }

    }, [gridIsVisible])


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
            canDrawLine = true
        } else if (objectType === "none") {
            canvas.defaultCursor = 'default'
            canDrawPolygon = false
            canDrawLine = false
        }
    }, [objectType])

    const setMap = () => {
        const imagePath = "https://serving.photos.photobox.com/02915431de16107f0826909e7e542578c22f8674f038e0621ba87aa64a7353c93fc55c48.jpg"
        fabric.Image.fromURL(imagePath, (img) => {

            const scaleY = MAP_HEIGHT / img.height
            const imageResolution = img.width / img.height
            MAP_WIDTH = MAP_HEIGHT * imageResolution

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

            fitResponsiveCanvas()
            loadObjects(objects)
        })
    }

    const loadObjects = (objects) => {
        objects.consumers.forEach((item) => {
            canvas.add(item.shape)
            canvas.add(item.shape.circle1)
            canvas.add(item.shape.circle2)

            canvas.moveTo(item.shape, 3)
            canvas.moveTo(item.shape.circle1, 4)
            canvas.moveTo(item.shape.circle2, 4)
        })

        objects.suppliers.forEach((item) => {
            canvas.moveTo(item.shape, 3)
            canvas.moveTo(item.shape.circle1, 4)
            canvas.moveTo(item.shape.circle2, 4)

            canvas.add(item.shape)
            canvas.add(item.shape.circle1)
            canvas.add(item.shape.circle2)
        })

        objects.networks.forEach((item) => {
            canvas.moveTo(item.shape.circle1, -2)
            canvas.moveTo(item.shape.circle2, -2)
            canvas.moveTo(item.shape, -1)

            canvas.add(item.shape)
            canvas.add(item.shape.circle1)
            canvas.add(item.shape.circle2)
        })

        canvas.renderAll()
    }

    function setViewportTransform(zoom, isPan = false, opt = null) {
        let vpt = canvas.viewportTransform
        if (zoom < canvas.getHeight() / MAP_HEIGHT) {
            vpt[4] = canvas.getWidth() / 2 - MAP_WIDTH * zoom / 2
            vpt[5] = canvas.getHeight() / 2 - MAP_HEIGHT * zoom / 2
        } else {
            if (isPan) {
                const e = opt.e
                vpt[4] += e.clientX - canvas.lastPosX
                vpt[5] += e.clientY - canvas.lastPosY
            }

            if (vpt[4] >= 0) {
                vpt[4] = isPan ? 0 : canvas.getWidth() / 2 - MAP_WIDTH * zoom / 2
            } else if (vpt[4] < canvas.getWidth() - MAP_WIDTH * zoom) {
                vpt[4] = canvas.getWidth() - MAP_WIDTH * zoom
            }
            if (vpt[5] >= 0) {
                vpt[5] = isPan ? 0 : canvas.getHeight() / 2 - MAP_HEIGHT * zoom / 2
            } else if (vpt[5] < canvas.getHeight() - MAP_HEIGHT * zoom) {
                vpt[5] = canvas.getHeight() - MAP_HEIGHT * zoom
            }
        }
        canvas.renderAll()
    }

    function fitResponsiveCanvas() {
        let containerSize = {
            width: document.getElementById('div-canvas').offsetWidth,
            height: document.getElementById('div-canvas').offsetHeight
        }

        canvas.setWidth(containerSize.width)
        canvas.setHeight(containerSize.height)

        const zoom = canvas.getZoom()
        setViewportTransform(zoom, false, null)
    }

    const onMouseWheel = (opt) => {
        if (opt.e.ctrlKey === true) {
            const delta = opt.e.deltaY
            let zoom = canvas.getZoom()
            zoom *= 0.999 ** delta
            if (zoom > 20) zoom = 20
            if (zoom < 0.1) zoom = 0.1
            canvas.zoomToPoint({x: opt.e.offsetX, y: opt.e.offsetY}, zoom)
            opt.e.preventDefault()
            opt.e.stopPropagation()
            setViewportTransform(zoom, false, null)
        }
    }

    const onMouseDown = (o) => {

        if (o.e.altKey === true) {
            canvas.isDragging = true
            canvas.lastPosX = o.e.clientX
            canvas.lastPosY = o.e.clientY
        }

        if (currentFigureType === "network" && canDrawLine) {
            if (canvas.findTarget(o.e)) return
            isDown = true
            let pointer = canvas.getPointer(o)
            let points = [pointer.x, pointer.y, pointer.x, pointer.y]
            let name = generateId()
            currentName = name
            _line = new fabric.Line(points, lineGenerated(MAP_HEIGHT, mapDistance))
            _line.set({name: name, id: name, objectCaching: false})
            canvas.moveTo(_line, -2)
            canvas.add(_line)

            canvas.add(
                makeCircle(_line.get('x1'), _line.get('y1'), _line, 'start', name, MAP_HEIGHT, mapDistance),
                makeCircle(_line.get('x2'), _line.get('y2'), _line, 'end', currentName, MAP_HEIGHT, mapDistance)
            )
            canvas.renderAll()
        } else if ((currentFigureType === "consumer" || currentFigureType === "supplier") && canDrawPolygon) {
            if (o.target && o.target.id === pointArray[0].id) {
                generatePolygon(pointArray, lineArray, activeShape, activeLine, canvas, MAP_HEIGHT, mapDistance, currentFigureType, finishCreateObject)
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
                } = addPolygonPoint(o, MAP_HEIGHT, mapDistance, activeShape, canvas, activeLine, pointArray, lineArray)

                pointArray = pointArrayBuf
                lineArray = lineArrayBuf
                activeLine = activeLineBuf
                activeShape = activeShapeBuf
            }
        } else if (!canDrawLine && !canDrawPolygon) {
            if (o.target != null) {
                let objType = o.target.get('type')
                if (objType === 'line') {
                    //canvas.sendBackwards(o.target)
                    _curX = o.e.clientX
                    _curY = o.e.clientY

                }
            }
        }
    }

    const onMouseMove = (o) => {

        if (canvas.isDragging) {
            const zoom = canvas.getZoom()
            setViewportTransform(zoom, true, o)
            canvas.lastPosX = o.e.clientX
            canvas.lastPosY = o.e.clientY
            canvas.renderAll()
        }

        if (currentFigureType === "network") {
            if (!isDown) return
            let pointer = canvas.getPointer(o)
            _line.set({x2: pointer.x, y2: pointer.y})
            _line.circle2.set({left: pointer.x, top: pointer.y})
            _line.circle2.setCoords()
            _line.setCoords()
            connectLineToOtherLine(canvas, o, _line.circle2)
            canvas.renderAll()
        } else if (currentFigureType === "consumer" || currentFigureType === "supplier") {
            if (activeLine && activeLine.class === "line") {
                let pointer = canvas.getPointer(o)
                activeLine.set({x2: pointer.x, y2: pointer.y})

                let points = activeShape.get("points")
                points[pointArray.length] = {
                    x: pointer.x,
                    y: pointer.y
                }
                activeShape.set({
                    points: points
                })
                canvas.renderAll()
            }
            //canvas.renderAll()
        }
    }

    const onMouseUp = (o) => {
        canvas.isDragging = false
        canvas.forEachObject(function(o) {
            o.setCoords();
        });

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
        const circle = new fabric.Circle(lineCircle(left, top, type, id, MAP_HEIGHT, mapDistance))
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

    const objectMoving = (e) => {
        if (!e.e.altKey) {
            if (currentFigureType === "none") {
                const zoom = canvas.getZoom()
                let p = e.target

                limitCanvasBoundary(p, MAP_WIDTH, MAP_HEIGHT)

                let objType = p.get('type')

                if (objType === 'circle') {
                    connectLineToOtherLine(canvas, e, p)

                } else if (objType === 'line') {
                    let _curXm = (_curX - e.e.clientX) / zoom
                    let _curYm = (_curY - e.e.clientY) / zoom

                    limitCanvasBoundary(p.circle1, MAP_WIDTH, MAP_HEIGHT)
                    limitCanvasBoundary(p.circle2, MAP_WIDTH, MAP_HEIGHT)

                    p.circle1.set({
                        'left': (p.circle1.left - _curXm),
                        'top': (p.circle1.top - _curYm)
                    })
                    p.circle1.setCoords()

                    p.circle2.set({
                        'left': (p.circle2.left - _curXm),
                        'top': (p.circle2.top - _curYm)
                    })
                    p.circle2.setCoords()

                    p && p.set({
                        'x1': p.circle1.left,
                        'y1': p.circle1.top
                    })

                    p && p.set({
                        'x2': p.circle2.left,
                        'y2': p.circle2.top
                    })

                    p.setCoords()

                    _curX = e.e.clientX
                    _curY = e.e.clientY

                    canvas.renderAll()
                } else if (objType === 'polygon') {
                    p.circle1.set({
                        left: p.getCenterPoint().x + 2 * (MAP_HEIGHT / mapDistance),
                        top: p.getCenterPoint().y
                    })

                    p.circle2.set({
                        left: p.getCenterPoint().x - 2 * (MAP_HEIGHT / mapDistance),
                        top: p.getCenterPoint().y
                    })
                    p.circle1.setCoords()
                    p.circle2.setCoords()
                    p.setCoords()
                    canvas.renderAll()
                }
            }
        }

    }

    return <div className="canvas-container" id="div-canvas">
        <canvas className="canvas" id="c" height={"800"} width={"800"}/>
    </div>
}