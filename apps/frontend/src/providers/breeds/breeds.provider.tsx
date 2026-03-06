'use client'

import { type IBreedsContext } from './breeds.definitions'
import {
    createContext,
    use,
    useEffect,
    useState,
} from 'react'
import { fetchJson } from '../../utils/methods/api'
import {
    type IDogBreedsModel,
    type TDogBreedsMessage,
    type TDogBreedImageMessage,
} from '../../utils/models/dog-breeds.model'
import { trimLowercase } from '../../utils/methods/strings'
import { NotificationContext } from '../notification/notification.provider'

export const BreedsContext = createContext<IBreedsContext | null>(null)

const BreedsProvider = ({ children }: React.PropsWithChildren) => {
    // #region - States
    /**
     * The list of all dog breeds fetched from the API.
     */
    const [_allBreeds, _setAllBreeds] = useState<IBreedsContext['allBreeds']>(
        []
    )
    /**
     * The list of dog breeds filtered by the search keyword.
     */
    const [_filteredBreeds, _setFilteredBreeds] = useState<
        IBreedsContext['filteredBreeds']
    >([])
    /**
     * Whether the API is currently loading data.
     * This use case is simple as we only need to check one API fetch method.
     */
    const [_isLoading, _setIsLoading] =
        useState<IBreedsContext['isLoading']>(false)
    /**
     * The error message if the API request failed.
     * This is not a general requirement, but used to display an error page to the user.
     */
    const [_apiError, _setApiError] = useState<IBreedsContext['apiError']>()
    /**
     * The search keyword used to filter the dog breeds.
     * Added as a stateful value so that the keyword persist between page transitions.
     */
    const [_searchKeyword, _setSearchKeyword] = useState<string>('')
    // #endregion

    // #region - Hooks
    /**
     * The notification context used to display snackbars to the user.
     */
    const notificationContext = use(NotificationContext)
    // #endregion

    // #region - Methods
    /**
     * Fetches the dog breeds list from the provided API.
     * @param force - If true, the cached data will be ignored and the new data will be fetched and returned.
     * @returns - The list of dog breeds from the API alongside an image field to store the breed image.
     */
    const fetchBreeds = async ({
        force,
    }: {
        force?: boolean
    } = {}): Promise<IBreedsContext['allBreeds']> => {
        // If an API error message is set, clear it
        if (!!_apiError) _setApiError(undefined)

        // If not force and breeds are already fetched, return the cached breeds
        // This is so we don't make unnecessary requests to the API
        if (!force && Object.keys(_allBreeds).length > 0) {
            return _allBreeds
        }

        // Set the loading state to true
        _setIsLoading(true)

        // NOTE: KEEP THIS COMMENTED OUT.
        // This is used for testing purposes.
        // It imported from '../../utils/methods/api'
        // await apiDelay(1500)

        try {
            // Fetch the dog breeds list from the API
            const breeds = await fetchJson<
                IDogBreedsModel<TDogBreedsMessage>
            >({
                url: `${import.meta.env.VITE_API_BASE_URL}/breeds/list/all`,
            })

            // If the API failed, log the error and return an empty object
            if (!breeds.ok) {
                console.error('Failed to fetch breeds', breeds.error)
                notificationContext?.addSnackbar({
                    message: breeds.error,
                    state: 'danger',
                })

                // Remove the loader
                _setIsLoading(false)

                // Set the API error to render
                _setApiError(breeds.error)

                // Return an empty list.
                return []
            }

            // Flatten the breeds data to include the breed name and sub-breed name
            const allBreeds = Object.entries(breeds.data.message)
                .flatMap(([breed, subBreeds]) =>
                    subBreeds.length > 0
                        ? subBreeds.map((sub) => `${sub} ${breed}`)
                        : [breed]
                )
                .sort((a, b) => a.localeCompare(b))

            // Format the breeds data to include the breed name and image field
            const formattedBreeds = allBreeds.map((breed) => ({
                name: breed,
                image: '',
            }))

            // Store the associated states
            _setAllBreeds(formattedBreeds)

            // Remove the loader
            _setIsLoading(false)

            // Return the final list of breeds
            return formattedBreeds
        } catch (error) {
            console.error('Failed to fetch breeds', error)
            notificationContext?.addSnackbar({
                message: `${ error }`,
                state: 'danger',
            })

            // Remove the loader
            _setIsLoading(false)

            // Set the API error to render
            _setApiError(`${error}`)

            // Return an empty list
            return []
        }
    }
    /**
     * Fetches the display image for the provided dog breed.
     * @param breed - The name of the dog breed to fetch the image for.
     * @param force - If true, the cached image will be ignored and the new image will be fetched and returned.
     * @returns 
     */
    const fetchBreedDisplayImage = async ({
        breed,
        force,
    }: {
        breed: string
        force?: boolean
    }): Promise<IBreedsContext['allBreeds'][number]['image']> => {
        // Find the breed in the list of breeds
        // This is to use an existing image if it exists
        const matchingBreed = _allBreeds.find(
            (foundBreed) => foundBreed.name === breed
        )

        // If we have an existing image and not forcing a refresh, return the existing image
        // This is to prevent unnecessary requests to the API
        if (matchingBreed?.image && !force) return matchingBreed.image

        try {
            // Format the breed name to match the API format
            // e.g. "Labrador Retriever" -> "labrador/retriever"
            const formattedBreed = breed.includes(' ')
                ? `${breed.split(' ')[1]}/${breed.split(' ')[0]}`
                : breed

            // Load the breed image from the API
            const image = await fetchJson<
                IDogBreedsModel<TDogBreedImageMessage>
            >({
                url: `${
                    import.meta.env.VITE_API_BASE_URL
                }/breed/${formattedBreed}/images/random`,
            })

            // If the API failed, log the error and return an empty string
            // This is to prevent the app from crashing
            if (!image.ok) {
                // Log for debugging
                console.error('Failed to fetch breed image', image.error)

                // Notification to inform the user
                notificationContext?.addSnackbar({
                    message: image.error,
                    state: 'danger',
                })

                // Empty string to prevent the app from crashing
                return ''
            }

            // Store the image in the list of breeds
            _setAllBreeds((prev) =>
                prev.map((foundBreed) =>
                    foundBreed.name === breed
                        ? { ...foundBreed, image: image.data.message }
                        : foundBreed
                )
            )

            // Return the image
            return image.data.message
        } catch (error) {
            // Log for debugging
            console.error('Failed to fetch breed image', error)

            // Notification to inform the user
            notificationContext?.addSnackbar({
                message: `${ error }`,
                state: 'danger',
            })

            // Empty string to prevent the app from crashing
            return ''
        }
    }
    /**
     * Stores the search keyword in order to filter the list of visible dog breeds.
     * @param keyword - The keyword used to filter the dog breeds.
     */
    const handleBreedSearch = (keyword: string): void => {
        _setSearchKeyword(keyword)
    }
    // #endregion

    // #region - Effects
    /**
     * Filters the list of dog breeds when the search keyword changes.
     */
    useEffect(() => {
        _setFilteredBreeds(
            _allBreeds.filter((breed) =>
                trimLowercase(breed.name).includes(
                    trimLowercase(_searchKeyword)
                )
            )
        )
    }, [_allBreeds, _searchKeyword])

    // #region - Value
    const value: IBreedsContext = {
        // Data
        allBreeds: _allBreeds,
        apiError: _apiError,
        filteredBreeds: _filteredBreeds,
        isLoading: _isLoading,
        searchKeyword: _searchKeyword,

        // Methods
        fetchBreeds,
        fetchBreedDisplayImage,
        handleBreedSearch
    }
    // #endregion

    // #region - Markup
    return (
        <BreedsContext.Provider value={value}>
            {children}
        </BreedsContext.Provider>
    )
    // #endregion
}

export default BreedsProvider
