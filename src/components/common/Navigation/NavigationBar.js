import React from "react";
import { Icon } from "@blueprintjs/core";
import {NavigationButton} from "./NavigationButton";
import MaterialIcon from "@mdi/react";
import {mdiTune, mdiSitemap} from "@mdi/js";

export const NavigationBar = ({currentPage, setCurrentPage}) => {

    return <div className="pane-content">
        <NavigationButton currentPage={currentPage}
                          setCurrentPage={setCurrentPage}
                          pageName={"topology"}
                          label={"Topology"}
                          icon={<Icon icon={<MaterialIcon path={mdiSitemap} className={"material-icon"}/>}/>}
        />
        <NavigationButton currentPage={currentPage}
                          setCurrentPage={setCurrentPage}
                          pageName={"settings"}
                          label={"Model settings"}
                          icon={<Icon icon={<MaterialIcon path={mdiTune} className={"material-icon"}/>}/>}
        />
    </div>
}
