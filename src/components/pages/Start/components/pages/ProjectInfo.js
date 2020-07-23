import React, {useState} from "react";
import {createUseStyles} from "react-jss";
import {FormGroup, InputGroup, Intent} from "@blueprintjs/core";
import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
} from "use-places-autocomplete"
import useOnclickOutside from "react-cool-onclickoutside"
import {generateId} from "../../../../../helpers/data-helper";

export const ProjectInfo = ({hasError, setHasError}) => {

    const styles = useStyles()

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
        // When user clicks outside of the component, we can dismiss
        // the searched suggestions by calling this method
        clearSuggestions();
    })

    const handleInput = (e) => {
        // Update the keyword of the input element
        setValue(e.target.value);
    }

    const handleSelect = ({ description }) => () => {
        // When user selects a place, we can replace the keyword without request data from API
        // by setting the second parameter to "false"
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

    const [nameHasError, setNameHasError] = useState(false)
    const [locationHasError, setLocationHasError] = useState(false)

    const [name, setName] = useState("")
    const [location, setLocation] = useState("")

    return <div className="start-block">
        <p className={styles.dialogText}>
            Set project name and system location:
        </p>

        <FormGroup
            disabled={false}
            helperText={nameHasError && "Please enter project name..."}
            intent={nameHasError ? Intent.DANGER : Intent.NONE}
            label={"Project name: "}
            labelFor="name"
            fill
            className={styles.labelText}
        >
            <InputGroup id="name"
                        placeholder="Enter project name"
                        className={styles.labelText}
                        intent={nameHasError ? Intent.DANGER : Intent.NONE}
                        value={name}
                        type={"text"}
                        leftIcon={"clipboard"}
                        onChange={e => {
                            setNameHasError(false)
                            setName(e.target.value)
                            if (!e.target.value) {
                                setNameHasError(true)
                            }
                        }}
            />
        </FormGroup>

        <FormGroup
            disabled={false}
            helperText={locationHasError && "Please set location..."}
            intent={locationHasError ? Intent.DANGER : Intent.NONE}
            label={"Location: "}
            labelFor="location"
            fill
            className={styles.labelText}
        >
            <div ref={ref}>
                <InputGroup id="location"
                            placeholder="Set location..."
                            className={styles.labelText}
                            intent={locationHasError ? Intent.DANGER : Intent.NONE}
                            value={value}
                            type={"text"}
                            leftIcon={"geosearch"}
                            onChange={e => {
                                handleInput(e)
                                // setLocationHasError(false)
                                // setLocation(e.target.value)
                                // if (!e.target.value) {
                                //     setLocationHasError(true)
                                // }
                            }}
                />
                {/* We can use the "status" to decide whether we should display the dropdown or not */}
                {status === "OK" && <ul className="geosuggestions">{renderSuggestions()}</ul>}
            </div>
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