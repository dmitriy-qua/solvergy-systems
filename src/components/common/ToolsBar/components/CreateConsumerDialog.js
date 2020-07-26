import React, {useState} from "react";
import {Button, Classes, Dialog, Intent} from "@blueprintjs/core";
import {createUseStyles} from "react-jss";
import {FaProjectDiagram} from 'react-icons/fa';
import {useDispatch, useSelector} from "react-redux";


export const CreateConsumerDialog = ({dialogIsOpened, setDialogIsOpened, createConsumer}) => {

    const styles = useStyles()

    const dispatch = useDispatch()


    return <Dialog
        icon={<FaProjectDiagram size={16} className={"bp3-icon material-icon"}/>}
        onClose={() => {
            setDialogIsOpened(false)
        }}
        title={<span className={styles.dialogTitle}>Set initial project information</span>}
        autoFocus={false}
        enforceFocus={false}
        canEscapeKeyClose={false}
        canOutsideClickClose={false}
        usePortal={true}
        style={{width: 650, height: 550, borderRadius: 2}}
        isOpen={dialogIsOpened}
    >
        <div className={[Classes.DIALOG_BODY]}>

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
                <Button disabled={false}
                        style={{width: 90, fontFamily: "Montserrat", fontSize: 13}}
                        text={"Create"}
                        intent={Intent.SUCCESS}
                        onClick={() => {

                        }}>
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

