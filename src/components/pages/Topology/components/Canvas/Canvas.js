import React, {useCallback, useEffect, useRef, useState} from "react"
import {ContextMenu, Menu, MenuDivider, MenuItem} from "@blueprintjs/core";
import {fabric} from "fabric"
import {lineGenerated} from "./shapes/line/config"
import {
    addPolygonPoint, calculateLineDistance,
    connectLineToOtherLine, fitResponsiveCanvas,
    generatePolygon, handleObjectSelection,
    limitCanvasBoundary, makeCircle,
    removeGrid,
    setGrid, setMap, setViewportTransform,
} from "./helpers/canvas-helper"
import {generateId} from "../../../../../helpers/data-helper"
import {lineCircle} from "./shapes/circle/config"
import {useDispatch, useSelector} from "react-redux"
import ResizeSensor from 'resize-sensor'
import {ObjectContextMenu} from "../../../../common/ContextMenu/ObjectContextMenu";
import {setCanvasState} from "../../../../../redux/actions/project";

//let MAP_HEIGHT = 2000, MAP_WIDTH = 2000

//let canvas
let zoom = 1
let _line, isDown, currentFigureType, currentCreatingObjectData
let polygonMode = true
let pointArray = []
let lineArray = []
let activeLine
let activeShape = false
let canDrawLine = false
let canDrawPolygon = false
let _curX, _curY
let currentSelectedObject = null
let mapDistance = null
let currentObjects = []
let currentNodes = []
let canvasRef = null
let currentProject = null

export const Canvas = ({
                           objectType,
                           gridIsVisible,
                           map_Distance,
                           setObjectType,
                           finishCreateObject,
                           setSelectedObject,
                           setObjectToDelete,
                           objectToDelete,
                           selectedObject,
                           deleteObject,
                           nodes,
                           editObject,
                           creatingObjectData,
                           loadedProject,
                           canvas,
                           setCanvas,
                           mapSize,
                           setMapSize,
                           setProjectState,
                           setProjectHistory,
                           saveCanvasState
                       }) => {

    const dispatch = useDispatch()

    const canvasState = useSelector(state => state.project.canvas)

    const project = useSelector(state => state.project)

    useEffect(() => {
        currentProject = project
    }, [project])

    useEffect(() => {
        mapDistance = map_Distance
    }, [map_Distance])

    useEffect(() => {
        currentNodes = nodes
    }, [nodes])

    useEffect(() => {
        currentSelectedObject = selectedObject
    }, [selectedObject])

    useEffect(() => {
        currentFigureType = "none"
    }, [loadedProject])

    const objects = useSelector(state => state.project && state.project.objects)

    useEffect(() => {
        currentObjects = objects
    }, [objects])

    useEffect(() => {
        if (objectToDelete) {
            canvas.remove(objectToDelete.circle1)
            canvas.remove(objectToDelete.circle2)
            canvas.remove(objectToDelete)
            canvas.renderAll()
            setObjectToDelete(null)
            const canvasState = canvas.toJSON(["circle1", "circle2", "objectType", "id", "networkType", "distance", "name", "connectedTo"])
            dispatch(setCanvasState(canvasState))
            setProjectState(currentProject)
            setProjectHistory(history => [...history, currentProject].slice(-4))
        }
    }, [objectToDelete])


    useEffect(() => {

        if (canvas) {
            const {height, width} = mapSize

            if (gridIsVisible) {
                setGrid(canvas, 40, width, height, mapDistance)
            } else {
                removeGrid(canvas)
            }
        }

    }, [gridIsVisible])

    const onMouseWheel = (canvas, height, width) => (opt) => {
        if (opt.e.ctrlKey === true) {
            const delta = opt.e.deltaY
            let zoom = canvas.getZoom()
            zoom *= 0.999 ** delta
            if (zoom > 20) zoom = 20
            if (zoom < 0.1) zoom = 0.1
            canvas.zoomToPoint({x: opt.e.offsetX, y: opt.e.offsetY}, zoom)
            opt.e.preventDefault()
            opt.e.stopPropagation()
            setViewportTransform(canvas, zoom, false, null, height, width)
        }
    }

    const useFabric = (onChange) => {
        const fabricRef = useRef();
        const disposeRef = useRef();
        return useCallback((node) => {
            if (node) {
                fabricRef.current = new fabric.Canvas(node, {
                    selection: false,
                    preserveObjectStacking: true,
                    fireMiddleClick: true,
                    fireRightClick: true,
                    stopContextMenu: true,
                    renderOnAddRemove: false
                })

                if (onChange) {
                    disposeRef.current = onChange(fabricRef.current);
                }
            } else if (fabricRef.current) {
                fabricRef.current.dispose();
                if (disposeRef.current) {
                    disposeRef.current();
                    disposeRef.current = undefined;
                }
            }
        }, []);
    };

    canvasRef = useFabric(async (fabricCanvas) => {
        //fabricCanvas.loadFromJSON(canvasState)
        fabricCanvas.setZoom(0.25)
        const {mapHeight, mapWidth} = await setMap(fabricCanvas)

        setMapSize({width: mapWidth, height: mapHeight})

        new ResizeSensor(document.getElementById('div-canvas'), function () {
            fitResponsiveCanvas(fabricCanvas, mapHeight, mapWidth)
        });

        fabricCanvas.on('mouse:down', onMouseDown(fabricCanvas, mapHeight, mapWidth))
        fabricCanvas.on('mouse:move', onMouseMove(fabricCanvas, mapHeight, mapWidth))
        fabricCanvas.on('mouse:up', onMouseUp(fabricCanvas, mapHeight, mapWidth))
        fabricCanvas.on('object:moving', objectMoving(fabricCanvas, mapHeight, mapWidth))
        fabricCanvas.on('mouse:wheel', onMouseWheel(fabricCanvas, mapHeight, mapWidth))

        dispatch(setCanvasState(fabricCanvas.toJSON(["id"])))

        setCanvas(fabricCanvas)
    })

    // let canvasDep
    // if (canvas) canvasDep = canvas.getObjects() //{...Object.keys(canvas).map(key => canvas[key])}

    // useEffect( () => {
    //     //console.log(canvas)
    // }, [canvasDep])

    useEffect(() => {
        if (canvas) {
            currentFigureType = objectType
            currentCreatingObjectData = creatingObjectData
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
        }
    }, [objectType])

    const showContextMenu = (o, canvas) => {
        o.e.preventDefault();

        if (o.target && (o.target.type === "polygon" || o.target.type === "line")) {
            setSelectedObject(o.target)
            canvas.renderAll()

            ContextMenu.show(
                <ObjectContextMenu selectedObject={o.target} deleteObject={deleteObject} objects={currentObjects}
                                   nodes={currentNodes} editObject={editObject} canvas={canvas}/>,
                {left: o.e.clientX, top: o.e.clientY}
            );
        } else {
            setSelectedObject(o.target)
            canvas.renderAll()
        }

    }

    const onMouseDown = (canvas, height, width) => (o) => {
        if (o.button === 3) {
            const newSelectedObject = handleObjectSelection(canvas, o.target, currentSelectedObject)
            setSelectedObject(newSelectedObject)
            showContextMenu(o, canvas)
        } else if (o.button === 1) {
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
                _line = new fabric.Line(points, lineGenerated(height, mapDistance, currentCreatingObjectData.networkType, currentCreatingObjectData.diameter, currentCreatingObjectData.networkIsNew))
                _line.set({
                    id: currentCreatingObjectData.id,
                    objectType: currentFigureType,
                    networkType: currentCreatingObjectData.networkType || null,
                    networkIsNew: currentCreatingObjectData.networkIsNew,
                    objectCaching: false
                })
                canvas.add(_line)
                canvas.add(
                    makeCircle(_line.get('x1'), _line.get('y1'), _line, 'start', height, mapDistance, currentCreatingObjectData.networkType, currentCreatingObjectData.id),
                    makeCircle(_line.get('x2'), _line.get('y2'), _line, 'end', height, mapDistance, currentCreatingObjectData.networkType, currentCreatingObjectData.id)
                )
                //canvas.moveTo(_line, -2)
                canvas.renderAll()
            } else if ((currentFigureType === "consumer" || currentFigureType === "supplier") && canDrawPolygon) {
                if (o.target && o.target.id === pointArray[0].id) {
                    generatePolygon(pointArray, lineArray, activeShape, activeLine, canvas, height, mapDistance, currentFigureType, finishCreateObject, currentCreatingObjectData, currentNodes)
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
                    } = addPolygonPoint(o, height, mapDistance, activeShape, canvas, activeLine, pointArray, lineArray)

                    pointArray = pointArrayBuf
                    lineArray = lineArrayBuf
                    activeLine = activeLineBuf
                    activeShape = activeShapeBuf
                }
            } else if (!canDrawLine && !canDrawPolygon) {
                const newSelectedObject = handleObjectSelection(canvas, o.target, currentSelectedObject)
                setSelectedObject(newSelectedObject)

                if (o.target != null) {
                    let objType = o.target.get('type')
                    if (objType === 'line') {
                        _curX = o.e.clientX
                        _curY = o.e.clientY
                    }
                }
            }
        }
    }

    const onMouseMove = (canvas, height, width) => (o) => {
        if (canvas) {
            if (canvas.isDragging) {
                const zoom = canvas.getZoom()
                setViewportTransform(canvas, zoom, true, o, height, width)
                canvas.lastPosX = o.e.clientX
                canvas.lastPosY = o.e.clientY
                canvas.renderAll()
            }

            if (currentFigureType === "network") {
                if (!isDown) return
                let pointer = canvas.getPointer(o)
                _line.set({'x2': pointer.x, 'y2': pointer.y})
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
    }

    const onMouseUp = (canvas, height, width) => (o) => {
        canvas.isDragging = false
        canvas.forEachObject(function (o) {
            o.setCoords();
        });

        if (currentFigureType === "network" && canDrawLine) {
            const distance = calculateLineDistance(_line, mapDistance, height)
            _line.set({distance})
            finishCreateObject(currentFigureType, currentNodes, canvas)
            _line = null
            isDown = false
            canDrawLine = false
            setObjectType("none")
        } else if ((currentFigureType === "consumer" || currentFigureType === "supplier") && canDrawPolygon && !polygonMode) {
            canDrawPolygon = false
            setObjectType("none")
        }

        saveCanvasState(canvas)
    }

    const objectMoving = (canvas, height, width) => (e) => {
        if (!e.e.altKey) {
            if (currentFigureType === "none") {
                const zoom = canvas.getZoom()
                let p = e.target

                //limitCanvasBoundary(p, height, width)

                let objType = p.get('type')
                if (objType === 'circle') {
                    connectLineToOtherLine(canvas, e, p)

                    const circleLine = canvas.getObjects().find(obj => {
                        if (obj.type === "line") return obj.id === p.id
                    })

                    const distance = calculateLineDistance(circleLine, mapDistance, height)
                    circleLine.set({distance})

                    canvas.renderAll()
                } else if (objType === 'line') {
                    let _curXm = (_curX - e.e.clientX) / zoom
                    let _curYm = (_curY - e.e.clientY) / zoom

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

                    _curX = e.e.clientX
                    _curY = e.e.clientY

                    const distance = calculateLineDistance(p, mapDistance, height)
                    p.set({distance})

                    canvas.renderAll()
                } else if (objType === 'polygon') {
                    p.circle1.set({
                        left: p.getCenterPoint().x + 2 * (height / mapDistance),
                        top: p.getCenterPoint().y
                    })

                    p.circle2.set({
                        left: p.getCenterPoint().x - 2 * (height / mapDistance),
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
        <canvas ref={canvasRef} className="canvas" id="c" height={"800"} width={"800"}/>
    </div>
}

