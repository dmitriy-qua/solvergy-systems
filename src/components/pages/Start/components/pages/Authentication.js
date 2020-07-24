import React, {useState} from "react";
import {SignIn} from "../../../../common/Authentication/SignIn";


export const Authentication = ({hasError, setHasError}) => {

    return <div className="start-block">
        <SignIn/>
    </div>
}
