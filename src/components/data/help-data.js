import React from "react";

const gifBorderStyle = {margin: 10, border: "2px solid #eceff1"}
const gifBorderWidth = 650
const gifBorderHeight = 388

export const GeneralHelp = ({styles}) => {
    return <div style={{padding: 6, textAlign: "justify"}}>
        <p className={styles.dialogTitle}>
            General
        </p>
        <p className={styles.dialogText}>
            Solvergy: Systems - software designed for technical and economic calculations of energy systems to assess
            the efficiency of the system in terms of the production and supply of energy to consumers both on
            competitive terms and in the presence of a vertically integrated structure in the energy system.
        </p>
        <p className={styles.dialogText}>
            Solvergy: Systems - allows you to make quick projects of energy systems thanks to a well-thought-out user
            interface and additional features, among which there is the possibility of using templates, as well as a
            unique option for analyzing maps in order to identify objects and quickly create them in a project.
        </p>
        <p className={styles.dialogText}>
            The calculation results are presented in the most convenient form to obtain a clear assessment of the
            technical and economic components of the energy system.
        </p>
    </div>
}

export const AuthenticationHelp = ({styles}) => {
    return <div style={{padding: 6, textAlign: "justify"}}>
        <p className={styles.dialogTitle}>
            Authentication
        </p>
        <p className={styles.dialogText}>
            User authorization is required in the application. With an account, the user is able to create, save and
            open previously developed projects.
        </p>
    </div>
}

export const SignInHelp = ({styles}) => {
    return <div style={{padding: 6, textAlign: "justify"}}>
        <p className={styles.dialogTitle}>
            Sign in / Authentication
        </p>
        <p className={styles.dialogText}>
            To log into your account, you must open the authorization dialog box through: <br/><br/>
            - the start screen: <br/> <img width={gifBorderWidth} height={gifBorderHeight}
                                           src={require('../../assets/help/sign_in_main_page.gif')}
                                           style={gifBorderStyle}/> <br/>
            - the "Settings" menu bar: <br/> <img width={gifBorderWidth} height={gifBorderHeight}
                                                  src={require('../../assets/help/sign_in_menu_bar.gif')}
                                                  style={gifBorderStyle}/> <br/>
            - the project creation dialog:<br/> <img width={gifBorderWidth} height={gifBorderHeight}
                                                     src={require('../../assets/help/sign_in_new_project.gif')}
                                                     style={gifBorderStyle}/>
        </p>
    </div>
}

export const SignOutHelp = ({styles}) => {
    return <div style={{padding: 6, textAlign: "justify"}}>
        <p className={styles.dialogTitle}>
            Sign out / Authentication
        </p>
        <p className={styles.dialogText}>
            To log out from your account, you must open the authorization dialog box through: <br/><br/>
            - the start screen: <br/> <img width={gifBorderWidth} height={gifBorderHeight}
                                           src={require('../../assets/help/sign_out_main_page.gif')}
                                           style={gifBorderStyle}/> <br/>
            - the "Settings" menu bar: <br/> <img width={gifBorderWidth} height={gifBorderHeight}
                                                  src={require('../../assets/help/sign_out_menu_bar.gif')}
                                                  style={gifBorderStyle}/> <br/>
            - the project creation dialog:<br/> <img width={gifBorderWidth} height={gifBorderHeight}
                                                     src={require('../../assets/help/sign_out_new_project.gif')}
                                                     style={gifBorderStyle}/>
        </p>
    </div>
}

export const SignUpHelp = ({styles}) => {
    return <div style={{padding: 6, textAlign: "justify"}}>
        <p className={styles.dialogTitle}>
            Sign up / Authentication
        </p>
        <p className={styles.dialogText}>
            You must have an account to start developing projects. You can create an account in the following
            ways: <br/><br/>
            - through the start screen: <br/> <img width={gifBorderWidth} height={gifBorderHeight}
                                                   src={require('../../assets/help/sign_up_main_page.gif')}
                                                   style={gifBorderStyle}/> <br/>
            - through the "Settings" menu bar: <br/> <img width={gifBorderWidth} height={gifBorderHeight}
                                                          src={require('../../assets/help/sign_up_menu_bar.gif')}
                                                          style={gifBorderStyle}/> <br/>
            - through the project creation dialog:<br/> <img width={gifBorderWidth} height={gifBorderHeight}
                                                             src={require('../../assets/help/sign_up_new_project.gif')}
                                                             style={gifBorderStyle}/>
        </p>
    </div>
}

export const ProjectHelp = ({styles}) => {
    return <div style={{padding: 6, textAlign: "justify"}}>
        <p className={styles.dialogTitle}>
            Project
        </p>
        <p className={styles.dialogText}>
            To develop a project for calculating the energy system, it is necessary to carry out a number of initial
            steps. The procedure for creating a project is described in the paragraph "New project".
        </p>
    </div>
}

export const NewProjectHelp = ({styles}) => {
    return <div style={{padding: 6, textAlign: "justify"}}>
        <p className={styles.dialogTitle}>
            New project / Project
        </p>
        <p className={styles.dialogText}>
            To start creating a project, you need to click on the "Create project..." button on the start screen, <br/>
            <img width={gifBorderWidth} height={gifBorderHeight}
                 src={require('../../assets/help/create_project.gif')}
                 style={gifBorderStyle}/> <br/>
            or click the "New project..." button in the "File" menu. <br/>
            <img width={gifBorderWidth} height={gifBorderHeight}
                 src={require('../../assets/help/new_project_menu.gif')}
                 style={gifBorderStyle}/> <br/>
            After that, the starting dialog for creating a new project will
            open, in which you will need to go through 4 steps: <br/>
            1. "Authentication" <br/>
            2. "Project info" <br/>
            3. "Model type" <br/>
            4. "Map settings"
        </p>
    </div>
}

export const NewProjectAuthenticationHelp = ({styles}) => {
    return <div style={{padding: 6, textAlign: "justify"}}>
        <p className={styles.dialogTitle}>
            Authentication / New project / Project
        </p>
        <p className={styles.dialogText}>
            Before you can start creating a new project, you must be logged into your account. After authorization,
            press the "Next" button. <br/>
            <img width={gifBorderWidth} height={gifBorderHeight}
                 src={require('../../assets/help/new_project_auth_step.gif')}
                 style={gifBorderStyle}/> <br/>
        </p>
    </div>
}

export const NewProjectInfoHelp = ({styles}) => {
    return <div style={{padding: 6, textAlign: "justify"}}>
        <p className={styles.dialogTitle}>
            Project info / New project / Project
        </p>
        <p className={styles.dialogText}>
            At the project information stage, you must enter the name of the project, select the location of the system
            for which the project will be executed, and also select the currency in which the economic calculations will
            be performed. When finished, press the "Next" button.
            <br/>
            <img width={gifBorderWidth} height={gifBorderHeight}
                 src={require('../../assets/help/new_project_info_step.gif')}
                 style={gifBorderStyle}/>
            <br/>
        </p>
    </div>
}

export const NewProjectTypeHelp = ({styles}) => {
    return <div style={{padding: 6, textAlign: "justify"}}>
        <p className={styles.dialogTitle}>
            Project info / New project / Project
        </p>
        <p className={styles.dialogText}>
            At the stage of choosing the type of model, you are given 2 options for assessing the energy system
            where: <br/>
            1. there is one vertically integrated enterprise in the system <br/>
            2. there is a competitive relationship between energy producers in the system based on periodic auctions for
            the purchase and sale of energy.<br/>
            After selecting the model type, press the button.
            <br/>
            <img width={gifBorderWidth} height={gifBorderHeight}
                 src={require('../../assets/help/new_project_type_step.gif')}
                 style={gifBorderStyle}/>
            <br/>
        </p>
    </div>
}

export const NewProjectMapHelp = ({styles}) => {
    return <div style={{padding: 6, textAlign: "justify"}}>
        <p className={styles.dialogTitle}>
            Project info / New project / Project
        </p>
        <p className={styles.dialogText}>
            The map setup stage is the most important among the others. The map image will be the basis on which
            graphical objects will be created in the form of consumers, producers and networks. The first thing to do is
            to select the local path on the PC for the high quality map image. After that, it is necessary to set the
            scale of the map in the form of the real length of the selected map fragment from the upper border to the
            lower border of the image. <br/> Also, the software has a unique function for analyzing the map image into
            polygons, which allows you to significantly speed up the process of developing a power system project. To
            take advantage of this opportunity, select the appropriate switch button. In the case of enabling this
            function, you need to have a map image similar to the one described above with corresponding changes in
            terms of polygon differentiation. When finished, press the "Create" button.
            <br/>
            <img width={gifBorderWidth} height={gifBorderHeight}
                 src={require('../../assets/help/new_project_map_step.gif')}
                 style={gifBorderStyle}/>
            <br/>
        </p>
    </div>
}

export const OpenProjectHelp = ({styles}) => {
    return <div style={{padding: 6, textAlign: "justify"}}>
        <p className={styles.dialogTitle}>
            Open project / Project
        </p>
        <p className={styles.dialogText}>
            To open an existing project, you must be logged in. To open the dialog box for selecting an existing
            project, you must press the "Open project..." button on the main screen, <br/>
            <img width={gifBorderWidth} height={gifBorderHeight}
                 src={require('../../assets/help/open_project_main_page.gif')}
                 style={gifBorderStyle}/> <br/>
            or through the menu with "Open project..." button in the toolbar. <br/>
            <img width={gifBorderWidth} height={gifBorderHeight}
                 src={require('../../assets/help/open_project_menu.gif')}
                 style={gifBorderStyle}/> <br/>
            Also, through the dialog box of opening a project, you can delete an existing project using the "Delete"
            button.
            <img width={gifBorderWidth} height={gifBorderHeight}
                 src={require('../../assets/help/delete_project.gif')}
                 style={gifBorderStyle}/> <br/>
        </p>
    </div>
}

export const SaveProjectHelp = ({styles}) => {
    return <div style={{padding: 6, textAlign: "justify"}}>
        <p className={styles.dialogTitle}>
            Save project / Project
        </p>
        <p className={styles.dialogText}>
            To save the state of the project under development, select the "Save project" button in the "File" toolbar
            menu. <br/>
            <img width={gifBorderWidth} height={gifBorderHeight}
                 src={require('../../assets/help/save_project.gif')}
                 style={gifBorderStyle}/> <br/>
        </p>
    </div>
}

export const SaveAsProjectHelp = ({styles}) => {
    return <div style={{padding: 6, textAlign: "justify"}}>
        <p className={styles.dialogTitle}>
            Save project as / Project
        </p>
        <p className={styles.dialogText}>
            To save a copy of the project under development, select the "Save as..." button in the "File" toolbar menu.
            You
            will see a dialog box in which you need to enter a new name for the project. After, click the "save"
            button. <br/>
            <img width={gifBorderWidth} height={gifBorderHeight}
                 src={require('../../assets/help/save_as_project.gif')}
                 style={gifBorderStyle}/> <br/>
        </p>
    </div>
}

export const TemplatesHelp = ({styles}) => {
    return <div style={{padding: 6, textAlign: "justify"}}>
        <p className={styles.dialogTitle}>
            Templates
        </p>
        <p className={styles.dialogText}>
            Templates allow you to speed up the process of developing an energy system design by quickly creating
            similar objects that usually exist in such cases. In this software you have the opportunity to create
            templates for suppliers and networks.
        </p>
    </div>
}

export const SuppliersTemplatesHelp = ({styles}) => {
    return <div style={{padding: 6, textAlign: "justify"}}>
        <p className={styles.dialogTitle}>
            Suppliers / Templates
        </p>
        <p className={styles.dialogText}>
            To open the dialog box of the supplier templates editor, click the icon of the supplier templates in the
            toolbar or select the corresponding button in the "Edit" menu. <br/>
            <img width={gifBorderWidth} height={gifBorderHeight}
                 src={require('../../assets/help/suppliers_templates_open_dialog.gif')}
                 style={gifBorderStyle}/> <br/>
            To create a new template, click the "Add New" button. A form will open in front of you, in which you must
            enter the following data:
        </p>
        <ul className={styles.dialogText}>
            <li>Template name</li>
            <li>Energy source type</li>
            <li>Rate of return</li>
            <li>Fixed capital costs</li>
            <li>Variable capital costs per 1 MW of station capacity</li>
            <li>Fuel consumption</li>
            <li>Fuel price</li>
            <li>Fuel transportation costs</li>
            <li>Electricity costs</li>
            <li>Annual salary costs for workers per 1 MW of station capacity</li>
            <li>Annual salary costs for administration per 1 MW of station capacity</li>
            <li>Other costs per 1 MW of station capacity</li>
            <li>Service life of the station</li>
        </ul>
        <p className={styles.dialogText}>
            When finished, press "Create" button, or press "Cancel" button, to cancel template creation process. <br/>
            <img width={gifBorderWidth} height={gifBorderHeight}
                 src={require('../../assets/help/create_new_supplier_template.gif')}
                 style={gifBorderStyle}/> <br/>
            Besides creating templates, you can edit and delete them. To edit a template, select a template and click
            the "Edit" button. After that, a form will be opened in which it will be possible to make changes. <br/>
            <img width={gifBorderWidth} height={gifBorderHeight}
                 src={require('../../assets/help/suppliers_templates_edit.gif')}
                 style={gifBorderStyle}/> <br/>
            To delete a template, select the desired template and click the "Delete" button. <br/>
            <img width={gifBorderWidth} height={gifBorderHeight}
                 src={require('../../assets/help/suppliers_templates_delete.gif')}
                 style={gifBorderStyle}/> <br/>
        </p>
    </div>
}

export const NetworksTemplatesHelp = ({styles}) => {
    return <div style={{padding: 6, textAlign: "justify"}}>
        <p className={styles.dialogTitle}>
            Networks / Templates
        </p>
        <p className={styles.dialogText}>
            To open the dialog box of the network templates editor, click the icon of the network templates in the
            toolbar or select the corresponding button in the "Edit" menu. <br/>
            <img width={gifBorderWidth} height={gifBorderHeight}
                 src={require('../../assets/help/networks_templates_open_dialog.gif')}
                 style={gifBorderStyle}/> <br/>
            To create a new template, click the "Add New" button. A form will open in front of you, in which you must
            enter the following data:
        </p>
        <ul className={styles.dialogText}>
            <li>Template name</li>
            <li>Pipe outer diameter</li>
            <li>Pipe insulation thickness</li>
            <li>Type of pipe laying</li>
            <li>Pipe insulation type</li>
        </ul>
        <p className={styles.dialogText}>
            When finished, press "Create" button, or press "Cancel" button, to cancel template creation process. <br/>
            <img width={gifBorderWidth} height={gifBorderHeight}
                 src={require('../../assets/help/create_new_network_template.gif')}
                 style={gifBorderStyle}/> <br/>
            Besides creating templates, you can edit and delete them. To edit a template, select a template and click
            the "Edit" button. After that, a form will be opened in which it will be possible to make changes. <br/>
            <img width={gifBorderWidth} height={gifBorderHeight}
                 src={require('../../assets/help/networks_templates_edit.gif')}
                 style={gifBorderStyle}/> <br/>
            To delete a template, select the desired template and click the "Delete" button. <br/>
            <img width={gifBorderWidth} height={gifBorderHeight}
                 src={require('../../assets/help/networks_templates_delete.gif')}
                 style={gifBorderStyle}/> <br/>
        </p>
    </div>
}

export const ProducersHelp = ({styles}) => {
    return <div style={{padding: 6, textAlign: "justify"}}>
        <p className={styles.dialogTitle}>
            Producers
        </p>
        <p className={styles.dialogText}>
            Producers are legal entities that own energy production objects (suppliers). If you have selected the
            "System"
            model type, you will only have the "Main producer" available to develop a project with one vertically
            integrated enterprise. If the model type of the project is "Market over system", then you will have the
            opportunity to add new producers in order to further assign them energy production objects
            (suppliers). <br/>
            To open the dialog box of the producers editor, click the icon of the producers in the
            toolbar or select the corresponding button in the "Edit" menu. <br/>
            <img width={gifBorderWidth} height={gifBorderHeight}
                 src={require('../../assets/help/producers_open_dialog.gif')}
                 style={gifBorderStyle}/> <br/>
            To create a new producer, click the "Add New" button. A form will open in front of you, in which you must
            set name and color of producer.
            When finished, press "Create" button, or press "Cancel" button, to cancel producer creation process. <br/>
            <img width={gifBorderWidth} height={gifBorderHeight}
                 src={require('../../assets/help/create_new_producer.gif')}
                 style={gifBorderStyle}/> <br/>
            Besides creating producers, you can edit and delete them. To edit a producer, select a producer and click
            the "Edit" button. After that, a form will be opened in which it will be possible to make changes. <br/>
            <img width={gifBorderWidth} height={gifBorderHeight}
                 src={require('../../assets/help/producers_edit.gif')}
                 style={gifBorderStyle}/> <br/>
            To delete a producer, select the desired producer and click the "Delete" button. <br/>
            <img width={gifBorderWidth} height={gifBorderHeight}
                 src={require('../../assets/help/producers_delete.gif')}
                 style={gifBorderStyle}/> <br/>
        </p>
    </div>
}

export const ObjectsHelp = ({styles}) => {
    return <div style={{padding: 6, textAlign: "justify"}}>
        <p className={styles.dialogTitle}>
            Objects
        </p>
        <p className={styles.dialogText}>
            The objects are the basis for the development of the energy system project. There are 3 types of objects
            in the software:
        </p>
        <ul className={styles.dialogText}>
            <li>Consumers</li>
            <li>Suppliers</li>
            <li>Networks</li>
        </ul>
    </div>
}

export const ConsumersHelp = ({styles}) => {
    return <div style={{padding: 6, textAlign: "justify"}}>
        <p className={styles.dialogTitle}>
            Consumers / Objects
        </p>
        <p className={styles.dialogText}>
            Consumer objects are an integral part of the energy system and form the energy demand in the system.
            The creation of a consumer object is accompanied by setting the object name and the annual amount of energy
            consumption by the building. In addition to setting the number of energy consumption, the software provides
            the ability to import the results of the calculation of a building from "Solvergy: Buildings" mobile
            software. After that, a
            corresponding polygon is plotted on the map, which, after creation, has the inputs of the supply and return
            pipelines of the supply network. <br/><br/>
            To open the dialog box of the consumer object creation, click the icon of the consumer in the
            toolbar or select the corresponding button in the "Edit" menu. <br/>
            <img width={gifBorderWidth} height={gifBorderHeight}
                 src={require('../../assets/help/consumers_open_dialog.gif')}
                 style={gifBorderStyle}/> <br/>
            To add a consumer, enter his name and the amount of consumed energy, after that, click the create button.
            Next, draw a polygon for the object where it will be placed.
            <br/>
            <img width={gifBorderWidth} height={gifBorderHeight}
                 src={require('../../assets/help/create_new_consumer.gif')}
                 style={gifBorderStyle}/> <br/>
            If your consumer object is calculated using "Solvergy: Buildings" mobile software, select the "Import
            consumer data from Solvergy: Buildings" switch button and select your object results.
            <br/>
            <img width={gifBorderWidth} height={gifBorderHeight}
                 src={require('../../assets/help/create_new_consumer_buildings.gif')}
                 style={gifBorderStyle}/> <br/>
            To edit consumer object, select the object in tree view or on the map with right click, and select "Edit
            object..." button in context menu.
            <br/>
            <img width={gifBorderWidth} height={gifBorderHeight}
                 src={require('../../assets/help/consumers_edit.gif')}
                 style={gifBorderStyle}/> <br/>
            To delete consumer object, select the object in tree view or on the map with right click, and select "Delete
            object" button in context menu.
            <br/>
            <img width={gifBorderWidth} height={gifBorderHeight}
                 src={require('../../assets/help/consumers_delete.gif')}
                 style={gifBorderStyle}/> <br/>
        </p>
    </div>
}