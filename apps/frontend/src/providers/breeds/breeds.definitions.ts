// #region - Interfaces
interface IBreedsContext {
    dogBreedList: string[]
    breedImages: Record<string, string>
    getBreedImage: (breed: string) => Promise<string | undefined>
}
// #endregion

// #region - Exports
export type { IBreedsContext }
// #endregion
