'use client'

import { fetchJson } from '../../utils/methods/api'
import {
    type IDogBreedsApiResponse,
    type TDogBreedImagesMessage,
} from '../../utils/models/dog-breeds.model'
import { NotificationContext } from '../notification/notification.provider'
import { type IBreedContext } from './breed.definitions'
import { createContext, use, useState } from 'react'

export const BreedContext = createContext<IBreedContext | null>(null)

const BreedProvider = ({ children }: React.PropsWithChildren) => {
    const notificationContext = use(NotificationContext)

    // #region - States
    const [_selectedBreed, _setSelectedBreed] = useState<string>()
    const [_images, _setImages] = useState<Record<string, string[]>>({})
    const [_isLoading, _setIsLoading] = useState<IBreedContext['isLoading']>(false)
    // #endregion

    // #region - Methods
    const fetchBreedImages = async ({
        breed,
        force,
    }: {
        breed: string
        force?: boolean
    }): Promise<IBreedContext['selectedBreedImages']> => {
        _setSelectedBreed(breed)

        if (_images[breed]?.length > 0 && !force) return _images[breed]

        _setIsLoading(true)

        try {
            const formattedBreed = breed.includes('-')
                ? `${breed.split('-')[1]}/${breed.split('-')[0]}`
                : breed

            const images = await fetchJson<
                IDogBreedsApiResponse<TDogBreedImagesMessage>
            >({
                url: `${
                    import.meta.env.VITE_API_BASE_URL
                }/breed/${formattedBreed}/images/random/3`,
            })

            if (!images.ok) {
                notificationContext?.addSnackbar({
                    message: images.error,
                    state: 'danger',
                })

                _setIsLoading(false)

                return []
            }

            _setImages({
                ..._images,
                [breed]: images.data.message,
            })

            _setIsLoading(false)

            return images.data.message
        } catch (error) {
            console.error('Failed to fetch breed images', error)

            _setIsLoading(false)

            notificationContext?.addSnackbar({
                message: `${error}`,
                state: 'danger',
            })

            return []
        }
    }
    // #endregion

    // #region - Value
    const value: IBreedContext = {
        // Data
        selectedBreedImages: _images[_selectedBreed || ''],
        isLoading: _isLoading,

        // Methods
        fetchBreedImages,
    }
    // #endregion

    // Markup
    return (
        <BreedContext.Provider value={value}>{children}</BreedContext.Provider>
    )
    // #endregion
}

export default BreedProvider
