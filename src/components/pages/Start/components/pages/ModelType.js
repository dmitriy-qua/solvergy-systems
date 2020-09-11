import React, {useState} from "react";
import {createUseStyles} from "react-jss";
import { MultiSelect, Select } from "@blueprintjs/select"
import {Button, MenuItem, Intent} from "@blueprintjs/core";
import {generateId} from "../../../../../helpers/data-helper";

export const ModelType = ({selectedModelType, setSelectedModelType, selectedEnergySystemType, setSelectedEnergySystemType}) => {

    const styles = useStyles()

    const [selectedModelTypeTouched, setSelectedModelTypeTouched] = useState(false)
    const [selectedEnergySystemTypeTouched, setSelectedEnergySystemTypeTouched] = useState(false)

    const modelTypes = [
        {title: "System"},
        {title: "Market over system"}
    ]

    const energySystemTypes = [
        {title: "Heating"},
        {title: "Cooling"},
        {title: "Electricity"},
        {title: "Gas"}
    ]

    const handleModelTypeElementSelect = (item) => {
        setSelectedModelTypeTouched(true)
        setSelectedModelType(item.title)
    }

    const renderModelTypeItem = (item) => {
        return (
            <MenuItem
                key={generateId()}
                onClick={() => handleModelTypeElementSelect(item)}
                text={item.title}
            />
        );
    }

    const handleEnergySystemTypeElementSelect = (item) => {
        setSelectedEnergySystemTypeTouched(true)
        setSelectedEnergySystemType([...selectedEnergySystemType, item.title])
    }

    const renderEnergySystemTypeItem = (item, {handleClick}) => {

        return (
            <MenuItem
                disabled={selectedEnergySystemType.findIndex(selectedItem => item.title === selectedItem) !== -1}
                key={generateId()}
                onClick={handleClick}
                text={item.title}
                shouldDismissPopover={true}
            />
        );
    }

    const renderEnergySystemTypeTag = (item) => {
        return <span className={styles.tagText}>{item}</span>
    }

    const handleClear = () => setSelectedEnergySystemType([])

    const clearButton = selectedEnergySystemType.length > 0 ? <Button icon="cross" minimal={true} onClick={handleClear} /> : undefined

    const deselectItem = (index) => {
        setSelectedEnergySystemType(selectedEnergySystemType.filter((item, i) => i !== index))
    }

    const handleTagRemove = (_tag, index) => deselectItem(index)

    return <div className="start-block">
        <p className={styles.dialogText}>
            Select model type:
        </p>

        <Select
            items={modelTypes}
            itemRenderer={renderModelTypeItem}
            activeItem={selectedModelType}
            className="fullwidth"
            popoverProps={{ minimal: true, portalClassName: "fullwidth" }}
            filterable={false}
            onItemSelect={handleModelTypeElementSelect}
        >
            <Button text={<span className={styles.selectText}>{selectedModelType || "Select model type..."}</span>} rightIcon="caret-down" alignText="left" fill="{true}" />
        </Select>

        {(!selectedModelType && selectedModelTypeTouched) && <p className={styles.errorText}>Set model type!</p>}

        <br/>

        <p className={styles.dialogText}>
            Select energy system types:
        </p>

        {/*<MultiSelect*/}
        {/*    items={energySystemTypes}*/}
        {/*    itemRenderer={renderEnergySystemTypeItem}*/}
        {/*    tagRenderer={renderEnergySystemTypeTag}*/}
        {/*    placeholder={"Click and select types..."}*/}
        {/*    tagInputProps={{*/}
        {/*        onRemove: handleTagRemove,*/}
        {/*        rightElement: clearButton,*/}
        {/*        tagProps: {*/}
        {/*            minimal: false,*/}
        {/*            intent: Intent.NONE*/}
        {/*        }*/}
        {/*    }}*/}
        {/*    selectedItems={selectedEnergySystemType}*/}
        {/*    className="fullwidth"*/}
        {/*    popoverProps={{ minimal: true, portalClassName:"fullwidth" }}*/}
        {/*    filterable={false}*/}
        {/*    onItemSelect={handleEnergySystemTypeElementSelect}*/}
        {/*>*/}
        {/*</MultiSelect>*/}
        {/*{(selectedEnergySystemType.length === 0 && selectedEnergySystemTypeTouched) && <p className={styles.errorText}>Set model type!</p>}*/}
    </div>
}

const useStyles = createUseStyles({
    text: {
        marginTop: 12,
        fontWeight: 600,
        fontSize: 13,
        fontFamily: "Montserrat"
    },
    errorText: {
        marginLeft: 4,
        fontWeight: 500,
        color: "#c23030",
        fontSize: 12,
        fontFamily: "Montserrat"
    },
    tagText: {
        fontWeight: 400,
        fontSize: 12,
        fontFamily: "Montserrat"
    },
    selectText: {
        fontWeight: 500,
        fontSize: 14,
        fontFamily: "Montserrat"
    },
    dialogTitle: {
        fontWeight: 600,
        fontSize: 15,
        fontFamily: 'Montserrat'
    },
    dialogText: {
        fontWeight: 600,
        fontSize: 12,
        fontFamily: 'Montserrat'
    },
    select: {
        width: 200,
        textAlign: "left"
    }
})