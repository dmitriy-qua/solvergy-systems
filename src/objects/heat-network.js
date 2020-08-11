export default class HeatNetwork {

    constructor(id, name, templateId, networkType) {
        this.id = id
        this.name = name
        this.templateId = templateId
        this.networkType = networkType
        this.properties = {
            isNew: null,
            specificHeatLossT1: null,
            specificHeatLossT2: null,
            fullHeatLoss: null,
            fullHydraulicLoss: null,
            thermalConductivityCoefficient: null,
        }
    }


    // public void SetTooltip()
    // {

    //     toolTipPanel.Children.Add(new TextBlock { Text = name, FontSize = 16, Margin = new Thickness(2) });
    //     toolTipPanel.Children.Add(new TextBlock { Text = "ID мережі - " + iD, Margin = new Thickness(2) });
    //     if (length.HasValue)
    //     {
    //         toolTipPanel.Children.Add(new TextBlock { Text = "Довжина труби: " + ((double)length).ToString("0.00") + " м", Margin = new Thickness(2) });
    //     }
    //     if (diameter.HasValue)
    //     {
    //         toolTipPanel.Children.Add(new TextBlock { Text = "Діаметр труби: " + diameter + " мм", Margin = new Thickness(2) });
    //     }
    //     if (pipeLayingType != null)
    //     {
    //         toolTipPanel.Children.Add(new TextBlock { Text = "Тип прокладки: " + pipeLayingType, Margin = new Thickness(2) });
    //     }
    //     if (materialType != null)
    //     {
    //         toolTipPanel.Children.Add(new TextBlock { Text = "Матеріал труби: " + materialType, Margin = new Thickness(2) });
    //     }
    //     if (isolationType != null)
    //     {
    //         toolTipPanel.Children.Add(new TextBlock { Text = "Матеріал ізоляції: " + isolationType, Margin = new Thickness(2) });
    //     }
    //     if (isolationThickness != null)
    //     {
    //         toolTipPanel.Children.Add(new TextBlock { Text = "Товщина ізоляції: " + isolationThickness + " мм", Margin = new Thickness(2) });
    //     }
    //     if (fullHeatLoss != null)
    //     {
    //         toolTipPanel.Children.Add(new TextBlock { Text = "Теплові втрати: " + ((double)fullHeatLoss).ToString("0.00") + " Гкал", Margin = new Thickness(2) });
    //     }
    // }


    // public void CalculateNetworkHeatLoss()
    // {
    //     if (length != null)
    //     {
    //         double R;
    //         double R0;
    //         double Rko;
    //         double tk;
    //         switch (pipeLayingTypeNum)
    //         {
    //             case 0:
    //                 pipeLayingType = "Надземна";
    //                 R = (1 / (2 * Math.PI * thermalConductivityCoefficient)) * Math.Log((((double)diameter / 1000) + ((double)isolationThickness / 1000) * 2) / ((double)diameter / 1000)) + (1 / (Math.PI * (((double)diameter / 1000) + ((double)isolationThickness / 1000) * 2) * (11.6 + 7 * Math.Sqrt(4.2))));
    //                 specificHeatLossT1 = ((double)Model.AverageT1 - (double)Model.AverageStreetTemperature) / R;
    //                 specificHeatLossT2 = ((double)Model.AverageT2 - (double)Model.AverageStreetTemperature) / R;
    //                 fullHeatLoss = (specificHeatLossT1 * (double)length + specificHeatLossT2 * (double)length) * 1.2 * (double)Model.HeatingPeriodDays * 24 * 0.86 * Math.Pow(10, -6);
    //                 break;
    //             case 1:
    //                 pipeLayingType = "Підземна (безканальна)";
    //                 R = (1 / (2 * Math.PI * thermalConductivityCoefficient)) * Math.Log((((double)diameter / 1000) + ((double)isolationThickness / 1000) * 2) / ((double)diameter / 1000)) + (1 / (2 * Math.PI * 1.05)) * Math.Log(4 * 1.6 / (((double)diameter / 1000) + ((double)isolationThickness / 1000) * 2));
    //                 R0 = (1 / (2 * Math.PI * 1.05)) * Math.Log(Math.Sqrt(1 + Math.Pow(2 * 1.6 / (((double)diameter / 1000) + ((double)isolationThickness / 1000) * 2) * 2, 2)));
    //                 specificHeatLossT1 = (((double)Model.AverageT1 - 2.7) * R - ((double)Model.AverageT2 - 2.7) * R0) / (R * R - R0 * R0);
    //                 specificHeatLossT2 = (((double)Model.AverageT2 - 2.7) * R - ((double)Model.AverageT1 - 2.7) * R0) / (R * R - R0 * R0);
    //                 fullHeatLoss = (specificHeatLossT1 * (double)length + specificHeatLossT2 * (double)length) * 1.2 * (double)Model.HeatingPeriodDays * 24 * 0.86 * Math.Pow(10, -6);
    //                 break;
    //             case 2:
    //                 pipeLayingType = "Підземна (канальна)";
    //                 R = (1 / (2 * Math.PI * thermalConductivityCoefficient)) * Math.Log((((double)diameter / 1000) + ((double)isolationThickness / 1000) * 2) / ((double)diameter / 1000)) + (1 / (Math.PI * (((double)diameter / 1000) + ((double)isolationThickness / 1000) * 2) * 11.6));
    //                 Rko = (1 / (2 * Math.PI * 0.45)) * Math.Log((((double)diameter / 1000) + ((double)isolationThickness / 1000) * 2) * 5 / ((double)diameter / 1000) * 5) + (1 / (2 * Math.PI * 1.05)) * Math.Log(4 * 1.6 / (((double)diameter / 1000) + ((double)isolationThickness / 1000) * 2) * 5);
    //                 tk = ((double)Model.AverageT1 / R + (double)Model.AverageT2 / R + 2.7 / Rko) / (1 / R + 1 / R + 1 / Rko);
    //                 //R0 = (1 / (2 * Math.PI * 0.024)) * Math.Log(Math.Sqrt(1 + Math.Pow(2 * 1.6 / (((double)diameter / 1000) + ((double)isolationThickness / 1000) * 2) * 2, 2)));
    //                 specificHeatLossT1 = ((double)Model.AverageT1 - tk) / R;
    //                 specificHeatLossT2 = ((double)Model.AverageT2 - tk) / R;
    //                 //specificHeatLossT1 = (((double)Model.AverageT1 - tk) * R - ((double)Model.AverageT2 - tk) * R0) / (R * R - R0 * R0);
    //                 //specificHeatLossT2 = (((double)Model.AverageT2 - tk) * R - ((double)Model.AverageT1 - tk) * R0) / (R * R - R0 * R0);
    //                 fullHeatLoss = (specificHeatLossT1 * (double)length + specificHeatLossT2 * (double)length) * 1.2 * (double)Model.HeatingPeriodDays * 24 * 0.86 * Math.Pow(10, -6);
    //                 break;
    //         }
    //         SetLineSize();
    //
    //         double w;
    //         double diametrInM = (double)diameter / 1000;
    //         w = (4 * (double)Model.AverageMassFlow * 1000 / 3600) / (Math.PI * 1000 * Math.Pow(diametrInM, 2));
    //
    //         Console.WriteLine("Skorost - " + w);
    //
    //         double Re;
    //         Re = (w * ((double)diameter / 1000)) / (0.5 * Math.Pow(10, -6));
    //
    //         Console.WriteLine("Reynolds - " + Re);
    //
    //         double lambda;
    //         //lambda = 64 / Re;
    //         lambda = 0.11 * Math.Pow(0.0005 / diametrInM, 0.25);
    //
    //         Console.WriteLine("lmbda - " + lambda);
    //
    //         double hl;
    //         hl = ((lambda * (double)length) / ((double)diameter / 1000)) * ((Math.Pow(w, 2)) / (2 * 9.81));
    //
    //         double hm;
    //         hm = (1) * ((Math.Pow(w, 2)) / (2 * 9.81));
    //
    //         double hs;
    //         hs = hl + hm;
    //
    //         Console.WriteLine("Napor - " + hs);
    //
    //         fullHydraulicLoss = 2 * hs;
    //
    //
    //     }
    //     else
    //     {
    //         MessageBox.Show("Необхідно задати масштаб карти!", "Помилка", MessageBoxButton.OK, MessageBoxImage.Warning);
    //     }

}