import React from "react";
import {StartButton} from "./components/StartButton";
import {mdiPlusBoxOutline, mdiFolderOutline, mdiHelpCircleOutline, mdiLoginVariant} from "@mdi/js";


export const Start = ({setProject}) => {

    return <div className="start">
        <StartButton action={() => setProject(true)}
                     icon={mdiPlusBoxOutline}
                     label="Create project..."
                     description={"Start new project, upload the map and set scale distance"}/>
        <StartButton action={() => {
        }}
                     icon={mdiFolderOutline}
                     label="Open project..."
                     description={"Open a previously saved project and continue working"}/>
        <StartButton action={() => {
        }}
                     icon={mdiLoginVariant}
                     label="Sign in"
                     description={"You must be logged in to be able to save projects"}/>
        <StartButton action={() => {
        }}
                     icon={mdiHelpCircleOutline}
                     label="Help"
                     description={"Learn how to create projects in Solvergy: Systems"}/>
    </div>
}
