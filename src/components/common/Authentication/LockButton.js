import {Button, Intent, Tooltip} from "@blueprintjs/core";
import React from "react";

export const LockButton = ({showPassword, setShowPassword}) => (
    <Tooltip content={`${showPassword ? "Hide" : "Show"} Password`}>
        <Button
            icon={showPassword ? "unlock" : "lock"}
            intent={Intent.WARNING}
            minimal={true}
            onClick={() => setShowPassword(prevState => !prevState)}
        />
    </Tooltip>
);