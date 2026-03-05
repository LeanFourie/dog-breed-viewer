// #region - Imports
import type { IBreedsContext } from '../../../../providers'
// #endregion

// #region - Interfaces
/**
 * The props required by the PageBreedNavigation component.
 */
interface IPageHomeNavigationProps {
    /**
     * The ID of the breed to navigate to.
     */
    breedId: string
    /**
     * The list of available dog breeds.
     */
    breedsList: IBreedsContext['allBreeds']
}
// #endregion

// #region - Exports
export type { IPageHomeNavigationProps }
// #endregion
