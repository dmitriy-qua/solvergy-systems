export default class Supplier {

    constructor(id, name, shape, producerId, templateId) {
        this.id = id
        this.name = name
        this.shape = shape
        this.producerId = producerId
        this.templateId = templateId

        this.properties = {
            energySourceTypeNumber: null,
            energySourceType: null,
            capitalFixedCosts: null,
            capitalVariableCostsPerOneMW: null,
            capacity: null,
            totalCapitalCosts: null,
            capitalCostsCoefficient: null,
            capitalConstantCostPerCapacity: null,
            fuelConsumption: null,
            fuelCost: null,
            fuelVariableCostsPerGcal: null,
            logisticsVariableCostsPerGcal: null,
            powerVariableCostsPerGcal: null,
            salaryForWorkersFixedCosts: null,
            salaryForWorkersCoefficient: null,
            salaryForWorkersConstantPerCapacity: null,
            salaryForAdministrationFixedCosts: null,
            salaryForAdministrationCoefficient: null,
            salaryForAdministrationConstantPerCapacity: null,
            otherFixedCosts: null,
            otherCostsCoefficient: null,
            otherCostsConstantPerCapacity: null,
            depreciationFixedCosts: null,
            depreciationYears: null,
            totalForecastedVariableCosts: null,
            totalForecastedFixedCosts: null,
            totalForecastedCosts: null,
            totalForecastedProfit: null,
            forecastedTariff: null,
            rateOfReturn: null,
            productionPotentialPerMonth: null,
            bidGcalAmount: null,
            annualBidGcalAmount: null,
            relativeCapacityToProducerMax: null,
            bufCapacity: null
        }
    }

    updateName = (name) => {
        this.name = name
    }


    // SetTooltip()
//     toolTipPanel.Children.Add(new TextBlock { Text = name, FontSize = 16, Margin = new Thickness(2) })
// toolTipPanel.Children.Add(new TextBlock { Text = "ID об'єкта - " + iD, Margin = new Thickness(2) })
// toolTipPanel.Children.Add(new TextBlock { Text = "Назва підприємства: " + producerName, Margin = new Thickness(2) })
// toolTipPanel.Children.Add(new TextBlock { Text = "Статус виробника: " + isMainProducer, Margin = new Thickness(2) })
// //if (capitalCostsCoefficient != null)
//{
//    toolTipPanel.Children.Add(new TextBlock { Text = "Коефіцієнт: " + capitalCostsCoefficient, Margin = new Thickness(2) })
//}




    // CalculateSupplierCosts()
    // {
    //     // Счетчик успешных подсчетов
    //     int i = 0
    //     if (energySourceTypeNum != null)
    //     {
    //         // Расчет полных капитальных затрат
    //         if (capitalFixedCosts != null && capitalConstantCostPerCapacity != null && capacity != null)
    //         {
    //             capitalVariableCostsPerOneMW = ((double)capitalConstantCostPerCapacity * Math.Pow((double)capacity, (double)capitalCostsCoefficient)) / (double)capacity
    //             totalCapitalCosts = (double)capitalFixedCosts + capitalVariableCostsPerOneMW * (double)capacity
    //             i++
    //         }
    //
    //         // Расчет затрат на топливо
    //         if (fuelConsumption != null && fuelCost != null)
    //         {
    //             fuelVariableCostsPerGcal = (double)fuelConsumption * (double)fuelCost
    //             i++
    //         }
    //
    //         // Расчет логистических затрат
    //         if (logisticsVariableCostsPerGcal != null)
    //         {
    //             i++
    //         }
    //
    //         // Расчет затрат на ЄЄ
    //         if (powerVariableCostsPerGcal != null)
    //         {
    //             i++
    //         }
    //
    //         // Расчет затрат ЗП для работников
    //         if (salaryForWorkersConstantPerCapacity != null && capacity != null)
    //         {
    //             salaryForWorkersFixedCosts = (double)salaryForWorkersConstantPerCapacity * Math.Pow((double)capacity, (double)SalaryForWorkersCoefficient)
    //             i++
    //         }
    //
    //         // Расчет затрат для администрации
    //         if (salaryForAdministrationConstantPerCapacity != null && capacity != null)
    //         {
    //             salaryForAdministrationFixedCosts = (double)salaryForAdministrationConstantPerCapacity * Math.Pow((double)capacity, (double)SalaryForAdministrationCoefficient)
    //             i++
    //         }
    //
    //         // Расчет других затрат
    //         if (otherCostsConstantPerCapacity != null && capacity != null)
    //         {
    //             otherFixedCosts = (double)otherCostsConstantPerCapacity * Math.Pow((double)capacity, (double)otherCostsCoefficient)
    //             i++
    //         }
    //
    //         // Расчет затрат на амортизацию
    //         if (depreciationYears != null && totalCapitalCosts != null)
    //         {
    //             depreciationFixedCosts = (double)totalCapitalCosts / (double)depreciationYears
    //             i++
    //         }
    //
    //         if (i == 8)
    //         {
    //             totalForecastedVariableCosts = fuelVariableCostsPerGcal + (double)logisticsVariableCostsPerGcal + (double)powerVariableCostsPerGcal
    //             totalForecastedFixedCosts = salaryForAdministrationFixedCosts + salaryForWorkersFixedCosts + depreciationFixedCosts + otherFixedCosts
    //             return true
    //         }
    //         else
    //         {
    //             return false
    //         }
    //     }
    //     else
    //     {
    //         return false
    //     }
    //
    // }

    // public void CalculateBids()
    // {
    //     if (capacity != null)
    //     {
    //         annualBidGcalAmount = 0;
    //         productionPotentialPerMonth = (double)capacity * 31 * 24 * 0.86;
    //         for (int i = 0; i < 12; i++)
    //         {
    //             if (!isMainProducer)
    //             {
    //                 if (productionPotentialPerMonth > Model.MaxMonthlyEnergyMarketShareForSupplier[i] * relativeCapacityToProducerMax)
    //                 {
    //                     bidGcalAmount[i] = (double)Model.MaxMonthlyEnergyMarketShareForSupplier[i] * relativeCapacityToProducerMax;
    //                 }
    //                 else
    //                 {
    //                     bidGcalAmount[i] = productionPotentialPerMonth;
    //                 }
    //
    //             }
    //             else
    //             {
    //                 if (productionPotentialPerMonth > Model.TotalMonthlyEnergyProduction[i] * relativeCapacityToProducerMax)
    //                 {
    //                     bidGcalAmount[i] = (double)Model.TotalMonthlyEnergyProduction[i] * relativeCapacityToProducerMax;
    //                 }
    //                 else
    //                 {
    //                     bidGcalAmount[i] = productionPotentialPerMonth;
    //                 }
    //
    //             }
    //             annualBidGcalAmount += bidGcalAmount[i];
    //         }
    //     }
    //     else
    //     {
    //         MessageBox.Show("Необхідно вказати потужність всіх виробників!", "Помилка", MessageBoxButton.OK, MessageBoxImage.Warning);
    //     }

    //}

    // public void CalculateForecastedParameters()
    // {
    //     if (totalCapitalCosts != null && rateOfReturn != null)
    //     {
    //         totalForecastedProfit = (double)totalCapitalCosts * (double)rateOfReturn / 100;
    //         totalForecastedCosts = totalForecastedVariableCosts * annualBidGcalAmount + totalForecastedFixedCosts;
    //         forecastedTariff = (totalForecastedCosts + totalForecastedProfit) / annualBidGcalAmount;
    //     }
    //
    // }


}