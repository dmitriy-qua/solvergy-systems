import React, {useState} from "react";
import {StartButton} from "./components/StartButton";
import {mdiPlusBoxOutline, mdiFolderOutline, mdiHelpCircleOutline, mdiLoginVariant} from "@mdi/js";
import {StartDialog} from "./components/StartDialog";


export const Start = ({setProject}) => {

    const [startDialog, setStartDialog] = useState(false)

    return <div className="start">
        <StartButton action={() => setStartDialog(true)}
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

        <StartDialog startDialog={startDialog}
                     setStartDialog={setStartDialog}
        />
    </div>
}
