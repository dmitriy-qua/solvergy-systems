const MIN = 99, MAX = 999999

export const generateId = () => {
    return new Date().getTime() + Math.floor(Math.random() * (MAX - MIN + 1)) + MIN
}

export const handleInputValueChange = (setValue ,setHasError) => value => {
    setHasError(false)
    setValue(value)
    if (!value) {
        setHasError(true)
    }
}

export const handleFileInputValueChange = (setValue ,setHasError) => e => {
    setHasError(false)
    setValue(e.target.files[0].path)
    if (!e.target.files[0].path) {
        setHasError(true)
    }
}

export const updateObjectKey = (listToUpdate, selectedItem, value, valueKey) => {
    const objectIndex = listToUpdate.findIndex(item => item.id === selectedItem.id)

    const updatedObject = {
        ...listToUpdate[objectIndex],
        [valueKey]: value
    }

    const updatedList = [
        ...listToUpdate.slice(0, objectIndex),
        updatedObject,
        ...listToUpdate.slice(objectIndex + 1),

    ]

   return updatedList
}

export const updateObject = (listToUpdate, selectedItemId, newData) => {
    const objectIndex = listToUpdate.findIndex(item => item.id === selectedItemId)

    const updatedObject = {
        ...listToUpdate[objectIndex],
        ...newData
    }

    const updatedList = [
        ...listToUpdate.slice(0, objectIndex),
        updatedObject,
        ...listToUpdate.slice(objectIndex + 1),

    ]

    return updatedList
}

export const getLocationString = (city) => {
    if (city) {

        let locationString = ""

        if (city[0].city) {
            locationString += city[0].city + ", "
        }

        if (city[0].street) {
            locationString += city[0].street + ", "
        }

        if (city[0].name) {
            locationString += city[0].name
        }

        return locationString
    } else {
        return "Set location..."
    }
}
