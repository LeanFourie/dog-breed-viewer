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
    const name = `UiHelperText`

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
            {!!icon ? (
                <span className={css[`${name}__icon`]}>
                    <UiIcon
                        {...icon}
                        className={css[`${name}__icon-element`]}
                    />
                </span>
            ) : null}

            <UiText
                isSkeleton={isSkeleton}
                renderAs={'span'}
                variant={'label'}
                size={'sm'}
            >
                {value}
            </UiText>
        </span>
    )
}

export { UiHelperText }
