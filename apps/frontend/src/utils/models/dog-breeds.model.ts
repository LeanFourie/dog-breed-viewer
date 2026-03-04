interface IDogBreedsApiResponse<T> {
    message: T
    status: string
}

type TDogBreedsMessage = Record<string, string[]>
type TDogBreedImageMessage = string
type TDogBreedImagesMessage = string[]

export type {
    IDogBreedsApiResponse,
    TDogBreedsMessage,
    TDogBreedImageMessage,
    TDogBreedImagesMessage,
}
