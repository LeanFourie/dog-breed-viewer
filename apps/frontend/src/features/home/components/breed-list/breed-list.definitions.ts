// #region - Imports
import { type IBreedsContext } from '../../../../providers'
// #endregion

// #region - Interfaces
/**
 * The props required by the PageHomeBreedList component.
 */
interface IPageHomeBreedListProps {
    /**
     * A list of all breeds available in the application.
     */
    allBreeds: IBreedsContext['allBreeds']
    /**
     * A function to fetch the display image for a specific breed.
     */
    fetchBreedDisplayImage: IBreedsContext['fetchBreedDisplayImage']
    /**
     * A list of breeds filtered based on the search keyword.
     */
    filteredBreeds: IBreedsContext['filteredBreeds']
}
// #endregion

// #region - Exports
export type { IPageHomeBreedListProps }
// #endregion
