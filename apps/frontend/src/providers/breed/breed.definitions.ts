// #region - Interfaces
/**
 * The values to expose via the breed context.
 */
interface IBreedContext {
    // Data
    /**
     * The images of the currently selected dog breed.
     */
    selectedBreedImages: string[]
    /**
     * Whether the breed images are currently loading.
     */
    isLoading: boolean

    // Methods
    /**
     * Fetch the images of a specific dog breed.
     * @param args.breed - The name of the dog breed.
     * @param args.force - Whether to force the fetch even if the data is already loaded.
     * @returns The images of the dog breed.
     */
    fetchBreedImages: (args: {
        breed: string
        force?: boolean
    }) => Promise<string[]>
}
// #endregion

// #region - Exports
export type { IBreedContext }
// #endregion
