// #region - Imports
import type { IComponentAttributes } from '../../../utils/definitions/interfaces'
import type { TSize } from '../../../utils/definitions/types'
import type { PropsWithChildren } from 'react'

// #region - Types
/**
 * Represents the semantiacally correct HTML tags available for text components.
 */
type TUiTextVariant = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'label'
/**
 * Represents the full list of HTML tags available for text components.
 */
type TUiTextRenderAs = TUiTextVariant | 'span' | 'div' | 'caption'
/**
 * Determines the available font weights for the text items.
 */
type TUiTextWeight =
    | 'thin'
    | 'extra-light'
    | 'light'
    | 'regular'
    | 'medium'
    | 'semi-bold'
    | 'bold'
    | 'extra-bold'
    | 'black'
/**
 * The final props to use for the UiText component.
 */
type TUiTextProps = PropsWithChildren<IUiTextProps>
// #endregion

// #region - Interfaces
/**
 * The development specific props to be set on the UiText component.
 */
interface IUiTextDevProps extends IComponentAttributes {
    /**
     * Sets the `for` attribute for text components.
     * This is useful for when using the text component as a label for form fields.
     */
    htmlFor?: string
    /**
     * Changes the HTML tag for the component while keeping the styles assigned to the `variant`.
     */
    renderAs?: TUiTextRenderAs
    /**
     * Truncates the text if it exceeds the parent component, instead of wrapping it to a new line.
     * @default false
     */
    truncate?: boolean
    /**
     * Sets the font weight for the text.
     * @default 'regular'
     */
    weight?: TUiTextWeight
}
/**
 * The design specific props to be set on the UiText component.
 */
interface IUiTextProps extends IUiTextDevProps {
    /**
     * Sets the HTML tag and associated styles for the text component.
     * @default 'p'
     */
    variant?: TUiTextVariant
    /**
     * Sets the font size variant for the text component.
     * @default 'md'
     */
    size?: TSize
    /**
     * If true, the component will render as a skeleton loader
     * @default false
     */
    isSkeleton?: boolean
}
// #endregion

// #region - Exports
export type { TUiTextProps }
// #endregion
