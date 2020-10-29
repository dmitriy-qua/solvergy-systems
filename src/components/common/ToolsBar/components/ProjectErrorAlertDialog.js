import React, {useEffect, useState} from "react";
import {createUseStyles} from "react-jss";
import {
    Button,
    Classes,
    Dialog, Icon,
    Intent,
} from "@blueprintjs/core";
import {FaInfoCircle} from "react-icons/fa";

export const ProjectErrorAlertDialog = ({setDialogIsOpened, dialogIsOpened, message, setMessage}) => {

    const styles = useStyles()

    return <Dialog
        icon={<FaInfoCircle size={16} className={"bp3-icon material-icon"}/>}
        title={<span className={styles.dialogTitle}>Project error</span>}
        autoFocus={false}
        enforceFocus={false}
        canEscapeKeyClose={false}
        canOutsideClickClose={false}
        usePortal={true}
        portalClassName={styles.portal}
        isCloseButtonShown={false}
        style={{width: 450, height: 350, borderRadius: 2}}
        isOpen={!!dialogIsOpened}
    >
        <div className={[Classes.DIALOG_BODY]} style={{overflow: "hidden", paddingRight: 4, paddingLeft: 4}}>

            <div style={{textAlign: "start"}}>
                <span className={styles.text} style={{marginTop: 10, display: "block", fontSize: 14}}>
                    {message}
                </span>
            </div>

        </div>

        <div className={Classes.DIALOG_FOOTER}>
            <div className={Classes.DIALOG_FOOTER_ACTIONS}>
                <Button intent={Intent.NONE}
                        style={{width: 90, fontFamily: "Montserrat", fontSize: 13}}
                        onClick={() => {
                            setDialogIsOpened(false)
                            setMessage("")
                        }}>
                    Ok
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
    },
    portal: {
        zIndex: 100
    }
})
