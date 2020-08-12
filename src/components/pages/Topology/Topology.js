import React, {useState} from "react";
import {ReflexContainer, ReflexElement, ReflexSplitter} from "react-reflex";
import {Canvas} from "./components/Canvas/Canvas";
import {ObjectsTree} from "./components/Canvas/components/ObjectsTree";
import {Position, Toast, Toaster} from "@blueprintjs/core";


export const Topology = ({
                             objectType,
                             gridIsVisible,
                             mapDistance,
                             nodes,
                             setObjectType,
                             finishCreateObject,
                             toasts,
                             setToaster,
                             setSelectedObject,
                             getSelectedNode,
                             setObjectToDelete,
                             objectToDelete,
                             selectedObject,
                             deleteObject,
                             objects,
                             editObject,
                             creatingObjectData,
                             loadedProject,
                             canvas,
                             setCanvas,
                             canvasHistory,
                             setCanvasHistory,
                             canvasState,
                             setCanvasState,
                             mapSize,
                             setMapSize,
                         }) => {

    const [treeWidth, setTreeWidth] = useState(250)

    return <ReflexContainer orientation="vertical" windowResizeAware={true}>
        <ReflexElement className="middle-pane" style={{overflow: "hidden"}}>
            <div className="pane-content">
                <Canvas objectType={objectType}
                        gridIsVisible={gridIsVisible}
                        map_Distance={mapDistance}
                        setObjectType={setObjectType}
                        finishCreateObject={finishCreateObject}
                        setSelectedObject={setSelectedObject}
                        setObjectToDelete={setObjectToDelete}
                        objectToDelete={objectToDelete}
                        selectedObject={selectedObject}
                        deleteObject={deleteObject}
                        nodes={nodes}
                        editObject={editObject}
                        creatingObjectData={creatingObjectData}
                        loadedProject={loadedProject}
                        canvas={canvas}
                        setCanvas={setCanvas}
                        mapSize={mapSize}
                        setMapSize={setMapSize}
                />
                <Toaster position={Position.BOTTOM} ref={ref => setToaster(ref)} maxToasts={2}>
                    {toasts.map(toast => <Toast {...toast} />)}
                </Toaster>
            </div>
        </ReflexElement>

        <ReflexSplitter style={{backgroundColor: "#eceff1", width: 4, border: 0, zIndex: 0}}/>

        <ReflexElement className="right-pane"
                       minSize="220"
                       maxSize="350"
                       size={treeWidth}
                       onStopResize={({domElement}) => setTreeWidth(domElement.offsetWidth)}
        >
            <div className="pane-content">
                <ObjectsTree nodes={nodes}
                             canvas={canvas}
                             getSelectedNode={getSelectedNode}

                />
            </div>
        </ReflexElement>
    </ReflexContainer>
}
