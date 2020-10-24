export const getLicenseRestrictions = (userLicense) => {
    switch (userLicense.pricingPlan.planName) {
        case "Free":
            return {
                maxProjectsCount: 1,
                canCalculate: false,
                canImportSolvergyBuildings: false,
                canAnalyzePolygons: false,
                canImportTemplates: false,
                networksCalculationResultIsDetailed: false,
                reports: false
            }
        case "Basic":
            return {
                maxProjectsCount: 3,
                canCalculate: true,
                canImportSolvergyBuildings: true,
                canAnalyzePolygons: false,
                canImportTemplates: false,
                networksCalculationResultIsDetailed: false,
                reports: false
            }
        case "Advanced":
            return {
                maxProjectsCount: 10,
                canCalculate: true,
                canImportSolvergyBuildings: true,
                canAnalyzePolygons: true,
                canImportTemplates: true,
                networksCalculationResultIsDetailed: false,
                reports: false
            }
        case "Professional":
            return {
                maxProjectsCount: 1000,
                canCalculate: true,
                canImportSolvergyBuildings: true,
                canAnalyzePolygons: true,
                canImportTemplates: true,
                networksCalculationResultIsDetailed: true,
                reports: true
            }
        default:
            return null
    }
}
