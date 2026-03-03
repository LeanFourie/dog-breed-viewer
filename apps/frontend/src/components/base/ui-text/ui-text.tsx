import css from './ui-text.module.scss'
import type { TUiTextProps } from './ui-text.definitions'

function UiText({
    children,
    className = '',
    htmlFor,
    isSkeleton = false,
    renderAs,
    size = 'md',
    truncate = false,
    style = {},
    variant = 'p',
    weight = 'regular',
}: TUiTextProps) {
    const name = `UiText`
    const Component = renderAs ?? variant

    return (
        <Component
            className={`
                ${css[name]}
                ${css[`${name}--size-${size}`]}
                ${css[`${name}--variant-${variant}`]}
                ${css[`${name}--weight-${weight}`]}
                ${isSkeleton ? css[`${name}--is-skeleton`] : ''}
                ${truncate ? css[`${name}--is-truncated`] : ''}
                ${className}
            `}
            style={style}
            htmlFor={htmlFor}
        >
            {children}
        </Component>
    )
}

export { UiText }
