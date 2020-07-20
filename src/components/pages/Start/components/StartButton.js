import React from "react";
import {Icon} from "@blueprintjs/core";
import {createUseStyles} from "react-jss";
import MaterialIcon from '@mdi/react';

export const StartButton = ({action, icon, label, description}) => {

    const styles = useStyles()

    return <div onClick={() => action()} className={styles.startButton}>
        <Icon icon={<MaterialIcon path={icon} size={1}/>}/>
        <span className={styles.text}>{label}</span>
        <span className={styles.descriptionText}>{description}</span>
    </div>
}

const useStyles = createUseStyles({
    startButton: {
        color: "#5c7080",
        width: 160,
        height: 160,
        borderRadius: 0,
        margin: 20,
        padding: 12,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
        //boxShadow: "0px 0px 2px rgb(232, 232, 232)",
        '&:hover': {
            backgroundColor: "#eceff1",
        },
    },
    text: {
        marginTop: 12,
        fontWeight: 600,
        fontSize: 14,
        fontFamily: "Montserrat"
    },
    descriptionText: {
        marginTop: 10,
        fontWeight: 400,
        fontSize: 10,
        fontFamily: "Montserrat",
        textAlign: "center",
    }
})