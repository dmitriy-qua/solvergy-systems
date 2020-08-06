const setCoefficients = (capitalCostsCoefficient, salaryForWorkersCoefficient, salaryForAdministrationCoefficient, otherCostsCoefficient) => {
    return {
        capitalCostsCoefficient,
        salaryForWorkersCoefficient,
        salaryForAdministrationCoefficient,
        otherCostsCoefficient
    }
}

export const energySources = [
    {
        name: "Solar (PV)",
        energySourceCoefficients: setCoefficients(0.8, 0.6, 0.6, 0.3)
    },
    {
        name: "Solar (Heliosystems)",
        energySourceCoefficients: setCoefficients(0.8, 0.6, 0.6, 0.3)
    },
    {
        name: "Biomass (wood chips)",
        energySourceCoefficients: setCoefficients(0.7, 0.85, 0.6, 0.65)
    },
    {
        name: "Biomass (wood pellets)",
        energySourceCoefficients: setCoefficients(0.6, 0.8, 0.6, 0.6)
    },
    {
        name: "Biomass (firewood)",
        energySourceCoefficients: setCoefficients(0.65, 0.9, 0.55, 0.5)
    },
    {
        name: "Biomass (sunflower pellets)",
        energySourceCoefficients: setCoefficients(0.65, 0.85, 0.6, 0.65)
    },
    {
        name: "Biomass (sunflower husk)",
        energySourceCoefficients: setCoefficients(0.6, 0.8, 0.6, 0.55)
    },
    {
        name: "Biomass (straw pellets)",
        energySourceCoefficients: setCoefficients(0.65, 0.85, 0.6, 0.65)
    },
    {
        name: "Biomass (straw bales)",
        energySourceCoefficients: setCoefficients(0.6, 0.8, 0.6, 0.5)
    },
    {
        name: "Biogas",
        energySourceCoefficients: setCoefficients(0.65, 0.7, 0.6, 0.55)
    },
    {
        name: "Solid waste",
        energySourceCoefficients: setCoefficients(0.7, 0.87, 0.6, 0.5)
    },
    {
        name: "Wind Energy",
        energySourceCoefficients: setCoefficients(0.85, 0.35, 0.6, 0.3)
    },
    {
        name: "Water energy",
        energySourceCoefficients: setCoefficients(0.85, 0.35, 0.6, 0.35)
    },
    {
        name: "Environmental energy (heat pumps)",
        energySourceCoefficients: setCoefficients(0.8, 0.33, 0.6, 0.45)
    },
    {
        name: "Natural gas",
        energySourceCoefficients: setCoefficients(0.55, 0.5, 0.6, 0.4)
    },
    {
        name: "Brown coal",
        energySourceCoefficients: setCoefficients(0.65, 0.8, 0.6, 0.45)
    },
    {
        name: "Coal",
        energySourceCoefficients: setCoefficients(0.6, 0.8, 0.6, 0.4)
    },
    {
        name: "Peat",
        energySourceCoefficients: setCoefficients(0.75, 0.85, 0.65, 0.5)
    },
    {
        name: "Peat pellets",
        energySourceCoefficients: setCoefficients(0.7, 0.8, 0.65, 0.55)
    },

]