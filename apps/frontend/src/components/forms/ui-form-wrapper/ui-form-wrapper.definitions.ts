import type { IComponentAttributes } from '../../../utils/definitions/interfaces'
import type { TSemanticState } from '../../../utils/definitions/types'
import type { TUiHelperTextProps } from '../ui-helper-text/ui-helper-text.definitions'
import type { PropsWithChildren } from 'react'
// #endregion

// #region - Types
/**
 * The props for the UiFormWrapper component helper text.
 */
type TUiFormWrapperHelperText = Pick<
    TUiHelperTextProps,
    'value' | 'icon' | 'state'
>
/**
 * Sets an requirement indicator for the form wrapper.
 */
type TUiFormWrapperRequirement = 'none' | 'optional' | 'required'
/**
 * The final props for the UiFormWrapper component.
 */
type TUiFormWrapperProps = PropsWithChildren<IUiFormWrapperProps>
// #endregion

// #region - Interfaces
/**
 * The development specific props for the UiFormWrapper component.
 */
interface IUiFormWrapperDevProps extends IComponentAttributes {
    /**
     * The HTML `for` attribute.
     */
    htmlFor: string
}
/**
 * The design specific props for the UiFormWrapper component.
 */
interface IUiFormWrapperProps extends IUiFormWrapperDevProps {
    /**
     * The count value to display next to the label.
     */
    count?: string
    /**
     * The helper text to display below the form wrapper.
     */
    helperText?: TUiFormWrapperHelperText[]
    /**
     * If true, the form wrapper will be displayed as a skeleton.
     * @default false
     */
    isSkeleton?: boolean
    /**
     * The label to display inside the form wrapper.
     */
    label?: string
    /**
     * The requirement indicator to display next to the label.
     */
    requirement?: TUiFormWrapperRequirement
    /**
     * The semantic state to apply to the form wrapper.
     * @default 'default'
     */
    state?: TSemanticState
}
// #endregion

// #region - Exports
export type { TUiFormWrapperProps, IUiFormWrapperProps }
// #endregion
