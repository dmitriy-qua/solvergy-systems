import React, {useState} from "react";
import {FormGroup, InputGroup, Intent, Tooltip, Button} from "@blueprintjs/core";
import {createUseStyles} from "react-jss";

export const Authentication = ({hasError, setHasError}) => {

    const styles = useStyles()

    const [loginHasError, setLoginHasError] = useState(false)
    const [passwordHasError, setPasswordHasError] = useState(false)
    const [login, setLogin] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)

    const lockButton = (
        <Tooltip content={`${showPassword ? "Hide" : "Show"} Password`}>
            <Button
                icon={showPassword ? "unlock" : "lock"}
                intent={Intent.WARNING}
                minimal={true}
                onClick={() => setShowPassword(prevState => !prevState)}
            />
        </Tooltip>
    );

    return <div className="start-block">
        <p className={styles.dialogText}>
            Sign in to be able to save the progress of your projects:
        </p>
        <FormGroup
            disabled={false}
            helperText={loginHasError && "Please enter login..."}
            intent={loginHasError ? Intent.DANGER : Intent.NONE}
            label={"Login: "}
            labelFor="text-input"
            labelInfo={"(required)"}
            style={{width: 270}}
            className={styles.labelText}
        >
            <InputGroup id="text-input"
                        placeholder="Enter login"
                        className={styles.labelText}
                        intent={loginHasError ? Intent.DANGER : Intent.NONE}
                        value={login}
                        type={"text"}
                        leftIcon={"user"}

                        onChange={e => {
                            setLoginHasError(false)
                            setLogin(e.target.value)
                            if (!e.target.value) {
                                setLoginHasError(true)
                            }
                        }}
            />
        </FormGroup>
        <FormGroup
            disabled={false}
            helperText={passwordHasError && "Please enter password..."}
            intent={passwordHasError ? Intent.DANGER : Intent.NONE}
            label={"Password: "}
            labelFor="text-input"
            labelInfo={"(required)"}
            style={{width: 270}}
            className={styles.labelText}
        >
            <InputGroup id="text-input"
                        placeholder="Enter password"
                        className={styles.labelText}
                        intent={passwordHasError ? Intent.DANGER : Intent.NONE}
                        value={password}
                        type={showPassword ? "text" : "password"}
                        leftIcon={"key"}
                        rightElement={lockButton}

                        onChange={e => {
                            setPasswordHasError(false)
                            setPassword(e.target.value)
                            if (!e.target.value) {
                                setPasswordHasError(true)
                            }
                        }}
            />
        </FormGroup>
    </div>
}

const useStyles = createUseStyles({
    text: {
        marginTop: 12,
        fontWeight: 600,
        fontSize: 13,
        fontFamily: "Montserrat"
    },
    dialogTitle: {
        fontWeight: 600,
        fontSize: 15,
        fontFamily: 'Montserrat'
    },
    dialogText: {
        fontWeight: 600,
        fontSize: 13,
        fontFamily: 'Montserrat',
        marginBottom: 20
    },
    labelText: {
        fontWeight: 500,
        fontSize: 11,
        fontFamily: 'Montserrat'
    },
})