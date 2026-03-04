'use client'

import { type IBreedsContext } from './breeds.definitions'
import { createContext, use, useCallback, useEffect, useState } from 'react'
import { fetchJson } from '../../utils/methods/api'
import {
    type DogBreedImageResponse,
    type DogBreedsResponse,
} from '../../utils/models/dog-breeds'

export const BreedsContext = createContext<IBreedsContext | null>(null)

const fetchDogBreedData = fetchJson<DogBreedsResponse>(
    `${import.meta.env.VITE_API_BASE_URL}/breeds/list/all`
)
const fetchDogBreedImage = (breed: string) =>
    fetchJson<DogBreedImageResponse>(
        `${import.meta.env.VITE_API_BASE_URL}/breed/${breed}/images/random`
    )

const BreedsProvider = ({ children }: React.PropsWithChildren) => {
    // #region - APIs
    const dogBreedData = use(fetchDogBreedData)
    // #endregion

    // #region - Variables
    const dogBreedList = Object.entries(dogBreedData.message)
        .flatMap(([breed, subBreeds]) =>
            subBreeds.length > 0
                ? subBreeds.map((sub) => `${sub} ${breed}`)
                : [breed]
        )
        .sort()
    // #endregion

    // #region - States
    const [_breedImages, _setBreedImages] = useState<Record<string, string>>({})
    const [_loadingImages, _setLoadingImages] = useState<Set<string>>(new Set())
    // #endregion

    // #region - Methods
    const getBreedImage = useCallback(
        async (breed: string): Promise<string | undefined> => {
            if (_breedImages[breed]) return _breedImages[breed]

            if (_loadingImages.has(breed)) return undefined

            _setLoadingImages((prev) => new Set(prev).add(breed))

            try {
                const formattedBreed = breed.includes(' ')
                    ? `${breed.split(' ')[1]}/${breed.split(' ')[0]}`
                    : breed

                const res = await fetchDogBreedImage(formattedBreed)

                _setBreedImages((prev) => ({
                    ...prev,
                    [breed]: res.message,
                }))

                return res.message
            } catch (error) {
                console.error('Failed to fetch breed image', error)
                return undefined
            } finally {
                _setLoadingImages((prev) => {
                    const next = new Set(prev)
                    next.delete(breed)
                    return next
                })
            }
        },
        [_breedImages, _loadingImages]
    )
    // #endregion

    // #region - Effects
    useEffect(() => {
        if (dogBreedList.length === 0) return

        getBreedImage(dogBreedList[0])
    }, [dogBreedList])
    // #endregion

    // #region - Value
    const value: IBreedsContext = {
        dogBreedList,
        breedImages: _breedImages,
        getBreedImage
    }
    // #endregion

    // Markup
    return (
        <BreedsContext.Provider value={value}>
            {children}
        </BreedsContext.Provider>
    )
    // #endregion
}

export default BreedsProvider
