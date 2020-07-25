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