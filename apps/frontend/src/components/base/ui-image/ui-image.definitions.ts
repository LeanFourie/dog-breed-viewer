// #region - Imports
import type { IComponentAttributes } from '../../../utils/definitions/interfaces'
// #endregion

// #region - Types
/**
 * The available aspect ratios for the image.
 */
type TUiImageAspectRatio = '1:1' | '4:3' | '16:9' | 'unset'
/**
 * The available shapes for the image.
 */
type TUiImagShape = 'rectangle' | 'circle'
/**
 * The available orientations for the image.
 */
type TUiImagOrientation = 'landscape' | 'portrait'
/**
 * The available fit modes for the image.
 */ 
type TUiImagFit = 'cover' | 'contain'
/**
 * The final props for the UiImage component.
 */
type TUiImageProps = IUiImageProps
// #endregion

// #region - Interfaces
/**
 * The development specific props for the UiImage component.
 */
interface IUiImageDevProps extends IComponentAttributes {
    /**
     * The alt text for the image.
     */
    alt: string
    /**
     * The source URL for the image.
     */
    src: string
    /**
     * The fit mode for the image.
     */
    fit?: TUiImagFit
    /**
     * The placeholder URL for the image.
     * Useful for slow loading images.
     */
    placeholder?: string
}
/**
 * The design specific props for the UiImage component.
 */
interface IUiImageProps extends IUiImageDevProps {
    /**
     * The aspect ratio for the image.
     * @default '16:9'
     */
    aspectRatio?: TUiImageAspectRatio
    /**
     * The orientation for the image.
     * @default 'landscape'
     */
    orientation?: TUiImagOrientation
    /**
     * The shape for the image.
     * @default 'rectangle'
     */
    shape?: TUiImagShape
}
// #endregion

// #region - Exports
export type { TUiImageProps }
// #endregion
