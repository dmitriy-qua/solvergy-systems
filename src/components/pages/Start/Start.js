import React, {useState} from "react";
import {StartButton} from "./components/StartButton";
import {mdiPlusBoxOutline, mdiFolderOutline, mdiHelpCircleOutline, mdiLoginVariant, mdiLogoutVariant} from "@mdi/js";
import {StartDialog} from "./components/StartDialog";
import {AuthDialog} from "../../common/Authentication/AuthDialog";
import {useDispatch, useSelector} from "react-redux";
import {OpenProjectDialog} from "../../common/ToolsBar/components/OpenProjectDialog";
import {HelpDialog} from "../../common/ToolsBar/components/HelpDialog";
import {LicenseDialog} from "../../common/ToolsBar/components/LicenseDialog";
import {InfoDialog} from "../../common/ToolsBar/components/InfoDialog";

export const Start = ({
                          startDialog,
                          setStartDialog,
                          authDialog,
                          setAuthDialog,
                          openProjectDialogIsOpened,
                          setOpenProjectDialogIsOpened,
                          helpDialogIsOpened,
                          setHelpDialogIsOpened,
                          licenseDialogIsOpened,
                          setLicenseDialogIsOpened,
                          infoDialogIsOpened,
                          setInfoDialogIsOpened,
}) => {

    const isAuth = useSelector(state => state.auth.isAuth)

    const dispatch = useDispatch()

    return <div className="start">
        <StartButton action={() => setStartDialog(true)}
                     icon={mdiPlusBoxOutline}
                     label="Create project..."
                     description={"Start new project, upload the map and set scale distance"}/>
        <StartButton action={() => setOpenProjectDialogIsOpened(true)}
                     icon={mdiFolderOutline}
                     disabled={!isAuth}
                     label="Open project..."
                     description={"Open a previously saved project and continue working"}/>
        <StartButton action={() => setAuthDialog(true)}
                     icon={isAuth ? mdiLogoutVariant : mdiLoginVariant}
                     label={isAuth ? "Sign out" : "Sign in"}
                     description={"You must be logged in to be able to save and open projects"}/>
        <StartButton action={() => setHelpDialogIsOpened(true)}
                     icon={mdiHelpCircleOutline}
                     label="Help"
                     description={"Learn how to create projects in Solvergy: Systems"}/>

        <StartDialog startDialog={startDialog}
                     setStartDialog={setStartDialog}
        />

        <AuthDialog startDialog={authDialog}
                    setStartDialog={setAuthDialog}
        />

        <OpenProjectDialog dialogIsOpened={openProjectDialogIsOpened}
                           setDialogIsOpened={setOpenProjectDialogIsOpened}
        />

        <HelpDialog dialogIsOpened={helpDialogIsOpened}
                    setDialogIsOpened={setHelpDialogIsOpened}
        />

        <LicenseDialog dialogIsOpened={licenseDialogIsOpened}
                       setDialogIsOpened={setLicenseDialogIsOpened}
        />

        <InfoDialog dialogIsOpened={infoDialogIsOpened}
                    setDialogIsOpened={setInfoDialogIsOpened}
        />

    </div>
}
