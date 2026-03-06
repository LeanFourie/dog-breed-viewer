// #region - Interfaces
/**
 * The values to expose via the favourites context.
 */
interface IFavouritesContext {
    // Data
    /**
     * The list of favourite images.
     */
    favourites: string[]
    /**
     * Whether the favourites are currently loading.
     */
    isLoading: boolean

    // Methods
    /**
     * Toggle a favourite image.
     * @param imageUrl - The URL of the image to toggle.
     */
    toggleFavourite: (imageUrl: string) => Promise<void>
}
// #endregion

// #region - Exports
export type { IFavouritesContext }
// #endregion
