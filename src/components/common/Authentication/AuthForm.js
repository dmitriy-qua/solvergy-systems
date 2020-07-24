import {FormGroup, InputGroup, Intent} from "@blueprintjs/core";
import React, {useState} from "react";
import {LockButton} from "./LockButton";
import {createUseStyles} from "react-jss";

export const AuthForm = ({login, setLogin, password, setPassword}) => {

    const styles = useStyles()

    const [loginHasError, setLoginHasError] = useState(false)
    const [passwordHasError, setPasswordHasError] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    return <div>
        <FormGroup
            disabled={false}
            helperText={loginHasError && "Please enter login..."}
            intent={loginHasError ? Intent.DANGER : Intent.NONE}
            label={"Login: "}
            labelFor="login"
            style={{width: 270}}
            className={styles.labelText}
        >
            <InputGroup id="login"
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
            labelFor="password"
            style={{width: 270}}
            className={styles.labelText}
        >
            <InputGroup id="password"
                        placeholder="Enter password"
                        className={styles.labelText}
                        intent={passwordHasError ? Intent.DANGER : Intent.NONE}
                        value={password}
                        type={showPassword ? "text" : "password"}
                        leftIcon={"key"}
                        rightElement={<LockButton showPassword={showPassword} setShowPassword={setShowPassword}/>}
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