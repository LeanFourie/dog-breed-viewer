import { UiIcon } from '../../base/ui-icon/ui-icon'
import { UiText } from '../../base/ui-text/ui-text'
import { type TUiHelperTextProps } from './ui-helper-text.definitions'
import css from './ui-helper-text.module.scss'

function UiHelperText({
    className = '',
    icon,
    isSkeleton = false,
    state = 'neutral',
    style = {},
    value,
}: TUiHelperTextProps) {
    // #region - Variables
    /**
     * The name of the component used for styling and identification in the DOM inspector.
     */
    const name = `UiHelperText`
    // #endregion

    // #region - Markup
    return (
        <span
            className={`
                ${css[name]}
                ${css[`${name}--state-${state}`]}
                ${isSkeleton ? css[`${name}--is-skeleton`] : ''}
                ${className}
            `}
            style={style}
        >
            {/* Icon */}
            {!!icon ? (
                <span className={css[`${name}__icon`]}>
                    <UiIcon
                        {...icon}
                        className={css[`${name}__icon-element`]}
                    />
                </span>
            ) : null}
            {/* ./Icon */}

            {/* Text */}
            <UiText
                isSkeleton={isSkeleton}
                renderAs={'span'}
                variant={'label'}
                size={'sm'}
            >
                {value}
            </UiText>
            {/* ./Text */}
        </span>
    )
    // #endregion
}

export { UiHelperText }
