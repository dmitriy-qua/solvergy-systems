import React from "react";
import { Icon } from "@blueprintjs/core";
import {createUseStyles} from "react-jss";

export const NavigationButton = ({currentPage, setCurrentPage, pageName, label, icon}) => {

    const styles = useStyles({currentPage, pageName})

    return <div onClick={() => setCurrentPage(pageName)} className={styles.navigationButton}>
        <Icon icon={icon} iconSize={16}/>
        <span className={styles.text}>{label}</span>
    </div>
}

const useStyles = createUseStyles({
    navigationButton: {
        width: "100%",
        color: "#5c7080",
        height: 110,
        borderRadius: 0,
        borderBottom: "1px solid #efefef",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
        '&:hover': {
            backgroundColor: "#eceff1",
        },
        backgroundColor: props => props.currentPage === props.pageName ? "#eceff1" : "white",
    },
    text: {
        marginTop: 12,
        fontWeight: 600,
        fontSize: 12,
        fontFamily: "Montserrat"
    }
})
