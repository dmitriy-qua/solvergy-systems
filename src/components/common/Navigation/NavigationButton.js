import React from "react";
import { Icon } from "@blueprintjs/core";
import {createUseStyles} from "react-jss";
import {useHistory} from "react-router-dom";

export const NavigationButton = ({currentPage, setCurrentPage, pageName, pageNumber, label, icon, disabled = false}) => {

    const styles = useStyles({currentPage, pageName, pageNumber})

    const history = useHistory()

    return <div onClick={() => {
        if (!disabled) {
            history.push("/" + pageName);
            setCurrentPage(pageName)
        }
    }} className={disabled ? styles.disabledNavigationButton : styles.navigationButton}>
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
        //borderBottom: "1px solid #efefef",
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
    disabledNavigationButton: {
        width: "100%",
        color: "#b2b2b2",
        height: 110,
        borderRadius: 0,
        //borderBottom: "1px solid #efefef",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fbfbfb",
    },
    text: {
        marginTop: 12,
        fontWeight: 600,
        fontSize: 12,
        fontFamily: "Montserrat"
    }
})
