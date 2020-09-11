import React, {useState} from "react";
import {createUseStyles} from "react-jss";
import {FormGroup, InputGroup, Intent} from "@blueprintjs/core";
import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
} from "use-places-autocomplete"
import useOnclickOutside from "react-cool-onclickoutside"
import {generateId} from "../../../../../helpers/data-helper";

export const ProjectInfo = ({name, setName, location, setLocation, currency, setCurrency}) => {

    const styles = useStyles()

    const [nameTouched, setNameTouched] = useState(false)
    const [locationTouched, setLocationTouched] = useState(false)
    const [currencyTouched, setCurrencyTouched] = useState(false)

    const {
        ready,
        value,
        suggestions: { status, data },
        setValue,
        clearSuggestions,
    } = usePlacesAutocomplete({
        requestOptions: {
            /* Define search scope here */
        },
        debounce: 300,
    });

    const ref = useOnclickOutside(() => {
        clearSuggestions();
    })

    const handleInput = (e) => {
        setValue(e.target.value);
        if (!e.target.value) setLocation("")

    }

    const handleSelect = ({ description }) => () => {
        setLocationTouched(true)
        setLocation(description)
        setValue(description, false);
        clearSuggestions();

        // Get latitude and longitude via utility functions
        // getGeocode({ address: description })
        //     .then((results) => getLatLng(results[0]))
        //     .then(({ lat, lng }) => {
        //         console.log("📍 Coordinates: ", { lat, lng });
        //     })
        //     .catch((error) => {
        //         console.log("😱 Error: ", error);
        //     });
    }

    const renderSuggestions = () =>
        data.map((suggestion) => {
            const {
                id,
                structured_formatting: { main_text, secondary_text },
            } = suggestion;

            return (
                <li key={id || generateId()} className="geosuggestion" onClick={handleSelect(suggestion)}>
                    <strong>{main_text}</strong> {secondary_text}
                </li>
            );
        })

    return <div className="start-block">
        <p className={styles.dialogText}>
            Set project name and system location:
        </p>

        <FormGroup
            disabled={false}
            helperText={(!name && nameTouched) && "Please enter project name..."}
            intent={(!name && nameTouched) ? Intent.DANGER : Intent.NONE}
            label={"Project name: "}
            labelFor="name"
            fill
            className={styles.labelText}
        >
            <InputGroup id="name"
                        placeholder="Enter project name"
                        className={styles.labelText}
                        intent={(!name && nameTouched) ? Intent.DANGER : Intent.NONE}
                        value={name}
                        type={"text"}
                        leftIcon={"clipboard"}
                        onChange={e => {
                            setNameTouched(true)
                            setName(e.target.value)
                        }}
            />
        </FormGroup>

        <FormGroup
            disabled={false}
            helperText={(!location && locationTouched) && "Please set location..."}
            intent={(!location && locationTouched) ? Intent.DANGER : Intent.NONE}
            label={"Location: "}
            labelFor="location"
            fill
            className={styles.labelText}
        >
            <div ref={ref}>
                <InputGroup id="location"
                            placeholder="Set location..."
                            className={styles.labelText}
                            intent={(!location && locationTouched) ? Intent.DANGER : Intent.NONE}
                            value={value}
                            type={"text"}
                            leftIcon={"geosearch"}
                            onChange={e => {
                                handleInput(e)
                            }}
                />
                {/* We can use the "status" to decide whether we should display the dropdown or not */}
                {status === "OK" && <ul className="geosuggestions">{renderSuggestions()}</ul>}
            </div>
        </FormGroup>

        <FormGroup
            disabled={false}
            helperText={(!currency && currencyTouched) && "Please set currency..."}
            intent={(!currency && currencyTouched) ? Intent.DANGER : Intent.NONE}
            label={"Currency: "}
            labelFor="currency"
            fill
            className={styles.labelText}
        >
            <InputGroup id="currency"
                        placeholder="Enter currency"
                        className={styles.labelText}
                        intent={(!currency && currencyTouched) ? Intent.DANGER : Intent.NONE}
                        value={currency}
                        type={"text"}
                        leftIcon={"dollar"}
                        onChange={e => {
                            setCurrencyTouched(true)
                            setCurrency(e.target.value)
                        }}
            />
        </FormGroup>
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
        fontSize: 13,
        fontFamily: 'Montserrat',
        marginBottom: 20
    },
    labelText: {
        fontWeight: 500,
        fontSize: 11,
        fontFamily: 'Montserrat'
    },
})