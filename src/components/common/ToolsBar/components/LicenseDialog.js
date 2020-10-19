import React, {useEffect, useState} from "react";
import {createUseStyles} from "react-jss";
import {
    Button,
    Classes,
    Dialog, Icon,
    Intent,
} from "@blueprintjs/core";
import {FaInfoCircle} from "react-icons/fa";
import {useDispatch, useSelector} from "react-redux";
import {getUserInfo} from "../../../../redux/actions/auth";

const { shell } = window.require('electron').remote

export const LicenseDialog = ({setDialogIsOpened, dialogIsOpened}) => {

    const styles = useStyles()

    const dispatch = useDispatch()

    const user = useSelector(state => state.auth.user)

    useEffect(() => {
        if (dialogIsOpened) dispatch(getUserInfo())
    }, [dialogIsOpened])

    return <Dialog
        icon={<FaInfoCircle size={16} className={"bp3-icon material-icon"}/>}
        onClose={() => {
            setDialogIsOpened(null)
        }}
        title={<span className={styles.dialogTitle}>License</span>}
        autoFocus={false}
        enforceFocus={false}
        canEscapeKeyClose={false}
        canOutsideClickClose={false}
        usePortal={true}
        style={{width: 480, height: 610, borderRadius: 2}}
        isOpen={!!dialogIsOpened}
    >
        <div className={[Classes.DIALOG_BODY]} style={{overflow: "hidden", paddingRight: 4, paddingLeft: 4}}>

            <div style={{padding: 10, paddingBottom: 6}}>
                {user && user.systemsLicense && <>
                    <p className={styles.text}>
                        Your current pricing plan: <b>{user.systemsLicense.pricingPlan.planName}</b>.
                    </p>

                    {user.systemsLicense.pricingPlan.planName !== "Free" && <>
                        {(new Date(user.systemsLicense.until)) < (new Date()) ?
                            <p style={{fontSize: 22, color: "#b41416", marginTop: 20, padding: 10}}>
                                <Icon icon={"disable"} style={{position: "relative", top: -5}}/> License is expired.
                            </p>
                            :
                            <p style={{fontSize: 22, color: "#33b424", marginTop: 20, padding: 10}}>
                                <Icon icon={"confirm"} style={{position: "relative", top: -5}}/> License is active.
                            </p>
                        }

                    </>}

                    {user.systemsLicense.pricingPlan.planName !== "Free" && <div style={{marginTop: 20}}>
                        <p className={styles.text}>
                            From: <b>{(new Date(user.systemsLicense.from)).toLocaleDateString(undefined, {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric'
                        })}</b>, until: <b>{(new Date(user.systemsLicense.until)).toLocaleDateString(undefined, {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric'
                        })}</b>.
                        </p>
                        <p className={styles.text}>
                            Monthly price: <b>$ {user.systemsLicense.pricingPlan.monthlyPrice}</b>.
                        </p>
                        <p className={styles.text}>
                            Annual price: <b>$ {user.systemsLicense.pricingPlan.annualPrice}</b>.
                        </p>
                    </div>}
                    <br/>

                    <p className={styles.text}>
                        Pricing plan features:
                    </p>
                    <ul style={{listStyle: "none"}}>
                        {user.systemsLicense.pricingPlan.features.map(({name, isAvailable}, i) => {
                            return <li className={styles.text} key={i} style={{color: isAvailable ? "#43913b" : "#8b8b8b", fontSize: 13}}>{isAvailable ?
                                <Icon icon={"small-tick"}/> : <Icon icon={"small-cross"}/>} {name}</li>
                        })}
                    </ul>


                </>}
                <br/>
                <p className={styles.text}>
                    Visit <b>Solvergy</b> website to manage your license.
                </p>

                <Button intent={Intent.PRIMARY}
                        style={{width: 180, fontFamily: "Montserrat", fontSize: 14, fontWeight: 700, padding: 2, marginTop: 6}}
                        onClick={() => shell.openExternal('https://solvergy.org')}>
                    Go to solvergy.org
                </Button>
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
