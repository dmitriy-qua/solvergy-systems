import React from "react";
import { Icon } from "@blueprintjs/core";
import {NavigationButton} from "./NavigationButton";
import MaterialIcon from "@mdi/react";
import {mdiFolder} from "@mdi/js";

export const NavigationBar = ({currentPage, setCurrentPage}) => {

    return <div className="pane-content">
        <NavigationButton currentPage={currentPage}
                          setCurrentPage={setCurrentPage}
                          pageName={"canvas"}
                          label={"Canvas"}
                          icon={<Icon icon={<MaterialIcon path={mdiFolder} className={"material-icon"}/>}/>}
        />
        <NavigationButton currentPage={currentPage}
                          setCurrentPage={setCurrentPage}
                          pageName={"settings"}
                          label={"Settings"}
                          icon={<Icon icon={<MaterialIcon path={mdiFolder} className={"material-icon"}/>}/>}
        />
    </div>
}
