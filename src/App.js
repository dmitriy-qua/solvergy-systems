import React, {useEffect, useState} from 'react';
import './App.css';
import {Canvas} from "./components/Canvas/Canvas";
import $ from "jquery";

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

        <Canvas figureType={figureType}/>
    </div>
}

export default App;
