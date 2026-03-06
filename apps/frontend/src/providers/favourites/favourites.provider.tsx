'use client'

import { fetchJson } from '../../utils/methods/api'
import { type IFavouritesContext } from './favourites.definitions'
import { createContext, useEffect, useState } from 'react'

export const FavouritesContext = createContext<IFavouritesContext | null>(null)

const FavouritesProvider = ({ children }: React.PropsWithChildren) => {
    // #region - States
    /**
     * The list of favourite images.
     */
    const [_favourites, _setFavourites] = useState<string[]>([])
    /**
     * Whether the favourites are currently loading.
     */
    const [_isLoading, _setIsLoading] = useState(true)
    // #endregion

    // #region - Methods
    /**
     * Fetch the favourites list.
     */
    const fetchFavourites = async () => {
        // Set the loading state so we can show a loader
        _setIsLoading(true)

        try {
            // Fetch the favourites list
            const res = await fetchJson<string[]>({ url: '/api/favourites' })

            // If the response is not ok, throw an error
            if (!res.ok) {
                console.error('Failed to fetch favourites:', res.error)
                throw new Error('Failed to fetch favourites')
            }

            // If the response is ok, set the favourites state
            _setFavourites(res.data)
        } catch (error) {
            // If there is an error, log it and set the loading state to false
            console.error('Error fetching favourites:', error)
        } finally {
            _setIsLoading(false)
        }
    }
    /**
     * Toggle a favourite image.
     * @param imageUrl - The URL of the image to toggle.
     */
    const toggleFavourite = async (imageUrl: string) => {
        // Check if the image is already a favourite
        const isFavourite = _favourites.includes(imageUrl)

        // Set the API method based on whether the image is already a favourite
        // To add the image to favourites, we use POST
        // To remove the image from favourites, we use DELETE
        const method = isFavourite ? 'DELETE' : 'POST'

        // Store the list of current favourites so we can roll back if something goes wrong
        const currentFavourites = [..._favourites]

        // Update the favourites state based on whether the image is already a favourite
        // This is for instant feedback in the UI
        _setFavourites((favs) =>
            isFavourite
                ? favs.filter((url) => url !== imageUrl)
                : [...favs, imageUrl]
        )

        try {
            // Send the request to the API
            const res = await fetchJson({
                url: '/api/favourites',
                options: {
                    method,
                    body: JSON.stringify({ imageUrl }),
                },
            })

            // If the response is not ok, roll back the favourites state
            if (!res.ok) {
                _setFavourites(currentFavourites)
                console.error('Failed to toggle favourite:', res.error)
                throw new Error('Failed to toggle favourite')
            }
        } catch (error) {
            console.error('Error toggling favourite:', error)
            _setFavourites(currentFavourites)
        }
    }
    // #endregion

    // #region - Effects
    /**
     * Fetches the favourites list on mount.
     */
    useEffect(() => {
        fetchFavourites()
    }, [])
    // #endregion

    // #region - Value
    const value: IFavouritesContext = {
        // Data
        favourites: _favourites,
        isLoading: _isLoading,

        // Methods
        toggleFavourite,
    }
    // #endregion

    // #region - Markup
    return (
        <FavouritesContext.Provider value={value}>
            {children}
        </FavouritesContext.Provider>
    )
    // #endregion
}

export default FavouritesProvider
