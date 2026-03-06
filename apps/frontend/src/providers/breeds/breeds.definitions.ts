// #region - Types
/**
 * The list of dog breeds with their corresponding image.
 */
type TBreedsList = { name: string; image: string }[]
// #endregion

// #region - Interfaces
/**
 * The values to expose via the breeds context.
 */
interface IBreedsContext {
    // Data
    /**
     * The complete list of all available dog breeds.
     */
    allBreeds: TBreedsList
    /**
     * The error message if the API request failed.
     * This is to show the message in a full page error.
     * The app won't work if there are no dog breeds to show.
     */
    apiError: string | undefined
    /**
     * The filtered list of dog breeds based on the search keyword.
     */
    filteredBreeds: TBreedsList
    /**
     * Whether the API request is loading.
     */
    isLoading: boolean
    /**
     * The search keyword used to filter the dog breeds.
     */
    searchKeyword: string

    // Methods
    /**
     * Fetch the list of all available dog breeds.
     * @param args.force - Whether to force the fetch even if the data is already loaded.
     */
    fetchBreeds: (args?: { force?: boolean }) => Promise<TBreedsList>
    /**
     * Fetch the display image of a specific dog breed.
     * @param args.breed - The name of the dog breed.
     * @param args.force - Whether to force the fetch even if the data is already loaded.
     */
    fetchBreedDisplayImage: (args: {
        breed: string
        force?: boolean
    }) => Promise<string>
    /**
     * Handle the search for dog breeds based on the keyword.
     * @param keyword - The search keyword to filter the dog breeds.
     */
    handleBreedSearch: (keyword: string) => void
}
// #endregion

// #region - Exports
export type { IBreedsContext }
// #endregion
