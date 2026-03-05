// #region - Imports
import type { IBreedContext } from '../../../../providers'
// #endregion

// #region - Interfaces
/**
 * The props required by the PageBreedImages component.
 */
interface IPageHomeImagesProps {
    /**
     * The ID value of the breed currently being viewed.
     */
    breedId: string
    /**
     * The list of images for the selected dog breed.
     */
    images: IBreedContext['selectedBreedImages']
    /**
     * The list of images for the selected dog breed.
     */
    isLoading: IBreedContext['isLoading']
}
// #endregion

// #region - Exports
export type { IPageHomeImagesProps }
// #endregion
