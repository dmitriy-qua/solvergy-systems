export default class Consumer {

    constructor(id, name, shape, consumption, importFromSolvergyBuildings, buildingsResult) {
        this.id = id
        this.name = name
        this.shape = shape
        this.properties = {importFromSolvergyBuildings, consumption, buildingsResult}
    }

    // SetTooltip()
    // {
    //
    //     toolTipPanel.Children.Add(new TextBlock { Text = name, FontSize = 16, Margin = new Thickness(2) });
    //     toolTipPanel.Children.Add(new TextBlock { Text = "ID споживача - " + iD, Margin = new Thickness(2) });
    //     if (consumption.HasValue)
    //     {
    //         toolTipPanel.Children.Add(new TextBlock { Text = "Річне споживання енергії: " + consumption + " Гкал", Margin = new Thickness(2) });
    //     }
    // }

}