// #region - Imports
import type { IComponentAttributes } from '../../../utils/definitions/interfaces'
import type { TSemanticState } from '../../../utils/definitions/types'
import type { TIcon } from '../../base/ui-icon/ui-icon.definitions'
// #endregion

// #region - Types
/**
 * The final props for the UiHelperText component.
 */
type TUiHelperTextProps = IUiHelperTextProps
// #endregion

// #region - Interfaces
/**
 * The development specific props for the UiHelperText component.
 */
interface IUiHelperTextDevProps extends IComponentAttributes {
    /**
     * The text value to display in the helper text.
     */
    value: string
}
/**
 * The design specific props for the UiHelperText component.
 */
interface IUiHelperTextProps extends IUiHelperTextDevProps {
    /**
     * An optional icon to display next to the helper text.
     */
    icon?: TIcon
    /**
     * If true, the helper text will be displayed as a skeleton loading state.
     * @default false
     */
    isSkeleton?: boolean
    /**
     * The semantic state of the helper text.
     * @default 'default'
     */
    state?: TSemanticState
}
// #endregion

// #region - Exports
export type { TUiHelperTextProps }
// #endregion
