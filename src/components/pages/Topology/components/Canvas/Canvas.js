import React, {useCallback, useEffect, useMemo, useRef, useState} from "react"
import {ContextMenu, Menu, MenuDivider, MenuItem} from "@blueprintjs/core";
import {fabric} from "fabric"
import {lineGenerated} from "./shapes/line/config"
import {
    addPolygonPoint, calculateLineDistance,
    connectLineToOtherLine, fitResponsiveCanvas,
    generatePolygon, handleObjectSelection,
    limitCanvasBoundary, makeCircle, moveLineObject,
    removeGrid,
    setGrid, setMap, setViewportTransform,
} from "./helpers/canvas-helper"
import {generateId} from "../../../../../helpers/data-helper"
import {lineCircle} from "./shapes/circle/config"
import {useDispatch, useSelector} from "react-redux"
import ResizeSensor from 'resize-sensor'
import {ObjectContextMenu} from "../../../../common/ContextMenu/ObjectContextMenu";
import {saveProject, setCanvasState} from "../../../../../redux/actions/project";
import {NotCompletedObjectContextMenu} from "../../../../common/ContextMenu/NotCompletedObjectContextMenu";
import $ from 'jquery'
import {setProjectIsLoading} from "../../../../../redux/actions/auth";

//let MAP_HEIGHT = 2000, MAP_WIDTH = 2000

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
let inspectionMode = null

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
                           saveCanvasState,
                           isInspectionMode,
                           deleteNotCompletedObject,
                           completeObject,
                           saveState
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
        inspectionMode = isInspectionMode
    }, [isInspectionMode])

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
            saveCanvasState(canvas)
            //saveState()
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

    const onMouseOver = (canvas) => (opt) => {
        if (inspectionMode && opt.target && opt.target.type === "line") {
            const currentObject = currentObjects.networks.find(network => network.id === opt.target.id)
            const existingTooltip = canvas.getObjects().filter(obj => obj.id === "tooltip")

            if (existingTooltip.length === 0) {
                let pointer = canvas.getPointer(opt)

                const networkInfo = `Name: ${currentObject.name}\nNetwork type: ${currentObject.networkType}\nNetwork is new: ${currentObject.networkIsNew ? "Yes" : "No"}`

                const tooltip = new fabric.Text(networkInfo, {
                    left: pointer.x + 5,
                    top: pointer.y,
                    fill: 'grey',
                    fontSize: 4,
                    padding: 4,
                    fontFamily: "Montserrat",
                    borderColor: "grey",
                    hasBorder: false,
                    hasControls: false,
                    selectionBackgroundColor: "white",
                    evented: false,
                    id: "tooltip",
                })

                canvas.add(tooltip)
                canvas.setActiveObject(tooltip);
                canvas.renderAll()

            }
        }
    }

    const onMouseOut = (canvas) => (opt) => {
        if (inspectionMode) {
            const tooltip = canvas.getObjects().find(obj => obj.id === "tooltip")
            canvas.remove(tooltip)
            canvas.renderAll()
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
                fabricRef.current.clear()
                fabricRef.current.dispose()
                $(fabricRef.current.wrapperEl).remove()
                setCanvas(null)

                if (disposeRef.current) {
                    disposeRef.current = undefined;
                }
            }
        }, []);
    };

    canvasRef = useFabric(async (fabricCanvas) => {
        //fabricCanvas.loadFromJSON(canvasState)
        dispatch(setProjectIsLoading(true))
        fabricCanvas.setZoom(0.25)
        const {mapHeight, mapWidth} = await setMap(fabricCanvas, project.id)

        setMapSize({width: mapWidth, height: mapHeight})

        new ResizeSensor(document.getElementById('div-canvas'), function () {
            fitResponsiveCanvas(fabricCanvas, mapHeight, mapWidth)
        });

        const canvasState = fabricCanvas.toJSON(["circle1", "circle2", "objectType", "id", "networkType", "distance", "name", "connectedTo", "networkIsNew", "isCompleted"])

        fabricCanvas.on('mouse:down', onMouseDown(fabricCanvas, mapHeight, mapWidth))
        fabricCanvas.on('mouse:move', onMouseMove(fabricCanvas, mapHeight, mapWidth))
        fabricCanvas.on('mouse:up', onMouseUp(fabricCanvas, mapHeight, mapWidth))
        fabricCanvas.on('object:moving', objectMoving(fabricCanvas, mapHeight, mapWidth))
        fabricCanvas.on('mouse:wheel', onMouseWheel(fabricCanvas, mapHeight, mapWidth))
        fabricCanvas.on('mouse:over', onMouseOver(fabricCanvas))
        fabricCanvas.on('mouse:out', onMouseOut(fabricCanvas))

        saveCanvasState(fabricCanvas)
        setCanvas(fabricCanvas)

        dispatch(saveProject({...project, canvas: canvasState}))
        dispatch(setProjectIsLoading(false))
    })

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
        setSelectedObject(o.target)
        canvas.renderAll()

        if (o.target && (o.target.type === "polygon" || o.target.type === "line")) {
            if (o.target.isCompleted) {
                ContextMenu.show(
                    <ObjectContextMenu selectedObject={o.target} deleteObject={deleteObject} objects={currentObjects}
                                       nodes={currentNodes} editObject={editObject} canvas={canvas} isInspectionMode={inspectionMode}/>,
                    {left: o.e.clientX, top: o.e.clientY}
                )
            } else {
                ContextMenu.show(
                    <NotCompletedObjectContextMenu selectedObject={o.target} deleteObject={deleteNotCompletedObject} completeObject={completeObject} canvas={canvas}/>,
                    {left: o.e.clientX, top: o.e.clientY}
                )
            }
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
                    objectCaching: false,
                    isCompleted: true
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

                    const _cur = moveLineObject(e, p, canvas, _curXm, _curYm, mapDistance, height)

                    _curX = _cur._curX
                    _curY = _cur._curY
                }

                saveCanvasState(canvas)
            }
        }
    }

    return <div className="canvas-container" id="div-canvas">
        <canvas ref={canvasRef} className="canvas" id="c" height={"800"} width={"800"}/>
    </div>
}

