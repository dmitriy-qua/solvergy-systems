import React from "react";
import {Classes, Intent, Overlay, ProgressBar} from "@blueprintjs/core";

export const UpdateNotification = ({isOpen}) => {
    return <Overlay isOpen={isOpen} >
        <div className={[Classes.CARD, Classes.ELEVATION_4]}
             style={{
                 position:"fixed",
                 top:"50%",
                 left:"50%",
                 transform:"translate(-50%, -50%)",
                 width: 400,
                 height: 100,
                 display: "flex",
                 flexDirection: "column",
                 justifyContent: "center",
                 alignItems: "center"
             }}>

            <p style={{fontFamily: "Montserrat", fontWeight: 600, paddingBottom: 10}}>A new update is available. Downloading now...</p>

            <ProgressBar intent={Intent.PRIMARY}/>
        </div>
    </Overlay>
}