import React, {useCallback, useEffect, useRef, useState} from "react"
import {fabric} from "fabric"
import {
    fitResponsiveCanvasForAnalysis,
    handleObjectSelection,
    setMap, setMapForAnalysis, setViewportTransform,
} from "./helpers/canvas-helper"
import ResizeSensor from 'resize-sensor'
import {polygonGenerated} from "./shapes/polygon/config";
import {generateId} from "../../../../../helpers/data-helper";

let _curX, _curY
let currentSelectedObject = null
let canvasRef = null


export const CanvasForAnalysis = ({
                                      canvas,
                                      setCanvas,
                                      mapSize,
                                      setMapSize,
                                      projectId,
                                      dialogWidth,
                                      dialogHeight,
                                      polygons,
                                      mapDistance,
                                      objects
                                  }) => {

    useEffect(() => {
        if (polygons && canvas) {
            const {polygons: {polygons: polygonsArray}} = polygons
            const {height, width} = mapSize

            polygonsArray.forEach((polygon, i) => {
                const points = polygon.map(point => ({x: point[0] * width, y: point[1] * height}))
                const newPolygon = new fabric.Polygon(points, polygonGenerated(height, mapDistance, "grey"))
                const id = "analyzed_" + i

                if (objects.some(object => object.id === id)) {
                    const existingObject = objects.find(object => object.id === id)

                    if (existingObject.isCompleted) {
                        if (existingObject.objectType === "consumer") {
                            newPolygon.set({id, lockMovementY: true, lockMovementX: true, objectType: "consumer", hoverCursor: "pointer", evented: false, fill: "blue"})
                        } else {
                            newPolygon.set({id, lockMovementY: true, lockMovementX: true, objectType: "supplier", hoverCursor: "pointer", evented: false, fill: "red"})
                        }
                    } else {
                        if (existingObject.objectType === "consumer") {
                            newPolygon.set({id, lockMovementY: true, lockMovementX: true, objectType: "consumer", hoverCursor: "pointer", evented: false, stroke: "blue"})
                        } else {
                            newPolygon.set({id, lockMovementY: true, lockMovementX: true, objectType: "supplier", hoverCursor: "pointer", evented: false, stroke: "red"})
                        }
                    }
                } else {
                    newPolygon.set({id, lockMovementY: true, lockMovementX: true, objectType: null, hoverCursor: "pointer"})
                }

                canvas.add(newPolygon)
            })

            canvas.renderAll()
        }
    }, [polygons, canvas])

    useEffect(() => {

        const setContainer = async () => {
            if (canvas) {
                const {mapHeight, mapWidth} = await setMapForAnalysis(canvas, projectId, dialogWidth, dialogHeight)
                setMapSize({width: mapWidth, height: mapHeight})
                fitResponsiveCanvasForAnalysis(canvas, mapSize.height, mapSize.width, dialogWidth, dialogHeight)
            }
        }

        setContainer()
    }, [dialogWidth, dialogHeight])

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
                    //disposeRef.current();
                    disposeRef.current = undefined;
                }
            }
        }, []);
    };

    canvasRef = useFabric(async (fabricCanvas) => {

        fabricCanvas.setZoom(0.17)
        const {mapHeight, mapWidth} = await setMapForAnalysis(fabricCanvas, projectId, dialogWidth, dialogHeight)

        setMapSize({width: mapWidth, height: mapHeight})

        fitResponsiveCanvasForAnalysis(fabricCanvas, mapHeight, mapWidth, dialogWidth, dialogHeight)

        fabricCanvas.on('mouse:down', onMouseDown(fabricCanvas, mapHeight, mapWidth))
        fabricCanvas.on('mouse:move', onMouseMove(fabricCanvas, mapHeight, mapWidth))
        fabricCanvas.on('mouse:up', onMouseUp(fabricCanvas, mapHeight, mapWidth))
        fabricCanvas.on('mouse:wheel', onMouseWheel(fabricCanvas, mapHeight, mapWidth))

        setCanvas(fabricCanvas)
    })

    const onMouseDown = (canvas, height, width) => (o) => {
        if (o.button === 3) {

        } else if (o.button === 1) {
            if (o.e.altKey === true) {
                canvas.isDragging = true
                canvas.lastPosX = o.e.clientX
                canvas.lastPosY = o.e.clientY
            }

            if (o.target) {
                if (!o.target.objectType) {
                    o.target.set({stroke: "blue", objectType: "consumer"})
                    canvas.renderAll()
                } else if (o.target.objectType === "consumer") {
                    o.target.set({stroke: "red", objectType: "supplier"})
                    canvas.renderAll()
                } else if (o.target.objectType === "supplier") {
                    o.target.set({stroke: "black", objectType: null})
                    canvas.renderAll()
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
        }
    }

    const onMouseUp = (canvas, height, width) => (o) => {
        canvas.isDragging = false
        canvas.forEachObject(function (o) {
            o.setCoords();
        });
    }

    return <div className="canvas-for-analysis-container" id="div-canvas-for-analysis">
        <canvas ref={canvasRef} className="canvas" id="c" height={"800"} width={"800"}/>
    </div>
}

