import React, {useState} from "react";
import {createUseStyles} from "react-jss";
import {AuthForm} from "./AuthForm";
import {Button, Intent} from "@blueprintjs/core";
import {useDispatch, useSelector} from "react-redux";
import {logout, signIn, signUp} from "../../../redux/actions/auth";

export const SignIn = ({login, setLogin, password, setPassword, isFromStartDialog}) => {

    const user = useSelector(state => state.auth.user)
    const isAuth = useSelector(state => state.auth.isAuth)

    const [isSignInPage, setIsSignInPage] = useState(true)

    const styles = useStyles()

    const dispatch = useDispatch()


    if (!isAuth) {
        return <div>
            <p className={styles.dialogText}>
                {isSignInPage ?
                    "Sign in to be able to save the progress of your projects:"
                    :
                    "Sign up:"
                }
            </p>

            <AuthForm login={login}
                      setLogin={setLogin}
                      password={password}
                      setPassword={setPassword}/>

            <p className={styles.authRoute}>
                {isSignInPage ?
                    <span>Don't have an account? <span className={styles.authRouteLink}
                                                       onClick={() => {
                                                           setLogin("")
                                                           setPassword("")
                                                           setIsSignInPage(false)
                                                       }}>Sign Up</span>.</span>
                    :
                    <span>Back to <span className={styles.authRouteLink}
                                        onClick={() => {
                                            setLogin("")
                                            setPassword("")
                                            setIsSignInPage(true)
                                        }}>Sign In</span>.</span>
                }

            </p>
            <Button className={styles.button}
                    intent={Intent.SUCCESS}
                    onClick={() => isSignInPage ? dispatch(signIn({login, password})) : dispatch(signUp({login, password}))}
                    text={isSignInPage ? "Sign in" : "Sign up"}/>
        </div>
    } else {
        return <div>
            {isFromStartDialog ?
                <p className={styles.infoText}>
                    You logged in as <span className={styles.infoName}>{user.login}</span>. Please, click next button.
                </p>
                :
                <p className={styles.infoText}>
                    You logged in as <span className={styles.infoName}>{user.login}</span>.
                </p>
            }

            <br/>
            <p className={styles.infoText}>
                Logout to change user.
            </p>
            <Button className={styles.button}
                    intent={Intent.DANGER}
                    onClick={() => {
                        setLogin("")
                        setPassword("")
                        setIsSignInPage(true)
                        dispatch(logout())
                    }}
                    text={"Logout"}/>
        </div>
    }

}

const useStyles = createUseStyles({
    dialogText: {
        fontWeight: 600,
        fontSize: 13,
        fontFamily: 'Montserrat',
        marginBottom: 20,
        height: 26
    },
    infoText: {
        fontWeight: 500,
        fontSize: 13,
        fontFamily: 'Montserrat',
    },
    infoName: {
        fontWeight: 700,
        fontSize: 13,
        fontFamily: 'Montserrat',
    },
    button: {
        marginTop: 8,
        fontWeight: 500,
        fontSize: 13,
        fontFamily: 'Montserrat',
    },
    authRoute: {
        fontWeight: 500,
        fontSize: 12,
        fontFamily: 'Montserrat',
        marginTop: 20
    },
    authRouteLink: {
        cursor: "pointer",
        color: "#6f7c8e"
    }
})