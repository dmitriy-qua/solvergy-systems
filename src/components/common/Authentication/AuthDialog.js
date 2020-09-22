import React, {useState} from "react";
import {Button, Classes, Dialog, Intent} from "@blueprintjs/core";
import {createUseStyles} from "react-jss";
import {FaProjectDiagram} from 'react-icons/fa';
import {Authentication} from "../../pages/Start/components/pages/Authentication";
import {SignIn} from "./SignIn";
import {useSelector} from "react-redux";

export const AuthDialog = ({startDialog, setStartDialog}) => {

    const styles = useStyles()

    const isAuth = useSelector(state => state.auth.isAuth)

    const [login, setLogin] = useState("")
    const [password, setPassword] = useState("")

    return <Dialog
        icon={<FaProjectDiagram size={16} className={"bp3-icon material-icon"}/>}
        onClose={() => {
            setStartDialog(false)
        }}
        title={<span className={styles.dialogTitle}>{isAuth ? "Sign out" : "Sign in"}</span>}
        autoFocus={false}
        enforceFocus={false}
        canEscapeKeyClose={false}
        canOutsideClickClose={false}
        usePortal={true}
        style={{width: 310, height: 400, borderRadius: 2}}
        isOpen={startDialog}
    >
        <div className={[Classes.DIALOG_BODY]}>
            <SignIn login={login}
                    setLogin={setLogin}
                    password={password}
                    setPassword={setPassword}
                    isFromStartDialog={false}
            />
        </div>
        <div className={Classes.DIALOG_FOOTER}>
            <div className={Classes.DIALOG_FOOTER_ACTIONS}>
                <Button intent={Intent.NONE}
                        style={{width: 90, fontFamily: "Montserrat", fontSize: 13}}
                        onClick={() => {
                            setStartDialog(false)
                        }}>
                    Close
                </Button>
            </div>
        </div>
    </Dialog>
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
        fontWeight: 500,
        fontSize: 12,
        fontFamily: 'Montserrat'
    },
})

