import React, {useState} from "react";
import {ReflexContainer, ReflexElement, ReflexSplitter} from "react-reflex";
import {Canvas} from "./components/Canvas/Canvas";
import {ObjectsTree} from "./components/Canvas/components/ObjectsTree";


export const Topology = ({objectType, gridIsVisible, mapDistance, nodes, setNodes, setObjectType, finishCreateObject}) => {

    const [treeWidth, setTreeWidth] = useState(250)

    return <ReflexContainer orientation="vertical" windowResizeAware={true}>
        <ReflexElement className="middle-pane" style={{overflow: "hidden"}}>
            <div className="pane-content">
                <Canvas objectType={objectType}
                        gridIsVisible={gridIsVisible}
                        map_Distance={mapDistance}
                        setObjectType={setObjectType}
                        finishCreateObject={finishCreateObject}
                />
            </div>
        </ReflexElement>

        <ReflexSplitter style={{backgroundColor: "#eceff1", width: 4, border: 0, zIndex: 0}}
        />

        <ReflexElement className="right-pane"
                       minSize="230"
                       maxSize="350"
                       size={treeWidth}
                       onStopResize={({domElement}) => setTreeWidth(domElement.offsetWidth)}
        >
            <div className="pane-content">
                <ObjectsTree nodes={nodes}
                             setNodes={setNodes}
                />
            </div>
        </ReflexElement>
    </ReflexContainer>
}
