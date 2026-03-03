function trimLowercase(value: string): string {
    return value.trim().toLowerCase()
}

function stringToKey(value: string): string {
    return trimLowercase(value).replaceAll(' ', '-')
}

function capitalizeFirstLetter(string: string): string {
    return `${string.charAt(0).toUpperCase()}${string.slice(1)}`
}

export { capitalizeFirstLetter, stringToKey, trimLowercase }
