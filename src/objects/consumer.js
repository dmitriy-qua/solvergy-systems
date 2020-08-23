export default class Consumer {

    constructor(id, name, consumption, importFromSolvergyBuildings, buildingsResult) {
        this.id = id
        this.name = name
        this.properties = {importFromSolvergyBuildings, consumption, buildingsResult}
    }
}