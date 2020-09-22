import {generateId} from "../../helpers/data-helper";
import React from "react";


export const helpStructure = [
    {
        id: "general",
        hasCaret: false,
        isExpanded: false,
        label: "General",
        isSelected: false,
        icon: "clipboard",
    },
    {
        id: "authentication",
        hasCaret: true,
        isExpanded: false,
        label: "Authentication",
        isSelected: false,
        icon: "people",
        childNodes: [
            {
                id: "signin",
                hasCaret: false,
                isExpanded: false,
                label: "Sign in",
                isSelected: false,
            },
            {
                id: "signup",
                hasCaret: false,
                isExpanded: false,
                label: "Sign up",
                isSelected: false,
            },
            {
                id: "signout",
                hasCaret: false,
                isExpanded: false,
                label: "Sign out",
                isSelected: false,
            },
        ]
    },
    {
        id: "project",
        hasCaret: true,
        isExpanded: false,
        label: "Project",
        isSelected: false,
        icon: "document",
        childNodes: [
            {
                id: "newproject",
                hasCaret: true,
                isExpanded: false,
                label: "New project",
                isSelected: false,
                childNodes: [
                    {
                        id: "newproject_authentication",
                        hasCaret: false,
                        isExpanded: false,
                        label: "Authentication",
                        isSelected: false,
                    },
                    {
                        id: "newproject_projectinfo",
                        hasCaret: false,
                        isExpanded: false,
                        label: "Project info",
                        isSelected: false,
                    },
                    {
                        id: "newproject_modeltype",
                        hasCaret: false,
                        isExpanded: false,
                        label: "Model type",
                        isSelected: false,
                    },
                    {
                        id: "newproject_mapsettings",
                        hasCaret: false,
                        isExpanded: false,
                        label: "Map settings",
                        isSelected: false,
                    },
                ]
            },
            {
                id: "openproject",
                hasCaret: false,
                isExpanded: false,
                label: "Open project",
                isSelected: false,
            },
            {
                id: "saveproject",
                hasCaret: false,
                isExpanded: false,
                label: "Save project",
                isSelected: false,
            },
            {
                id: "saveasproject",
                hasCaret: false,
                isExpanded: false,
                label: "Save project as",
                isSelected: false,
            },

        ]
    },
    {
        id: "objects",
        hasCaret: true,
        isExpanded: false,
        label: "Objects",
        isSelected: false,
        icon: "cube",
        childNodes: [
            {
                id: "consumers",
                hasCaret: true,
                isExpanded: false,
                label: "Consumers",
                isSelected: false,
                childNodes: [
                    {
                        id: "createconsumer",
                        hasCaret: false,
                        isExpanded: false,
                        label: "Create",
                        isSelected: false,
                    },
                    {
                        id: "buildingsconsumer",
                        hasCaret: false,
                        isExpanded: false,
                        label: "Import from \"Solvergy: Buildings\"",
                        isSelected: false,
                    },
                    {
                        id: "polygonsconsumer",
                        hasCaret: false,
                        isExpanded: false,
                        label: "Polygons analyzer",
                        isSelected: false,
                    },
                    {
                        id: "editconsumer",
                        hasCaret: false,
                        isExpanded: false,
                        label: "Edit",
                        isSelected: false,
                    },
                    {
                        id: "deleteconsumer",
                        hasCaret: false,
                        isExpanded: false,
                        label: "Delete",
                        isSelected: false,
                    },
                ]
            },
            {
                id: "suppliers",
                hasCaret: true,
                isExpanded: false,
                label: "Suppliers",
                isSelected: false,
                childNodes: [
                    {
                        id: "createsupplier",
                        hasCaret: false,
                        isExpanded: false,
                        label: "Create",
                        isSelected: false,
                    },
                    {
                        id: "templatessupplier",
                        hasCaret: false,
                        isExpanded: false,
                        label: "Templates",
                        isSelected: false,
                    },
                    {
                        id: "polygonssupplier",
                        hasCaret: false,
                        isExpanded: false,
                        label: "Polygons analyzer",
                        isSelected: false,
                    },
                    {
                        id: "editsupplier",
                        hasCaret: false,
                        isExpanded: false,
                        label: "Edit",
                        isSelected: false,
                    },
                    {
                        id: "deletesupplier",
                        hasCaret: false,
                        isExpanded: false,
                        label: "Delete",
                        isSelected: false,
                    },
                ]
            },
            {
                id: "networks",
                hasCaret: true,
                isExpanded: false,
                label: "Networks",
                isSelected: false,
                childNodes: [
                    {
                        id: "createnetwork",
                        hasCaret: false,
                        isExpanded: false,
                        label: "Create",
                        isSelected: false,
                    },
                    {
                        id: "templatesnetwork",
                        hasCaret: false,
                        isExpanded: false,
                        label: "Templates",
                        isSelected: false,
                    },
                    {
                        id: "editnetwork",
                        hasCaret: false,
                        isExpanded: false,
                        label: "Edit",
                        isSelected: false,
                    },
                    {
                        id: "deletenetwork",
                        hasCaret: false,
                        isExpanded: false,
                        label: "Delete",
                        isSelected: false,
                    },
                ]
            },
            {
                id: "producers",
                hasCaret: true,
                isExpanded: false,
                label: "Producers",
                isSelected: false,
                childNodes: [
                    {
                        id: "createproducer",
                        hasCaret: false,
                        isExpanded: false,
                        label: "Create",
                        isSelected: false,
                    },
                    {
                        id: "colorsproducer",
                        hasCaret: false,
                        isExpanded: false,
                        label: "Colors",
                        isSelected: false,
                    },
                    {
                        id: "editproducer",
                        hasCaret: false,
                        isExpanded: false,
                        label: "Edit",
                        isSelected: false,
                    },
                    {
                        id: "deleteproducer",
                        hasCaret: false,
                        isExpanded: false,
                        label: "Delete",
                        isSelected: false,
                    },
                ]
            },
        ]
    },
    {
        id: "modelsettings",
        hasCaret: true,
        isExpanded: false,
        label: "Model settings",
        isSelected: false,
        icon: "settings",
        childNodes: [
            {
                id: "system",
                hasCaret: false,
                isExpanded: false,
                label: "System",
                isSelected: false,
            },
            {
                id: "marketoversystem",
                hasCaret: false,
                isExpanded: false,
                label: "Market over system",
                isSelected: false,
            },
        ]
    },
    {
        id: "calculation",
        hasCaret: false,
        isExpanded: false,
        label: "Calculation",
        isSelected: false,
        icon: "calculator",
    },
    {
        id: "results",
        hasCaret: false,
        isExpanded: false,
        label: "Results",
        isSelected: false,
        icon: "timeline-line-chart",
    },
    {
        id: "license",
        hasCaret: false,
        isExpanded: false,
        label: "License",
        isSelected: false,
        icon: "key",
    },
]