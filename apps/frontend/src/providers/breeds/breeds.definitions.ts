// #region - Interfaces
interface IBreedsContext {
    dogBreedList: string[]
    dogBreedListError: string | null
    filteredDogBreedList: string[]
    breedImages: Record<string, string>
    breedImageArray: Record<string, string[]>
    getBreedImage: (breed: string) => Promise<string | undefined>
    searchBreedList: (keyword: string) => void
    retryDogBreedList: () => void
    fetchDogBreedImages: (breed: string) => Promise<string[] | undefined>
}
// #endregion

// #region - Exports
export type { IBreedsContext }
// #endregion
