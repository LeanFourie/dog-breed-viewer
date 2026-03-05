type TBreedsList = { name: string; image: string }[]

// #region - Interfaces
interface IBreedsContext {
    // Data
    allBreeds: TBreedsList
    apiError: string | undefined
    filteredBreeds: TBreedsList
    isLoading: boolean
    searchKeyword: string

    // Methods
    fetchBreeds: (args?: { force?: boolean }) => Promise<TBreedsList>
    fetchBreedDisplayImage: (args: {
        breed: string
        force?: boolean
    }) => Promise<string>
    handleBreedSearch: (keyword: string) => void

    // dogBreedList: string[]
    // dogBreedListError: string | null
    // filteredDogBreedList: string[]
    // breedImages: Record<string, string>
    // breedImageArray: Record<string, string[]>
    // searchKeyword: string
    // getBreedImage: (breed: string) => Promise<string | undefined>
    // searchBreedList: (keyword: string) => void
    // retryDogBreedList: () => void
    // fetchDogBreedImages: (breed: string) => Promise<string[] | undefined>
}
// #endregion

// #region - Exports
export type { IBreedsContext }
// #endregion
