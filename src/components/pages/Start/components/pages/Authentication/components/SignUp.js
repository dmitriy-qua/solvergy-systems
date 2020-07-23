import React from "react";
import {createUseStyles} from "react-jss";
import {AuthForm} from "./AuthForm";

export const SignUp = ({setIsSignInPage}) => {

    const styles = useStyles()

    return <div>
        <p className={styles.dialogText}>
            Sign up:
        </p>

        <AuthForm/>

        <p className={styles.authRoute}>
            Back to <span className={styles.authRouteLink} onClick={() => setIsSignInPage(true)}>Sign In</span>.
        </p>
    </div>
}

const useStyles = createUseStyles({
    dialogText: {
        fontWeight: 600,
        fontSize: 13,
        fontFamily: 'Montserrat',
        marginBottom: 20
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