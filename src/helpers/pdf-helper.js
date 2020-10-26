import html2canvas from "html2canvas";

const getImageCapture = async (id, width, scale = 3) => {
    const options = {dpi: 300, scale}
    const captureDiv = document.getElementById(id)
    const captureImg = await html2canvas(captureDiv, options)
    const img = captureImg.toDataURL("image/jpeg", 1)
    const imageScale = captureImg.width / width

    return {
        img,
        height: captureImg.height / imageScale
    }
}

export const generateFrontPage = async (doc, padding, widthWithPadding, project) => {
    doc.addImage(require('./../assets/images/logo-solvergy.png'), 'JPEG', padding, padding, 40, 40)
    doc.addImage(require('./../assets/images/solvergy-systems-logo.png'), 'JPEG', 304, 100, 22, 22)
    doc.setFontSize(22)
    doc.text( `Solvergy: Systems`, 315, 148, 'center')
    doc.setFontSize(20)
    doc.text( `Report`, 315, 180, 'center')
    doc.setFontSize(22)
    doc.text( `Project name: ${project.info.name}`, 315, 240, 'center')
    doc.setFontSize(18)
    doc.text( `Location: ${project.info.location}`, 315, 270, 'center' )
    doc.setFontSize(14)
    doc.text( `Model type: ${project.type.modelType}`, 315, 300, 'center' )
}

export const generateEnergyAmountPage = async (doc, padding, widthWithPadding, position = 1) => {
    doc.addPage()
    doc.setFontSize(16)
    doc.text(`${position}. Energy amounts`, padding, padding)

    const energyAmountsDescription = await getImageCapture("energy-amounts-description", widthWithPadding)
    const energyAmountsChart = await getImageCapture("energy-amounts", widthWithPadding)

    doc.addImage(energyAmountsDescription.img, 'JPEG', padding, 50, widthWithPadding, energyAmountsDescription.height)
    doc.addImage(energyAmountsChart.img, 'JPEG', padding, 130, widthWithPadding, energyAmountsChart.height)
}

export const generateNetworksLossesPage = async (doc, padding, widthWithPadding, position = 2) => {
    doc.addPage()
    doc.setFontSize(16)
    doc.text(`${position}. Networks losses`, padding, padding)

    const networksLossesDescription = await getImageCapture("networks-losses-description", widthWithPadding)
    const monthlyNetworksLossesDescription = await getImageCapture("monthly-networks-losses-description", widthWithPadding / 2)
    const monthlyNetworksLossesChart = await getImageCapture("monthly-networks-losses-chart", widthWithPadding / 2)
    const monthlyElectricityConsumptionDescription = await getImageCapture("monthly-electricity-consumption-description", widthWithPadding / 2)
    const monthlyElectricityConsumptionChart = await getImageCapture("monthly-electricity-consumption-chart", widthWithPadding / 2)

    doc.addImage(networksLossesDescription.img, 'JPEG', padding, 50, widthWithPadding, networksLossesDescription.height)
    doc.addImage(monthlyNetworksLossesDescription.img, 'JPEG', padding, 120, widthWithPadding / 2, monthlyNetworksLossesDescription.height)
    doc.addImage(monthlyNetworksLossesChart.img, 'JPEG', padding, 140, widthWithPadding / 2, monthlyNetworksLossesChart.height)
    doc.addImage(monthlyElectricityConsumptionDescription.img, 'JPEG', padding + 290, 120, widthWithPadding / 2, monthlyElectricityConsumptionDescription.height)
    doc.addImage(monthlyElectricityConsumptionChart.img, 'JPEG', padding + 290, 140, widthWithPadding / 2, monthlyElectricityConsumptionChart.height)
}

export const generateProducersFinancialResultPage = async (doc, padding, widthWithPadding, producers, position = 3) => {
    doc.addPage()
    doc.setFontSize(16)
    doc.text(`${position}. Producers financial result`, padding, padding)
    doc.setFontSize(14)

    let pageNumber = 0
    const producersPerPage = 3
    for (let i = 0; i < producers.length; i++) {
        doc.text(producers[i].name, padding, 80 + 120 * (i - pageNumber * producersPerPage) - 10)
        const producerTable = await getImageCapture(`producer${i+1}`, widthWithPadding, 10)
        doc.addImage(producerTable.img, 'JPEG', padding, 80 + 120 * (i - pageNumber * producersPerPage), widthWithPadding, producerTable.height)

        if ((i+1) % producersPerPage === 0 && i !== producers.length - 1) {
            pageNumber++
            doc.addPage()
            doc.setFontSize(16)
            doc.text("3. Producers financial result (continuation)", padding, padding)
            doc.setFontSize(14)
        }
    }
}

export const generateMainProducerFinancialResultPage = async (doc, padding, widthWithPadding, producers, position = 3) => {
    doc.addPage()
    doc.setFontSize(16)
    doc.text(`${position}. Main producer financial result`, padding, padding)
    doc.setFontSize(14)

    const mainProducer = producers.find(producer => producer.id = "main_producer")

    doc.text(mainProducer.name, padding, 70)
    const producerTable = await getImageCapture(`main-producer-financial-result`, widthWithPadding, 10)
    doc.addImage(producerTable.img, 'JPEG', padding, 80, widthWithPadding, producerTable.height)
}

export const generateTariffsWithMarketPage = async (doc, padding, widthWithPadding, position = 4) => {
    doc.addPage()
    doc.setFontSize(16)
    doc.text(`${position}. Tariffs`, padding, padding)

    const tariffsDescription = await getImageCapture("tariffs-with-market-description", widthWithPadding)
    const tariffsChart = await getImageCapture("tariffs-with-market-chart", widthWithPadding)

    doc.addImage(tariffsDescription.img, 'JPEG', padding, 50, widthWithPadding, tariffsDescription.height)
    doc.addImage(tariffsChart.img, 'JPEG', padding, 130, widthWithPadding, tariffsChart.height)
}

export const generateTariffsPage = async (doc, padding, widthWithPadding, position = 4) => {
    doc.addPage()
    doc.setFontSize(16)
    doc.text(`${position}. Tariffs`, padding, padding)

    const tariffsDescription = await getImageCapture("tariffs-description", widthWithPadding)
    const tariffsChart = await getImageCapture("tariffs-chart", widthWithPadding)

    doc.addImage(tariffsDescription.img, 'JPEG', padding, 50, widthWithPadding, tariffsDescription.height)
    doc.addImage(tariffsChart.img, 'JPEG', padding, 130, widthWithPadding, tariffsChart.height)
}

export const generateMarketEfficiencyPage = async (doc, padding, widthWithPadding, position = 5) => {
    doc.addPage()
    doc.setFontSize(16)
    doc.text(`${position}. Market efficiency`, padding, padding)

    const marketEfficiencyDescription = await getImageCapture("market-efficiency-description", widthWithPadding)
    const marketEfficiencyRelativeDescription = await getImageCapture("market-efficiency-relative-description", widthWithPadding / 2)
    const marketEfficiencyRelativeChart = await getImageCapture("market-efficiency-relative-chart", widthWithPadding / 2)
    const marketEfficiencyAbsoluteDescription = await getImageCapture("market-efficiency-absolute-description", widthWithPadding / 2)
    const marketEfficiencyAbsoluteChart = await getImageCapture("market-efficiency-absolute-chart", widthWithPadding / 2)

    doc.addImage(marketEfficiencyDescription.img, 'JPEG', padding, 50, widthWithPadding, marketEfficiencyDescription.height)
    doc.addImage(marketEfficiencyRelativeDescription.img, 'JPEG', padding, 120, widthWithPadding / 2, marketEfficiencyRelativeDescription.height)
    doc.addImage(marketEfficiencyRelativeChart.img, 'JPEG', padding, 140, widthWithPadding / 2, marketEfficiencyRelativeChart.height)
    doc.addImage(marketEfficiencyAbsoluteDescription.img, 'JPEG', padding + 290, 120, widthWithPadding / 2, marketEfficiencyAbsoluteDescription.height)
    doc.addImage(marketEfficiencyAbsoluteChart.img, 'JPEG', padding + 290, 140, widthWithPadding / 2, marketEfficiencyAbsoluteChart.height)
}

export const generateMarketEfficiencyOptimizationPage = async (doc, padding, widthWithPadding, position = 5) => {
    doc.addPage()
    doc.setFontSize(16)
    doc.text(`${position}. Market efficiency (optimization)`, padding, padding)

    const marketEfficiencyRelativeOptimizationDescription = await getImageCapture("market-efficiency-relative-optimization-description", widthWithPadding / 2)
    const marketEfficiencyRelativeOptimizationChart = await getImageCapture("market-efficiency-relative-optimization-chart", widthWithPadding / 2)
    const marketEfficiencyAbsoluteOptimizationDescription = await getImageCapture("market-efficiency-absolute-optimization-description", widthWithPadding / 2)
    const marketEfficiencyAbsoluteOptimizationChart = await getImageCapture("market-efficiency-absolute-optimization-chart", widthWithPadding / 2)

    doc.addImage(marketEfficiencyRelativeOptimizationDescription.img, 'JPEG', padding, 50, widthWithPadding / 2, marketEfficiencyRelativeOptimizationDescription.height)
    doc.addImage(marketEfficiencyRelativeOptimizationChart.img, 'JPEG', padding, 70, widthWithPadding / 2, marketEfficiencyRelativeOptimizationChart.height)
    doc.addImage(marketEfficiencyAbsoluteOptimizationDescription.img, 'JPEG', padding + 290, 50, widthWithPadding / 2, marketEfficiencyAbsoluteOptimizationDescription.height)
    doc.addImage(marketEfficiencyAbsoluteOptimizationChart.img, 'JPEG', padding + 290, 70, widthWithPadding / 2, marketEfficiencyAbsoluteOptimizationChart.height)
}

export const generateNetPresentValuePage = async (doc, padding, widthWithPadding, position = 6) => {
    doc.addPage()
    doc.setFontSize(16)
    doc.text(`${position}. Net present value`, padding, padding)

    const netpresentvalueDescription = await getImageCapture("netpresentvalue-description", widthWithPadding)
    const netpresentvalueChart = await getImageCapture("netpresentvalue-chart", widthWithPadding)

    doc.addImage(netpresentvalueDescription.img, 'JPEG', padding, 50, widthWithPadding, netpresentvalueDescription.height)
    doc.addImage(netpresentvalueChart.img, 'JPEG', padding, 130, widthWithPadding, netpresentvalueChart.height)
}

