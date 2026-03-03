// #region - Imports
import type { IComponentAttributes } from '../../../utils/definitions/interfaces'
import type { TSize } from '../../../utils/definitions/types'
import type { TIcon } from '../../base/ui-icon/ui-icon.definitions'
import type { ChangeEvent, FocusEvent, KeyboardEvent } from 'react'
import type { IUiFormWrapperProps } from '../ui-form-wrapper/ui-form-wrapper.definitions'
// #endregion

// #region - Types
/**
 * Represents the icon to display next to the input field.
 */
type TUiInputIcon = TIcon & { onClick?: () => void }
/**
 * Represents the leading / trailing text to display next to the input field.
 */
type TUiInputText = { value: string; onClick?: () => void }
/**
 * The change event emitter for the UiInput component.
 */
type TUiInputChangeEvent = ChangeEvent<HTMLInputElement>
/**
 * The focus event emitter for the UiInput component.
 */
type TUiInputFocusEvent = FocusEvent<HTMLInputElement>
/**
 * The keydown event emitter for the UiInput component.
 */
type TUiInputKeyDownEvent = KeyboardEvent<HTMLInputElement>
/**
 * Represents the supported input types for the UiInput component.
 */
type TUiInputType =
    | 'text'
    | 'number'
    | 'email'
    | 'tel'
    | 'search'
    | 'password'
    | 'url'
    | 'date'
/**
 * The final props for the UiInput component.
 */
type TUiInputProps = IUiInputProps
// #endregion

// #region - Interfaces
/**
 * The development specific props for the UiInput component.
 */
interface IUiInputDevProps extends IComponentAttributes {
    /**
     * Emits the change event when the input value changes.
     */
    onChange: (event: TUiInputChangeEvent) => void
    /**
     * Sets the `value` attribute for the input field.
     */
    value: string
    /**
     * Sets the `autocomplete` attribute for the input field.
     */
    autoComplete?: string
    /**
     * Sets the `max` attribute for the input field.
     */
    max?: number
    /**
     * Sets the `maxlength` attribute for the input field.
     */
    maxLength?: number
    /**
     * Sets the `min` attribute for the input field.
     */
    min?: number
    /**
     * Sets the `minlength` attribute for the input field.
     */
    minLength?: number
    /**
     * Emits the keydown event when the `Enter` key is pressed.
     */
    onEnterPress?: (event: TUiInputKeyDownEvent) => void
    /**
     * Emits the focus event when the input field is focused.
     */
    onFocus?: (event: TUiInputFocusEvent) => void
    /**
     * Emits the blur event when the input field is blurred.
     */ 
    onBlur?: (event: TUiInputFocusEvent) => void
    /**
     * Emits the increment event when the `Step Up` button is clicked.
     */
    onValueIncrement?: (value: string) => void
    /**
     * Sets the `pattern` attribute for the input field.
     */
    pattern?: string
    /**
     * Sets the `placeholder` attribute for the input field.
     */
    placeholder?: string
    /**
     * Sets the `type` attribute for the input field.
     * @default 'text'
     */
    type?: TUiInputType
    /**
     * Sets the `step` attribute for the input field.
     */
    step?: number
}
/**
 * The design specific props for the UiInput component.
 */
interface IUiInputProps extends IUiInputDevProps, IUiFormWrapperProps {
    /**
     * If true, the input field will be disabled.
     * @default false
     */
    isDisabled?: boolean
    /**
     * If true, the input field will be displayed as a loading state.
     * @default false
     */
    isLoading?: boolean
    /**
     * If true, the input field will be displayed as a readonly state.
     * @default false
     */
    isReadonly?: boolean
    /**
     * An optional icon to display before the input field.
     */
    leadingIcon?: TUiInputIcon
    /**
     * An optional text to display before the input field.
     */
    prefix?: TUiInputText
    /**
     * The size of the input field.
     * @default 'md'
     */
    size?: TSize
    /**
     * An optional text to display after the input field.
     */
    suffix?: TUiInputText
    /**
     * An optional icon to display after the input field.
     */
    trailingIcon?: TUiInputIcon
}
// #endregion

// #region - Exports
export type {
    TUiInputProps,
    TUiInputChangeEvent,
    TUiInputFocusEvent,
    TUiInputKeyDownEvent,
    IUiInputProps,
}
// #endregion
