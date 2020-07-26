export default class Producer {

    constructor(id, name) {
        this.id = id
        this.name = name
        this.properties = {
            isMainProducer: null,
            maxCapacity: null,
            fullCapacity: null,
            fullTotalForecastedCost: null,
            fullTotalForecastedProfit: null,
            fullAnnualBidEnergyProduction: null,
            weightAverageForecastedTariff: null,
            totalForecastedVariableCost: null,
            totalForecastedFixedCost: null,
            totalForecastedCost: null,
            totalForecastedProfit: null,
            annualBidGcalProduction: null,
            forecastedTariff: null,
            totalVariableCosts: null,
            totalFixedCosts: null,
            totalCosts: null,
            totalRevenue: null,
            totalProfit: null,
            tariff: null,
            profitability: null,
            totalProfitDifference: null,
            productionPotentialPerMonth: null,
            bidGcalAmount: null,
            annualBidGcalAmount: null,
            winningBidGcalAmount: null,
            annualWinningBidGcalAmount: null,
            suppliersQuantity: null,
        }
    }

    updateName = (name) => {
        this.name = name
    }

}