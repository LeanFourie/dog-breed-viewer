// #region - Imports
import type { IComponentAttributes } from '../../../utils/definitions/interfaces'
import type {
    TNeutralColor,
    TSemanticColor,
    TShade,
    TSize,
    TThemeColor,
    TUiVariant,
    TUiShape,
    TValueOf,
    TSystemColor,
} from '../../../utils/definitions/types'
import { ROUTES } from '../../../utils/routes/routes'
import type { TIcon } from '../../base/ui-icon/ui-icon.definitions'
import type { MouseEvent } from 'react'
// #endregion

// #region - Types
/**
 * Determines where the link should be opened once clicked.
 */
type TUiButtonTarget = '_blank' | '_self' | '_parent' | '_top'
type TUiButtonColor =
    | Exclude<TThemeColor, 'tertiary'>
    | Extract<TSemanticColor, 'danger'>
    | Exclude<TNeutralColor, 'black'>
    | TSystemColor
/**
 * The click event which is emitted when a button is clicked.
 */
type TUiButtonClickEvent = MouseEvent<HTMLButtonElement | HTMLAnchorElement>
/**
 * The available props from the button layout.
 */
type TUiButtonLayout =
    | IUiIconButtonProps
    | IUiTextButtonProps
/**
 * The available props from the button HTML tag type.
 */
type TUiButtonHtmlTagType =
    | IUiAnchorButtonProps
    | IUiButtonButtonProps
    | IUiLinkButtonProps
/**
 * The final props to use for the UiButton component.
 */
type TUiButtonProps =
    IUiButtonProps &
    TUiButtonLayout &
    TUiButtonHtmlTagType
// #endregion

// #region - Interfaces
/**
 * The development specific props to be set on the UiButton component.
 */
interface IUiButtonDevProps extends IComponentAttributes {}
/**
 * The design specific props to be set on the UiButton component.
 */
interface IUiButtonProps extends IUiButtonDevProps {
    /**
     * The label value of the component.
     * Only renders aria-label for icon buttons.
     */
    label: string
    /**
     * The color of the component.
     * @default 'primary'
     */
    color?: TUiButtonColor
    /**
     * If true, the button will be disabled.
     * @default false
     */
    isDisabled?: boolean
    /**
     * If true, a loader will render inside the component.
     * @default false
     */
    isLoading?: boolean
    /**
     * If true, the component will render as a skeleton.
     * @default false
     */
    isSkeleton?: boolean
    /**
     * Determines the shade of the component color.
     * @default 'dark'
     */
    shade?: TShade
    /**
     * Sets the shape of the button corners.
     * @default 'squircle'
     */
    shape?: TUiShape
    /**
     * Sets the size of the component.
     * @default 'md'
     */
    size?: TSize
    /**
     * Sets the UI variant style of the component.
     * @default 'filled'
     */
    variant?: TUiVariant
}
/**
 * The available props from the icon button layout.
 */
interface IUiIconButtonProps {
    /**
     * Sets the icon to render inside the component.
     */
    icon: TIcon
    /**
     * Explicitly sets the component type to icon.
     */
    type: 'icon'
}
/**
 * The available props from the text button layout.
 */
interface IUiTextButtonProps {
    /**
     * Explicitly sets the component type to text.
     */
    type: 'text'
    /**
     * An optional leading icon to render before the button label
     * @default undefined
     */
    leadingIcon?: TIcon
    /**
     * An optional trailing icon to render after the button label
     * @default undefined
     */
    trailingIcon?: TIcon
}
/**
 * The available props from the anchor button type.
 */
interface IUiAnchorButtonProps {
    /**
     * Explicitly sets the component type to anchor.
     */
    tag: 'a'
    /**
     * Sets the href attribute for the anchor element.
     */
    href: string
    /**
     * Optional target attribute for the anchor element.
     * @default '_self'
     */
    target?: TUiButtonTarget
}
/**
 * The available props from the button button type.
 */
interface IUiButtonButtonProps {
    /**
     * Explicitly sets the component type to button.
     */
    tag: 'button'
    /**
     * Optional form action attribute for the button element.
     * @default undefined
     */
    action?: 'submit' | 'reset'
    /**
     * Optional click event which is emitted when a button is clicked.
     * @default undefined
     */
    onClick?: (event: TUiButtonClickEvent) => void
}
/**
 * The available props from the link button type.
 */
interface IUiLinkButtonProps {
    /**
     * Explicitly sets the component type to link.
     */
    tag: 'link'
    /**
     * Sets the href attribute for the router link element.
     */
    to: Extract<TValueOf<typeof ROUTES>, string> | string
}
// #endregion

// #region - Exports
export type {
    IUiTextButtonProps,
    IUiIconButtonProps,
    TUiButtonProps,
    TUiButtonClickEvent,
    IUiAnchorButtonProps,
    IUiButtonButtonProps,
    IUiLinkButtonProps,
}
// #endregion
