import React, {useState} from "react";
import {createUseStyles} from "react-jss";
import { Select } from "@blueprintjs/select"
import {Button, MenuItem} from "@blueprintjs/core";
import {generateId} from "../../../../../helpers/data-helper";

export const ModelType = ({hasError, setHasError}) => {

    const styles = useStyles()

    const [selectedModelType, setSelectedModelType] = useState(null)
    const [selectedEnergySystemType, setSelectedEnergySystemType] = useState(null)

    const modelTypes = [
        {title: "System"},
        {title: "Market over system"}
    ]

    const energySystemTypes = [
        {title: "Heat"},
        {title: "Heat + electricity"},
        {title: "Electricity"}
    ]

    const handleModelTypeElementSelect = (item) => {
        setSelectedModelType(item.title)
    }

    const renderModelTypeItem = (item) => {
        return (
            <MenuItem
                key={generateId()}
                onClick={() => handleModelTypeElementSelect(item)}
                text={item.title.toString()}
            />
        );
    }

    const handleEnergySystemTypeElementSelect = (item) => {
        setSelectedEnergySystemType(item.title)
    }

    const renderEnergySystemTypeItem = (item) => {
        return (
            <MenuItem
                key={generateId()}
                onClick={() => handleEnergySystemTypeElementSelect(item)}
                text={item.title.toString()}
            />
        );
    }

    return <div className="start-block">
        <p className={styles.dialogText}>
            Select model type:
        </p>

        <Select
            items={modelTypes}
            itemRenderer={renderModelTypeItem}
            activeItem={selectedModelType}
            minimal={true}
            className="fullwidth"
            popoverProps={{ minimal: true, portalClassName:"fullwidth" }}
            filterable={false}
            onItemSelect={handleModelTypeElementSelect}
        >
            <Button text={selectedModelType || "Select model type..."} rightIcon="caret-down" alignText="left" fill="{true}" />
        </Select>

        <br/>

        <p className={styles.dialogText}>
            Select energy system type:
        </p>

        <Select
            items={energySystemTypes}
            itemRenderer={renderEnergySystemTypeItem}
            activeItem={selectedEnergySystemType}
            minimal={true}
            className="fullwidth"
            popoverProps={{ minimal: true, portalClassName:"fullwidth" }}
            filterable={false}
            onItemSelect={handleEnergySystemTypeElementSelect}
        >
            <Button text={selectedEnergySystemType || "Select energy system type..."} rightIcon="caret-down" alignText="left" fill="{true}" />
        </Select>
    </div>
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
        fontWeight: 600,
        fontSize: 12,
        fontFamily: 'Montserrat'
    },
    select: {
        width: 200,
        textAlign: "left"
    }
})