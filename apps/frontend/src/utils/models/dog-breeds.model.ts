// #region - Types
/**
 * The response message for the breeds listing API endpoint.
 */
type TDogBreedsMessage = Record<string, string[]>
/**
 * The response message for the breed single image API endpoint.
 */
type TDogBreedImageMessage = string
/**
 * The response message for the breed image list API endpoint.
 */
type TDogBreedImagesMessage = string[]
// #endregion

// #region - Interfaces
/**
 * A generic interface the represents the response for API calls made for the dog breed data.
 */
interface IDogBreedsModel<T> {
    /**
     * The response message returned.
     * This is generic because the response message differs for different endpoints.
     */
    message: T
    /**
     * The API response status.
     */
    status: string
}
// #endregion

// #region - Exports
export type {
    IDogBreedsModel,
    TDogBreedsMessage,
    TDogBreedImageMessage,
    TDogBreedImagesMessage,
}
// #endregion
