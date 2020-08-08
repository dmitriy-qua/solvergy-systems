import React from "react";
import { Icon } from "@blueprintjs/core";
import {NavigationButton} from "./NavigationButton";
import MaterialIcon from "@mdi/react";
import {mdiTune, mdiSitemap, mdiChartBar, mdiCashUsdOutline} from "@mdi/js";

export const NavigationBar = ({currentPage, setCurrentPage}) => {
    console.log(currentPage)

    return <div className="pane-content">
        <NavigationButton currentPage={currentPage}
                          setCurrentPage={setCurrentPage}
                          pageNumber={0}
                          pageName={"topology"}
                          label={"Topology"}
                          icon={<Icon icon={<MaterialIcon path={mdiSitemap} className={"material-icon"}/>}/>}
        />
        <NavigationButton currentPage={currentPage}
                          setCurrentPage={setCurrentPage}
                          pageNumber={1}
                          pageName={"settings"}
                          label={"Model settings"}
                          icon={<Icon icon={<MaterialIcon path={mdiTune} className={"material-icon"}/>}/>}
        />
        <NavigationButton currentPage={currentPage}
                          disabled={true}
                          setCurrentPage={setCurrentPage}
                          pageNumber={2}
                          pageName={"technical-results"}
                          label={"Technical results"}
                          icon={<Icon icon={<MaterialIcon path={mdiChartBar} className={"material-icon"}/>}/>}
        />
        <NavigationButton currentPage={currentPage}
                          disabled={true}
                          setCurrentPage={setCurrentPage}
                          pageNumber={2}
                          pageName={"financial-results"}
                          label={"Financial results"}
                          icon={<Icon icon={<MaterialIcon path={mdiCashUsdOutline} className={"material-icon"}/>}/>}
        />
    </div>
}
