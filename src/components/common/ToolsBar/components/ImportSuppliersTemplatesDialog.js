import React, {useEffect, useState} from "react";
import {createUseStyles} from "react-jss";
import {
    Button,
    Classes,
    Dialog, Icon,
    Intent, MenuItem,
} from "@blueprintjs/core";
import {GiTeePipe} from "react-icons/gi";
import {Select} from "@blueprintjs/select";
import {generateId} from "../../../../helpers/data-helper";
import {useDispatch, useSelector} from "react-redux";
import {getUserProjects} from "../../../../redux/actions/auth";
import {addNewNetworkTemplate, addNewSupplierTemplate} from "../../../../redux/actions/project";


export const ImportSuppliersTemplatesDialog = ({setDialogIsOpened, dialogIsOpened}) => {

    const styles = useStyles()

    const dispatch = useDispatch()

    const userProjects = useSelector(state => state.auth.userProjects)
    const project = useSelector(state => state.project)

    const [selectedUserDataItem, setSelectedUserDataItem] = useState(null)
    const [selectedUserDataItemTouched, setSelectedUserDataItemTouched] = useState(false)

    const [userSupplierTemplatesData, setUserSupplierTemplatesData] = useState([])

    useEffect(() => {
        if (dialogIsOpened) {
            dispatch(getUserProjects())
        }
    }, [dialogIsOpened])

    useEffect(() => {
        if (userProjects) {
            const otherProjects = userProjects.filter(userProject => userProject.id !== project.id)

            let allUserSupplierTemplates = []
            otherProjects.forEach(userProject => {
                const {templates: {suppliers}} = userProject
                const supplierTemplatesWithProjectName = suppliers.map(template => ({...template, projectName: userProject.info.name}))
                allUserSupplierTemplates = [...allUserSupplierTemplates, ...supplierTemplatesWithProjectName]
            })

            setUserSupplierTemplatesData(allUserSupplierTemplates)
        }
    }, [userProjects])

    const handleUserDataElementSelect = (item) => {
        setSelectedUserDataItemTouched(true)
        setSelectedUserDataItem(item)
    }

    const getSupplierTemplateName = (selectedUserDataItem) => {
        return `${selectedUserDataItem.properties.name} (${selectedUserDataItem.projectName})`
    }

    const renderUserDataItem = (item) => {
        return (
            <MenuItem
                key={generateId()}
                onClick={() => handleUserDataElementSelect(item)}
                text={getSupplierTemplateName(item)}
            />
        );
    }

    return <Dialog
        icon={<GiTeePipe size={16} className={"bp3-icon material-icon"}/>}
        title={<span className={styles.dialogTitle}>Import supplier template</span>}
        autoFocus={false}
        enforceFocus={false}
        canEscapeKeyClose={false}
        canOutsideClickClose={false}
        usePortal={true}
        isCloseButtonShown={false}
        style={{width: 500, height: 220, borderRadius: 2}}
        isOpen={!!dialogIsOpened}
    >
        <div className={[Classes.DIALOG_BODY]} style={{overflow: "hidden", paddingRight: 4, paddingLeft: 4}}>

            <p className={styles.dialogText}>
                Select supplier template to import:
            </p>
            <Select
                items={userSupplierTemplatesData}
                itemRenderer={renderUserDataItem}
                activeItem={selectedUserDataItem && getSupplierTemplateName(selectedUserDataItem)}
                className="fullwidth"
                popoverProps={{minimal: true, portalClassName: "fullwidth", popoverClassName: "selectPopover"}}
                filterable={false}
                onItemSelect={handleUserDataElementSelect}
            >
                <Button text={<span
                    className={styles.selectText}>{selectedUserDataItem && getSupplierTemplateName(selectedUserDataItem) || "Select template..."}</span>}
                        rightIcon="caret-down" alignText="left" fill="{true}"/>
            </Select>

            {(!selectedUserDataItem && selectedUserDataItemTouched) &&
            <span className={styles.errorText}>Select template!</span>}


        </div>

        <div className={Classes.DIALOG_FOOTER}>
            <div className={Classes.DIALOG_FOOTER_ACTIONS}>
                <Button intent={Intent.NONE}
                        style={{width: 90, fontFamily: "Montserrat", fontSize: 13}}
                        onClick={async () => {
                            setDialogIsOpened(false)
                        }}>
                    Cancel
                </Button>

                <Button intent={Intent.SUCCESS}
                        disabled={!selectedUserDataItem}
                        style={{width: 90, fontFamily: "Montserrat", fontSize: 13}}
                        onClick={async () => {
                            dispatch(addNewSupplierTemplate({
                                properties: selectedUserDataItem.properties,
                                id: "supplier_template_" + generateId()
                            }))
                            setDialogIsOpened(false)

                        }}>
                    Import
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
