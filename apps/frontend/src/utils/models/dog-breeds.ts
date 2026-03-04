interface DogBreedsResponse {
    message: Record<string, string[]>
    status: string
}

interface DogBreedImageResponse {
    message: string
    status: string
}

export type { DogBreedsResponse, DogBreedImageResponse }
