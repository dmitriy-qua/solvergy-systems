import React, {useEffect, useState} from 'react'
import './App.css'
import {Canvas} from "./components/Canvas/Canvas"
import $ from "jquery"
import {
    ReflexContainer,
    ReflexSplitter,
    ReflexElement
} from 'react-reflex'


function App() {

    const [figureType, setFigureType] = useState("none")

    useEffect(() => {
        $(document).ready(() => {
            $("input[type='radio']").click(function () {
                const newFigureType = $("input[name='figure']:checked").val()
                setFigureType(newFigureType)
            });
        });
    }, [])

    return <div className="App">

        <ReflexContainer orientation="vertical">
            <ReflexElement className="left-pane" size={"300"}>
                <div className="pane-content">
                        <input type="radio" id="contactChoice1"
                               name="figure" value="line"/>
                        <label htmlFor="contactChoice1">Line</label>
                        <input type="radio" id="contactChoice2"
                               name="figure" value="polygon"/>
                        <label htmlFor="contactChoice2">Polygon</label>
                        <input type="radio" id="contactChoice3"
                               name="figure" value="none"/>
                        <label htmlFor="contactChoice3">None</label>
                </div>
            </ReflexElement>

            <ReflexSplitter style={{width: 3}}/>

            <ReflexElement className="right-pane"
                           minSize="200"
                           >
                <div className="pane-content">
                    <Canvas figureType={figureType}/>
                </div>
            </ReflexElement>

        </ReflexContainer>

    </div>
}

export default App;
