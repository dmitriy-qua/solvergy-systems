import React, {useState} from "react";
import {SignIn} from "../../../../common/Authentication/SignIn";


export const Authentication = ({login, setLogin, password, setPassword}) => {

    return <div className="start-block">
        <SignIn login={login}
                setLogin={setLogin}
                password={password}
                setPassword={setPassword}
        />
    </div>
}
