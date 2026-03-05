// #region - Interfaces
interface IBreedContext {
    // Data
    selectedBreedImages: string[]
    isLoading: boolean

    // Methods
    fetchBreedImages: (args: {
        breed: string
        force?: boolean
    }) => Promise<string[]>
}
// #endregion

// #region - Exports
export type { IBreedContext }
// #endregion
