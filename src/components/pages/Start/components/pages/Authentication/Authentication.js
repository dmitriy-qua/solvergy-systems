import React, {useState} from "react";
import {SignIn} from "./components/SignIn";
import {SignUp} from "./components/SignUp";

export const Authentication = ({hasError, setHasError}) => {

    const [isSignInPage, setIsSignInPage] = useState(true)

    return <div className="start-block">
        {isSignInPage ?
            <SignIn setIsSignInPage={setIsSignInPage}/>
            :
            <SignUp setIsSignInPage={setIsSignInPage}/>
        }
    </div>
}
