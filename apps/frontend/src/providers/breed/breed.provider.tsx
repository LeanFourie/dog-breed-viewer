'use client'

import { fetchJson } from '../../utils/methods/api'
import {
    type IDogBreedsModel,
    type TDogBreedImagesMessage,
} from '../../utils/models/dog-breeds.model'
import { NotificationContext } from '../notification/notification.provider'
import { type IBreedContext } from './breed.definitions'
import { createContext, use, useState } from 'react'

export const BreedContext = createContext<IBreedContext | null>(null)

const BreedProvider = ({ children }: React.PropsWithChildren) => {
    // #region - States
    /**
     * The currently selected dog breed.
     * This is used to:
     * - Display the correct breed information
     * - Load the images for the current viewed breed.
     * - Load next / prev dog breeds.
     */
    const [_selectedBreed, _setSelectedBreed] = useState<string>()
    /**
     * The images of the currently selected dog breed.
     */
    const [_images, _setImages] = useState<Record<string, string[]>>({})
    /**
     * Whether the breed images are currently loading.
     */
    const [_isLoading, _setIsLoading] = useState<IBreedContext['isLoading']>(false)
    // #endregion
    
    // #region - Hooks
    /**
     * The notification context to show error messages.
     */
    const notificationContext = use(NotificationContext)
    // #endregion

    // #region - Methods
    /**
     * Fetch the images of a specific dog breed.
     * @param breed - The name of the dog breed.
     * @param force - Whether to force the fetch even if the data is already loaded.
     * @returns The images of the dog breed.
     */
    const fetchBreedImages = async ({
        breed,
        force,
    }: {
        breed: string
        force?: boolean
    }): Promise<IBreedContext['selectedBreedImages']> => {
        // Set the selected breed
        // This is so we can use it in the value
        _setSelectedBreed(breed)

        // Return the images if they are already loaded and not forced
        if (_images[breed]?.length > 0 && !force) return _images[breed]

        // Set the loading state to true
        // This is so we can show a loading indicator
        _setIsLoading(true)

        try {
            // Format the breed name
            // Some breeds have a different format than the API expects
            const formattedBreed = breed.includes('-')
                ? `${breed.split('-')[1]}/${breed.split('-')[0]}`
                : breed

            // Fetch the images from the API
            const images = await fetchJson<
                IDogBreedsModel<TDogBreedImagesMessage>
            >({
                url: `${
                    import.meta.env.VITE_API_BASE_URL
                }/breed/${formattedBreed}/images/random/3`,
            })

            // Handle API errors
            if (!images.ok) {
                // Log the error for debugging
                console.error('Failed to fetch breed images', images.error)

                // Show an error message if the API request fails
                notificationContext?.addSnackbar({
                    message: images.error,
                    state: 'danger',
                })

                // Remove the loader
                _setIsLoading(false)

                // Return an empty array so we do not crash the UI
                return []
            }

            // Store the images in the state
            _setImages({
                ..._images,
                [breed]: images.data.message,
            })

            // Remove the loader
            _setIsLoading(false)

            // Return the images
            return images.data.message
        } catch (error) {
            // Log the error for debugging
            console.error('Failed to fetch breed images', error)

            // Remove the loader
            _setIsLoading(false)

            // Show an error message if the API request fails
            notificationContext?.addSnackbar({
                message: `${error}`,
                state: 'danger',
            })

            // Return an empty array so we do not crash the UI
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

    // #region - Markup
    return (
        <BreedContext.Provider value={value}>{children}</BreedContext.Provider>
    )
    // #endregion
}

export default BreedProvider
