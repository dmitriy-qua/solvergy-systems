import React from "react";
import {Classes, Intent, Overlay, ProgressBar} from "@blueprintjs/core";

export const UpdateNotification = ({isOpen, updateNotificationData = {percent: 0}}) => {
    return <Overlay isOpen={isOpen} >
        <div className={[Classes.CARD, Classes.ELEVATION_4]}
             style={{
                 position:"fixed",
                 top:"50%",
                 left:"50%",
                 transform:"translate(-50%, -50%)",
                 width: 400,
                 height: 150,
                 display: "flex",
                 flexDirection: "column",
                 justifyContent: "center",
                 alignItems: "center"
             }}>

            <p style={{fontFamily: "Montserrat", fontWeight: 600, paddingBottom: 10}}>A new update is available. Please wait...</p>

            <p style={{fontFamily: "Montserrat", fontWeight: 400, paddingBottom: 10, marginTop: 10, fontSize: 12}}>Downloading: <b>{updateNotificationData.percent.toFixed(2)} %</b></p>

            <ProgressBar intent={Intent.SUCCESS} value={updateNotificationData.percent / 100}/>
        </div>
    </Overlay>
}