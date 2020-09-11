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

export const getMonthInfo = (monthKey) => {
    switch (monthKey) {
        case "1":
            return {name: "JAN", fullName: "January", number: 1, daysCount: 31}
        case "2":
            return {name: "FEB", fullName: "February", number: 2, daysCount: 28}
        case "3":
            return {name: "MAR", fullName: "March", number: 3, daysCount: 31}
        case "4":
            return {name: "APR", fullName: "April", number: 4, daysCount: 30}
        case "5":
            return {name: "MAY", fullName: "May", number: 5, daysCount: 31}
        case "6":
            return {name: "JUN", fullName: "June", number: 6, daysCount: 30}
        case "7":
            return {name: "JUL", fullName: "July", number: 7, daysCount: 31}
        case "8":
            return {name: "AUG", fullName: "August", number: 8, daysCount: 31}
        case "9":
            return {name: "SEP", fullName: "September", number: 9, daysCount: 30}
        case "10":
            return {name: "OCT", fullName: "October", number: 10, daysCount: 31}
        case "11":
            return {name: "NOV", fullName: "November", number: 11, daysCount: 30}
        case "12":
            return {name: "DEC", fullName: "December", number: 12, daysCount: 31}
    }
}
