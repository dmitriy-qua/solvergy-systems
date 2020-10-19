import React, {useEffect, useState} from "react";
import {createUseStyles} from "react-jss";
import {
    Button,
    Classes,
    Dialog, Icon,
    Intent,
} from "@blueprintjs/core";
import {FaInfoCircle} from "react-icons/fa";

const { ipcRenderer } = window.require('electron')

export const InfoDialog = ({setDialogIsOpened, dialogIsOpened}) => {

    const styles = useStyles()

    const [version, setVersion] = useState(null)

    useEffect(() => {
        if (dialogIsOpened) {
            ipcRenderer.send('app_version')
            ipcRenderer.on('app_version', (event, arg) => {
                ipcRenderer.removeAllListeners('app_version')
                setVersion(arg.version)
            })
        }
    }, [dialogIsOpened])

    return <Dialog
        icon={<FaInfoCircle size={16} className={"bp3-icon material-icon"}/>}
        onClose={() => {
            setDialogIsOpened(null)
        }}
        title={<span className={styles.dialogTitle}>About Solvergy: Systems</span>}
        autoFocus={false}
        enforceFocus={false}
        canEscapeKeyClose={false}
        canOutsideClickClose={false}
        usePortal={true}
        style={{width: 350, height: 380, borderRadius: 2}}
        isOpen={!!dialogIsOpened}
    >
        <div className={[Classes.DIALOG_BODY]} style={{overflow: "hidden", paddingRight: 4, paddingLeft: 4}}>

            <div style={{textAlign: "start"}}>
                <img src={require("../../../../assets/images/solvergy-systems-logo.png")} style={{borderRadius: 4, width: 48}}/>
                <span className={styles.text} style={{marginTop: 10, display: "block"}}><b>Solvergy: Systems</b> software</span>
                <span className={styles.text} style={{marginTop: 10, display: "block"}}>Version: <b>{version}</b></span>
                <span className={styles.text} style={{marginTop: 30, display: "block", fontSize: 13}}>© Copyright 2020 Solvergy.</span>
                <span className={styles.text} style={{marginTop: 10, display: "block", fontSize: 13}}>All rights reserved.</span>
                <span className={styles.text} style={{display: "block", marginTop: 20, fontSize: 13}}>Contact: <ins>help@solvergy.org</ins></span>
            </div>


        </div>

        <div className={Classes.DIALOG_FOOTER}>
            <div className={Classes.DIALOG_FOOTER_ACTIONS}>
                <Button intent={Intent.NONE}
                        style={{width: 90, fontFamily: "Montserrat", fontSize: 13}}
                        onClick={() => {
                            setDialogIsOpened(false)
                        }}>
                    Close
                </Button>
            </div>
        </div>
    </Dialog>

}

const useStyles = createUseStyles({
    text: {
        //paddingLeft: -16,
        fontWeight: 500,
        fontSize: 14,
        fontFamily: "Montserrat"
    },
    bold: {
        fontWeight: 700,
    },
    projectInfo: {
        marginLeft: 10,
        fontWeight: 500,
        fontSize: 12,
        fontFamily: "Montserrat"
    },
    switchTextContainer: {
        lineHeight: 1.5,
        display: "inline-block",
        // justifyContent: "center",
        // alignItems: "center",
        // verticalAlign: "middle"
    },
    selectText: {
        fontWeight: 500,
        fontSize: 13,
        fontFamily: "Montserrat"
    },
    errorText: {
        marginLeft: 0,
        marginTop: 8,
        fontWeight: 500,
        color: "#c23030",
        fontSize: 10,
        fontFamily: "Montserrat",
        display: "block"
    },
    dialogTitle: {
        fontWeight: 600,
        fontSize: 14,
        marginLeft: 10,
        marginTop: 10,
        fontFamily: 'Montserrat'
    },
    dialogText: {
        fontWeight: 400,
        fontSize: 12,
        marginLeft: 10,
        marginRight: 10,
        fontFamily: 'Montserrat',
    },
    listText: {
        fontWeight: 600,
        fontSize: 13,
        fontFamily: 'Montserrat',
        color: "#444444",
    },
    indicatorText: {
        fontWeight: 600,
        fontSize: 16,
        fontFamily: 'Montserrat',
    },
    divider: {
        border: 0,
        height: 0,
        borderTop: "1px solid rgba(0, 0, 0, 0.1)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.3)"
    }
})
