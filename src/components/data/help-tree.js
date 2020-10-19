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
        icon: "user",
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
        id: "templates",
        hasCaret: true,
        isExpanded: false,
        label: "Templates",
        isSelected: false,
        icon: "layers",
        childNodes: [
            {
                id: "supplierstemplates",
                hasCaret: false,
                isExpanded: false,
                label: "Suppliers",
                isSelected: false,
            },
            {
                id: "networkstemplates",
                hasCaret: false,
                isExpanded: false,
                label: "Networks",
                isSelected: false,
            },
        ]
    },
    {
        id: "producers",
        hasCaret: false,
        isExpanded: false,
        label: "Producers",
        isSelected: false,
        icon: "people",
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
                hasCaret: false,
                isExpanded: false,
                label: "Consumers",
                isSelected: false,
            },
            {
                id: "suppliers",
                hasCaret: false,
                isExpanded: false,
                label: "Suppliers",
                isSelected: false,
            },
            {
                id: "networks",
                hasCaret: false,
                isExpanded: false,
                label: "Networks",
                isSelected: false,
            },
        ]
    },
    {
        id: "polygons",
        hasCaret: false,
        isExpanded: false,
        label: "Polygons analyzer",
        isSelected: false,
        icon: "polygon-filter",
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
    // {
    //     id: "results",
    //     hasCaret: false,
    //     isExpanded: false,
    //     label: "Results",
    //     isSelected: false,
    //     icon: "timeline-line-chart",
    // },
    // {
    //     id: "license",
    //     hasCaret: false,
    //     isExpanded: false,
    //     label: "License",
    //     isSelected: false,
    //     icon: "key",
    // },
]