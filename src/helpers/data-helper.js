const MIN = 99, MAX = 999999

export const generateId = () => {
    return new Date().getTime() + Math.floor(Math.random() * (MAX - MIN + 1)) + MIN
}