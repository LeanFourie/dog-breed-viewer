// #region - Methods
/**
 * Lowercases string values and removes leading and trailing empty spaces.
 * @param value - The string value to be transformed.
 * @returns - The newly transformed string.
 */
function trimLowercase(value: string): string {
    return value.trim().toLowerCase()
}
/**
 * Transforms a string with empty spaces to a key value in kebab case.
 * @param value - The string value to be transformed.
 * @returns - The newly transformed string.
 */
function stringToKey(value: string): string {
    return trimLowercase(value).replaceAll(' ', '-')
}
/**
 * Transforms the first letter in a string into a capital letter.
 * @param value - The string value to be transformed.
 * @returns - The newly transformed string.
 */
function capitalizeFirstLetter(value: string): string {
    return `${value.charAt(0).toUpperCase()}${value.slice(1)}`
}
// #endregion

// #region - Exports
export { capitalizeFirstLetter, stringToKey, trimLowercase }
// #endregion
